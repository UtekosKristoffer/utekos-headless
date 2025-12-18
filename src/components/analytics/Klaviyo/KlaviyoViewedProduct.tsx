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
    if (!window.klaviyo) return

    const item = {
      ProductName: product.title,
      ProductID: product.id,
      SKU: selectedVariant?.sku || product.id,
      Categories: product.collections?.nodes?.map((c: any) => c.title) || [],
      ImageURL: selectedVariant?.image?.url || product.featuredImage?.url || '',
      URL: window.location.origin + window.location.pathname,
      Brand: product.vendor,
      Price:
        selectedVariant?.price?.amount
        || product.priceRange.minVariantPrice.amount,
      CompareAtPrice: selectedVariant?.compareAtPrice?.amount || undefined
    }

    // Tracker selve visningen for "Browse Abandonment" flows
    window.klaviyo.track('Viewed Product', item)

    // Populerer "Recently Viewed Items"-tabellen i profilen
    window.klaviyo.trackViewedItem({
      Title: item.ProductName,
      ItemId: item.ProductID,
      Categories: item.Categories,
      ImageUrl: item.ImageURL,
      Url: item.URL,
      Metadata: {
        Brand: item.Brand,
        Price: item.Price,
        CompareAtPrice: item.CompareAtPrice
      }
    })
  }, [product, selectedVariant])

  return null
}
