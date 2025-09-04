// lib/fetch.ts
/**
 * @fileoverview Server-side GraphQL fetch utilities for Shopify Storefront API
 * Provides type-safe, composable functions following functional programming principles
 * @module lib/fetch
 */

'use server'

type ShopifyFetchParams = {
  readonly query: string
  readonly variables?: Record<string, unknown>
  readonly headers?: HeadersInit
  readonly cache?: RequestCache
  readonly tags?: string
  readonly revalidate?: number | false
}

type ShopifyFetchResult<T> = {
  readonly status: number
  readonly body: T
  readonly error?: {
    readonly message: string
  }
}

type ShopifyEnvironment = {
  readonly endpoint: Endpoint['url']
  readonly accessToken: AccessToken['token']
}
type Endpoint = {
  readonly url: string
}

type AccessToken = {
  readonly token: string
}

const endpoint = process.env.SHOPIFY_STORE_DOMAIN
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

const validateShopifyEnvironment = (): ShopifyEnvironment => {
  const endpoint = process.env.SHOPIFY_STORE_DOMAIN
  const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

  if (!endpoint || !accessToken) {
    throw new Error(
      'Missing required Shopify environment variables: SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN'
    )
  }

  return { endpoint, accessToken }
}

const createShopifyHeaders = (
  accessToken: string,
  customHeaders?: HeadersInit
): HeadersInit => ({
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': accessToken,
  ...customHeaders
})

const createGraphQLBody = (
  query: string,
  variables?: Record<string, unknown>
): string =>
  JSON.stringify({
    ...(query && { query }),
    ...(variables && { variables })
  })

const createNextOptions = (tags?: string, revalidate?: number | false) => ({
  ...(tags && { tags: [tags] }),
  ...(revalidate !== undefined && { revalidate })
})

const mapToShopifyResult = async <T>(
  response: Response
): Promise<ShopifyFetchResult<T>> => {
  const body = await response.json()

  if (body.errors) {
    return {
      status: response.status,
      body: null as T,
      error: {
        message:
          Array.isArray(body.errors) ?
            body.errors
              .map((err: { message: string }) => err.message)
              .join(', ')
          : 'GraphQL error occurred'
      }
    }
  }

  return {
    status: response.status,
    body: body.data
  }
}

const handleFetchError = <T>(error: unknown): ShopifyFetchResult<T> => ({
  status: 500,
  body: null as T,
  error: {
    message:
      error instanceof Error ? error.message : 'An unknown error occurred'
  }
})

export const shopifyFetch = async <T>({
  query,
  variables,
  headers,
  cache = 'force-cache',
  tags,
  revalidate
}: ShopifyFetchParams): Promise<ShopifyFetchResult<T>> => {
  try {
    const { endpoint, accessToken } = validateShopifyEnvironment()

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: createShopifyHeaders(accessToken, headers),
      body: createGraphQLBody(query, variables),
      cache,
      next: createNextOptions(tags, revalidate)
    })

    return await mapToShopifyResult<T>(response)
  } catch (error) {
    console.error('Shopify fetch failed:', error)
    return handleFetchError<T>(error)
  }
}
