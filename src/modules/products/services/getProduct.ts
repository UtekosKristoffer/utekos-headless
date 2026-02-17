// Path: src/api/lib/products/getProduct.ts

import 'server-only'
import { getProductQuery } from '@/modules/products/graphql/queries'
import { fetchShopify } from '@/lib/shopify/fetchShopify'
import { reshapeProduct } from '@/lib/utils/reshapeProduct'
import { cacheTag, cacheLife } from 'next/cache'
import { TAGS } from '@/constants'
import type { ShopifyProduct, ShopifyProductOperation } from '@types'

export async function getProduct(
  handle: string
): Promise<ShopifyProduct | null> {
  'use cache'
  cacheTag(TAGS.products)
  cacheLife('days')

  const res = await fetchShopify<ShopifyProductOperation>({
    query: getProductQuery,
    variables: { handle }
  })
  if (!res.success)
    throw new Error(
      res.error.errors[0]?.message ?? `Failed to fetch product: ${handle}`
    )
  const rawProduct = res.body.product
  if (!rawProduct) return null
  return reshapeProduct(rawProduct)
}
