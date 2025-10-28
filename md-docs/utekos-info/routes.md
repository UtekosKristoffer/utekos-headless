# META KODE FOR SHOPIFY + NEXT.JS

## app/api/checkout/capture-identifiers/route.ts

```ts
// app/api/checkout/capture-identifiers/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { redisSet } from '@/lib/redis' // se helper under hvis du ikke allerede har denne
import type { CheckoutAttribution, Body } from '@types'
export const runtime = 'nodejs'

// Hjelper: trekk ut Shopify checkout-token fra checkoutUrl
function parseCheckoutToken(checkoutUrl: string): string | undefined {
  try {
    const url = new URL(checkoutUrl)
    const parts = url.pathname.split('/').filter(Boolean)
    const i = parts.findIndex(p => p === 'checkouts')
    if (i >= 0 && parts[i + 1]) return parts[i + 1]
    return url.searchParams.get('token') ?? undefined
  } catch {
    return undefined
  }
}

export async function POST(req: NextRequest) {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const token = parseCheckoutToken(body.checkoutUrl)
  if (!token)
    return NextResponse.json(
      { error: 'Missing checkout token' },
      { status: 400 }
    )

  const proxiedIp = req.headers.get('x-forwarded-for')?.split(',')?.[0]?.trim()

  const userData: CheckoutAttribution['userData'] = {}
  if (body.userData.fbp) userData.fbp = body.userData.fbp
  if (body.userData.fbc) userData.fbc = body.userData.fbc
  if (body.userData.client_user_agent)
    userData.client_user_agent = body.userData.client_user_agent
  const ipToUse = body.userData.client_ip_address ?? proxiedIp
  if (ipToUse) userData.client_ip_address = ipToUse
  if (body.userData.external_id)
    userData.external_id = body.userData.external_id

  let payload: CheckoutAttribution = {
    cartId: body.cartId,
    checkoutUrl: body.checkoutUrl,
    userData,
    ts: Date.now()
  }
  if (body.eventId) {
    payload = { ...payload, eventId: body.eventId }
  }

  await redisSet(`checkout:${token}`, payload, 60 * 60 * 24 * 7) // 7d TTL
  return NextResponse.json({ ok: true })
}
```

## app/api/meta-events/route.ts

