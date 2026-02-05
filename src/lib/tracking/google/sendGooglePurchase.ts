import { handlePurchaseEvent } from '@/lib/tracking/google/handlePurchaseEvents'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'
import type { TrackingContext } from '@types' // Eller hvor du har definert denne

export async function sendGooglePurchase(context: TrackingContext) {
  const { order, redisData } = context

  try {
    await handlePurchaseEvent(order, {
      clientId: redisData?.ga_client_id,
      sessionId: redisData?.ga_session_id
    })

    await logToAppLogs(
      'INFO',
      'GA4 Purchase Dispatch Success',
      { orderId: order.id, value: order.total_price },
      { source: 'orders-paid webhook' }
    )
  } catch (err: any) {
    await logToAppLogs(
      'ERROR',
      'GA4 Purchase Dispatch Failed',
      { orderId: order.id, error: err.message },
      { source: 'orders-paid webhook' }
    )
  }
}
