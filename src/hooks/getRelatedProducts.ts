// Path: src/hooks/getRelatedProducts.ts

import type { ShopifyProduct } from '@types'

export function getRelatedProducts(
  allProducts: ShopifyProduct[] | undefined,
  currentHandle: string,
  limit?: number
): ShopifyProduct[] {
  if (!allProducts) {
    return []
  }

  const filteredProducts = allProducts.filter(p => p.handle !== currentHandle)
  return limit ? filteredProducts.slice(0, limit) : filteredProducts
}
