// Path: src/lib/tracking/google/sendGooglePurchase.ts
import 'server-only'
import { handlePurchaseEvent } from '@/lib/tracking/google/handlePurchaseEvents'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'
import type { TrackingContext } from 'types/tracking/user/TrackingContext'

export async function sendGooglePurchase(context: TrackingContext) {
  const { order, redisData } = context

  try {
    const res = await handlePurchaseEvent(order, {
      clientId: redisData?.ga_client_id,
      sessionId: redisData?.ga_session_id
    })

    if (res.sent === false) {
      await logToAppLogs(
        'WARN',
        'GA4 Purchase Skipped',
        {
          orderId: order.id,
          reason: res.reason,
          ...(res.details ? { details: res.details } : {})
        },
        { source: 'orders-paid webhook' }
      )
      return
    }

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
      { orderId: order.id, error: err?.message || String(err) },
      { source: 'orders-paid webhook' }
    )
  }
}
