import { logAttribution } from '@/lib/tracking/log/logAttribution'
import { trackMicrosoftUetEvent } from '@/lib/tracking/microsoft-uet/trackMicrosoftUetEvent'
import type { DispatchPixelsOptions } from 'types/cart'

export function dispatchAddToCartPixels({
  eventData,
  product,
  selectedVariant
}: DispatchPixelsOptions): void {
  const {
    eventID,
    contentName,
    contentIds,
    contents,
    value,
    currency,
    totalQty,
    mainVariantId
  } = eventData

  logAttribution(contentName, value)

  if (typeof window === 'undefined') return

  if (window.dataLayer) {
    const ga4Items = [
      {
        item_id: mainVariantId,
        item_name: product.title,
        item_variant: selectedVariant.title,
        price: eventData.contents[0]?.item_price ?? 0,
        quantity: eventData.contents[0]?.quantity
      }
    ]
    if (contents.length > 1 && contents[1]) {
      ga4Items.push({
        item_id: contents[1].id,
        item_name: product.title,
        item_variant: 'Utekos Buff™',
        price: 0,
        quantity: contents[1].quantity
      })
    }

    window.dataLayer.push({
      event: 'add_to_cart',
      ecommerce: { currency, value, items: ga4Items }
    })
  }

  trackMicrosoftUetEvent({
    category: 'ecommerce',
    action: 'add_to_cart',
    label: contentName,
    value: totalQty,
    revenueValue: value,
    currency,
    productId: contentIds,
    pageType: 'cart',
    eventId: eventID
  })

  if (window.fbq) {
    window.fbq(
      'track',
      'AddToCart',
      {
        content_name: contentName,
        content_ids: contentIds,
        content_type: 'product',
        value,
        currency,
        contents,
        num_items: totalQty
      },
      { eventID }
    )
  }
}
