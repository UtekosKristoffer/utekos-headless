import { NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { redisGet, redisDel } from '@/lib/redis'
import type {
  OrderPaid,
  CheckoutAttribution,
  MetaEvent,
  MetaContentItem,
  MetaPurchaseCustomData,
  MetaUserData,
  MetaEventsRequest,
  MetaGraphError,
  MetaEventsSuccess
} from '@types'

function verifyHmac(req: NextRequest, raw: string): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET ?? ''
  if (!secret) return false
  const header = req.headers.get('x-shopify-hmac-sha256') ?? ''
  const digest = crypto
    .createHmac('sha256', secret)
    .update(raw, 'utf8')
    .digest('base64')
  if (header.length !== digest.length) return false
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(header))
}

function toNumberSafe(s: string | undefined): number | undefined {
  if (typeof s !== 'string') return undefined
  const n = Number(s)
  return Number.isFinite(n) ? n : undefined
}

function hash(input: string): string {
  return crypto.createHash('sha256').update(input, 'utf8').digest('hex')
}

function normalizeAndHash(
  input: string | undefined | null
): string | undefined {
  if (!input) return undefined
  const normalized = input.trim().toLowerCase()
  return normalized ? hash(normalized) : undefined
}

function normalizePhone(input: string | undefined | null): string | undefined {
  if (!input) return undefined
  const normalized = input.replace(/[^0-9]/g, '')
  return normalized ? hash(normalized) : undefined
}

/**
 * NY HJELPER: Henter den korrekte 'key'-parameteren fra ordre-URLen.
 * Dette er tokenen som 'capture-identifiers' bruker for å lagre i Redis.
 */
function getCheckoutKey(order: OrderPaid): string | undefined {
  // Prøv 'order_status_url' først, den inneholder 'key=...'
  const urlString = (order as any)?.order_status_url
  if (typeof urlString === 'string') {
    try {
      const url = new URL(urlString)
      const key = url.searchParams.get('key')
      // Sjekk at 'key' ser ut som en 32-sifret hex-streng
      if (key && /^[a-f0-9]{32}$/i.test(key)) {
        return key
      }
    } catch (e) {
      console.error('Kunne ikke parse order_status_url:', e)
    }
  }
  return order.token ?? undefined
}

