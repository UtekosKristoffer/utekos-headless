import type { OrderPaid } from 'types/commerce/order/OrderPaid'
import type { TrackingServiceResult } from 'types/tracking/webhook/TrackingServiceResult'
import { getRedisAttribution } from '@/lib/tracking/utils/getRedisAttribution'
import { createTrackingContext } from '@/lib/tracking/utils/createTrackingContext'
import { dispatchSecondaryEvents } from '@/lib/tracking/utils/dispatchSecondaryEvents'
import { persistAcceptedTrackingEvent } from '@/lib/tracking/warehouse/persistAcceptedTrackingEvent'

export async function processOrderTracking(
  order: OrderPaid
): Promise<TrackingServiceResult> {
  const redisData = await getRedisAttribution(order)
  const context = createTrackingContext(order, redisData)

  const eventId = `shopify_order_${order.id}`
  const [secondarySettled, ledgerSettled] =
    await Promise.allSettled([
      dispatchSecondaryEvents(context),
      persistAcceptedTrackingEvent(
        {
          eventName: 'Purchase',
          eventId,
          eventSourceUrl: order.order_status_url ?? undefined,
          eventTime: Math.floor(new Date(order.processed_at ?? order.created_at).getTime() / 1000),
          actionSource: 'website',
          userData: undefined,
          eventData: {
            value: Number(order.total_price),
            currency: order.currency,
            content_ids: context.contentIds,
            content_type: 'product',
            num_items: order.line_items.length,
            order_id: String(order.id)
          }
        },
        {
          necessary: true,
          preferences: false,
          statistics: false,
          marketing: false,
          services: {},
          source: 'shopify'
        },
        []
      )
    ])

  const secondaryOk = secondarySettled.status === 'fulfilled'
  const ledgerOk = ledgerSettled.status === 'fulfilled'

  const secondaryError =
    secondarySettled.status === 'rejected' ?
      String(secondarySettled.reason)
    : undefined

  if (ledgerOk) {
    return {
      success: true,
      details: {
        orderId: order.id,
        metaOk: false,
        googleOk: false,
        providerDispatchSkipped: 'No documented Usercentrics consent is available on the Shopify webhook',
        secondaryOk,
        ledgerOk
      }
    } as TrackingServiceResult
  }

  return {
    success: false,
    error: 'Tracking ledger persistence failed',
    details: {
      orderId: order.id,
      metaOk: false,
      googleOk: false,
      secondaryOk,
      ledgerOk,
      secondaryError
    }
  } as TrackingServiceResult
}
