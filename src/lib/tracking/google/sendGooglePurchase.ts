import { handlePurchaseEvent } from '@/lib/tracking/google/handlePurchaseEvents'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'
import type { OrderPaid } from '@types'

export async function sendGooglePurchase(order: OrderPaid) {
  try {
    await handlePurchaseEvent(order)
    await logToAppLogs(
      'INFO',
      'sGTM Purchase Dispatch Success',
      { orderId: order.id, value: order.total_price },
      { source: 'orders-paid webhook' }
    )
  } catch (err: any) {
    await logToAppLogs(
      'ERROR',
      'sGTM Purchase Dispatch Failed',
      { orderId: order.id, error: err.message },
      { source: 'orders-paid webhook' }
    )
  }
}
