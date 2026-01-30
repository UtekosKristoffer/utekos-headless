'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { useAnalytics } from '@/hooks/useAnalytics'
import type { ShopifyProduct, ShopifyProductVariant } from '@types'

interface MetaProductViewProps {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant
}

export function MetaProductView({
  product,
  selectedVariant
}: MetaProductViewProps) {
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

    trackEvent(
      'ViewContent',
      {
        value: price,
        currency: currency,
        content_ids: [contentId],
        content_type: 'product',
        content_name: product.title
      },
      { eventID: eventId }
    )

    if (typeof window !== 'undefined' && window.snaptr) {
      window.snaptr('track', 'VIEW_CONTENT', {
        item_ids: [contentId],
        price: price,
        currency: currency,
        description: product.title,
        item_category: product.productType || 'Apparel' // Sender kategori hvis tilgjengelig, ellers fallback
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
