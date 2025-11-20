// src/app/api/snap-capi/purchase/route.ts
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { redisGet, redisDel } from '@/lib/redis'
import type { OrderPaid, CheckoutAttribution } from '@types'
type SnapUserData = {
  em?: string[]
  ph?: string[]
  fn?: string[]
  ln?: string[]
  ct?: string
  st?: string
  zp?: string
  country?: string
  client_ip_address?: string
  user_agent?: string
  sc_click_id?: string
  sc_cookie1?: string
  ge?: string
  madid?: string
}

type SnapPurchaseCustomData = {
  value: string
  currency: string
  content_ids: string[]
  content_category: string[]
  number_items: string[]
  order_id: string
  event_id?: string
}

type SnapEvent = {
  event_name: 'PURCHASE'
  action_source: 'website'
  event_source_url?: string
  event_time: number
  user_data: SnapUserData
  custom_data: SnapPurchaseCustomData
}

type SnapCapiPayload = {
  data: SnapEvent[]
}

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

/* ----------------------------- Route ----------------------------- */

export async function POST(req: NextRequest) {
  // 1) HMAC validation
  const raw = await req.text()
  if (!verifyHmac(req, raw)) {
    return NextResponse.json({ error: 'Invalid HMAC' }, { status: 401 })
  }

  // 2) Parse order
  let order: OrderPaid
  try {
    order = JSON.parse(raw) as OrderPaid
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // 3) Retrieve attribution from Redis
  const token = order.token ?? undefined
  const attrib =
    token ? await redisGet<CheckoutAttribution>(`checkout:${token}`) : null

  // 4) Build custom_data (Snapchat CAPI Spec)
  const priceSet = order.total_price_set ?? order.current_total_price_set
  const value = toNumberSafe(priceSet?.shop_money.amount) ?? 0
  const currency = priceSet?.shop_money.currency_code ?? order.currency

  const content_ids = order.line_items.map(
    li => (li.variant_id ?? li.product_id)?.toString() ?? 'unknown'
  )

  const number_items = order.line_items.map(li => (li.quantity ?? 0).toString())

  const order_id = order.admin_graphql_api_id

  const webhookGid =
    order.admin_graphql_api_id
    ?? (order.id != null ? `gid://shopify/Order/${order.id}` : undefined)
  const eventId = webhookGid ? `shopify_order_${webhookGid}` : undefined

  const custom_data: SnapPurchaseCustomData = {
    value: value.toString(), // Snap CAPI krever string
    currency: currency,
    content_ids: content_ids,
    content_category: ['product'],
    number_items: number_items, // Snap CAPI krever array av strings
    order_id: order_id,
    ...(eventId ? { event_id: eventId } : {})
  }
  const user_data: SnapUserData = {}

  if (attrib?.userData.client_user_agent)
    user_data.user_agent = attrib.userData.client_user_agent
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

  const customer = order.customer
  if (customer) {
    const firstName = normalizeAndHash(customer.first_name)
    if (firstName !== undefined) user_data.fn = [firstName]

    const lastName = normalizeAndHash(customer.last_name)
    if (lastName !== undefined) user_data.ln = [lastName]

    const addr = customer.default_address
    if (addr) {
      const city = normalizeAndHash(addr.city)
      if (city !== undefined) user_data.ct = city // Snap spec = string

      const state = normalizeAndHash(addr.province_code)
      if (state !== undefined) user_data.st = state // Snap spec = string

      const zip = normalizeAndHash(addr.zip)
      if (zip !== undefined) user_data.zp = zip // Snap spec = string

      const country = normalizeAndHash(addr.country_code)
      if (country !== undefined) user_data.country = country // Snap spec = string
    }
  }

  const event_time = Math.floor(
    new Date(order.processed_at ?? order.created_at).getTime() / 1000
  )

  const event_url =
    attrib?.checkoutUrl
    ?? (order as any)?.order_status_url
    ?? (order.token ? `https://utekos.no/checkouts/${order.token}` : undefined)

  const event: SnapEvent = {
    event_name: 'PURCHASE',
    event_time,
    action_source: 'website',
    user_data,
    custom_data,
    ...(event_url ? { event_source_url: event_url } : {})
  }

  const payload: SnapCapiPayload = { data: [event] }
  const PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID
  const ACCESS_TOKEN = process.env.SNAP_ACCESS_TOKEN

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('Snap CAPI environment variables not set')
    if (token) await redisDel(`checkout:${token}`)
    return NextResponse.json({ error: 'Missing CAPI config' }, { status: 500 })
  }

  console.log(
    '--- SNAP CAPI PAYLOAD SENT ---',
    JSON.stringify(payload, null, 2)
  )

  const res = await fetch(
    `https://tr.snapchat.com/v3/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    }
  )

  const result = await res.json()

  if (token) await redisDel(`checkout:${token}`)

  if (!res.ok) {
    console.error(
      '--- SNAP CAPI ERROR RESPONSE ---',
      JSON.stringify(result, null, 2)
    )
    return NextResponse.json(
      { error: 'Snap CAPI error', details: result },
      { status: res.status }
    )
  }

  console.log(
    '--- SNAP CAPI SUCCESS RESPONSE ---',
    JSON.stringify(result, null, 2)
  )
  return NextResponse.json({ ok: true, result })
}
