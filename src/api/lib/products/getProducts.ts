// Path: src/api/lib/products/getProducts.ts

/**
 * @fileoverview Product fetching with Shopify Storefront API integration. Centralized product data fetching with consistent reshaping and caching
 * @module api/lib/products/getProducts
 */

import { TAGS } from '@/api/constants'
import { getProductsQuery } from '@/api/graphql/queries/products'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import { removeEdgesAndNodes } from '@/lib/utils/removeEdgesAndNodes'
import { reshapeProducts } from '@/lib/utils/reshapeProducts'
import type {
  GetProductsParams,
  ProductsQueryResponse,
  ShopifyProductsOperation
} from '@types'
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag
} from 'next/cache'

export async function getProducts(
  params: GetProductsParams = {}
): Promise<ProductsQueryResponse> {
  'use cache'
  cacheTag(TAGS.products)
  cacheLife('days')

  try {
    const { query, reverse, sortKey, first = 5 } = params

    const variables: GetProductsParams = { first }
    if (query !== undefined) variables.query = query
    if (reverse !== undefined) variables.reverse = reverse
    if (sortKey !== undefined) variables.sortKey = sortKey

    const res = await shopifyFetch<ShopifyProductsOperation>({
      query: getProductsQuery,
      variables
    })

    console.log('Shopify response:', JSON.stringify(res, null, 2))

    // Check if the response has the expected structure
    if (!res?.body?.data?.products) {
      console.error('Invalid response structure:', res)
      throw new Error('Invalid response structure from Shopify')
    }

    const rawProducts = removeEdgesAndNodes(res.body.data.products)
    console.log('Raw products count:', rawProducts.length)

    const products = reshapeProducts(rawProducts)
    console.log('Reshaped products count:', products.length)

    return {
      success: true,
      status: 200,
      body: products
    }
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return {
      success: false,
      status: 500,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
