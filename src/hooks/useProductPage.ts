import { useQuery } from '@tanstack/react-query'
import {
  allProductsOptions,
  productOptions
} from '@/api/lib/products/productOptions'
import { useVariantState } from '@/hooks/useVariantState'
import { useProductWithMetafields } from '@/hooks/useProductWithMetafields'
import { useRelatedProducts } from '@/hooks/useRelatedProducts'
import { useSwatchColorMap } from '@/hooks/useSwatchColorMap'
import { useVariantImages } from '@/hooks/useVariantImages'
import type { ShopifyProductVariant } from '@types'

export function useProductPage(handle: string) {
  const { data: productData, isLoading } = useQuery(productOptions(handle))
  const { data: allProducts } = useQuery(allProductsOptions())

  const productWithMetafields = useProductWithMetafields(productData)
  const { variantState, updateVariant, allVariants } = useVariantState(
    productWithMetafields
  )
  const relatedProducts = useRelatedProducts(allProducts, handle)
  const swatchColorMap = useSwatchColorMap(productWithMetafields)
  const selectedVariant: ShopifyProductVariant | null =
    variantState.status === 'selected' ? variantState.variant : null
  const variantImages = useVariantImages(productWithMetafields, selectedVariant)

  return {
    productData: productWithMetafields,
    selectedVariant,
    allVariants,
    variantImages,
    updateVariant,
    relatedProducts,
    swatchColorMap,
    isLoading: isLoading || !selectedVariant,
    isUpdating: !selectedVariant && !isLoading
  }
}
