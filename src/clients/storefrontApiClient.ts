//Path: src/clients/storefrontApiClient.ts

import {
  createStorefrontApiClient,
  type StorefrontApiClient
} from '@shopify/storefront-api-client'

import { SHOPIFY_API_VERSION } from '@/constants/shopify-api-version'
import { SHOPIFY_PUBLIC_TOKEN } from '@/constants/shopify-public-token'
import { SHOPIFY_STORE_DOMAIN } from '@/constants/shopify-store-domain'

export const storefrontClient: StorefrontApiClient = createStorefrontApiClient({
  storeDomain: SHOPIFY_STORE_DOMAIN,
  apiVersion: SHOPIFY_API_VERSION,
  publicAccessToken: SHOPIFY_PUBLIC_TOKEN
})
