'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { useAnalytics } from '@/hooks/useAnalytics'
import type { ShopifyProduct, ShopifyProductVariant } from '@types'

interface ProductViewProps {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant
}

export function ProductViewTracking({
  product,
  selectedVariant
}: ProductViewProps) {
  const pathname = usePathname()
  const eventFired = useRef<string | null>(null)
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    const contentId = cleanShopifyId(selectedVariant.id) || selectedVariant.id
    const uniqueKey = `${pathname}-${contentId}`
    if (eventFired.current === uniqueKey) return
    eventFired.current = uniqueKey

    const eventId = generateEventID()
    const price = parseFloat(selectedVariant.price.amount)
    const currency = selectedVariant.price.currencyCode
    const category = product.productType || 'Apparel'

    trackEvent(
      'ViewContent',
      {
        value: price,
        currency: currency,
        content_ids: [contentId],
        content_type: 'product',
        content_name: product.title,
        content_category: category
      },
      { eventID: eventId }
    )

    if (typeof window !== 'undefined' && window.snaptr) {
      window.snaptr('track', 'VIEW_CONTENT', {
        item_ids: [contentId],
        price: price,
        currency: currency,
        description: product.title,
        item_category: category
      })
    }

    if (typeof window !== 'undefined' && window.pintrk) {
      window.pintrk?.('track', 'PageVisit', {
        line_items: [
          {
            product_id: contentId,
            product_name: product.title,
            product_price: price,
            product_category: category,
            product_quantity: 1
          }
        ]
      })
    }

    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track(
        'ViewContent',
        {
          content_type: 'product',
          content_id: contentId,
          content_name: product.title,
          content_category: category,
          value: price,
          currency: currency,
          description: product.title,
          quantity: 1
        },
        { event_id: eventId }
      )
    }
  }, [
    pathname,
    product.title,
    product.productType,
    selectedVariant.id,
    selectedVariant.price,
    trackEvent
  ])

  return null
}
