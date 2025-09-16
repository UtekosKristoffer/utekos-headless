import { isShopifyError } from '@/lib/errors/isShopifyError'
import { endpoint, key } from '@/lib/shopify'

import type { ExtractVariables } from '@types'

export async function shopifyFetch<T>({
  headers,
  query,
  variables
}: {
  headers?: HeadersInit
  query: string
  variables?: ExtractVariables<T>
}): Promise<{ status: number; body: T } | never> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      })
    })

    const body = await response.json()

    if (body.errors) {
      throw body.errors[0]
    }

    return {
      status: response.status,
      body
    }
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      }
    }

    throw {
      error: e,
      query
    }
  }
}
