// Path: src/app/(products)/products/(handle)/Products.tsx
'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useVariantState } from '@/useHooks/useVariantState' 
import { computeVariantImages } from '@/lib/utils'
import { productOptions } from '@/lib/helpers/products/productOptions'
import type { ShopifyProduct, ShopifyProductVariant } from '@/types/products'
import ProductPageView from './ProductPageView'

type ProductProps = {
  productId: string
}

/**
 * @module components/ProductPageController
 * @param ProductPageController Exists to own and manage everything that is dynamic and interactive – anything that changes after the page loads.
 * Acts as a link. Retrieves the latest data from the TanStack Query cache and "translates" it into simple props that component ProductPageView understand and display.
 */
export function ProductPageController({ productId }: ProductProps) {
  const { data: products } = useSuspenseQuery(productOptions([productId]))
  const product: ShopifyProduct = products[0]!
  const { variantState, updateVariant, allVariants } = useVariantState(product)
  const selectedVariant: ShopifyProductVariant| null =
    variantState.status === 'selected' ? variantState.variant : null
  const variantImages = computeVariantImages(product, selectedVariant)

  if (!selectedVariant) {
    return <div>Velger produktvariant...</div>
  }

  return (
    <ProductPageView
      product={product}
      selectedVariant={selectedVariant}
      allVariants={allVariants}
      variantImages={variantImages}
      onOptionChange={updateVariant}
    />
  )
}
