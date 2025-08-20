// src/app/api/clients/shopifyRequestClient.ts

import type { ApiClientRequestOptions } from '@shopify/graphql-client'
import { GraphqlQueryError } from '@shopify/shopify-api'
import { headers } from 'next/headers'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { print } from 'graphql'
import StoreFrontApiClient from './StoreFrontApiClient'

export function ShopifyRequestClient<TResult, TVariables extends Record<string, any>>(doc: string | TypedDocumentNode<TResult, TVariables>, variables?: TVariables) {
  return async (): Promise<TResult> => {
    const requestHeaders = await headers()
    const buyerIp = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ?? requestHeaders.get('x-real-ip') ?? undefined

    const OPTIONS: ApiClientRequestOptions = {
      variables,
      retries: 2,
      headers: buyerIp ? { 'Shopify-Storefront-Buyer-IP': buyerIp } : {}
    }

    const query = typeof doc === 'string' ? doc : print(doc)

    const response = await StoreFrontApiClient.request<TResult>(query, OPTIONS)

    if ((response as any).errors) {
      throw new GraphqlQueryError({
        message: (response as any).errors.message ?? 'An unknown GraphQL error occurred.',
        response: response as Record<string, unknown>,
        body: (response as any).errors.graphQLErrors as Record<string, any>
      })
    }
    if (!response.data) throw new Error('Mottok ingen data fra Shopify API-et.')

    return response.data
  }
}

export default ShopifyRequestClient
