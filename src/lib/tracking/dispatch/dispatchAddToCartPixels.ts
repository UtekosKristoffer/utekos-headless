// Path: src/lib/tracking/pixels/dispatchAddToCartPixels.ts

import { logAttribution } from '@/lib/tracking/log/logAttribution'
import type { DispatchPixelsOptions } from '@types'

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

  if (window.snaptr) {
    window.snaptr('track', 'ADD_CART', {
      item_ids: contentIds,
      price: value,
      currency: currency,
      number_items: totalQty,
      description: contentName,
      item_category: product.productType || 'Apparel',
      client_dedup_id: eventID // <--- MÅ MED!
    })
  }

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

  if (window.ttq) {
    window.ttq.track(
      'AddToCart',
      {
        content_type: 'product',
        content_id: mainVariantId,
        content_name: contentName,
        value,
        currency,
        quantity: totalQty
      },
      { event_id: eventID }
    )
  }

  if (window.pintrk) {
    const pinItems = [
      {
        product_name: product.title,
        product_id: mainVariantId,
        product_category: product.productType || 'Apparel',
        product_price: eventData.contents[0]?.item_price ?? 0,
        product_quantity: eventData.contents[0]?.quantity
      }
    ]

    if (contents.length > 1 && contents[1]) {
      pinItems.push({
        product_name: 'Utekos Buff™',
        product_id: contents[1]?.id,
        product_category: 'Apparel',
        product_price: 0,
        product_quantity: contents[1]?.quantity
      })
    }

    window.pintrk('track', 'AddToCart', {
      value,
      order_quantity: totalQty,
      currency,
      line_items: pinItems,
      event_id: eventID
    })
  }
}
