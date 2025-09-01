// Path: src/lib/helpers/fetchProducts.ts

/**
 * @fileoverview Server-side product fetching with Zod v4 + zod-validation-error integration.
 *
 * This module provides type-safe product data fetching from the Shopify Storefront API.
 * It integrates with the centralized error mapping system and provides consistent
 * error handling with Norwegian error messages.
 *
 * @module lib/helpers/fetchProducts
 */

import { storefrontClient } from '@/clients/storefrontApiClient'
import { productsQuery } from '@/lib/queries/productsQuery'
import { handleShopifyErrors } from '@/lib/errors/handleShopifyErrors'
import { extractErrorMessage } from '@/lib/errors/extractErrorMessage'
import type { Product, ProductsQueryResponse } from '@/types'
import { validateProductIds } from '@/lib/helpers/validations/validateProductIds'
import { normalizeProduct } from '@/lib/helpers/normalizers'

/**
 * Fetches and normalizes products by IDs from Shopify Storefront API.
 * @param ids - Array of product IDs to fetch
 * @returns Promise resolving to normalized Product array, empty array on error
 */
export const fetchProducts = async (ids: string[]): Promise<Product[]> => {
  try {
    const validatedIds = validateProductIds(ids)

    const { data, errors } = await storefrontClient.request<{
      products: {
        edges: Array<{
          node: ProductsQueryResponse
        }>
      }
    }>(productsQuery, {
      variables: { productIds: validatedIds }
    })

    if (errors) {
      handleShopifyErrors(errors)
    }

    if (!data?.products?.edges) {
      console.warn('No products returned from Shopify API for IDs:', validatedIds)
      return []
    }

    const products = data.products.edges.map(edge => edge.node)
    return products.map(normalizeProduct)
  } catch (error) {
    const errorMessage = extractErrorMessage(error)

    console.error('Error fetching products:', {
      message: errorMessage,
      productIds: ids,
      error
    })

    return []
  }
}

export default fetchProducts
