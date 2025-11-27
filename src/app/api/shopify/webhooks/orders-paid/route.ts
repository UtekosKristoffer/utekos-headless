// Path: src/app/api/shopify/webhooks/order-paid/route.ts

import { NextResponse } from 'next/server'
import { verifyShopifyWebhook } from '@/lib/shopify/verifyWebhook'
import { redisGet } from '@/lib/redis'

const bizSdk = require('facebook-nodejs-business-sdk')
const {
  ServerEvent,
  EventRequest,
  UserData,
  CustomData,
  Content,
  FacebookAdsApi
} = bizSdk

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN

if (!PIXEL_ID) throw new Error('Missing NEXT_PUBLIC_META_PIXEL_ID')
if (!ACCESS_TOKEN) throw new Error('Missing META_ACCESS_TOKEN')

FacebookAdsApi.init(ACCESS_TOKEN)

interface UserDataStored {
  fbp?: string
  fbc?: string
  external_id?: string
  client_user_agent?: string
  client_ip_address?: string
}

interface CheckoutAttribution {
  cartId: string | null
  checkoutUrl: string
  userData: UserDataStored
  ts: number
  eventId?: string
}

function safeString(val: any): string | undefined {
  if (!val) return undefined
  const s = String(val).trim()
  return s.length > 0 ? s : undefined
}

function normalizePhone(phone: string | undefined): string | undefined {
  if (!phone) return undefined
  return phone.replace(/[^0-9]/g, '')
}

