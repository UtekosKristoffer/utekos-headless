// Path: src/app/produkter/[handle]/ProductPageController/ProductPageController.tsx
'use client'

import { useProductPage } from '@/hooks/useProductPage'
import { ProductPageView } from '@/app/produkter/[handle]/components/ProductPageView'
import { ProductPageSkeleton } from './ProductPageSkeleton'
import type { ShopifyProduct } from 'types/product'
import { ProductViewTracking } from '@/components/analytics/ProductViewTracking'

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
    relatedProducts,
    swatchColorMap,
    isLoading
  } = useProductPage(handle, initialRelatedProducts)

  if (isLoading || !productData || !selectedVariant) {
    return <ProductPageSkeleton />
  }

  return (
    <>
      <ProductViewTracking
        product={productData}
        selectedVariant={selectedVariant}
      />

      <ProductPageView
        productData={productData}
        selectedVariant={selectedVariant}
        allVariants={allVariants}
        variantImages={variantImages}
        onOptionChange={updateVariant}
        relatedProducts={relatedProducts}
        colorHexMap={swatchColorMap}
      />
    </>
  )
}
