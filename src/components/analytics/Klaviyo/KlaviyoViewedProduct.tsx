'use client'

import { useEffect } from 'react'
import type { ShopifyProduct, ShopifyProductVariant } from '@types'

export function KlaviyoViewedProduct({
  product,
  selectedVariant
}: {
  product: ShopifyProduct
  selectedVariant?: ShopifyProductVariant | null
}) {
  useEffect(() => {
    const _learnq = (window as any)._learnq || []

    const item = {
      Name: product.title,
      ProductID: product.id,
      ImageURL: selectedVariant?.image?.url || product.featuredImage?.url || '',
      URL: window.location.origin + window.location.pathname,
      Brand: product.vendor,
      Price:
        selectedVariant?.price?.amount
        || product.priceRange.minVariantPrice.amount,
      Metadata: {
        VariantID: selectedVariant?.id
      }
    }

    _learnq.push(['track', 'Viewed Product', item])
  }, [product, selectedVariant])

  return null
}
