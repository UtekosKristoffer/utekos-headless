import type { OrderPaid } from '@types'
import { getRedisAttribution } from '@/lib/tracking/utils/getRedisAttribution'
import { createTrackingContext } from '@/lib/tracking/utils/createTrackingContext'
import { sendGooglePurchase } from '@/lib/tracking/google/sendGooglePurchase'
import { sendMetaPurchase } from '@/lib/tracking/meta/sendMetaPurchase'
import { dispatchSecondaryEvents } from '@/lib/tracking/utils/dispatchSecondaryEvents'

export async function processOrderTracking(order: OrderPaid) {
  const googlePromise = sendGooglePurchase(order)

  const redisData = await getRedisAttribution(order)

  const context = createTrackingContext(order, redisData)

  const [metaResult] = await Promise.all([
    sendMetaPurchase(context),
    dispatchSecondaryEvents(context),
    googlePromise
  ])

  return metaResult
}
