import { NextResponse } from 'next/server'
import { verifyShopifyWebhook } from '@/lib/shopify/verifyWebhook'
import { redisGet } from '@/lib/redis'
import type { CheckoutAttribution, OrderPaid } from '@types'
import { safeString } from '@/lib/utils/safeString'
import { normalizePhone } from '@/lib/utils/normalizePhone'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'
import { handlePurchaseEvent } from '@/lib/tracking//handlePurchaseEvents'
import {
  FacebookAdsApi,
  ServerEvent,
  EventRequest,
  UserData,
  CustomData,
  Content
} from 'facebook-nodejs-business-sdk'

const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE

export async function POST(request: Request) {
  if (!ACCESS_TOKEN || !PIXEL_ID) {
    console.error(
      '[Meta CAPI] Critical: Missing META_ACCESS_TOKEN or PIXEL_ID.'
    )
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

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

  let order: OrderPaid
  try {
    order = JSON.parse(rawBody) as OrderPaid
  } catch {
    console.error('[Meta CAPI] Failed to parse JSON body')
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  handlePurchaseEvent(order).catch(err =>
    console.error('[sGTM] Failed to dispatch purchase event:', err)
  )

  const api = FacebookAdsApi.init(ACCESS_TOKEN)
  if (process.env.NODE_ENV === 'development') {
    api.setDebug(true)
  }

  console.log(`[Meta CAPI] Processing Order: ${order.id}`)

  let redisData: CheckoutAttribution | null = null
  const cartToken = safeString(order.cart_token)
  const checkoutToken = safeString(order.checkout_token)

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

  await logToAppLogs(
    'INFO',
    'Webhook: Order Paid Processing',
    {
      orderId: order.id,
      total: order.total_price,
      currency: order.currency,
      attributionFound: !!redisData,
      redisKeyUsed: redisData ? '***Found***' : 'None'
    },
    {
      cartToken,
      checkoutToken
    }
  )

  const userData = new UserData()

  const email =
    safeString(order.email)
    || safeString(order.contact_email)
    || safeString(order.customer?.email)
  if (email) {
    userData.setEmail(email.toLowerCase())
  }

  const phone = normalizePhone(
    safeString(
      order.phone
        || order.customer?.phone
        || order.shipping_address?.phone
        || order.billing_address?.phone
    )
  )
  if (phone) {
    userData.setPhone(phone)
  }

  const externalId =
    redisData?.userData?.external_id
    || safeString(order.customer?.id)
    || safeString(order.user_id)
  if (externalId) {
    userData.setExternalId(externalId)
  }

  const addr =
    order.shipping_address
    ?? order.billing_address
    ?? order.customer?.default_address

  if (addr) {
    const firstName = safeString(addr.first_name)
    if (firstName) userData.setFirstName(firstName)

    const lastName = safeString(addr.last_name)
    if (lastName) userData.setLastName(lastName)

    const city = safeString(addr.city)
    if (city) userData.setCity(city.toLowerCase())

    const state = safeString(addr.province_code)
    if (state) userData.setState(state.toLowerCase())

    const zip = safeString(addr.zip)
    if (zip) userData.setZip(zip)

    const country = safeString(addr.country_code)
    if (country) userData.setCountry(country.toLowerCase())
  }

  const clientIp =
    redisData?.userData?.client_ip_address || safeString(order.browser_ip)
  if (clientIp) userData.setClientIpAddress(clientIp)

  const clientDetails = order.client_details as Record<string, unknown> | null
  const userAgent =
    redisData?.userData?.client_user_agent
    || safeString(clientDetails?.user_agent)
  if (userAgent) userData.setClientUserAgent(userAgent)

  let fbp = redisData?.userData?.fbp
  let fbc = redisData?.userData?.fbc

  if (!fbp && order.note_attributes && order.note_attributes.length > 0) {
    const fbpAttr = order.note_attributes.find(a => a.name === '_fbp')
    if (fbpAttr?.value) fbp = fbpAttr.value
  }

  if (!fbc && order.note_attributes && order.note_attributes.length > 0) {
    const fbcAttr = order.note_attributes.find(a => a.name === '_fbc')
    if (fbcAttr?.value) fbc = fbcAttr.value
  }

  if (fbp) userData.setFbp(fbp)
  if (fbc) userData.setFbc(fbc)

  const contentList: Content[] = []
  const contentIds: string[] = []

  if (order.line_items && order.line_items.length > 0) {
    for (const item of order.line_items) {
      const id = safeString(item.variant_id) || safeString(item.product_id)
      if (!id) continue

      contentIds.push(id)

      const content = new Content()
        .setId(id)
        .setQuantity(Number(item.quantity || 0))
        .setItemPrice(Number(item.price || 0))
        .setTitle(safeString(item.title) || '')

      contentList.push(content)
    }
  }

  const customData = new CustomData()

  const currency = safeString(order.currency) || 'NOK'
  customData.setCurrency(currency)

  const value = Number(order.total_price || 0)
  customData.setValue(value)

  customData.setContents(contentList)
  customData.setContentIds(contentIds)
  customData.setContentType('product')

  const orderIdStr = safeString(order.id)
  if (orderIdStr) {
    customData.setOrderId(orderIdStr)
  }

  const eventId = `shopify_order_${order.id}`

  const serverEvent = new ServerEvent()
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
      serverEvent
    ])

    if (TEST_EVENT_CODE) {
      eventRequest.setTestEventCode(TEST_EVENT_CODE)
    }

    const response = await eventRequest.execute()
    await logToAppLogs(
      'INFO',
      'CAPI Purchase Sent',
      {
        fbtrace_id: response.fbtrace_id,
        events_received: response.events_received,
        orderId: order.id
      },
      {
        fbp: userData.fbp,
        fbc: userData.fbc,
        externalId: userData.external_id,
        clientIp: userData.client_ip_address,
        eventTime: serverEvent.event_time
      }
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

    await logToAppLogs(
      'ERROR',
      'CAPI Purchase Failed',
      {
        orderId: order.id,
        error: err.message,
        details: err.response?.data?.error
      },
      {}
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
