import { getMarketingParams } from './getMarketingParams'
import { track } from '@vercel/analytics'
import type { OrderPaid } from '@types'
export function trackCustomEvent(
  eventName: string,
  properties: Record<string, unknown> = {}
) {
  if (typeof window === 'undefined' || !window.klaviyo) return

  const marketingParams = getMarketingParams()
  const payload = {
    ...properties,
    Source: marketingParams.source,
    Medium: marketingParams.medium,
    CampaignID: marketingParams.campaign_id
  }

  window.klaviyo.track(eventName, payload)
}
export function trackPurchase(order: OrderPaid) {
  track('Purchase', {
    line_items: order.name,
    createdAt: order.created_at,
    browser_ip: order.browser_ip,
    value: parseFloat(order.total_price),
    currency: order.currency,
    orderId: order.id.toString(),
    itemCount: order.line_items.length,
    email: order.email ?? undefined,
    shipping_city: order.shipping_address?.city,
    shipping_country: order.shipping_address?.country,
    shipping_address: order.shipping_address?.address1,
    order_number: order.order_number
  })
}