```ts
// Path: app/api/meta-events/route.ts
import { NextRequest, NextResponse } from 'next/server'

type ContentItem = { id: string; quantity: number; item_price?: number }
type CustomData = {
  value?: number
  currency?: string
  content_type?: 'product' | 'product_group'
  content_ids?: string[]
  contents?: ContentItem[]
  num_items?: number
  order_id?: string
}
type UserData = {
  em?: string[]
  ph?: string[]
  fn?: string[]
  ln?: string[]
  ge?: string[]
  db?: string[]
  ct?: string[]
  st?: string[]
  zp?: string[]
  country?: string[]
  client_ip_address?: string | undefined
  client_user_agent?: string | undefined
  fbc?: string | undefined
  fbp?: string | undefined
  external_id?: string | undefined
}
type Body = {
  eventName:
    | 'ViewContent'
    | 'AddToCart'
    | 'InitiateCheckout'
    | 'Purchase'
    | string
  eventData?: CustomData
  userData?: UserData
  eventId?: string
  eventSourceUrl?: string
  testEventCode?: string
  eventTime?: number
}

export async function POST(req: NextRequest) {
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json(
      { error: 'Missing Meta Pixel configuration' },
      { status: 500 }
    )
  }

  const ua = req.headers.get('user-agent') ?? ''
  // Prefer forwarded-for (may be a CSV); fall back to req.ip
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? (req as any).ip
    ?? ''
  const cookies = req.headers.get('cookie') ?? ''
  const fbp = /(?:^|;)\s*_fbp=([^;]+)/.exec(cookies)?.[1]
  const fbc = /(?:^|;)\s*_fbc=([^;]+)/.exec(cookies)?.[1]

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Basic guardrails: only allow known standard events unless you intend custom.
  const event_name = body.eventName
  const event_time =
    Number.isFinite(body.eventTime) ?
      body.eventTime!
    : Math.floor(Date.now() / 1000)

  // Build user_data per CAPI spec (ensure required keys for website events)
  const user_data: UserData = {
    ...(ip || body.userData?.client_ip_address ?
      { client_ip_address: ip || body.userData?.client_ip_address }
    : {}),
    ...(ua || body.userData?.client_user_agent ?
      { client_user_agent: ua || body.userData?.client_user_agent }
    : {}),
    ...((body.userData?.fbp ?? fbp) ? { fbp: body.userData?.fbp ?? fbp } : {}),
    ...((body.userData?.fbc ?? fbc) ? { fbc: body.userData?.fbc ?? fbc } : {}),
    ...(body.userData?.external_id ?
      { external_id: body.userData.external_id }
    : {}),
    ...(body.userData?.em ? { em: body.userData.em } : {}),
    ...(body.userData?.ph ? { ph: body.userData.ph } : {}),
    ...(body.userData?.fn ? { fn: body.userData.fn } : {}),
    ...(body.userData?.ln ? { ln: body.userData.ln } : {}),
    ...(body.userData?.ge ? { ge: body.userData.ge } : {}),
    ...(body.userData?.db ? { db: body.userData.db } : {}),
    ...(body.userData?.ct ? { ct: body.userData.ct } : {}),
    ...(body.userData?.st ? { st: body.userData.st } : {}),
    ...(body.userData?.zp ? { zp: body.userData.zp } : {}),
    ...(body.userData?.country ? { country: body.userData.country } : {})
  }

  const payload = {
    data: [
      {
        event_name,
        event_time,
        event_id: body.eventId,
        action_source: 'website',
        event_source_url: body.eventSourceUrl,
        user_data,
        custom_data: body.eventData,
        ...(body.testEventCode ? { test_event_code: body.testEventCode } : {})
      }
    ]
  } as const

  const res = await fetch(
    `https://graph.facebook.com/v24.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    }
  )

  const json = await res.json()
  if (!res.ok) {
    // Bubble up Graph errors for debugging (remove sensitive data if logging)
    return NextResponse.json(
      { error: 'Meta CAPI error', details: json },
      { status: 400 }
    )
  }
  return NextResponse.json({ ok: true, result: json })
}
```

## src/app/api/shopify/webhooks/orders-paid/route.ts

```ts
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

export const runtime = 'nodejs'

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
```

## src/app/api/shopify/webhooks/orders-paid/route.ts

```ts
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

export const runtime = 'nodejs'

