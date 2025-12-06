// Path: src/api/lib/products/getProduct.ts
import 'server-only' // <--- LEGG TIL DENNE!
import { getProductQuery } from '@/api/graphql/queries/products'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import { reshapeProduct } from '@/lib/utils/reshapeProduct'
import { cacheTag, cacheLife } from 'next/cache'
import { TAGS } from '@/api/constants'
import type { ShopifyProduct, ShopifyProductOperation } from '@types'

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  'use cache'
  cacheTag(TAGS.products)
  cacheLife('days')

  const res = await shopifyFetch<ShopifyProductOperation>({ query: getProductQuery, variables: { handle } })
  if (!res.success) throw new Error(res.error.errors[0]?.message ?? `Failed to fetch product: ${handle}`)
  const rawProduct = res.body.product
  if (!rawProduct) return null
  return reshapeProduct(rawProduct)
}