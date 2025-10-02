// Path: src/api/lib/products/getProducts.ts
'use server'
import { getProductsQuery } from '@/api/graphql/queries/products'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import { removeEdgesAndNodes } from '@/lib/utils/removeEdgesAndNodes'
import { reshapeProducts } from '@/lib/utils/reshapeProducts'
import type {
  GetProductsParams,
  ShopifyProduct,
  ShopifyProductsOperation,
  GetProductsResponse
} from '@types'

export async function fetchProducts(
  params: GetProductsParams = {}
): Promise<ShopifyProduct[]> {
  const variables = {
    first: 6,
    ...params
  }

  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    variables
  })

  if (!res.success) {
    throw new Error(
      res.error.errors[0]?.message ?? 'Failed to fetch products from Shopify.'
    )
  }

  if (!res.body.products) {
    throw new Error('Invalid response structure from Shopify')
  }

  const rawProducts = removeEdgesAndNodes(res.body.products)
  return reshapeProducts(rawProducts)
}

export async function getProducts(
  params: GetProductsParams = {}
): Promise<GetProductsResponse> {
  try {
    const products = await fetchProducts(params)
    return {
      success: true,
      status: 200,
      body: products
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred'
    console.error('getProducts failed:', errorMessage)
    return {
      success: false,
      status: 500, // Eller annen relevant feilkode
      error: errorMessage
    }
  }
}
