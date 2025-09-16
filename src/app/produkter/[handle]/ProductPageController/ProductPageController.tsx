'use client'

import ProductPageView from '@/app/produkter/[handle]/ProductPageView/ProductPageView'
import { useVariantState } from '@/hooks/useVariantState'
import { computeVariantImages } from '@/lib/utils/computeVariantImages'
import type { ProductControllerProps, ShopifyProductVariant } from '@types'

export function ProductPageController({ productData }: ProductControllerProps) {
  const { variantState, updateVariant, allVariants } =
    useVariantState(productData)

  if (!productData?.variants?.edges?.length) {
    return <div>Laster produktdata...</div>
  }

  const selectedVariant: ShopifyProductVariant | null =
    variantState.status === 'selected' ? variantState.variant : null
  console.log('Valgt variant som sendes til view:', selectedVariant)
  if (!selectedVariant) {
    return <div>Oppdaterer...</div>
  }

  const variantImages = computeVariantImages(productData, selectedVariant)

  return (
    <ProductPageView
      productData={productData}
      selectedVariant={selectedVariant}
      allVariants={allVariants}
      variantImages={variantImages}
      onOptionChange={updateVariant}
    />
  )
}
