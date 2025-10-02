// Path: src/hooks/useProductPage.ts
import { useSuspenseQuery } from '@tanstack/react-query'
import {
  allProductsOptions,
  productOptions
} from '@/api/lib/products/productOptions'
import { useVariantState } from '@/hooks/useVariantState'
import { useProductWithMetafields } from '@/hooks/useProductWithMetafields'
import { useSwatchColorMap } from './useSwatchColorMap'
import { useRelatedProducts } from './useRelatedProducts'
import { useVariantImages } from './useVariantImages'
import type { ShopifyProductVariant } from '@types'

export function useProductPage(handle: string) {
  const { data: productData } = useSuspenseQuery(productOptions(handle))
  const { data: allProducts } = useSuspenseQuery(allProductsOptions())
  const productWithMetafields = useProductWithMetafields(productData)
  const { variantState, updateVariant, allVariants } = useVariantState(
    productWithMetafields
  )
  const relatedProducts = useRelatedProducts(allProducts, handle)
  const swatchColorMap = useSwatchColorMap(productWithMetafields)
  const selectedVariant: ShopifyProductVariant | null =
    variantState.status === 'selected' ? variantState.variant : null
  const variantImages = useVariantImages(productWithMetafields, selectedVariant)
  const isLoading = !productWithMetafields?.variants?.edges?.length
  const isUpdating = !selectedVariant

  return {
    productData: productWithMetafields,
    selectedVariant,
    allVariants,
    variantImages,
    updateVariant,
    relatedProducts,
    swatchColorMap,
    isLoading,
    isUpdating
  }
}
