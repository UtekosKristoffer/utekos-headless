import { trackServerEvent } from '@/lib/tracking/google/trackingServerEvent'
import { normalizeUserData } from '@/lib/tracking/user-data/normalizeUserData'

export type AnalyticsItem = {
  item_id: string
  item_name: string
  price?: number
  quantity?: number
  item_brand?: string
  item_category?: string
  item_variant?: string
  index?: number
  coupon?: string
  discount?: number
  location_id?: string
  item_list_id?: string
  item_list_name?: string
}

export type PurchaseTrackResult =
  | { sent: true }
  | {
      sent: false
      reason:
        | 'missing_client_id'
        | 'missing_transaction_id'
        | 'missing_items'
        | 'ga_error'
        | 'missing_credentials'
      details?: Record<string, any>
    }

export type GoogleIds = {
  clientId?: string | undefined
  sessionId?: string | undefined
}

export async function handlePurchaseEvent(
  order: any,
  ids?: GoogleIds
): Promise<PurchaseTrackResult> {
  const noteAttributes =
    Array.isArray(order?.note_attributes) ? order.note_attributes : []

  const getAttr = (name: string): string | undefined =>
    noteAttributes.find((attribute: any) => attribute?.name === name)?.value

  const clientId = ids?.clientId || getAttr('_ga_client_id')
  const sessionId = ids?.sessionId || getAttr('_ga_session_id')

  if (!clientId) {
    return {
      sent: false,
      reason: 'missing_client_id',
      details: {
        hasRedisClientId: !!ids?.clientId,
        hasNoteAttrClientId: !!getAttr('_ga_client_id')
      }
    }
  }

  const transactionId =
    order?.id?.toString()
    || order?.name?.toString()
    || order?.order_number?.toString()

  if (!transactionId) {
    return { sent: false, reason: 'missing_transaction_id' }
  }

  const customer = order?.customer || {}
  const billing = order?.billing_address || {}
  const shipping = order?.shipping_address || {}

  const email = order?.email || order?.contact_email || customer?.email
  const phone =
    billing?.phone || shipping?.phone || customer?.phone || order?.phone

  const normalizedUser = normalizeUserData({
    email,
    phone,
    firstName: billing?.first_name || customer?.first_name,
    lastName: billing?.last_name || customer?.last_name,
    city: billing?.city,
    region: billing?.province,
    postalCode: billing?.zip,
    country: billing?.country_code
  })

  const lineItems = Array.isArray(order?.line_items) ? order.line_items : []
  const items: AnalyticsItem[] = lineItems
    .map((item: any) => ({
      item_id:
        item?.sku
        || item?.variant_id?.toString()
        || item?.product_id?.toString(),
      item_name: item?.title || item?.name,
      quantity: Number(item?.quantity) || 1,
      price: item?.price !== undefined ? Number(item.price) : undefined,
      item_variant: item?.variant_title,
      item_brand: item?.vendor
    }))
    .filter((item: AnalyticsItem) => Boolean(item.item_id || item.item_name))

  if (!items.length) {
    return {
      sent: false,
      reason: 'missing_items',
      details: { lineItemsCount: lineItems.length }
    }
  }

  const computedValue = items.reduce((sum, item) => {
    const price = Number(item.price ?? 0)
    const quantity = Number(item.quantity ?? 1)
    return sum + price * quantity
  }, 0)

  const currency = typeof order?.currency === 'string' ? order.currency : 'NOK'
  const tax = Number(order?.total_tax ?? 0)
  const shippingCost = Number(
    order?.total_shipping_price_set?.shop_money?.amount ?? 0
  )
  const coupon = order?.discount_codes?.[0]?.code

  const customerType =
    typeof customer?.orders_count === 'number'
      ? customer.orders_count === 1
        ? 'new'
        : 'returning'
      : undefined

  const res = await trackServerEvent(
    {
      name: 'purchase',
      params: {
        transaction_id: transactionId,
        value: computedValue,
        currency,
        tax,
        shipping: shippingCost,
        ...(coupon ? { coupon } : {}),
        ...(customerType ? { customer_type: customerType } : {}),
        items
      }
    },
    {
      clientId,
      sessionId,
      userId: customer?.id?.toString(),
      userData: normalizedUser,
      userProperties: {
        ...(customerType ? { customer_tier: customerType } : {}),
        ...(typeof customer?.orders_count === 'number'
          ? { purchase_count: customer.orders_count }
          : {})
      },
      userAgent: order?.client_details?.user_agent,
      ipOverride: order?.browser_ip,
      debugMode: process.env.GA_MP_DEBUG === '1'
    }
  )

  if (!res.ok) {
    if (res.reason === 'missing_credentials') {
      return { sent: false, reason: 'missing_credentials' }
    }

    if (res.reason === 'missing_client_id') {
      return { sent: false, reason: 'missing_client_id' }
    }

    return {
      sent: false,
      reason: 'ga_error',
      details: { status: res.status, details: res.details }
    }
  }

  return { sent: true }
}