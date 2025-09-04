// Path: src/lib/helpers/products/fetchProducts.ts

/**
 * @fileoverview Server-side product fetching with Zod v4 + zod-validation-error integration.
 * @module lib/helpers/products/fetchProducts
 */

import { unstable_cache, revalidateTag } from 'next/cache'

import { storefrontClient } from '@/clients/storefrontApiClient'
import { handleShopifyErrors } from '@/lib/errors/handleShopifyErrors'
import { normalizeProduct } from '@/lib/helpers/normalizers/normalizeProduct'
import { validateProductIds } from '@/lib/helpers/validations/validateProductIds'
import { productsQuery } from '@/lib/queries/productsQuery'

import type { ProductsQueryResponse, ShopifyProduct } from '@/types/products'

type ShopifyProductsResponse = {
  products: {
    edges: Array<{
      node: ProductsQueryResponse
    }>
  }
}

export const executeProductsQuery = async (
  productIds: string[]
): Promise<{ data?: ShopifyProductsResponse; errors?: unknown }> =>
  storefrontClient.request<ShopifyProductsResponse>(productsQuery, {
    variables: { productIds }
  })

const extractProductNodes = (
  data: ShopifyProductsResponse | undefined
): ProductsQueryResponse[] => {
  if (!data?.products?.edges) return []
  return data.products.edges.map(edge => edge.node)
}

const normalizeProducts = (
  products: ProductsQueryResponse[]
): ShopifyProduct[] => products.map(normalizeProduct)

const fetchProductsInternal = async (
  ids: string[]
): Promise<ShopifyProduct[]> => {
  const validatedIds = validateProductIds(ids)
  const { data, errors } = await executeProductsQuery(validatedIds)

  if (errors) {
    handleShopifyErrors(errors)
  }

  const productNodes = extractProductNodes(data)
  return normalizeProducts(productNodes)
}

/**
 * Cached product fetching
 * @param ids - Array of product IDs to fetch
 * @returns Promise resolving to normalized Product array
 */
export const fetchProducts = unstable_cache(
  async (ids: string[]): Promise<ShopifyProduct[]> => {
    try {
      return await fetchProductsInternal(ids)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[fetchProducts]', { ids, error })
      }
      return []
    }
  },
  revalidateTag('products'),
  { revalidate: 3600 }
)

/**
 * Fetches and normalizes products. Designed for client-side use with libraries like TanStack Query.
 * Throws an error if validation or fetching fails.
 * @param ids - Array of product IDs to fetch
 * @returns Promise resolving to a normalized Product array
 */
export const getProducts = async (ids: string[]): Promise<ShopifyProduct[]> => {
  return fetchProductsInternal(ids)
}

/**
 * Fetches a single product by ID
 * @param id - Product ID to fetch
 * @returns Promise resolving to Product or null
 */
export const fetchProduct = async (
  id: string
): Promise<ShopifyProduct | null> => {
  const products = await fetchProducts([id])
  return products[0] ?? null
}

export default fetchProducts
