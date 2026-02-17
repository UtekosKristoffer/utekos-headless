'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { generateEventID } from '@/lib/tracking/utils/generateEventID'
import { useAnalytics } from '@/modules/analytics/client/hooks/useAnalytics'
import type { ProductViewProps } from '@types'
import type { AnalyticsItem } from '@/modules/analytics/domain/schemas/events.schema'

export function ProductViewTracking({
  product,
  selectedVariant
}: ProductViewProps) {
  const pathname = usePathname()
  const eventFired = useRef<string | null>(null)
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    // 1. Establish Strict Data
    const rawVariantId = selectedVariant.id
    const contentId = cleanShopifyId(rawVariantId) || 'unknown_variant'
    const uniqueKey = `${pathname}-${contentId}`

    // Prevent duplicate firing on same view
    if (eventFired.current === uniqueKey) return
    eventFired.current = uniqueKey

    const eventId = generateEventID()
    const price = parseFloat(selectedVariant.price.amount)
    const currency = selectedVariant.price.currencyCode || 'NOK'
    const category = product.productType || 'Apparel'
    const title = product.title

    // 2. Build Strict Analytics Item (The Source of Truth)
    const item: AnalyticsItem = {
      item_id: contentId,
      item_name: title,
      item_brand: product.vendor,
      item_category: category,
      item_variant: selectedVariant.title,
      price: price,
      quantity: 1
    }

    // 3. Fire Unified Event (Meta Pixel + Server CAPI)
    // We pass 'items' strictly so CAPI gets the full picture.
    trackEvent(
      'ViewContent',
      {
        value: price,
        currency: currency,
        content_ids: [contentId],
        content_type: 'product',
        content_name: title,
        content_category: category,
        items: [item] // <-- Critical for GA4/CAPI
      },
      { eventID: eventId }
    )

    // 4. Fire Other Client Pixels (Legacy/Client-Only)
    // We reuse the strictly derived variables to ensure consistency across channels.

    if (typeof window !== 'undefined') {
      // Snapchat
      if (window.snaptr) {
        window.snaptr('track', 'VIEW_CONTENT', {
          item_ids: [contentId],
          price: price,
          currency: currency,
          description: title,
          item_category: category
        })
      }

      // Pinterest
      if (window.pintrk) {
        window.pintrk('track', 'PageVisit', {
          line_items: [
            {
              product_id: contentId,
              product_name: title,
              product_price: price,
              product_category: category,
              product_quantity: 1
            }
          ]
        })
      }

      // TikTok
      if (window.ttq) {
        window.ttq.track(
          'ViewContent',
          {
            content_type: 'product',
            content_id: contentId,
            content_name: title,
            content_category: category,
            value: price,
            currency: currency,
            description: title,
            quantity: 1
          },
          { event_id: eventId }
        )
      }
    }
  }, [
    pathname,
    product.title,
    product.productType,
    product.vendor,
    selectedVariant.id,
    selectedVariant.title,
    selectedVariant.price,
    trackEvent
  ])

  return null
}
