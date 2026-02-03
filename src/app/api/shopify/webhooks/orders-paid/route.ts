import { NextResponse } from 'next/server'
import { verifyShopifyWebhook } from '@/lib/shopify/verifyWebhook'
import { redisGet } from '@/lib/redis'
import type { CheckoutAttribution, OrderPaid } from '@types'
import { safeString } from '@/lib/utils/safeString'
import { normalizePhone } from '@/lib/utils/normalizePhone'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'
import { handlePurchaseEvent } from '@/lib/tracking/google/handlePurchaseEvents'
import { hashSnapData } from '@/lib/snapchat/hashSnapData'
import { getCleanIp } from '@/lib/snapchat/getCleanIp'
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
const PINTEREST_TOKEN = process.env.PINTEREST_ACCESS_TOKEN
const PINTEREST_AD_ACCOUNT_ID = process.env.PINTEREST_AD_ACCOUNT_ID
const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID

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
  let countryCode = ''

  if (addr) {
    firstName = safeString(addr.first_name) || ''
    lastName = safeString(addr.last_name) || ''
    city = safeString(addr.city) || ''
    state = safeString(addr.province_code) || ''
    zip = safeString(addr.zip) || ''
    countryCode = safeString(addr.country_code) || ''

    if (firstName) userData.setFirstName(firstName)
    if (lastName) userData.setLastName(lastName)
    if (city) userData.setCity(city.toLowerCase())
    if (state) userData.setState(state.toLowerCase())
    if (zip) userData.setZip(zip)
    if (countryCode) userData.setCountry(countryCode.toLowerCase())
  }

  const rawIp =
    redisData?.userData?.client_ip_address || safeString(order.browser_ip)
  const clientIp = getCleanIp(rawIp)

  if (clientIp) userData.setClientIpAddress(clientIp)

  const clientDetails = order.client_details as Record<string, unknown> | null
  const userAgent =
    redisData?.userData?.client_user_agent
    || safeString(clientDetails?.user_agent)
  if (userAgent) userData.setClientUserAgent(userAgent)

  let fbp = redisData?.userData?.fbp
  let fbc = redisData?.userData?.fbc
  let ttclid = (redisData?.userData as any)?.ttclid
  let ttp = (redisData?.userData as any)?.ttp

  if (!fbp && order.note_attributes && order.note_attributes.length > 0) {
    const fbpAttr = order.note_attributes.find(a => a.name === '_fbp')
    if (fbpAttr?.value) fbp = fbpAttr.value
  }

  if (!fbc && order.note_attributes && order.note_attributes.length > 0) {
    const fbcAttr = order.note_attributes.find(a => a.name === '_fbc')
    if (fbcAttr?.value) fbc = fbcAttr.value
  }

  if (!ttclid && order.note_attributes && order.note_attributes.length > 0) {
    const ttclidAttr = order.note_attributes.find(
      a => a.name === 'ttclid' || a.name === 'ute_ttclid'
    )
    if (ttclidAttr?.value) ttclid = ttclidAttr.value
  }

  if (!ttp && order.note_attributes && order.note_attributes.length > 0) {
    const ttpAttr = order.note_attributes.find(a => a.name === '_ttp')
    if (ttpAttr?.value) ttp = ttpAttr.value
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
    if (!SNAP_ACCESS_TOKEN || !SNAP_PIXEL_ID) return

    try {
      const eventTime = Math.floor(Date.now() / 1000)

      const snapPayload = {
        event_name: 'PURCHASE',
        event_time: eventTime,
        event_source_url:
          safeString(order.order_status_url) || 'https://utekos.no',
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
          zp: [hashSnapData(zip)].filter(Boolean),
          country: [hashSnapData(countryCode)].filter(Boolean)
        },
        custom_data: {
          currency: safeString(order.currency) || 'NOK',
          value: Number(order.total_price || 0),
          order_id: safeString(order.id),
          content_category: 'Apparel',
          content_ids: contentIds,
          num_items: order.line_items?.reduce(
            (acc, item) => acc + (item.quantity || 0),
            0
          ),
          contents: order.line_items?.map(item => ({
            id: safeString(item.variant_id) || safeString(item.product_id),
            quantity: item.quantity,
            item_price: item.price
          }))
        },
        event_id: `shopify_order_${order.id}`
      }

      await fetch(
        `https://tr.snapchat.com/v3/${SNAP_PIXEL_ID}/events?access_token=${SNAP_ACCESS_TOKEN}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: [snapPayload] })
        }
      )
    } catch (error) {
      console.error('[Snap CAPI] Error:', error)
    }
  }

  const sendPinterestEvent = async () => {
    if (!PINTEREST_TOKEN || !PINTEREST_AD_ACCOUNT_ID) return

    try {
      const pinPayload = {
        event_name: 'checkout',
        action_source: 'web',
        event_time: Math.floor(Date.now() / 1000),
        event_id: `shopify_order_${order.id}`,
        event_source_url:
          safeString(order.order_status_url) || 'https://utekos.no',
        user_data: {
          em: [hashSnapData(email)].filter(Boolean),
          ph: [hashSnapData(phone)].filter(Boolean),
          client_ip_address: clientIp,
          client_user_agent: userAgent,
          click_id: (redisData?.userData as any)?.epik || undefined,
          external_id: [hashSnapData(externalId)].filter(Boolean),
          fn: [hashSnapData(firstName)].filter(Boolean),
          ln: [hashSnapData(lastName)].filter(Boolean),
          ct: [hashSnapData(city)].filter(Boolean),
          st: [hashSnapData(state)].filter(Boolean),
          zp: [hashSnapData(zip)].filter(Boolean),
          country: [hashSnapData(countryCode)].filter(Boolean)
        },
        custom_data: {
          currency: safeString(order.currency) || 'NOK',
          value: String(order.total_price || '0'), // Pinterest vil ofte ha value som string
          order_id: safeString(order.id),
          num_items: order.line_items?.reduce(
            (acc, item) => acc + (item.quantity || 0),
            0
          ),
          content_ids: contentIds,
          contents: order.line_items?.map(item => ({
            item_price: String(item.price || '0'),
            quantity: item.quantity
          }))
        }
      }

      const res = await fetch(
        `https://api.pinterest.com/v5/ad_accounts/${PINTEREST_AD_ACCOUNT_ID}/events`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PINTEREST_TOKEN}`
          },
          body: JSON.stringify({ data: [pinPayload] })
        }
      )

      if (!res.ok) {
        const errText = await res.text()
        console.error('[Pinterest CAPI] Error:', errText)
        await logToAppLogs('ERROR', 'Pinterest CAPI Failed', { error: errText })
      } else {
        console.log('[Pinterest CAPI] Success')
      }
    } catch (error: any) {
      console.error('[Pinterest CAPI] Exception:', error)
    }
  }

  const sendTikTokEvent = async () => {
    if (!TIKTOK_ACCESS_TOKEN || !TIKTOK_PIXEL_ID) return

    try {
      const tiktokPayload = {
        event_source: 'web',
        event_source_id: TIKTOK_PIXEL_ID,
        data: [
          {
            event: 'Purchase',
            event_id: `shopify_order_${order.id}`,
            event_time: Math.floor(Date.now() / 1000),
            user: {
              ttclid: ttclid,
              ttp: ttp,
              email: email ? hashSnapData(email) : undefined,
              phone: phone ? hashSnapData(phone) : undefined,
              external_id: externalId ? hashSnapData(externalId) : undefined,
              ip: clientIp,
              user_agent: userAgent
            },
            properties: {
              currency: safeString(order.currency) || 'NOK',
              value: Number(order.total_price || 0),
              order_id: safeString(order.id),
              content_type: 'product',
              contents: order.line_items?.map(item => ({
                content_id:
                  safeString(item.variant_id) || safeString(item.product_id),
                price: Number(item.price || 0),
                quantity: Number(item.quantity || 1)
              }))
            },
            page: {
              url:
                safeString(order.order_status_url)
                || redisData?.checkoutUrl
                || 'https://utekos.no'
            }
          }
        ]
      }

      const res = await fetch(
        'https://business-api.tiktok.com/open_api/v1.3/event/track/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Token': TIKTOK_ACCESS_TOKEN
          },
          body: JSON.stringify(tiktokPayload)
        }
      )

      const responseData = await res.json()

      if (responseData.code === 0) {
        await logToAppLogs(
          'INFO',
          '🎵 TikTok CAPI Purchase Success',
          { orderId: order.id },
          { ttclid: ttclid ? 'Found' : 'Missing' }
        )
      } else {
        await logToAppLogs(
          'ERROR',
          'TikTok CAPI Purchase Failed',
          { error: responseData },
          { orderId: order.id }
        )
      }
    } catch (error) {
      console.error('[TikTok CAPI] Exception:', error)
      await logToAppLogs(
        'ERROR',
        'TikTok CAPI Exception',
        { error: String(error) },
        {}
      )
    }
  }

  const snapPromise = sendSnapEvent()
  const pinPromise = sendPinterestEvent()
  const tiktokPromise = sendTikTokEvent()

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

    await Promise.all([snapPromise, pinPromise, tiktokPromise])

    await logToAppLogs(
      'INFO',
      '跳鴫跳 CAPI 跳鴫跳 Purchase Sent',
      {
        fbtrace_id: response.fbtrace_id,
        events_received: response.events_received,
        orderId: order.id
      },
      {
        fbp: userData.fbp,
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
    await Promise.all([snapPromise, pinPromise, tiktokPromise])

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
