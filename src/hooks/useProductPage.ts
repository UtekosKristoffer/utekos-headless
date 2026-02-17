// Path: src/hooks/useProductPage.ts
'use client'
import { useQuery } from '@tanstack/react-query'
import { productOptions } from '@/api/lib/products/productOptions'
import { useVariantState } from '@/hooks/useVariantState'
import { reshapeProductWithMetafields } from '@/hooks/useProductWithMetafields'
import { createSwatchColorMap } from '@/hooks/createSwatchColorMap'
import { computeVariantImages } from '@/lib/utils/computeVariantImages'
import type { ShopifyProduct, ShopifyProductVariant } from 'types/product'

export function useProductPage(
  handle: string,
  initialRelatedProducts: ShopifyProduct[]
) {
  const { data: productData, isLoading: isProductLoading } = useQuery(
    productOptions(handle)
  )

  const productWithMetafields = reshapeProductWithMetafields(productData)

  const { variantState, updateVariant, allVariants } = useVariantState(
    productWithMetafields
  )

  const relatedProducts = initialRelatedProducts
  const swatchColorMap = createSwatchColorMap(productWithMetafields)

  const selectedVariant: ShopifyProductVariant | null =
    variantState.status === 'selected' ? variantState.variant : null

  const variantImages =
    productWithMetafields ?
      computeVariantImages(productWithMetafields, selectedVariant)
    : []

  return {
    productData: productWithMetafields,
    selectedVariant,
    allVariants,
    variantImages,
    updateVariant,
    relatedProducts,
    swatchColorMap,
    isLoading: isProductLoading,
    isUpdating: !isProductLoading && variantState.status !== 'selected'
  }
}
