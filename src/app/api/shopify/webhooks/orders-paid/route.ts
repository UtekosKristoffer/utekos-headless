// Path: src/app/api/shopify/webhooks/orders-paid/route.ts

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

function normalizeAndHash(
  value: string | undefined | null
): string | undefined {
  if (value == null || typeof value !== 'string') {
    return undefined
  }
  const trimmedValue = value.trim()
  if (trimmedValue === '') {
    return undefined
  }

  if (/^[\d\s\-()+]+$/.test(trimmedValue)) {
    const digitsOnly = trimmedValue.replace(/\D/g, '')
    if (digitsOnly === '') return undefined
    // Vurder E.164 normalisering her hvis mulig/nødvendig før hash
    return crypto.createHash('sha256').update(digitsOnly, 'utf8').digest('hex')
  }

  const normalized = trimmedValue.toLowerCase()
  return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex')
}

function verifyHmac(req: NextRequest, raw: string): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET ?? ''
  if (!secret) {
    console.error('[HMAC Verify] SHOPIFY_WEBHOOK_SECRET is not set')
    return false
  }
  const header = req.headers.get('x-shopify-hmac-sha256') ?? ''
  if (!header) {
    console.error('[HMAC Verify] Missing x-shopify-hmac-sha256 header')
    return false
  }
  const digest = crypto
    .createHmac('sha256', secret)
    .update(raw, 'utf8')
    .digest('base64')

  if (header.length !== digest.length) {
    console.error('[HMAC Verify] Header length mismatch')
    return false
  }
  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(header))
  } catch (error) {
    console.error(
      '[HMAC Verify] Error during timingSafeEqual (likely invalid header format):',
      error
    )
    return false
  }
}

function toNumberSafe(s: string | undefined | null): number | undefined {
  if (s == null || typeof s !== 'string') return undefined
  const n = Number(s)
  return Number.isFinite(n) ? n : undefined
}

function getKeyFromUrl(urlString: string | undefined): string | undefined {
  if (typeof urlString !== 'string') return undefined
  try {
    const url = new URL(urlString)
    const key = url.searchParams.get('key')
    if (key && /^[a-f0-9]{32}$/i.test(key)) {
      return key
    }
  } catch (e) {}
  return undefined
}

function getCheckoutKey(order: OrderPaid): string | undefined {
  if (order.cart_token) return order.cart_token

  // 2. Prioritet: token (Kan være samme som cart_token i eldre oppsett)
  if (order.token) return order.token

  // 3. Fallback: Prøv å parse fra order_status_url (ofte en annen key, men verdt et forsøk)
  const urlKey = getKeyFromUrl((order as any)?.order_status_url)
  if (urlKey) return urlKey

  return undefined
}

function buildUserData(
  order: OrderPaid,
  attrib: CheckoutAttribution | null
): MetaUserData {
  const userData: MetaUserData = {}

  if (attrib?.userData?.fbp) userData.fbp = attrib.userData.fbp
  if (attrib?.userData?.fbc) userData.fbc = attrib.userData.fbc
  if (attrib?.userData?.client_user_agent)
    userData.client_user_agent = attrib.userData.client_user_agent
  if (attrib?.userData?.client_ip_address)
    userData.client_ip_address = attrib.userData.client_ip_address
  if (attrib?.userData?.external_id)
    userData.external_id = attrib.userData.external_id

  const email = normalizeAndHash(order.contact_email ?? order.customer?.email)
  if (email) userData.em = [email]

  const phone = normalizeAndHash(
    order.customer?.phone
      ?? order.billing_address?.phone
      ?? order.shipping_address?.phone
      ?? (typeof order.phone === 'string' ? order.phone : null)
  )
  if (phone) userData.ph = [phone]

  const fn = normalizeAndHash(
    order.customer?.first_name
      ?? order.billing_address?.first_name
      ?? order.shipping_address?.first_name
  )
  if (fn) userData.fn = [fn]

  const ln = normalizeAndHash(
    order.customer?.last_name
      ?? order.billing_address?.last_name
      ?? order.shipping_address?.last_name
  )
  if (ln) userData.ln = [ln]

  const billing = order.billing_address
  const shipping = order.shipping_address

  const city = normalizeAndHash(billing?.city ?? shipping?.city)
  if (city) userData.ct = [city]

  const st = normalizeAndHash(billing?.province_code ?? shipping?.province_code)
  if (st) userData.st = [st]

  const zp = normalizeAndHash(billing?.zip ?? shipping?.zip)
  if (zp) userData.zp = [zp]

  const country = normalizeAndHash(
    billing?.country_code ?? shipping?.country_code
  )
  if (country) userData.country = [country]

  Object.keys(userData).forEach(key => {
    const K = key as keyof MetaUserData
    if (Array.isArray(userData[K]) && (userData[K] as string[]).length === 0) {
      delete userData[K]
    } else if (userData[K] == null) {
      delete userData[K]
    }
  })

  return userData
}

