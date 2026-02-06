// Path: src/lib/tracking/google/sendGA4PurchaseFromOrder.ts
import 'server-only'
import {
  sendGA4Event,
  type GA4SendResult
} from '@/lib/tracking/server/sendGA4Events'

type GoogleIds = { clientId?: string; sessionId?: string }

type PurchaseSendResult =
  | {
      sent: true
      result: GA4SendResult
    }
  | {
      sent: false
      reason: 'missing_client_id' | 'missing_transaction_id' | 'missing_items'
    }

function mapItems(order: any) {
  const lineItems = Array.isArray(order?.line_items) ? order.line_items : []
  return lineItems
    .map((item: any) => ({
      item_id:
        item?.sku
        || item?.variant_id?.toString()
        || item?.product_id?.toString(),
      item_name: item?.title,
      item_variant: item?.variant_title,
      item_brand: item?.vendor,
      price: item?.price !== undefined ? Number(item.price) : undefined,
      quantity: item?.quantity ? Number(item.quantity) : 1
    }))
    .filter((i: any) => !!i.item_id || !!i.item_name)
}

export async function sendGA4PurchaseFromOrder(
  order: any,
  ids?: GoogleIds
): Promise<PurchaseSendResult> {
  const noteAttributes =
    Array.isArray(order?.note_attributes) ? order.note_attributes : []
  const getAttr = (name: string) =>
    noteAttributes.find((a: any) => a?.name === name)?.value

  const clientId = ids?.clientId || getAttr('_ga_client_id')
  const sessionId = ids?.sessionId || getAttr('_ga_session_id')

  if (!clientId) return { sent: false, reason: 'missing_client_id' }

  const transactionId = order?.id?.toString()
  if (!transactionId) return { sent: false, reason: 'missing_transaction_id' }

  const items = mapItems(order)
  if (!items.length) return { sent: false, reason: 'missing_items' }

  const value = items.reduce((sum: number, i: any) => {
    const p = Number(i.price ?? 0)
    const q = Number(i.quantity ?? 1)
    return sum + p * q
  }, 0)

  const currency = order?.currency || 'NOK'
  const coupon = order?.discount_codes?.[0]?.code
  const tax = Number(order?.total_tax ?? 0)
  const shipping = Number(
    order?.total_shipping_price_set?.shop_money?.amount ?? 0
  )

  const processedAt = order?.processed_at || order?.created_at
  const timestampMicros =
    processedAt !== undefined && processedAt !== null && processedAt !== '' ?
      Math.floor(new Date(processedAt).getTime() * 1000)
    : undefined

  const debug = process.env.NODE_ENV !== 'production'

  const result = await sendGA4Event(
    {
      name: 'purchase',
      client_id: clientId,
      params: {
        transaction_id: transactionId,
        value,
        currency,
        tax,
        shipping,
        ...(coupon ? { coupon } : {}),
        items
      }
    },
    {
      ...(sessionId ? { session_id: sessionId } : {}),
      ...(order?.client_details?.user_agent ?
        { userAgent: order.client_details.user_agent }
      : {}),
      ...(order?.browser_ip ? { ip_override: order.browser_ip } : {}),
      ...(timestampMicros !== undefined ?
        { timestamp_micros: timestampMicros }
      : {}),
      debug
    }
  )

  return { sent: true, result }
}
