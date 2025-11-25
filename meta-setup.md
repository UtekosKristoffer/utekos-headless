# META LOGIC OVERVIEW

## Meta CAPI Purchase Event Setup

```tsx
// Path: src/app/api/meta/capi/purchase/route.ts

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

function getCheckoutKey(order: OrderPaid): string | undefined {
  const urlString = (order as any)?.order_status_url
  if (typeof urlString === 'string') {
    try {
      const url = new URL(urlString)
      const key = url.searchParams.get('key')
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

  const token = getCheckoutKey(order)
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
      if (country !== undefined) user_data.country = [country]
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
```

## META EVENTS ROUTE SETUP

```tsx
// Path: src/app/api/meta-events/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { redisPush, redisTrim } from '@/lib/redis'
import crypto from 'crypto'

type ContentItem = { id: string; quantity: number; item_price?: number }
type CustomData = {
  value?: number
  currency?: string
  content_type?: 'product' | 'product_group'
  content_ids?: string[]
  contents?: ContentItem[]
  num_items?: number
  order_id?: string
  search_string?: string
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
  client_ip_address?: string | null
  client_user_agent?: string | null
  fbc?: string | null
  fbp?: string | null
  external_id?: string | undefined
}
type Body = {
  eventName: string
  eventData?: CustomData
  userData?: UserData
  eventId?: string
  eventSourceUrl?: string
  eventTime?: number
  action_source?: string
}

export async function POST(req: NextRequest) {
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('Meta CAPI environment variables not set')
    return NextResponse.json(
      { error: 'Missing Meta Pixel configuration' },
      { status: 500 }
    )
  }

  const userAgent = req.headers.get('user-agent')
  const xForwardedFor = req.headers.get('x-forwarded-for')
  const ip =
    xForwardedFor ? (xForwardedFor.split(',')[0]?.trim() ?? null) : null

  const cookieFbp = req.cookies.get('_fbp')?.value
  const cookieFbc = req.cookies.get('_fbc')?.value
  const cookieExtId = req.cookies.get('ute_ext_id')?.value

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!body.eventName || !body.eventId || !body.eventSourceUrl) {
    return NextResponse.json(
      {
        error:
          'Missing required event fields: eventName, eventId, eventSourceUrl'
      },
      { status: 400 }
    )
  }

  const event_name = body.eventName
  const event_time = body.eventTime ?? Math.floor(Date.now() / 1000)

  const user_data: UserData = {
    client_ip_address: ip,
    client_user_agent: userAgent,
    fbp: body.userData?.fbp || cookieFbp || null,
    fbc: body.userData?.fbc || cookieFbc || null,
    external_id: body.userData?.external_id || cookieExtId || undefined,

    ...(body.userData?.em && { em: body.userData.em }),
    ...(body.userData?.ph && { ph: body.userData.ph }),
    ...(body.userData?.fn && { fn: body.userData.fn }),
    ...(body.userData?.ln && { ln: body.userData.ln }),
    ...(body.userData?.ge && { ge: body.userData.ge }),
    ...(body.userData?.db && { db: body.userData.db }),
    ...(body.userData?.ct && { ct: body.userData.ct }),
    ...(body.userData?.st && { st: body.userData.st }),
    ...(body.userData?.zp && { zp: body.userData.zp }),
    ...(body.userData?.country && { country: body.userData.country })
  }

  const payload: Record<string, any> = {
    data: [
      {
        event_name: event_name,
        event_time: event_time,
        event_id: body.eventId,
        action_source: 'website',
        event_source_url: body.eventSourceUrl,
        user_data: user_data,
        custom_data: body.eventData ?? {}
      }
    ]
    // test_event_code: 'TEST63736'
  }

  // --- LOGGING TIL REDIS START ---
  try {
    const logEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      level: 'INFO',
      event: `CAPI: ${event_name}`,
      identity: {
        ip,
        fbp: user_data.fbp,
        fbc: user_data.fbc,
        externalId: user_data.external_id,
        userAgent
      },
      context: {
        path: body.eventSourceUrl,
        eventId: body.eventId
      },
      data: body.eventData
    }

    await redisPush('app_logs', logEntry)

    redisTrim('app_logs', 0, 999).catch(() => {})
  } catch (e) {
    console.error('Logging setup failed', e)
  }
  // --- LOGGING TIL REDIS SLUTT ---

  try {
    const metaApiUrl = `https://graph.facebook.com/v24.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`

    if (process.env.NODE_ENV === 'development') {
      console.log(`--- SENDING TO CAPI (${event_name}) ---`)
      console.log(JSON.stringify(payload, null, 2))
    }

    const res = await fetch(metaApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const json = await res.json()

    if (!res.ok) {
      console.error(
        `Meta CAPI request failed for ${event_name} (${body.eventId}): Status ${res.status}`,
        json
      )
      return NextResponse.json(
        { error: 'Failed to send event to Meta CAPI', details: json },
        { status: res.status }
      )
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`Meta CAPI Success for ${event_name}:`, JSON.stringify(json))
    }

    return NextResponse.json({ success: true, metaResponse: json })
  } catch (fetchError) {
    console.error(
      `Meta CAPI fetch error for ${event_name} (${body.eventId}):`,
      fetchError
    )
    return NextResponse.json(
      {
        error: 'Failed to connect to Meta CAPI',
        details: (fetchError as Error).message ?? 'Unknown fetch error'
      },
      { status: 503 }
    )
  }
}
```

## META WEBHOOK SHOPIFY ORDERS-PAID SETUP

```tsx
// Path: src/app/api/shopify/webhooks/orders-paid/route.ts

