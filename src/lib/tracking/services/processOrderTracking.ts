import type { OrderPaid, TrackingServiceResult } from '@types'
import { getRedisAttribution } from '@/lib/tracking/utils/getRedisAttribution'
import { createTrackingContext } from '@/lib/tracking/utils/createTrackingContext'
import { sendGooglePurchase } from '@/lib/tracking/google/sendGooglePurchase'
import { sendMetaPurchase } from '@/lib/tracking/meta/sendMetaPurchase'
import { dispatchSecondaryEvents } from '@/lib/tracking/utils/dispatchSecondaryEvents'

export async function processOrderTracking(
  order: OrderPaid
): Promise<TrackingServiceResult> {
  const redisData = await getRedisAttribution(order)
  const context = createTrackingContext(order, redisData)

  const [metaSettled, googleSettled, secondarySettled] =
    await Promise.allSettled([
      sendMetaPurchase(context),
      sendGooglePurchase(context),
      dispatchSecondaryEvents(context)
    ])

  const metaOk =
    metaSettled.status === 'fulfilled' && metaSettled.value?.success === true

  const googleOk = googleSettled.status === 'fulfilled'

  const secondaryOk = secondarySettled.status === 'fulfilled'

  if (metaOk && googleOk) {
    return metaSettled.value
  }

  const metaError =
    metaSettled.status === 'rejected' ?
      String(metaSettled.reason)
    : metaSettled.value?.error || metaSettled.value?.details

  const googleError =
    googleSettled.status === 'rejected' ?
      String(googleSettled.reason)
    : undefined

  const secondaryError =
    secondarySettled.status === 'rejected' ?
      String(secondarySettled.reason)
    : undefined

  return {
    success: false,
    error: !metaOk ? 'Meta tracking failed' : 'Google tracking failed',
    details: {
      orderId: (order as any)?.id,
      metaOk,
      googleOk,
      secondaryOk,
      metaError,
      googleError,
      secondaryError
    }
  } as TrackingServiceResult
}
