import 'server-only'
import { handlePurchaseEvent } from '@/lib/tracking/google/handlePurchaseEvents'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'
import type { TrackingContext } from 'types/tracking/user/TrackingContext'

type RedisGoogleIds = {
  ga_client_id?: string
  ga_session_id?: string
  gaClientId?: string
  gaSessionId?: string
}

export async function sendGooglePurchase(context: TrackingContext) {
  const { order, redisData } = context
  const googleIds = (redisData ?? {}) as RedisGoogleIds
  const clientId = googleIds.ga_client_id || googleIds.gaClientId
  const sessionId = googleIds.ga_session_id || googleIds.gaSessionId

  try {
    const res = await handlePurchaseEvent(order, {
      clientId,
      sessionId
    })

    if (!res.sent) {
      await logToAppLogs(
        'WARN',
        'GA4 Purchase Skipped',
        {
          orderId: order.id,
          reason: res.reason,
          hasRedisClientId: !!clientId,
          hasRedisSessionId: !!sessionId,
          ...(res.details ? { details: res.details } : {})
        },
        { source: 'orders-paid webhook' }
      )
      return
    }

    await logToAppLogs(
      'INFO',
      'GA4 Purchase Dispatch Success',
      {
        orderId: order.id,
        value: order.total_price,
        hasRedisClientId: !!clientId,
        hasRedisSessionId: !!sessionId
      },
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