import { NextResponse } from 'next/server'
import { verifyShopifyWebhook } from '@/lib/shopify/verifyWebhook'

const bizSdk = require('facebook-nodejs-business-sdk')
const { ServerEvent, EventRequest, UserData, CustomData, FacebookAdsApi } =
  bizSdk

const PIXEL_ID = process.env.META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN

if (!PIXEL_ID) throw new Error('Missing META_PIXEL_ID')
if (!ACCESS_TOKEN) throw new Error('Missing META_SYSTEM_USER_TOKEN')

FacebookAdsApi.init(ACCESS_TOKEN)

interface ShopifyLineItem {
  variant_id?: number | string
  quantity?: number
  price?: string | number
}

interface ShopifyCustomer {
  id?: number | string
  email?: string
  phone?: string
}

interface ShopifyOrderPaidWebhook {
  id?: number | string
  currency?: string
  total_price?: string | number
  line_items?: ShopifyLineItem[]
  customer?: ShopifyCustomer
  client_ip?: string
  user_agent?: string
  confirmation_url?: string
  cookies?: {
    _fbp?: string
    _fbc?: string
  }
}

function safeString(value: string | number | undefined): string {
  return value !== undefined ? String(value) : ''
}

function safeNumber(value: string | number | undefined): number {
  return value !== undefined ? Number(value) : 0
}

