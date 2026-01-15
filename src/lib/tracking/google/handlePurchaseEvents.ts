import { trackServerEvent } from '@/lib/tracking/google/trackingServerEvent'
import type { AnalyticsItem } from '@types'
import { normalizeUserData } from '@/lib/tracking/user-data/normalizeUserData'

export async function handlePurchaseEvent(order: any) {
  try {
    const noteAttributes = order.note_attributes || []
    const getAttr = (name: string) =>
      noteAttributes.find((a: any) => a.name === name)?.value

    const clientId = getAttr('_ga_client_id')
    const sessionId = getAttr('_ga_session_id')
    const fbp = getAttr('_fbp')
    const fbc = getAttr('_fbc')
    const customer = order.customer || {}
    const billing = order.billing_address || {}
    const shipping = order.shipping_address || {}

    const email = order.email || order.contact_email || customer.email
    const phone =
      billing.phone || shipping.phone || customer.phone || order.phone

    const normalizedUser = normalizeUserData({
      email: email,
      phone: phone,
      firstName: billing.first_name || customer.first_name,
      lastName: billing.last_name || customer.last_name,
      city: billing.city,
      region: billing.province,
      postalCode: billing.zip,
      country: billing.country_code
    })

    const items: AnalyticsItem[] = order.line_items.map((item: any) => ({
      item_id: item.sku || item.variant_id?.toString(),
      item_name: item.title,
      quantity: item.quantity,
      price: parseFloat(item.price),
      item_variant: item.variant_title,
      item_brand: item.vendor
    }))

    const isNewCustomer = customer.orders_count === 1 ? 'new' : 'returning'

    await trackServerEvent(
      {
        name: 'purchase',
        ecommerce: {
          transaction_id: order.id.toString(),
          value: parseFloat(order.total_price),
          currency: (order.currency as 'NOK' | 'EUR' | 'USD') || 'NOK',
          tax: parseFloat(order.total_tax),
          shipping: parseFloat(
            order.total_shipping_price_set?.shop_money?.amount || '0'
          ),
          coupon: order.discount_codes?.[0]?.code,
          items: items,
          customer_type: isNewCustomer
        }
      },
      {
        clientId,
        sessionId,
        userId: customer.id?.toString(),
        fbp,
        fbc,
        userData: normalizedUser,
        userProperties: {
          customer_tier: isNewCustomer,
          purchase_count: customer.orders_count
        },
        userAgent: order.client_details?.user_agent,
        ipOverride: order.browser_ip
      }
    )
  } catch (error) {
    console.error('[Purchase Tracking] Failed:', error)
  }
}