export async function POST(req: NextRequest) {
  const raw = await req.text()
  if (!verifyHmac(req, raw)) {
    console.error('[Webhook orders/paid] Invalid HMAC')
    return NextResponse.json({ error: 'Invalid HMAC' }, { status: 401 })
  }

  let order: OrderPaid
  try {
    order = JSON.parse(raw) as OrderPaid
    if (!order || typeof order !== 'object' || !order.id) {
      throw new Error('Invalid order data received in webhook')
    }
  } catch (e) {
    console.error(
      '[Webhook orders/paid] Failed to parse Shopify webhook body:',
      e
    )
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  // Debugging av ID-er for å løse Redis mismatch
  const urlKey = getKeyFromUrl((order as any)?.order_status_url)
  console.log(
    `[Webhook orders/paid] Token Debug: ID=${order.id}, cart_token=${order.cart_token}, token=${order.token}, URL_key=${urlKey}`
  )

  const token = getCheckoutKey(order)
  const redisKey = token ? `checkout:${token}` : undefined

  let attrib: CheckoutAttribution | null = null
  try {
    if (redisKey) {
      attrib = await redisGet<CheckoutAttribution>(redisKey)
    }

    if (attrib) {
      console.log(
        `[Webhook orders/paid] Found attribution data in Redis for key: ${redisKey}`
      )
    } else {
      console.warn(
        `[Webhook orders/paid] No attribution data found in Redis for key: ${redisKey}. (Used token source: ${
          token === order.cart_token ? 'cart_token'
          : token === order.token ? 'token'
          : 'url'
        })`
      )
    }
  } catch (redisError) {
    console.error(
      `[Webhook orders/paid] Error fetching attribution data from Redis for key ${redisKey}:`,
      redisError
    )
  }

  const priceSet = order.total_price_set ?? order.current_total_price_set
  const value =
    toNumberSafe(priceSet?.shop_money.amount ?? order.total_price) ?? 0
  const currency = priceSet?.shop_money.currency_code ?? order.currency ?? 'NOK'
  const contents: MetaContentItem[] = (order.line_items || [])
    .map((li: any) => {
      const id =
        (li.variant_id ?? li.product_id ?? li.id)?.toString() ?? 'unknown'
      const item: MetaContentItem = { id }
      if (li.quantity != null) item.quantity = li.quantity
      const itemPrice = toNumberSafe(
        li.price_set?.shop_money.amount ?? li.price
      )
      if (typeof itemPrice === 'number') item.item_price = itemPrice
      return item
    })
    .filter(item => item.id !== 'unknown')

  const custom_data: MetaPurchaseCustomData = { value, currency }
  if (contents.length > 0) {
    custom_data.contents = contents
    custom_data.content_ids = contents.map(c => c.id)
    custom_data.content_type = 'product'
  }
  custom_data.order_id =
    order.admin_graphql_api_id ?? order.name ?? order.id?.toString()

  const user_data = buildUserData(order, attrib)

  const event_time = Math.floor(
    new Date(order.processed_at ?? order.created_at ?? Date.now()).getTime()
      / 1000
  )
  const webhookGid =
    order.admin_graphql_api_id
    ?? (order.id != null ? `gid://shopify/Order/${order.id}` : undefined)
  const eventId = webhookGid ? `shopify_order_${webhookGid}` : attrib?.eventId

  const event: MetaEvent = {
    event_name: 'Purchase',
    event_time,
    action_source: 'website',
    user_data,
    custom_data,
    ...(eventId && { event_id: eventId })
  }

  if (attrib?.checkoutUrl) {
    event.event_source_url = attrib.checkoutUrl
  } else if (order.order_status_url) {
    event.event_source_url = order.order_status_url
  }

  const payload: MetaEventsRequest & { test_event_code?: string } = {
    data: [event]
  }

  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    if (redisKey) {
      try {
        await redisDel(redisKey)
      } catch (e) {}
    }
    console.error(
      '[Webhook orders/paid] Purchase CAPI Error: Missing CAPI config'
    )
    return NextResponse.json(
      { ok: false, error: 'Internal Server Error - Missing CAPI config' },
      { status: 200 }
    )
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(
      '[Webhook orders/paid] Sending CAPI Payload:',
      JSON.stringify(payload, null, 2)
    )
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v24.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      }
    )

    const result = (await res.json()) as MetaEventsSuccess | MetaGraphError

    if (redisKey) {
      try {
        await redisDel(redisKey)
        console.log(`[Webhook orders/paid] Deleted Redis key: ${redisKey}`)
      } catch (delError) {
        console.error(
          `[Webhook orders/paid] Error deleting Redis key ${redisKey}:`,
          delError
        )
      }
    }

    if (!res.ok) {
      console.error(
        `[Webhook orders/paid] Meta CAPI Error Response (Status ${res.status}):`,
        JSON.stringify(result, null, 2)
      )
      return NextResponse.json(
        { ok: false, errorDetails: result },
        { status: 200 }
      )
    }

    console.log(
      '[Webhook orders/paid] Meta CAPI Success:',
      JSON.stringify(result, null, 2)
    )
    return NextResponse.json({ ok: true, result })
  } catch (fetchError) {
    console.error('[Webhook orders/paid] Meta CAPI Fetch Error:', fetchError)
    if (redisKey) {
      try {
        await redisDel(redisKey)
      } catch (e) {}
    }
    return NextResponse.json(
      { ok: false, error: 'Failed to connect to Meta CAPI' },
      { status: 200 }
    )
  }
}