/* ----------------------------- Helper Functions ----------------------------- */

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
  // 1) HMAC validation on raw body
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

  // 4) Build custom_data (Enriched)
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

  // Enrichment: Add shipping, tax, coupon, num_items
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

  // 5) Build user_data (Enriched for max EMQ)
  const user_data: MetaUserData = {}

  // From Redis (set on client)
  if (attrib?.userData.fbp) user_data.fbp = attrib.userData.fbp
  if (attrib?.userData.fbc) user_data.fbc = attrib.userData.fbc
  if (attrib?.userData.client_user_agent)
    user_data.client_user_agent = attrib.userData.client_user_agent
  if (attrib?.userData.client_ip_address)
    user_data.client_ip_address = attrib.userData.client_ip_address

  // From Order Payload
  const phone = order.phone ?? order.customer?.phone
  const normalizedPhone = normalizePhone(phone)
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

  // Enrichment: From Customer object
  const c = order.customer
  if (c) {
    const firstName = normalizeAndHash(c.first_name)
    if (firstName !== undefined) user_data.fn = [firstName]

    const lastName = normalizeAndHash(c.last_name)
    if (lastName !== undefined) user_data.ln = [lastName]

    const addr = c.default_address
    if (addr) {
      const city = normalizeAndHash(addr.city)
      if (city !== undefined) user_data.ct = [city]

      const state = normalizeAndHash(addr.province_code)
      if (state !== undefined) user_data.st = [state]

      const zip = normalizeAndHash(addr.zip)
      if (zip !== undefined) user_data.zp = [zip]

      const country = normalizeAndHash(addr.country_code)
      if (country !== undefined) user_data.country = [country]
    }
  }

  // PATCH FOR "SEND TEST" - Add contact_email if no identifiers present
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
    if (!user_data.em) {
      const contact_email = (order as any)?.contact_email as string | undefined
      const normalizedContactEmail = normalizeAndHash(contact_email)
      if (normalizedContactEmail !== undefined) {
        user_data.em = [normalizedContactEmail]
      }
    }
  }

  // 6) Build event
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

  // 7) Build payload
  const payload: MetaEventsRequest =
    TEST_EVENT_CODE ?
      { data: [event], test_event_code: TEST_EVENT_CODE }
    : { data: [event] }

  // 8) Call Meta Graph API
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    if (token) await redisDel(`checkout:${token}`)
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

  // 9) Cleanup Redis regardless of outcome
  if (token) await redisDel(`checkout:${token}`)

  if (!res.ok) {
    console.error(
      '--- META CAPI ERROR RESPONSE ---',
      JSON.stringify(result, null, 2)
    )
    return NextResponse.json(
      { error: 'Meta CAPI error', details: result },
      { status: 400 }
    )
  }

  console.log(
    '--- META CAPI SUCCESS RESPONSE ---',
    JSON.stringify(result, null, 2)
  )
  return NextResponse.json({ ok: true, result })
}
```

## Browser-side Purchase Event for Dedupe with CAPI

```ts
// Shopify Customer Event | Browser Purchase for dedupe with CAPI (Shopify Customer Events)
analytics.subscribe('checkout_completed', event => {
  try {
    const checkout = event?.data?.checkout
    const order = checkout?.order

    // 1) Samme event_id som server: prioriter GID
    const rawId = order?.admin_graphql_api_id || order?.id || null
    if (!rawId) return // uten ID → ikke skyt
    const eventId = `shopify_order_${rawId}`

    // 2) Minimumsparametre (samme datamodell som CAPI)
    const currency =
      checkout?.currencyCode || checkout?.presentmentCurrency || order?.currency

    const totalStr =
      checkout?.totalPrice?.amount
      ?? checkout?.total_price
      ?? order?.total_price

    const value = totalStr != null ? parseFloat(String(totalStr)) : 0

    const lines = checkout?.lineItems ?? event?.data?.line_items ?? []
    const contents = []
    const contentIds = []

    for (const li of lines) {
      const id = li?.variant?.id ?? li?.variant_id ?? li?.product_id
      if (!id) continue
      const item = { id: String(id) }
      const qty = li?.quantity ?? li?.current_quantity
      const price = li?.price?.amount ?? li?.price
      if (qty != null) item.quantity = Number(qty)
      if (price != null) item.item_price = Number(price)
      contents.push(item)
      contentIds.push(String(id))
    }

    if (typeof fbq === 'function') {
      const customData = {
        value,
        currency,
        content_type: 'product',
        ...(contents.length ? { contents, content_ids: contentIds } : {})
      }
      fbq('track', 'Purchase', customData, { eventID: eventId })
    } else {
      const params = new URLSearchParams()
      params.set('id', '1092362672918571') // PIXEL_ID
      params.set('ev', 'Purchase')
      params.set('eid', eventId)
      params.set('noscript', '1')
      params.set('cd[value]', String(value))
      if (currency) params.set('cd[currency]', currency)
      if (contents.length) {
        params.set('cd[contents]', JSON.stringify(contents))
        params.set('cd[content_type]', 'product')
        params.set('cd[content_ids]', JSON.stringify(contentIds))
      }
      const img = new Image()
      img.src = 'https://www.facebook.com/tr?' + params.toString()
    }
  } catch {}
})
```
