// Path: src/api/lib/products/getProduct.ts
'use server'
import { getProductQuery } from '@/api/graphql/queries/products'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import { reshapeProduct } from '@/lib/utils/reshapeProduct'
import type { ShopifyProduct, ShopifyProductOperation } from '@types'

export async function getProduct(
  handle: string
): Promise<ShopifyProduct | null> {
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
