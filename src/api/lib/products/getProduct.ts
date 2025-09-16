// Path: src/api/lib/products/getProduct.ts
import { TAGS } from '@/api/constants'
import { getProductQuery } from '@/api/graphql/queries/products'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import type { ShopifyProduct, ShopifyProductOperation } from '@types'
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag
} from 'next/cache'

export async function getProduct(
  handle: string
): Promise<ShopifyProduct | undefined> {
  'use cache'
  cacheTag(TAGS.products)
  cacheLife('days')

  const response = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    variables: {
      handle
    }
  })
  return response.body.data.product
}
