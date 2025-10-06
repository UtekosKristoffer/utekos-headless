// Path: src/api/lib/products/getProduct.ts
'use server'
import { getProductQuery } from '@/api/graphql/queries/products'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import { reshapeProduct } from '@/lib/utils/reshapeProduct'
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife
} from 'next/cache'
import { TAGS } from '@/api/constants'
import type { ShopifyProduct, ShopifyProductOperation } from '@types'

export async function getProduct(
  handle: string
): Promise<ShopifyProduct | null> {
  'use cache'
  cacheTag(TAGS.products)
  cacheLife('days')
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    variables: {
      handle
    }
  })

  if (!res.success) {
    throw new Error(
      res.error.errors[0]?.message ?? `Failed to fetch product: ${handle}`
    )
  }

  const rawProduct = res.body.product
  if (!rawProduct) {
    return null
  }

  return reshapeProduct(rawProduct)
}
