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
  ShopifyProduct,
  ShopifyProductsOperation
} from '@types'
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag
} from 'next/cache'

// Definerer en returtype for konsistens
export type GetProductsResponse = {
  success: boolean
  status: number
  body?: ShopifyProduct[] // Returnerer en liste med våre formede produkter
  error?: string
}

export async function getProducts(
  params: GetProductsParams = {}
): Promise<GetProductsResponse> {
  'use cache'
  cacheTag(TAGS.products)
  cacheLife('days')

  try {
    const { query, reverse, sortKey, first = 100 } = params // Økt default for sitemap

    const variables: GetProductsParams = { first }
    if (query !== undefined) variables.query = query
    if (reverse !== undefined) variables.reverse = reverse
    if (sortKey !== undefined) variables.sortKey = sortKey

    const res = await shopifyFetch<ShopifyProductsOperation>({
      query: getProductsQuery,
      variables
    })
    if (!res?.body?.data?.products) {
      throw new Error('Invalid response structure from Shopify')
    }

    const rawProducts = removeEdgesAndNodes(res.body.data.products)
    const products = reshapeProducts(rawProducts)

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
