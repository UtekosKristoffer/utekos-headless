// Path: src/components/analytics/Klaviyo/KlaviyoViewedProduct.tsx
'use client'

import { useEffect } from 'react'
import type { ShopifyProduct, ShopifyProductVariant } from '@types'

interface KlaviyoViewedProductProps {
  product: ShopifyProduct
  selectedVariant?: ShopifyProductVariant | null
}

declare global {
  interface Window {
    klaviyo: any[]
  }
}

export function KlaviyoViewedProduct({
  product,
  selectedVariant
}: KlaviyoViewedProductProps) {
  useEffect(() => {
    const klaviyo = (window.klaviyo = window.klaviyo || [])

    const item = {
      Title: product.title,
      ItemId: selectedVariant?.id || product.id,
      ImageUrl: selectedVariant?.image?.url || product.featuredImage?.url || '',
      Url: window.location.href,
      Metadata: {
        Brand: product.vendor,
        Price:
          selectedVariant?.price?.amount
          || product.priceRange.minVariantPrice.amount,
        CompareAtPrice: selectedVariant?.compareAtPrice?.amount || undefined
      }
    }

    klaviyo.push(['track', 'Viewed Product', item])

    klaviyo.push([
      'trackViewedItem',
      {
        Title: item.Title,
        ItemId: item.ItemId,
        ImageUrl: item.ImageUrl,
        Url: item.Url,
        Metadata: item.Metadata
      }
    ])
  }, [product, selectedVariant]) // Kjøres på nytt når produkt eller variant endres

  return null
}
