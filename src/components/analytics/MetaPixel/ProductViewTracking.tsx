'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { useAnalytics } from '@/hooks/useAnalytics'
import type { ShopifyProduct, ShopifyProductVariant } from '@types'

// Endret navn på props interface
interface ProductViewProps {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant
}

// Endret navn på komponent
export function ProductViewTracking({
  product,
  selectedVariant
}: ProductViewProps) {
  const pathname = usePathname()
  const eventFired = useRef<string | null>(null)

  // trackEvent håndterer Meta (Pixel + CAPI) via useAnalytics hooken
  // Husk at vi mappet 'ViewContent' -> 'page_visit' for Pinterest i route.ts
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    // 1. Forbered data
    const contentId = cleanShopifyId(selectedVariant.id) || selectedVariant.id
    const uniqueKey = `${pathname}-${contentId}`

    // Hindre dobbel fyring på samme variant/url
    if (eventFired.current === uniqueKey) return
    eventFired.current = uniqueKey

    const eventId = generateEventID()
    const price = parseFloat(selectedVariant.price.amount)
    const currency = selectedVariant.price.currencyCode
    const category = product.productType || 'Apparel'

    // 2. Meta (Pixel + CAPI)
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

    // 3. Snapchat (Client Tag)
    if (typeof window !== 'undefined' && window.snaptr) {
      window.snaptr('track', 'VIEW_CONTENT', {
        item_ids: [contentId],
        price: price,
        currency: currency,
        description: product.title,
        item_category: category
      })
    }

    // 4. Pinterest (Client Tag)
    // Pinterest anbefaler å sende produktdata som 'line_items' i PageVisit-eventet
    // for å bygge målgrupper.
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