export async function POST(request: Request) {
  const hmac = request.headers.get('x-shopify-hmac-sha256') ?? ''
  const rawBody = await request.text()

  const ok = verifyShopifyWebhook(rawBody, hmac)
  if (!ok) {
    console.error('[Meta CAPI] Webhook signature verification failed')
    return NextResponse.json(
      { error: 'Invalid webhook signature' },
      { status: 401 }
    )
  }

  let order: any
  try {
    order = JSON.parse(rawBody)
  } catch {
    console.error('[Meta CAPI] Failed to parse JSON body')
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  console.log(`[Meta CAPI] Processing Order: ${order.id || 'Unknown ID'}`)

  let redisData: CheckoutAttribution | null = null
  const cartToken = safeString(order.cart_token)
  const checkoutToken = safeString(order.checkout_token)

  // Sjekker både checkout_token og cart_token i Redis for å maksimere treffsikkerhet
  const possibleKeys = [
    checkoutToken ? `checkout:${checkoutToken}` : null,
    cartToken ? `checkout:${cartToken}` : null
  ].filter(Boolean) as string[]

  for (const key of possibleKeys) {
    try {
      const data = (await redisGet(key)) as CheckoutAttribution | null
      if (data) {
        redisData = data
        console.log(`[Meta CAPI] Attribution found in Redis for key: ${key}`)
        break
      }
    } catch (e) {
      console.error(`[Meta CAPI] Redis read error for key ${key}:`, e)
    }
  }

  const userData = new UserData()

  // 1. Email
  const email =
    safeString(order.email)
    || safeString(order.contact_email)
    || safeString(order.customer?.email)

  if (email) {
    userData.setEmails([email.toLowerCase()])
  } else {
    console.warn('[Meta CAPI] WARNING: No email found in order object')
  }

  // 2. Phone
  const phone = normalizePhone(
    order.phone
      || order.customer?.phone
      || order.shipping_address?.phone
      || order.billing_address?.phone
  )
  if (phone) {
    userData.setPhones([phone])
  }

  // 3. External ID
  const externalId =
    redisData?.userData?.external_id
    || safeString(order.customer?.id)
    || safeString(order.user_id)

  if (externalId) {
    userData.setExternalIds([externalId])
  }

  // 4. Address Information
  const addr =
    order.shipping_address
    || order.billing_address
    || order.customer?.default_address
    || {}

  if (addr.first_name || order.customer?.first_name) {
    userData.setFirstNames([
      safeString(addr.first_name || order.customer?.first_name)
    ])
  }
  if (addr.last_name || order.customer?.last_name) {
    userData.setLastNames([
      safeString(addr.last_name || order.customer?.last_name)
    ])
  }
  if (addr.city) {
    const city = safeString(addr.city)
    if (city) userData.setCities([city.toLowerCase()])
  }
  if (addr.province_code) {
    const provinceCode = safeString(addr.province_code)
    if (provinceCode) userData.setStates([provinceCode.toLowerCase()])
  }
  if (addr.zip) userData.setZips([safeString(addr.zip)])
  if (addr.country_code) {
    const countryCode = safeString(addr.country_code)
    if (countryCode) userData.setCountries([countryCode.toLowerCase()])
  }

  // 5. Technical identifiers (IP / User Agent)
  const clientIp =
    redisData?.userData?.client_ip_address
    || safeString(order.browser_ip || order.client_ip)

  if (clientIp) userData.setClientIpAddress(clientIp)

  const userAgent =
    redisData?.userData?.client_user_agent
    || safeString(order.user_agent || order.client_details?.user_agent)

  if (userAgent) userData.setClientUserAgent(userAgent)

  // 6. Click Identifiers (fbp / fbc)
  let fbp = redisData?.userData?.fbp
  let fbc = redisData?.userData?.fbc

  // Fallback: Sjekk note_attributes fra Shopify hvis Redis manglet
  if (order.note_attributes && Array.isArray(order.note_attributes)) {
    const fbpAttr = order.note_attributes.find((a: any) => a.name === '_fbp')
    const fbcAttr = order.note_attributes.find((a: any) => a.name === '_fbc')

    if (!fbp && fbpAttr && fbpAttr.value) fbp = fbpAttr.value
    if (!fbc && fbcAttr && fbcAttr.value) fbc = fbcAttr.value
  }

  if (fbp) userData.setFbp(fbp)
  if (fbc) userData.setFbc(fbc)

  // Innhold (Produkter)
  const contentList: (typeof Content)[] = []

  if (order.line_items && Array.isArray(order.line_items)) {
    for (const item of order.line_items) {
      const id = safeString(item.variant_id) || safeString(item.product_id)
      if (!id) continue

      const content = new Content()
        .setId(id)
        .setQuantity(Number(item.quantity || 0))
        .setItemPrice(Number(item.price || 0))
        .setTitle(safeString(item.title) || '')

      contentList.push(content)
    }
  }

  const customData = new CustomData()
    .setCurrency(safeString(order.currency) || 'NOK')
    .setValue(Number(order.total_price || 0))
    .setContents(contentList)
    .setContentType('product')

  if (order.id) {
    customData.setOrderId(safeString(order.id))
  }

  const eventId =
    order.id ?
      `shopify_order_${order.id}`
    : redisData?.eventId || `purchase_${Date.now()}`

  const event = new ServerEvent()
    .setEventName('Purchase')
    .setEventTime(Math.floor(Date.now() / 1000))
    .setActionSource('website')
    .setEventId(eventId)
    .setUserData(userData)
    .setCustomData(customData)
    .setEventSourceUrl(
      safeString(order.order_status_url)
        || redisData?.checkoutUrl
        || 'https://utekos.no'
    )

  try {
    const eventRequest = new EventRequest(ACCESS_TOKEN, PIXEL_ID).setEvents([
      event
    ])

    // MERK: Ingen test-event-kode settes her. Dette går live.

    const response = await eventRequest.execute()

    console.log(
      `[Meta CAPI] Success. Trace ID: ${response.fbtrace_id}, Events Received: ${response.events_received}`
    )

    return NextResponse.json({
      success: true,
      events_received: response.events_received,
      fbtrace_id: response.fbtrace_id
    })
  } catch (err: any) {
    const errorResponse = err.response?.data || {}
    console.error(
      '[Meta CAPI] Request Failed:',
      JSON.stringify(errorResponse, null, 2)
    )

    return NextResponse.json(
      {
        error: 'Meta CAPI request failed',
        details: errorResponse.error || err.message
      },
      { status: 200 }
    )
  }
}
