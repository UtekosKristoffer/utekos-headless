// Path: src/lib/errors/formatShopifyErrorResponse.ts

/**
 * @fileoverview Formats Shopify GraphQL @param {ResponseErrors} ResponseErrors into @param {CartActionsResult} CartActionsResult.
 */

import { CartErrorCode } from '@/constants/CartErrorCode'
import type { CartActionsResult } from '@/types/cart'

import type { ResponseErrors } from '@shopify/graphql-client'

/**
 * @function formatShopifyErrorResponse
 * @param {ResponseErrors} errors - The error response from Shopify GraphQL API.
 * @returns {CartActionsResult} Standardized cart action result with error details.
 */
export function formatShopifyErrorResponse(
  errors: ResponseErrors
): CartActionsResult {
  const topLevelMessage =
    Array.isArray(errors.graphQLErrors) && errors.graphQLErrors[0]?.message ?
      errors.graphQLErrors[0].message
    : 'An error occurred while communicating with Shopify.'

  console.error('Shopify API Errors:', JSON.stringify(errors, null, 2))

  return {
    success: false,
    message: topLevelMessage,
    error: CartErrorCode.API_ERROR
  }
}
