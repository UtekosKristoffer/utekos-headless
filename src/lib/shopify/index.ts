import { ensureStartsWith } from '@/lib/utils/ensureStartsWith'

export const domain =
  process.env.SHOPIFY_STORE_DOMAIN ?
    ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : ''

export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2025-07/graphql.json'
export const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`
export const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!
