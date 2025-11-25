import { NextResponse } from 'next/server'
import { verifyShopifyWebhook } from '@/lib/shopify/verifyWebhook'

const bizSdk = require('facebook-nodejs-business-sdk')
const {
  ServerEvent,
  EventRequest,
  UserData,
  CustomData,
  Content,
  FacebookAdsApi
} = bizSdk

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID // Merk: Bruker ofte public variabel i Next.js for ID
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN

if (!PIXEL_ID) throw new Error('Missing NEXT_PUBLIC_META_PIXEL_ID')
if (!ACCESS_TOKEN) throw new Error('Missing META_ACCESS_TOKEN')

FacebookAdsApi.init(ACCESS_TOKEN)

interface ShopifyLineItem {
  variant_id?: number | string
  product_id?: number | string
  quantity?: number
  price?: string | number
}

interface ShopifyCustomer {
  id?: number | string
  email?: string
  phone?: string
  first_name?: string
  last_name?: string
}

interface ShopifyAddress {
  city?: string
  province_code?: string
  zip?: string
  country_code?: string
}

interface ShopifyOrderPaidWebhook {
  id?: number | string
  currency?: string
  total_price?: string | number
  line_items?: ShopifyLineItem[]
  customer?: ShopifyCustomer
  billing_address?: ShopifyAddress
  shipping_address?: ShopifyAddress
  client_ip?: string
  browser_ip?: string // Shopify sender noen ganger dette feltet
  user_agent?: string
  order_status_url?: string
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

  // --- 1. User Data Setup ---
  const userData = new UserData()

  // Prioriter browser_ip hvis tilgjengelig, ellers client_ip
  const ip = order.browser_ip || order.client_ip
  if (ip) userData.setClientIpAddress(ip)
  if (order.user_agent) userData.setClientUserAgent(order.user_agent)

  if (order.customer?.email) {
    // SDK hasher automatisk når du bruker setEmails
    userData.setEmails([order.customer.email])
  }

  if (order.customer?.phone) {
    // Fjern tegn som ikke er tall før sending, selv om SDK gjør noe rensing
    const phone = order.customer.phone.replace(/[^0-9]/g, '')
    if (phone) userData.setPhones([phone])
  }

  if (order.customer?.id) {
    userData.setExternalIds([String(order.customer.id)])
  }

  if (order.customer?.first_name)
    userData.setFirstNames([order.customer.first_name])
  if (order.customer?.last_name)
    userData.setLastNames([order.customer.last_name])

  const address = order.shipping_address || order.billing_address
  if (address) {
    if (address.city) userData.setCities([address.city.toLowerCase()])
    if (address.province_code)
      userData.setStates([address.province_code.toLowerCase()])
    if (address.zip) userData.setZips([address.zip])
    if (address.country_code)
      userData.setCountries([address.country_code.toLowerCase()])
  }

  // Forsøk å hente fbp/fbc fra headers hvis Shopify forwarder dem (sjeldent),
  // eller hvis du har lagret dem i custom attributes på ordren (anbefalt praksis).
  // For nå antar vi at de ikke ligger direkte i webhook-roten, da Shopify ikke standard sender cookies her.

  // --- 2. Content / Custom Data Setup ---
  const contentList: (typeof Content)[] = []

  if (order.line_items) {
    for (const item of order.line_items) {
      const id = item.variant_id || item.product_id
      if (!id) continue

      const content = new Content()
        .setId(String(id))
        .setQuantity(safeNumber(item.quantity))
        .setItemPrice(safeNumber(item.price))

      contentList.push(content)
    }
  }

  const customData = new CustomData()
    .setCurrency(order.currency ?? 'NOK')
    .setValue(safeNumber(order.total_price))
    .setContents(contentList)
    .setContentType('product')

  if (order.id) {
    customData.setOrderId(String(order.id))
  }

  // --- 3. Event Construction ---
  // Viktig: action_source er påkrevd.
  // Viktig: event_id for deduplisering. Må matche det frontend sender.
  const eventId =
    order.id ? `shopify_order_${order.id}` : `purchase_${Date.now()}`

  const event = new ServerEvent()
    .setEventName('Purchase')
    .setEventTime(Math.floor(Date.now() / 1000))
    .setActionSource('website') // PÅKREVD felt som manglet
    .setEventId(eventId) // Kritisk for deduplisering
    .setUserData(userData)
    .setCustomData(customData)

  if (order.order_status_url) {
    event.setEventSourceUrl(order.order_status_url)
  } else {
    event.setEventSourceUrl('https://utekos.no')
  }

  // --- 4. Execution ---
  try {
    const eventRequest = new EventRequest(ACCESS_TOKEN, PIXEL_ID).setEvents([
      event
    ])

    // execute() returnerer et promise med responsen
    const response = await eventRequest.execute()

    return NextResponse.json({
      success: true,
      id: response.events_received,
      fb_trace_id: response.fbtrace_id
    })
  } catch (err: any) {
    // Hent ut mest mulig detaljert feilmelding fra SDK/Axios objektet
    const errorBody = err.response?.data || err.response || err.message

    console.error(
      'Meta CAPI SDK Error:',
      JSON.stringify(
        {
          message: err.message,
          status: err.response?.status,
          details: errorBody
        },
        null,
        2
      )
    )

    return NextResponse.json(
      {
        error: 'Meta CAPI purchase failed',
        details: errorBody
      },
      { status: err.response?.status || 500 }
    )
  }
}
