import type { OrderPaid } from 'types/commerce/order/OrderPaid'
import type { TrackingServiceResult } from 'types/tracking/webhook/TrackingServiceResult'
import { getRedisAttribution } from '@/lib/tracking/utils/getRedisAttribution'
import { createTrackingContext } from '@/lib/tracking/utils/createTrackingContext'
import { sendGooglePurchase } from '@/lib/tracking/google/sendGooglePurchase'
import { sendMetaPurchase } from '@/lib/tracking/meta/sendMetaPurchase'
import { dispatchSecondaryEvents } from '@/lib/tracking/utils/dispatchSecondaryEvents'
import { persistAcceptedTrackingEvent } from '@/lib/tracking/warehouse/persistAcceptedTrackingEvent'
import { recordProviderDispatchAttempt } from '@/lib/tracking/warehouse/recordProviderDispatchAttempt'

export async function processOrderTracking(
  order: OrderPaid
): Promise<TrackingServiceResult> {
  const redisData = await getRedisAttribution(order)
  const context = createTrackingContext(order, redisData)

  const eventId = `shopify_order_${order.id}`
  const [metaSettled, googleSettled, secondarySettled, ledgerSettled] =
    await Promise.allSettled([
      sendMetaPurchase(context),
      sendGooglePurchase(context),
      dispatchSecondaryEvents(context),
      persistAcceptedTrackingEvent({
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
      })
    ])

  const metaOk =
    metaSettled.status === 'fulfilled' && metaSettled.value?.success === true

  const googleOk =
    googleSettled.status === 'fulfilled'
    && googleSettled.value?.success === true

  const secondaryOk = secondarySettled.status === 'fulfilled'
  const ledgerOk = ledgerSettled.status === 'fulfilled'

  const metaFailure =
    metaSettled.status === 'fulfilled' && metaSettled.value?.success === false ?
      metaSettled.value
    : undefined

  const googleFailure =
    (
      googleSettled.status === 'fulfilled'
      && googleSettled.value.success === false
    ) ?
      googleSettled.value
    : undefined

  const metaError =
    metaSettled.status === 'rejected' ?
      String(metaSettled.reason)
    : metaFailure?.error || metaFailure?.details

  const googleError =
    googleSettled.status === 'rejected' ?
      String(googleSettled.reason)
    : googleFailure?.error || googleFailure?.details

  const secondaryError =
    secondarySettled.status === 'rejected' ?
      String(secondarySettled.reason)
    : undefined

  await Promise.allSettled([
    recordProviderDispatchAttempt({
      eventId,
      eventName: 'Purchase',
      provider: 'meta',
      success: metaOk,
      error: metaError ? String(metaError) : undefined
    }),
    recordProviderDispatchAttempt({
      eventId,
      eventName: 'Purchase',
      provider: 'google',
      success: googleOk,
      error: googleError ? String(googleError) : undefined
    })
  ])

  if (metaOk && googleOk) {
    return {
      success: true,
      details: {
        orderId: order.id,
        metaOk,
        googleOk,
        secondaryOk,
        ledgerOk
      }
    } as TrackingServiceResult
  }

  return {
    success: false,
    error: !metaOk ? 'Meta tracking failed' : 'Google tracking failed',
    details: {
      orderId: order.id,
      metaOk,
      googleOk,
      secondaryOk,
      ledgerOk,
      metaError,
      googleError,
      secondaryError
    }
  } as TrackingServiceResult
}
