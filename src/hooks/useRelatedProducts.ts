/*eslint-disable max-params*/

import { useMemo } from 'react'
import type { ShopifyProduct } from '@types'

export function useRelatedProducts(
  allProducts: ShopifyProduct[],
  currentHandle: string,
  limit?: number
) {
  return useMemo(() => {
    const filtered = allProducts.filter(p => p.handle !== currentHandle)
    return limit ? filtered.slice(0, limit) : filtered
  }, [allProducts, currentHandle, limit])
}
