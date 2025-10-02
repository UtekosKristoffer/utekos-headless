'use client'

import { useProductPage } from '@/hooks/useProductPage'
import ProductPageView from '@/app/produkter/[handle]/ProductPageView/ProductPageView'
import { ProductPageSkeleton } from '../ProductPageSkeleton/ProductPageSkeleton'

export function ProductPageController({ handle }: { handle: string }) {
  const {
    productData,
    selectedVariant,
    allVariants,
    variantImages,
    updateVariant,
    relatedProducts,
    swatchColorMap,
    isLoading,
    isUpdating
  } = useProductPage(handle)

  if (isLoading) {
    return (
      <>
        <div>Laster produktsiden...</div>
        <ProductPageSkeleton />
      </>
    )
  }

  if (isUpdating) {
    return (
      <>
        <div>Oppdaterer...</div>
        <ProductPageSkeleton />
      </>
    )
  }

  return (
    <ProductPageView
      productData={productData!}
      selectedVariant={selectedVariant!}
      allVariants={allVariants}
      variantImages={variantImages}
      onOptionChange={updateVariant}
      relatedProducts={relatedProducts}
      colorHexMap={swatchColorMap}
    />
  )
}
