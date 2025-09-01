// Path: src/lib/errors/handleShopifyErrors.ts

/**
 * @fileoverview Shopify API error handler using Zod v4 + zod-validation-error.
 * @module lib/errors
 * This handler exists because Shopify's ResponseErrors have inconsistent structure
 * and the application needs to transform them into typed ShopifyApiError instances
 * that integrate with the centralized error mapping system.
 *
 * The Zod validation ensures we only process well-formed error responses and
 * provides user-friendly fallbacks for malformed responses.
 */

import { z } from '@/db/zod/zodConfig'
import { fromError } from 'zod-validation-error'
import { ShopifyApiError } from '@/lib/errors/ShopifyApiError'
import type { ResponseErrors } from '@shopify/graphql-client'
import type { ShopifyErrorDetail } from '@/types'

/**
 * Creates type-safe ShopifyErrorDetail objects that match application types exactly.
 *
 * This factory exists because manual object construction can miss optional properties
 * and violate exactOptionalPropertyTypes compiler settings. The factory ensures
 * perfect type compatibility.
 */
const createShopifyErrorDetail = (message: string, locations?: { line: number; column: number }[], path?: (string | number)[], extensions?: Record<string, unknown>): ShopifyErrorDetail => {
  const detail: ShopifyErrorDetail = { message }

  if (locations !== undefined) detail.locations = locations
  if (path !== undefined) detail.path = path
  if (extensions !== undefined) detail.extensions = extensions

  return detail
}

/**
 * Parses and validates Shopify client errors into ShopifyApiError instances.
 *
 * Always throws because this function is called only when errors are detected.
 * The throw behavior integrates with the centralized error mapping system
 * that expects specific error types for proper categorization.
 */
export function handleShopifyErrors(errors: ResponseErrors): never {
  const ResponseSchema = z.object({
    message: z.string().optional(),
    graphQLErrors: z.array(z.unknown()).optional(),
    networkStatusCode: z.number().optional()
  })

  const result = ResponseSchema.safeParse(errors)

  if (!result.success) {
    const validationError = fromError(result.error)
    console.error('Shopify API response validation failed:', validationError.toString())

    throw new ShopifyApiError('Invalid response format from Shopify API', [createShopifyErrorDetail(validationError.toString())])
  }

  const validatedErrors = result.data
  const topLevelMessage = validatedErrors.message || 'Failed to fetch data from Shopify.'
  const formattedGqlErrors: ShopifyErrorDetail[] = []

  if (Array.isArray(validatedErrors.graphQLErrors)) {
    const GraphQLErrorSchema = z.object({
      message: z.string(),
      locations: z
        .array(
          z.object({
            line: z.number(),
            column: z.number()
          })
        )
        .optional(),
      path: z.array(z.union([z.string(), z.number()])).optional(),
      extensions: z.record(z.string(), z.unknown()).optional()
    })

    for (const error of validatedErrors.graphQLErrors) {
      const errorResult = GraphQLErrorSchema.safeParse(error)

      if (errorResult.success) {
        const validError = errorResult.data
        formattedGqlErrors.push(createShopifyErrorDetail(validError.message, validError.locations, validError.path, validError.extensions))
      } else {
        formattedGqlErrors.push(createShopifyErrorDetail('Invalid error format received from Shopify'))
      }
    }
  }

  throw new ShopifyApiError(topLevelMessage, formattedGqlErrors, validatedErrors.networkStatusCode)
}
