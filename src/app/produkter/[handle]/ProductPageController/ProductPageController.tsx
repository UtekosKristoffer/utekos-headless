// Path: src/app/produkter/[handle]/ProductPageController/ProductPageController.tsx
'use client'

import { useProductPage } from '@/hooks/useProductPage'
import ProductPageView from '@/app/produkter/[handle]/ProductPageView/ProductPageView'
import { ProductPageSkeleton } from '../ProductPageSkeleton/ProductPageSkeleton'
import type { ShopifyProduct } from '@types'
import { MetaProductView } from '@/components/analytics/MetaPixel/MetaProductView'
import { trackViewedProduct } from '@/components/analytics/Klaviyo/TrackViewedItem'
import { useEffect } from 'react'

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

  useEffect(() => {
    if (productData) {
      trackViewedProduct(productData)
    }
  }, [productData])
  if (isLoading || !productData || !selectedVariant) {
    return <ProductPageSkeleton />
  }

  return (
    <>
      <MetaProductView
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
