import { hashSnapData } from '@/lib/tracking/snapchat/hashSnapData'
import { safeString } from '@/lib/utils/safeString'
import type { TrackingContext } from '@types'

const SNAP_ACCESS_TOKEN = process.env.SNAP_CAPI_TOKEN
const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID

export async function sendSnapPurchase({
  order,
  customer,
  redisData,
  contentIds
}: TrackingContext) {
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
        em: [hashSnapData(customer.email)].filter(Boolean),
        ph: [hashSnapData(customer.phone)].filter(Boolean),
        client_ip_address: customer.clientIp,
        client_user_agent: customer.userAgent,
        sc_cookie1: (redisData?.userData as any)?.scid,
        sc_click_id: (redisData?.userData as any)?.click_id,
        fn: [hashSnapData(customer.firstName)].filter(Boolean),
        ln: [hashSnapData(customer.lastName)].filter(Boolean),
        ct: [hashSnapData(customer.city)].filter(Boolean),
        st: [hashSnapData(customer.state)].filter(Boolean),
        zp: [hashSnapData(customer.zip)].filter(Boolean),
        country: [hashSnapData(customer.countryCode)].filter(Boolean)
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
