// Path: src/modules/analytics/services/shopify/handleOrderPaidWebhook.ts
import { getAttributionFromRedis } from '../redis/getAttributionFromRedis'
import { mapShopifyOrderToUnifiedEvent } from '@/modules/analytics/mappers/shopify/mapShopifyOrderToUnifiedEvent'
import { trackServerEvent } from '../trackServerEvent'
import { logToAppLogs } from '@/lib/tracking/log/logToAppLogs'
import type { OrderPaid } from 'types/api/webhooks/OrderPaid'
import type { TrackingServiceResult } from '../trackServerEvent'
export async function handleOrderPaidWebhook(
  incomingShopifyOrder: OrderPaid
): Promise<TrackingServiceResult> {
  const shopifyTransactionId = String(incomingShopifyOrder.id)

  const persistedAttributionSnapshot =
    await getAttributionFromRedis(incomingShopifyOrder)

  if (!persistedAttributionSnapshot) {
    console.warn(
      `[Analytics] No Redis attribution found for Order ${shopifyTransactionId}. Falling back to Order data only.`
    )
  }

  const mappedUnifiedAnalyticsEvent = mapShopifyOrderToUnifiedEvent(
    incomingShopifyOrder,
    persistedAttributionSnapshot
  )

  const trackingServiceExecutionResult = await trackServerEvent(
    mappedUnifiedAnalyticsEvent
  )

  await logToAppLogs(
    trackingServiceExecutionResult.success ? 'INFO' : 'ERROR',
    `Webhook Processed: ${mappedUnifiedAnalyticsEvent.eventName}`,
    {
      orderId: shopifyTransactionId,
      eventId: mappedUnifiedAnalyticsEvent.eventId,
      providers: trackingServiceExecutionResult.details,
      attributionFound: !!persistedAttributionSnapshot
    }
  )

  return trackingServiceExecutionResult
}