export async function POST(req: NextRequest) {
  const raw = await req.text()
  if (!verifyHmac(req, raw)) {
    return NextResponse.json({ error: 'Invalid HMAC' }, { status: 401 })
  }

  let order: OrderPaid
  try {
    order = JSON.parse(raw) as OrderPaid
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  console.log(
    `✅ KJØP REGISTRERT: Mottatt ordre ${
      order.admin_graphql_api_id ?? order.id
    }. Total: ${order.total_price} ${order.currency}`
  )

  const token = getCheckoutKey(order) // Bruker ny hjelpefunksjon
  const redisKey = token ? `checkout:${token}` : undefined
  const attrib = redisKey ? await redisGet<CheckoutAttribution>(redisKey) : null

  if (!attrib) {
    console.warn(`[Webhook] Fant ikke attrib-data i Redis for key: ${redisKey}`)
  } else {
    console.log(`[Webhook] Fant attrib-data i Redis for key: ${redisKey}`)
  }

  const priceSet = order.total_price_set ?? order.current_total_price_set
  const value = toNumberSafe(priceSet?.shop_money.amount) ?? 0
  const currency = priceSet?.shop_money.currency_code ?? order.currency

  const contents: MetaContentItem[] = order.line_items.map(li => {
    const item: MetaContentItem = {
      id: (li.variant_id ?? li.product_id)?.toString() ?? 'unknown'
    }
    if (li.quantity) item.quantity = li.quantity
    const price = toNumberSafe(li.price_set.shop_money.amount)
    if (typeof price === 'number') item.item_price = price
    return item
  })

  const custom_data: MetaPurchaseCustomData = { value, currency }
  if (contents.length) custom_data.contents = contents
  custom_data.content_type = 'product'
  custom_data.order_id = order.admin_graphql_api_id
  if (contents.length) custom_data.content_ids = contents.map(c => c.id)

  const shippingAmount = toNumberSafe(
    order.total_shipping_price_set?.shop_money.amount
  )
  if (typeof shippingAmount === 'number') custom_data.shipping = shippingAmount

  const taxAmount = toNumberSafe(order.total_tax_set?.shop_money.amount)
  if (typeof taxAmount === 'number') custom_data.tax = taxAmount

  if (Array.isArray(order.discount_codes) && order.discount_codes.length > 0) {
    const codes = order.discount_codes
      .map(dc => dc?.code)
      .filter(Boolean) as string[]
    if (codes.length > 0) custom_data.coupon = codes.join(',')
  }

  const totalQty = order.line_items.reduce(
    (sum, li) => sum + (li.quantity ?? 0),
    0
  )
  if (totalQty > 0) custom_data.num_items = totalQty

  const user_data: MetaUserData = {}

  if (attrib?.userData.fbp) user_data.fbp = attrib.userData.fbp
  if (attrib?.userData.fbc) user_data.fbc = attrib.userData.fbc
  if (attrib?.userData.client_user_agent)
    user_data.client_user_agent = attrib.userData.client_user_agent
  if (attrib?.userData.client_ip_address)
    user_data.client_ip_address = attrib.userData.client_ip_address

  const phone = order.phone ?? order.customer?.phone
  const phoneString = typeof phone === 'string' ? phone.toString() : phone
  const normalizedPhone = normalizePhone(phoneString)
  if (normalizedPhone !== undefined) {
    user_data.ph = [normalizedPhone]
  }

  const email = order.email ?? order.customer?.email
  const normalizedEmail = normalizeAndHash(email)
  if (normalizedEmail !== undefined) {
    user_data.em = [normalizedEmail]
  }

  const customerId = order.customer?.admin_graphql_api_id
  if (customerId) {
    user_data.external_id = customerId
  }
  const customer = order.customer
  if (customer) {
    const firstName = normalizeAndHash(customer.first_name)
    if (firstName !== undefined) user_data.fn = [firstName]

    const lastName = normalizeAndHash(customer.last_name)
    if (lastName !== undefined) user_data.ln = [lastName]

    const addr = customer.default_address
    if (addr) {
      const city = normalizeAndHash(addr.city)
      if (city !== undefined) user_data.ct = [city]

      const state = normalizeAndHash(addr.province_code)
      if (state !== undefined) user_data.st = [state] // KORRIGERT

      const zip = normalizeAndHash(addr.zip)
      if (zip !== undefined) user_data.zp = [zip]

      const country = normalizeAndHash(addr.country_code)
      if (country !== undefined) user_data.country = [country] // KORRIGERT
    }
  }

  const event_time = Math.floor(
    new Date(order.processed_at ?? order.created_at).getTime() / 1000
  )
  const webhookGid =
    order.admin_graphql_api_id
    ?? (order.id != null ? `gid://shopify/Order/${order.id}` : undefined)
  const eventId = webhookGid ? `shopify_order_${webhookGid}` : undefined

  const event_url =
    attrib?.checkoutUrl
    ?? (order as any)?.order_status_url
    ?? (order.token ? `https://utekos.no/checkouts/${order.token}` : undefined)

  const event: MetaEvent = {
    event_name: 'Purchase',
    event_time,
    action_source: 'website',
    user_data,
    custom_data,
    ...(eventId ? { event_id: eventId } : {}),
    ...(event_url ? { event_source_url: event_url } : {})
  }
  const payload: MetaEventsRequest = { data: [event] }
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    if (redisKey) await redisDel(redisKey)
    return NextResponse.json({ error: 'Missing CAPI config' }, { status: 500 })
  }

  console.log(
    '--- CAPI PAYLOAD SENT (OPTIMIZED) ---',
    JSON.stringify(payload, null, 2)
  )

  const res = await fetch(
    `https://graph.facebook.com/v24.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    }
  )

  const result = (await res.json()) as MetaEventsSuccess | MetaGraphError

  if (redisKey) await redisDel(redisKey)

  if (!res.ok) {
    console.error(
      '--- META CAPI ERROR RESPONSE ---',
      JSON.stringify(result, null, 2)
    )
    return NextResponse.json(
      { error: 'Meta CAPI error', details: result },
      { status: res.status }
    )
  }

  console.log(
    '--- META CAPI SUCCESS RESPONSE ---',
    JSON.stringify(result, null, 2)
  )
  return NextResponse.json({ ok: true, result })
}
