import { useQuery } from '@tanstack/react-query'
import {
  allProductsOptions,
  productOptions
} from '@/api/lib/products/productOptions'
import { useVariantState } from '@/hooks/useVariantState'
import { reshapeProductWithMetafields } from '@/hooks/useProductWithMetafields'
import { getRelatedProducts } from '@/hooks/getRelatedProducts'
import { createSwatchColorMap } from '@/hooks/createSwatchColorMap'
import { computeVariantImages } from '@/lib/utils/computeVariantImages'
import type { ShopifyProductVariant } from '@types'

export function useProductPage(handle: string) {
  const { data: productData, isLoading: isProductLoading } = useQuery(
    productOptions(handle)
  )
  const { data: allProducts } = useQuery(allProductsOptions())

  const productWithMetafields = reshapeProductWithMetafields(productData)

  const { variantState, updateVariant, allVariants } = useVariantState(
    productWithMetafields
  )

  const relatedProducts = getRelatedProducts(allProducts, handle, 4)
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
