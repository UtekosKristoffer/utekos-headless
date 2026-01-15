// Path: src/api/constants/index.ts
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

export const productName = 'Utekos TechDown™'
export const productHandle = 'utekos-techdown'
export const productUrl = `/produkter/${productHandle}`
export const originalPrice = 1990
export const discountAmount = 200
export const currentPrice = originalPrice - discountAmount
