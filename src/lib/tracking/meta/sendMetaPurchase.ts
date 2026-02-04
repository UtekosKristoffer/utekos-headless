import {
  FacebookAdsApi,
  ServerEvent,
  EventRequest,
  UserData,
  CustomData,
  Content
} from 'facebook-nodejs-business-sdk'
import { safeString } from '@/lib/utils/safeString'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'
import type { TrackingContext } from '@types'

const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE

export async function sendMetaPurchase({
  order,
  customer,
  redisData,
  contentIds
}: TrackingContext) {
  if (!ACCESS_TOKEN || !PIXEL_ID) {
    console.error('[Meta CAPI] Critical: Missing Configuration')
    return { success: false, error: 'Missing Config' }
  }

  const api = FacebookAdsApi.init(ACCESS_TOKEN)
  if (process.env.NODE_ENV === 'development') {
    api.setDebug(true)
  }

  const userData = new UserData()
  if (customer.email) userData.setEmail(customer.email.toLowerCase())
  if (customer.phone) userData.setPhone(customer.phone)
  if (customer.externalId) userData.setExternalId(customer.externalId)
  if (customer.firstName) userData.setFirstName(customer.firstName)
  if (customer.lastName) userData.setLastName(customer.lastName)
  if (customer.city) userData.setCity(customer.city.toLowerCase())
  if (customer.state) userData.setState(customer.state.toLowerCase())
  if (customer.zip) userData.setZip(customer.zip)
  if (customer.countryCode)
    userData.setCountry(customer.countryCode.toLowerCase())
  if (customer.clientIp) userData.setClientIpAddress(customer.clientIp)
  if (customer.userAgent) userData.setClientUserAgent(customer.userAgent)
  if (customer.fbp) userData.setFbp(customer.fbp)
  if (customer.fbc) userData.setFbc(customer.fbc)

  const contentList: Content[] = []
  if (order.line_items) {
    for (const item of order.line_items) {
      const id = safeString(item.variant_id) || safeString(item.product_id)
      if (!id) continue
      contentList.push(
        new Content()
          .setId(id)
          .setQuantity(Number(item.quantity || 0))
          .setItemPrice(Number(item.price || 0))
          .setTitle(safeString(item.title) || '')
      )
    }
  }

  const customData = new CustomData()
    .setCurrency(safeString(order.currency) || 'NOK')
    .setValue(Number(order.total_price || 0))
    .setContents(contentList)
    .setContentIds(contentIds)
    .setContentType('product')

  if (order.id) customData.setOrderId(safeString(order.id)!)

  const serverEvent = new ServerEvent()
    .setEventName('Purchase')
    .setEventTime(Math.floor(Date.now() / 1000))
    .setActionSource('website')
    .setEventId(`shopify_order_${order.id}`)
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
    if (TEST_EVENT_CODE) eventRequest.setTestEventCode(TEST_EVENT_CODE)

    const response = await eventRequest.execute()

    await logToAppLogs(
      'INFO',
      '💵💵💵💵💵💵💵 CAPI Purchase Sent 💵💵💵💵💵💵💵',
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

    return {
      success: true,
      events_received: response.events_received,
      fbtrace_id: response.fbtrace_id
    }
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

    return {
      success: false,
      error: 'Meta CAPI request failed',
      details: errorResponse.error || err.message
    }
  }
}
