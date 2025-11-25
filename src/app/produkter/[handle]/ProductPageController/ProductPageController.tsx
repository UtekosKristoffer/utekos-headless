// Path: src/app/produkter/[handle]/ProductPageController.tsx
'use client'

import { useProductPage } from '@/hooks/useProductPage'
import ProductPageView from '@/app/produkter/[handle]/ProductPageView/ProductPageView'
import { ProductPageSkeleton } from '../ProductPageSkeleton/ProductPageSkeleton'
import type { ShopifyProduct } from '@types'

interface ProductPageControllerProps {
  handle: string
  initialRelatedProducts: ShopifyProduct[]
}

export function ProductPageController({
  handle,
  initialRelatedProducts
}: ProductPageControllerProps) {
  const {
    productData,
    selectedVariant,
    allVariants,
    variantImages,
    updateVariant,
    relatedProducts, // Dette er nå bare en gjennomgang av de vi sendte inn
    swatchColorMap,
    isLoading
  } = useProductPage(handle, initialRelatedProducts) // <-- Sender dataene inn her

  if (isLoading || !productData || !selectedVariant) {
    return <ProductPageSkeleton />
  }

  return (
    <ProductPageView
      productData={productData}
      selectedVariant={selectedVariant}
      allVariants={allVariants}
      variantImages={variantImages}
      onOptionChange={updateVariant}
      relatedProducts={relatedProducts}
      colorHexMap={swatchColorMap}
    />
  )
}
