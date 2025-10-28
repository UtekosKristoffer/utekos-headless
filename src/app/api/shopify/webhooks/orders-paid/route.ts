// src/app/api/shopify/webhooks/orders-paid/route.ts
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

/* ----------------------------- Route ----------------------------- */

export async function POST(req: NextRequest) {
  // 1) HMAC på rå body
  const raw = await req.text()
  if (!verifyHmac(req, raw)) {
    return NextResponse.json({ error: 'Invalid HMAC' }, { status: 401 })
  }

  // 2) Parse
  let order: OrderPaid
  try {
    order = JSON.parse(raw) as OrderPaid
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // 3) Finn evt. attrib fra Redis (fbp/fbc/ip/ua/checkoutUrl/eventId mm.)
  const token = order.token ?? undefined
  const attrib =
    token ? await redisGet<CheckoutAttribution>(`checkout:${token}`) : null

  // 4) custom_data
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

  // 5) user_data (kun felt som finnes)
  const user_data: MetaUserData = {}
  if (attrib?.userData.fbp) user_data.fbp = attrib.userData.fbp
  if (attrib?.userData.fbc) user_data.fbc = attrib.userData.fbc
  if (attrib?.userData.client_user_agent)
    user_data.client_user_agent = attrib.userData.client_user_agent
  if (attrib?.userData.client_ip_address)
    user_data.client_ip_address = attrib.userData.client_ip_address
  if (attrib?.userData.external_id)
    user_data.external_id = attrib.userData.external_id

  // --- PATCH FOR "SEND TEST" ---
  const hasAnyId = !!(
    user_data.fbp
    || user_data.fbc
    || user_data.external_id
    || user_data.em?.length
    || user_data.ph?.length
    || user_data.client_ip_address
  )
  const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE

  if (!hasAnyId && TEST_EVENT_CODE) {
    // 1) Minstekrav: ip/ua fra webhook-request
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    const ua = req.headers.get('user-agent') ?? undefined
    if (ip) user_data.client_ip_address = ip
    if (ua) user_data.client_user_agent = ua

    // 2) Bonus for EMQ i test: hash’et e-post hvis den finnes i payload
    const email = (order as any)?.contact_email as string | undefined
    if (email) {
      const norm = email.trim().toLowerCase()
      if (norm) {
        const hash = crypto
          .createHash('sha256')
          .update(norm, 'utf8')
          .digest('hex')
        user_data.em = [hash]
      }
    }
  }
  // --- SLUTT PÅ PATCH ---

  // 6) event
  const event_time = Math.floor(
    new Date(order.processed_at ?? order.created_at).getTime() / 1000
  )
  const webhookGid =
    order.admin_graphql_api_id
    ?? (order.id != null ? `gid://shopify/Order/${order.id}` : undefined)
  const eventId = webhookGid ? `shopify_order_${webhookGid}` : undefined

  const event: MetaEvent = {
    event_name: 'Purchase',
    event_time,
    action_source: 'website',
    user_data,
    custom_data,
    ...(eventId ? { event_id: eventId } : {})
  }

  if (attrib?.checkoutUrl) event.event_source_url = attrib.checkoutUrl

  // 7) payload
  const payload: MetaEventsRequest =
    TEST_EVENT_CODE ?
      { data: [event], test_event_code: TEST_EVENT_CODE }
    : { data: [event] }

  // 8) kall Graph
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    if (token) await redisDel(`checkout:${token}`)
    return NextResponse.json({ error: 'Missing CAPI config' }, { status: 500 })
  }

  // --- DEBUGGING: LOGG PAYLOAD ---
  console.log('--- CAPI PAYLOAD SENT ---', JSON.stringify(payload, null, 2))

  const res = await fetch(
    `https://graph.facebook.com/v24.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    }
  )

  const result = (await res.json()) as MetaEventsSuccess | MetaGraphError

  // 9) opprydding uansett
  if (token) await redisDel(`checkout:${token}`)

  if (!res.ok) {
    // --- DEBUGGING: LOGG FEILSVAR ---
    console.error(
      '--- META CAPI ERROR RESPONSE ---',
      JSON.stringify(result, null, 2)
    )
    return NextResponse.json(
      { error: 'Meta CAPI error', details: result },
      { status: 400 }
    )
  }

  return NextResponse.json({ ok: true, result })
}
