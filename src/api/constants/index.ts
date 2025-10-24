export const TAGS = {
  products: 'products',
  cart: 'cart'
}

import { ensureStartsWith } from '@/lib/utils/ensureStartsWith'

export const domain =
  process.env.SHOPIFY_STORE_DOMAIN ?
    ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : ''

export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2025-10/graphql.json'
export const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`
export const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!
export const HIDDEN_PRODUCT_TAG = 'useNext'

export const FREE_SHIPPING_THRESHOLD = 999
