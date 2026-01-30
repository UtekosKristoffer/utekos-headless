import { NextResponse } from 'next/server'
import { verifyShopifyWebhook } from '@/lib/shopify/verifyWebhook'
import { redisGet } from '@/lib/redis'
import type { CheckoutAttribution, OrderPaid } from '@types'
import { safeString } from '@/lib/utils/safeString'
import { normalizePhone } from '@/lib/utils/normalizePhone'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'
import { handlePurchaseEvent } from '@/lib/tracking/google/handlePurchaseEvents'
import { hashSnapData } from '@/lib/snapchat/hashSnapData'
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

const SNAP_ACCESS_TOKEN = process.env.SNAP_CAPI_TOKEN
const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID

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

  try {
    await handlePurchaseEvent(order)
    await logToAppLogs(
      'INFO',
      'sGTM Purchase Dispatch Success',
      { orderId: order.id, value: order.total_price },
      { source: 'orders-paid webhook' }
    )
  } catch (err: any) {
    await logToAppLogs(
      'ERROR',
      'sGTM Purchase Dispatch Failed',
      { orderId: order.id, error: err.message },
      { source: 'orders-paid webhook' }
    )
  }

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

  let firstName = ''
  let lastName = ''
  let city = ''
  let state = ''
  let zip = ''

  if (addr) {
    firstName = safeString(addr.first_name) || ''
    lastName = safeString(addr.last_name) || ''
    city = safeString(addr.city) || ''
    state = safeString(addr.province_code) || ''
    zip = safeString(addr.zip) || ''
    const countryCode = safeString(addr.country_code) || ''

    if (firstName) userData.setFirstName(firstName)
    if (lastName) userData.setLastName(lastName)
    if (city) userData.setCity(city.toLowerCase())
    if (state) userData.setState(state.toLowerCase())
    if (zip) userData.setZip(zip)
    if (countryCode) userData.setCountry(countryCode.toLowerCase())
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

  const sendSnapEvent = async () => {
    if (!SNAP_ACCESS_TOKEN || !SNAP_PIXEL_ID) {
      console.warn('[Snap CAPI] Missing tokens, skipping.')
      return
    }

    try {
      const eventTime = Math.floor(Date.now() / 1000)

      const snapPayload = {
        event_name: 'PURCHASE',
        event_time: eventTime,
        event_source_url:
          safeString(order.order_status_url)
          || redisData?.checkoutUrl
          || 'https://utekos.no',
        action_source: 'WEB',

        user_data: {
          em: [hashSnapData(email)].filter(Boolean),
          ph: [hashSnapData(phone)].filter(Boolean),
          client_ip_address: clientIp,
          client_user_agent: userAgent,
          sc_cookie1: (redisData?.userData as any)?.scid,
          sc_click_id: (redisData?.userData as any)?.click_id,

          fn: [hashSnapData(firstName)].filter(Boolean),
          ln: [hashSnapData(lastName)].filter(Boolean),
          ct: [hashSnapData(city)].filter(Boolean),
          st: [hashSnapData(state)].filter(Boolean),
          zp: [hashSnapData(zip)].filter(Boolean)
        },

        custom_data: {
          currency: safeString(order.currency) || 'NOK',
          value: Number(order.total_price || 0),
          transaction_id: safeString(order.id),
          item_category: 'Apparel',
          content_ids: contentIds,
          num_items: order.line_items
            ?.reduce((acc, item) => acc + (item.quantity || 0), 0)
            .toString()
        },

        event_id: `shopify_order_${order.id}`,
        client_dedup_id: `shopify_order_${order.id}`
      }

      await logToAppLogs('INFO', 'Snap CAPI Payload Debug', {
        payload: snapPayload,
        orderId: order.id
      })

      const snapRes = await fetch(
        `https://tr.snapchat.com/v3/${SNAP_PIXEL_ID}/events?access_token=${SNAP_ACCESS_TOKEN}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: [snapPayload] })
        }
      )

      if (!snapRes.ok) {
        const errText = await snapRes.text()
        await logToAppLogs('ERROR', 'Snap CAPI Response Error', {
          status: snapRes.status,
          error: errText,
          orderId: order.id
        })
        console.error(`[Snap CAPI] Failed: ${snapRes.status} ${errText}`)
      } else {
        const resJson = await snapRes.json()
        console.log('[Snap CAPI] Success', resJson)
      }
    } catch (error: any) {
      console.error('[Snap CAPI] Error executing request:', error)
      await logToAppLogs('ERROR', 'Snap CAPI Execution Error', {
        message: error.message
      })
    }
  }

  const snapPromise = sendSnapEvent()

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

    await snapPromise

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
    await snapPromise

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
