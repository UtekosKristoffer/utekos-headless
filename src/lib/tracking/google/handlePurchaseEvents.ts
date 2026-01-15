import {
  trackServerEvent,
  type AnalyticsItem
} from '@/lib/tracking/google/trackingServerEvent'

export async function handlePurchaseEvent(order: any) {
  try {
    const noteAttributes = order.note_attributes || []

    const getAttr = (name: string) =>
      noteAttributes.find((a: any) => a.name === name)?.value

    const clientId = getAttr('_ga_client_id')
    const sessionId = getAttr('_ga_session_id')
    const fbp = getAttr('_fbp')
    const fbc = getAttr('_fbc')
    const emailHash = getAttr('email_hash')

    const items: AnalyticsItem[] = order.line_items.map((item: any) => ({
      item_id: item.sku || item.variant_id?.toString(),
      item_name: item.title,
      quantity: item.quantity,
      price: parseFloat(item.price),
      item_variant: item.variant_title
    }))

    const totalValue = parseFloat(order.total_price)
    const currency = order.currency as 'NOK' | 'EUR' | 'USD'

    await trackServerEvent(
      {
        name: 'purchase',
        ecommerce: {
          transaction_id: order.id.toString(),
          value: totalValue,
          currency: currency,
          tax: parseFloat(order.total_tax),
          shipping: parseFloat(
            order.total_shipping_price_set?.shop_money?.amount || '0'
          ),
          items: items
        }
      },
      {
        clientId,
        sessionId,
        fbp,
        fbc,
        emailHash,
        userAgent: order.client_details?.user_agent
      }
    )
  } catch (error) {
    console.error('[Purchase Tracking] Failed:', error)
  }
}
