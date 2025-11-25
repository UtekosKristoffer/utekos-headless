import { NextResponse } from 'next/server'
import { verifyShopifyWebhook } from '@/lib/shopify/verifyWebhook'

// Vi importerer deler fra SDK direkte
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
    console.error('Webhook signature verification failed')
    return NextResponse.json(
      { error: 'Invalid webhook signature' },
      { status: 401 }
    )
  }

  let order: any
  try {
    order = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  console.log(`[Meta CAPI] Processing Order: ${order.id || 'Unknown ID'}`)

  // --- 1. User Data Construction ---
  const userData = new UserData()

  // A. E-POST (Kritisk parameter)
  // Sjekk både rot-nivå og kunde-objekt
  const email =
    safeString(order.email)
    || safeString(order.contact_email)
    || safeString(order.customer?.email)
  if (email) {
    // SDK hasher automatisk når du bruker setEmails
    userData.setEmails([email.toLowerCase()])
  } else {
    console.warn('[Meta CAPI] ADVARSEL: Ingen e-post funnet i ordre!')
  }

  // B. TELEFON
  const phone = normalizePhone(
    order.phone
      || order.customer?.phone
      || order.shipping_address?.phone
      || order.billing_address?.phone
  )
  if (phone) {
    userData.setPhones([phone])
  }

  // C. EXTERNAL ID (Viktig for matching)
  const externalId = safeString(order.customer?.id) || safeString(order.user_id)
  if (externalId) {
    userData.setExternalIds([externalId])
  }

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

  // E. TEKNISK DATA
  const clientIp = safeString(order.browser_ip || order.client_ip)
  if (clientIp) userData.setClientIpAddress(clientIp)

  const userAgent = safeString(
    order.user_agent || order.client_details?.user_agent
  )
  if (userAgent) userData.setClientUserAgent(userAgent)

  // F. FBP / FBC (Cookies)
  if (order.note_attributes && Array.isArray(order.note_attributes)) {
    const fbpAttr = order.note_attributes.find((a: any) => a.name === '_fbp')
    const fbcAttr = order.note_attributes.find((a: any) => a.name === '_fbc')

    if (fbpAttr && fbpAttr.value) userData.setFbp(fbpAttr.value)
    if (fbcAttr && fbcAttr.value) userData.setFbc(fbcAttr.value)
  }

  // DEBUG: Se hva vi faktisk har funnet før vi sender
  // console.log('[Meta CAPI] Generated UserData:', JSON.stringify(userData, null, 2))

  // --- 2. Custom Data & Contents ---
  const contentList: (typeof Content)[] = []

  if (order.line_items && Array.isArray(order.line_items)) {
    for (const item of order.line_items) {
      // Prioriter variant_id, fallback til product_id
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

  // Ordre ID for deduplisering hvis samme purchase sendes flere ganger
  if (order.id) {
    customData.setOrderId(safeString(order.id))
  }

  // --- 3. Event Setup ---
  // Event ID for deduplisering mot Pixel (browser)
  const eventId =
    order.id ? `shopify_order_${order.id}` : `purchase_${Date.now()}`

  const event = new ServerEvent()
    .setEventName('Purchase')
    .setEventTime(Math.floor(Date.now() / 1000))
    .setActionSource('website') // PÅKREVD: 'website'
    .setEventId(eventId)
    .setUserData(userData)
    .setCustomData(customData)
    .setEventSourceUrl(
      safeString(order.order_status_url) || 'https://utekos.no'
    )

  try {
    const eventRequest = new EventRequest(ACCESS_TOKEN, PIXEL_ID).setEvents([
      event
    ])

    if (process.env.META_TEST_EVENT_CODE) {
      eventRequest.setTestEventCode(process.env.META_TEST_EVENT_CODE)
      console.log(
        `[CAPI] Sending with Test Code: ${process.env.META_TEST_EVENT_CODE}`
      )
    }

    const response = await eventRequest.execute()

    console.log('[Meta CAPI] Success:', response)

    return NextResponse.json({
      success: true,
      events_received: response.events_received,
      fbtrace_id: response.fbtrace_id
    })
  } catch (err: any) {
    // Detaljert feilhåndtering
    const errorResponse = err.response?.data || {}
    console.error('[Meta CAPI] Failed:', JSON.stringify(errorResponse, null, 2))

    return NextResponse.json(
      {
        error: 'Meta CAPI request failed',
        details: errorResponse.error || err.message
      },
      { status: 400 }
    )
  }
}
