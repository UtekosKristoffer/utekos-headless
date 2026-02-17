import type { OrderPaid } from 'types/api/webhooks/OrderPaid'
import type { UnifiedAnalyticsEvent } from '@/modules/analytics/domain/types/events/UnifiedAnalyticsEvent'
import type { AttributionSnapshot } from '@/modules/analytics/domain/types/attribution/AttributionSnapshot'
import { ensureString, ensureNumber } from '@/lib/utils/ensure'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'

export function mapShopifyOrderToUnifiedEvent(
  order: OrderPaid,
  attribution: AttributionSnapshot | null
): UnifiedAnalyticsEvent {
  const signals = attribution?.attributionSignals

  const email =
    ensureString(order.email)
    || ensureString(order.contact_email)
    || ensureString(signals?.email)

  const phone =
    ensureString(order.phone)
    || ensureString(order.shipping_address?.phone)
    || ensureString(order.billing_address?.phone)
    || ensureString(signals?.phone)

  const firstName =
    ensureString(order.shipping_address?.first_name)
    || ensureString(order.billing_address?.first_name)
    || ensureString(signals?.firstName)

  const lastName =
    ensureString(order.shipping_address?.last_name)
    || ensureString(order.billing_address?.last_name)
    || ensureString(signals?.lastName)

  const city =
    ensureString(order.shipping_address?.city) || ensureString(signals?.city)
  const state =
    ensureString(order.shipping_address?.province)
    || ensureString(signals?.state)
  const zip =
    ensureString(order.shipping_address?.zip) || ensureString(signals?.zip)
  const country =
    ensureString(order.shipping_address?.country_code)
    || ensureString(signals?.country)

  const clientIp =
    ensureString(order.browser_ip) || ensureString(signals?.clientIpAddress)

  const userAgent =
    ensureString(order.client_details?.user_agent)
    || ensureString(signals?.clientUserAgent)

  const resolvedExternalId =
    ensureString(signals?.externalId) || cleanShopifyId(order.customer?.id)

  // LOGIKK FOR Å PARSE GA SESSION ID
  let parsedGaSessionId: number | undefined
  if (signals?.gaSessionId) {
    const parsed = parseInt(signals.gaSessionId, 10)
    if (!isNaN(parsed)) {
      parsedGaSessionId = parsed
    }
  }

  const items = order.line_items.map(item => {
    const itemId =
      cleanShopifyId(item.variant_id)
      || cleanShopifyId(item.product_id)
      || 'unknown_item'

    return {
      item_id: itemId,
      quantity: item.quantity,
      price: ensureNumber(item.price) || 0,

      ...(ensureString(item.title) && { item_name: ensureString(item.title) }),
      ...(ensureString(item.vendor) && {
        item_brand: ensureString(item.vendor)
      }),
      ...(ensureString(item.variant_title) && {
        item_variant: ensureString(item.variant_title)
      })
      // Fjernet item_variant_id da den ikke lå i ItemSchemaet ditt,
      // legg den til i schema hvis du trenger den.
    }
  })

  return {
    eventName: 'Purchase',

    eventId: `shopify_order_${cleanShopifyId(order.id)}`,
    occurredAt: Math.floor(new Date(order.created_at).getTime() / 1000),

    sourceUrl:
      ensureString(order.order_status_url)
      || ensureString(attribution?.checkoutUrl)
      || 'https://utekos.no',

    user: {
      ...(email && { email }),
      ...(phone && { phone }),
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(clientIp && { clientIp }),
      ...(userAgent && { userAgent }),

      ...(city && { city }),
      ...(state && { state }),
      ...(zip && { zip }),
      ...(country && { country }), // Endret fra countryCode til country for å matche schema

      ...(ensureString(signals?.emailHash) && {
        emailHash: ensureString(signals?.emailHash)
      }),

      ...(resolvedExternalId && { externalId: resolvedExternalId }),

      ...(ensureString(signals?.fbp) && { fbp: ensureString(signals?.fbp) }),
      ...(ensureString(signals?.fbc) && { fbc: ensureString(signals?.fbc) }),

      ...(ensureString(signals?.gaClientId) && {
        gaClientId: ensureString(signals?.gaClientId)
      }),

      // Bruker den parsede number-versjonen
      ...(parsedGaSessionId && {
        gaSessionId: parsedGaSessionId
      }),

      ...(ensureString(signals?.ttclid) && {
        ttclid: ensureString(signals?.ttclid)
      }),
      ...(ensureString(signals?.ttp) && { ttp: ensureString(signals?.ttp) }),

      ...(ensureString(signals?.epik) && { epik: ensureString(signals?.epik) }),

      ...(ensureString(signals?.scid) && { scid: ensureString(signals?.scid) }),
      ...(ensureString(signals?.clickId) && {
        clickId: ensureString(signals?.clickId)
      })
    },

    data: {
      currency: (ensureString(order.currency) || 'NOK') as any,
      transactionId: cleanShopifyId(order.id),
      value: ensureNumber(order.total_price) || 0,

      ...(ensureNumber(order.total_tax) !== undefined && {
        tax: ensureNumber(order.total_tax)
      }),
      ...(ensureNumber(order.total_shipping_price_set?.shop_money?.amount)
        !== undefined && {
        shipping: ensureNumber(order.total_shipping_price_set.shop_money.amount)
      }),

      items: items,
      contentIds: items.map(i => i.item_id)
    }
  }
}
