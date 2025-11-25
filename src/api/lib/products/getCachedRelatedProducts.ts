// Path: src/api/lib/products/getCachedRelatedProducts.ts
'use server'

import { fetchProducts } from '@/api/lib/products/getProducts' // Bruker fetchProducts direkte for å unngå dobbel-wrapping av cache-objektet i getProducts
import { getRelatedProducts } from '@/hooks/getRelatedProducts' // Gjenbruker logikken din
import { cacheLife, cacheTag } from 'next/cache'
import { TAGS } from '@/api/constants'
import type { ShopifyProduct } from '@types'

export async function getCachedRelatedProducts(
  currentHandle: string,
  limit: number = 12
): Promise<ShopifyProduct[]> {
  'use cache'
  cacheLife('days')
  cacheTag(TAGS.products)

  const allProducts = await fetchProducts({ first: 10 })
  const related = getRelatedProducts(allProducts, currentHandle, limit)

  return related
}