export async function POST(request: Request) {
  const hmac = request.headers.get('x-shopify-hmac-sha256') ?? ''
  const rawBody = await request.text()

  const ok = verifyShopifyWebhook(rawBody, hmac)
  if (!ok) {
    return NextResponse.json(
      { error: 'Invalid webhook signature' },
      { status: 401 }
    )
  }

  let order: ShopifyOrderPaidWebhook
  try {
    order = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const userData = new UserData()

  if (order.customer?.email) {
    userData.setEmails([order.customer.email])
  }
  if (order.customer?.phone) {
    userData.setPhones([order.customer.phone])
  }
  if (order.customer?.id !== undefined) {
    userData.setExternalIds([String(order.customer.id)])
  }

  if (order.cookies?._fbp) userData.setFbp(order.cookies._fbp)
  if (order.cookies?._fbc) userData.setFbc(order.cookies._fbc)

  if (order.client_ip) userData.setClientIpAddress(order.client_ip)
  if (order.user_agent) userData.setClientUserAgent(order.user_agent)

  const contents =
    order.line_items
      ?.map(item => {
        const id = safeString(item.variant_id)
        if (!id) return null
        return {
          id,
          quantity: safeNumber(item.quantity),
          item_price: safeNumber(item.price)
        }
      })
      .filter(Boolean) ?? []

  const customData = new CustomData()
    .setCurrency(order.currency ?? 'NOK')
    .setValue(safeNumber(order.total_price))
    .setContents(contents)
    .setOrderId(safeString(order.id))
  const event = new ServerEvent()
    .setEventName('Purchase')
    .setEventTime(Math.floor(Date.now() / 1000))
    .setUserData(userData)
    .setCustomData(customData)

  if (order.confirmation_url) {
    event.setEventSourceUrl(order.confirmation_url)
  }

  try {
    const eventRequest = new EventRequest(ACCESS_TOKEN, PIXEL_ID).setEvents([
      event
    ])
    const response = await eventRequest.execute()

    return NextResponse.json({
      success: true,
      capi_response: response
    })
  } catch (err: any) {
    console.error('CAPI Purchase error FULL DETAILS:', {
      message: err?.message,
      status: err?.status,
      method: err?.method,
      url: err?.url,
      fb_error: err?.response?.data?.error ?? null
    })

    return NextResponse.json(
      {
        error: 'Meta CAPI purchase failed',
        fb_error: err?.response?.data?.error ?? null
      },
      { status: 500 }
    )
  }
}
```

## INSIGHTS

```tsx
// Path: src/app/api/insights/route.ts
import { NextResponse } from 'next/server'
import { getAdAccount } from '@/lib/meta/metaClient'

export async function GET() {
  try {
    const account = getAdAccount()
    const fields = [
      'date_start',
      'date_stop',
      'campaign_id',
      'campaign_name',
      'impressions',
      'spend',
      'clicks',
      'purchase_roas'
    ]
    const params = {
      level: 'campaign',
      date_preset: 'last_7d',
      time_increment: 1
    }
    const insights = await account.getInsights(fields, params)
    return NextResponse.json({ data: insights })
  } catch (err) {
    console.error('Meta Insights error', err)
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
```

## CAPTURE IDENTIFIERS FOR CAPI

```tsx
// Path: src/app/api/checkout/capture-identifiers/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { redisSet } from '@/lib/redis'
import type { CheckoutAttribution, UserData } from '@types'

interface CaptureBody {
  cartId?: string | null
  checkoutUrl: string
  eventId?: string
  userData: UserData
}

function getStorageKey(body: CaptureBody): string | undefined {
  if (body.cartId) {
    const match = body.cartId.match(/Cart\/([a-zA-Z0-9]+)/)
    if (match && match[1]) {
      return match[1]
    }
  }

  if (!body.checkoutUrl) return undefined

  try {
    const url = new URL(body.checkoutUrl)

    const keyToken = url.searchParams.get('key')
    if (keyToken && /^[a-f0-9]{32}$/i.test(keyToken)) {
      return keyToken
    }

    const parts = url.pathname.split('/').filter(Boolean)
    const checkoutIndex = parts.findIndex(p => p === 'checkouts')
    if (checkoutIndex !== -1) {
      const potentialToken = parts[checkoutIndex + 1]
      if (potentialToken && /^[a-f0-9]{32}$/i.test(potentialToken)) {
        return potentialToken
      }
    }

    const paramToken = url.searchParams.get('token')
    if (paramToken) {
      return paramToken
    }
  } catch (e) {
    console.error('Error parsing checkout URL:', e)
  }

  return undefined
}

export async function POST(req: NextRequest) {
  let body: CaptureBody
  try {
    body = (await req.json()) as CaptureBody
  } catch {
    console.error('Invalid JSON received in /capture-identifiers')
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const token = getStorageKey(body)
  if (!token) {
    console.error('Could not parse token from body (cartId or checkoutUrl)')
    return NextResponse.json({ error: 'Missing valid token' }, { status: 400 })
  }

  const proxiedIp = req.headers.get('x-forwarded-for')?.split(',')?.[0]?.trim()
  const userAgent = req.headers.get('user-agent') || undefined

  const cookieFbp = req.cookies.get('_fbp')?.value
  const cookieFbc = req.cookies.get('_fbc')?.value
  const cookieExtId = req.cookies.get('ute_ext_id')?.value

  const userDataToSave: UserData = {}

  if (body.userData?.fbp) userDataToSave.fbp = body.userData.fbp
  else if (cookieFbp) userDataToSave.fbp = cookieFbp

  if (body.userData?.fbc) userDataToSave.fbc = body.userData.fbc
  else if (cookieFbc) userDataToSave.fbc = cookieFbc

  if (body.userData?.external_id)
    userDataToSave.external_id = body.userData.external_id
  else if (cookieExtId) userDataToSave.external_id = cookieExtId

  if (body.userData?.client_user_agent)
    userDataToSave.client_user_agent = body.userData.client_user_agent
  else if (userAgent) userDataToSave.client_user_agent = userAgent

  const ipToUse = body.userData?.client_ip_address ?? proxiedIp
  if (ipToUse) userDataToSave.client_ip_address = ipToUse

  const payload: CheckoutAttribution = {
    cartId: body.cartId ?? null,
    checkoutUrl: body.checkoutUrl,
    userData: userDataToSave,
    ts: Date.now(),
    ...(body.eventId && { eventId: body.eventId })
  }

  try {
    const redisKey = `checkout:${token}`
    await redisSet(redisKey, payload, 60 * 60 * 24 * 7)

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `Saved attribution for key ${token} (ExtID: ${userDataToSave.external_id})`
      )
    }

    return NextResponse.json({ ok: true })
  } catch (redisError) {
    console.error('Error saving data to Redis:', redisError)
    return NextResponse.json(
      { error: 'Failed to save checkout data' },
      { status: 500 }
    )
  }
}
```

## METAPIXELEVENTS

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { generateEventID } from './generateEventID'
import { getCookie } from './getCookie'
import { getPageViewParams } from './getPageViewParams'
import { sendPageViewToCAPI } from './sendPageViewToCAPI'
import { sendJSON } from '@/components/jsx/CheckoutButton/sendJSON'
import type { UserData } from '@types'

export function MetaPixelEvents() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pageViewTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const trackPageView = () => {
    if (pageViewTimeoutRef.current) clearTimeout(pageViewTimeoutRef.current)

    pageViewTimeoutRef.current = setTimeout(() => {
      requestAnimationFrame(() => {
        const externalId = getCookie('ute_ext_id')
        const fbc = getCookie('_fbc')
        const fbp = getCookie('_fbp')
        const eventId = generateEventID()
        const currentPathname = window.location.pathname
        const currentSearchParams = new URLSearchParams(window.location.search)
        const searchQuery = currentSearchParams.get('q')

        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
          const params = getPageViewParams(currentPathname, currentSearchParams)
          window.fbq('track', 'PageView', params, { eventID: eventId })

          if (searchQuery) {
            const searchEventId = generateEventID().replace('evt_', 'search_')
            window.fbq(
              'track',
              'Search',
              { search_string: searchQuery },
              { eventID: searchEventId }
            )

            if (process.env.NODE_ENV === 'production') {
              const searchCapiPayload = {
                eventName: 'Search',
                eventId: searchEventId,
                eventSourceUrl: window.location.href,
                eventData: `{ search_string: ${searchQuery} }`,
                userData: {
                  external_id: externalId,
                  fbc: fbc,
                  fbp: fbp
                } as UserData
              }
              sendJSON('/api/meta-events', searchCapiPayload)
            }
          }
        }

        if (process.env.NODE_ENV === 'production') {
          sendPageViewToCAPI(
            currentPathname,
            eventId,
            currentSearchParams,
            externalId,
            fbc,
            fbp
          )
        }
      })
      pageViewTimeoutRef.current = null
    }, 150)
  }

  useEffect(() => {
    trackPageView()
    return () => {
      if (pageViewTimeoutRef.current) clearTimeout(pageViewTimeoutRef.current)
    }
  }, [pathname, searchParams])

  useEffect(() => {
    if (!pathname.startsWith('/produkter/')) return

    const timeoutId = setTimeout(() => {
      const handle = pathname.split('/produkter/')[1]?.split('?')[0]
      if (!handle) return

      const externalId = getCookie('ute_ext_id')
      const fbc = getCookie('_fbc')
      const fbp = getCookie('_fbp')
      const eventId = generateEventID().replace('evt_', 'vc_')
      const priceElement = document.querySelector('[data-product-price]')
      const price =
        priceElement ?
          parseFloat(priceElement.getAttribute('data-product-price') || '0')
        : 0
      const currency =
        document
          .querySelector('[data-product-currency]')
          ?.getAttribute('data-product-currency') || 'NOK'

      const viewContentData = {
        content_ids: [handle],
        content_type: 'product',
        content_name: handle,
        value: price,
        currency: currency
      }

      if (typeof window.fbq === 'function') {
        window.fbq('track', 'ViewContent', viewContentData, {
          eventID: eventId
        })
      }

      if (process.env.NODE_ENV === 'production') {
        fetch('/api/meta-events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventName: 'ViewContent',
            eventData: viewContentData,
            eventId: eventId,
            eventSourceUrl: window.location.href,
            eventTime: Math.floor(Date.now() / 1000),
            userData: {
              external_id: externalId,
              fbc: fbc,
              fbp: fbp
            }
          })
        }).catch(err => console.error('ViewContent CAPI error:', err))
      }
    }, 200)
    return () => clearTimeout(timeoutId)
  }, [pathname])

  if (!pixelId) return null

  const metaPixelBaseCode = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    (function() {
      var COOKIE_NAME = 'ute_ext_id';
      var exId = null;
      try {
        var match = document.cookie.match(new RegExp('(?:^|; )' + COOKIE_NAME + '=([^;]*)'));
        exId = match ? decodeURIComponent(match[1]) : null;
        if (!exId) {
          exId = 'ute_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
          var d = new Date();
          d.setTime(d.getTime() + (730 * 24 * 60 * 60 * 1000));
          document.cookie = COOKIE_NAME + '=' + encodeURIComponent(exId) + '; expires=' + d.toUTCString() + '; path=/; SameSite=Lax';
        }
      } catch (e) {}

      fbq('init', '${pixelId}', { 
        external_id: exId 
      });
    })();
  `

  return (
    <Script
      id='meta-pixel-base-inline'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{ __html: metaPixelBaseCode }}
    />
  )
}
```

## CUSTOM PIXEL SHOPIFY ADMIN

```tsx
// Browser checkout_completed listener (NO Purchase sent to Meta)
// Used ONLY to extract eventID + order data for dedupe/logging
analytics.subscribe('checkout_completed', event => {
  try {
    const checkout = event?.data?.checkout
    const order = checkout?.order
    const rawId = order?.admin_graphql_api_id || order?.id || null
    if (!rawId) return

    const eventId = `shopify_order_${rawId}`

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

    // --- NO Pixel Purchase Fired ---
    // Instead, store data for diagnostics or potential server sync:
    window.__UTEKOS_PURCHASE_ECHO__ = {
      eventId,
      value,
      currency,
      contents,
      contentIds
    }

    console.log(
      'Purchase echo (browser, no Pixel fired):',
      window.__UTEKOS_PURCHASE_ECHO__
    )
  } catch {
    // swallow errors silently (Shopify recommendation)
  }
})
```
