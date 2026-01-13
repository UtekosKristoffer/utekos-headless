// Path: src/components/analytics/MetaPixel/MetaProductView.tsx

'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID' // VIKTIG: Gjeninnført
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

    // VIKTIG: Vi genererer ID-en her for full kontroll (ingen .replace('evt_', 'track_'))
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
      { eventID: eventId } // Sender ID-en eksplisitt
    )
  }, [
    pathname,
    product.title,
    selectedVariant.id,
    selectedVariant.price,
    trackEvent
  ])

  return null
}
