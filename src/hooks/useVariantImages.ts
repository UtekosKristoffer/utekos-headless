// Path: src/hooks/useVariantImages.ts
import { useMemo } from 'react'
import { computeVariantImages } from '@/lib/utils/computeVariantImages'
import type { ShopifyProduct, ShopifyProductVariant } from '@types'

export function useVariantImages(
  product: ShopifyProduct | undefined,
  selectedVariant: ShopifyProductVariant | null
) {
  return useMemo(() => {
    if (!product) return []

    return computeVariantImages(product, selectedVariant)
  }, [product, selectedVariant])
}
