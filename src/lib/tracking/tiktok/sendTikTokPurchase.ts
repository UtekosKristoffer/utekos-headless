import { hashSnapData } from '@/lib/tracking/snapchat/hashSnapData'
import { safeString } from '@/lib/utils/safeString'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'
import type { TrackingContext } from '@types'

const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID

export async function sendTikTokPurchase({
  order,
  customer,
  redisData
}: TrackingContext) {
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
            ttclid: customer.ttclid,
            ttp: customer.ttp,
            email: customer.email ? hashSnapData(customer.email) : undefined,
            phone: customer.phone ? hashSnapData(customer.phone) : undefined,
            external_id:
              customer.externalId ?
                hashSnapData(customer.externalId)
              : undefined,
            ip: customer.clientIp,
            user_agent: customer.userAgent
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
        { ttclid: customer.ttclid ? 'Found' : 'Missing' }
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
