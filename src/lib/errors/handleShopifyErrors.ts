// Path: src/lib/errors/handleShopifyErrors.ts (enklere versjon)
import { z } from 'zod'
import { fromError } from 'zod-validation-error'
import { ShopifyApiError } from '@/lib/errors/ShopifyApiError'
import type { ResponseErrors } from '@shopify/graphql-client'
import type { ShopifyErrorDetail } from '@/types'

/**
 * Type-safe helper to create ShopifyErrorDetail objects.
 */
const createShopifyErrorDetail = (message: string, locations?: { line: number; column: number }[], path?: (string | number)[], extensions?: Record<string, unknown>): ShopifyErrorDetail => {
  const detail: ShopifyErrorDetail = { message }

  if (locations) detail.locations = locations
  if (path) detail.path = path
  if (extensions) detail.extensions = extensions

  return detail
}

/**
 * Parses Shopify client errors with comprehensive validation using Zod v4.
 * Leverages zod-validation-error for user-friendly error messages.
 */
export function handleShopifyErrors(errors: ResponseErrors): never {
  // Basic structure validation
  const ErrorsSchema = z.object({
    message: z.string().optional(),
    graphQLErrors: z.array(z.unknown()).optional(),
    networkStatusCode: z.number().optional()
  })

  const result = ErrorsSchema.safeParse(errors)

  if (!result.success) {
    const validationError = fromError(result.error)
    console.error('Shopify API response validation failed:', validationError.toString())

    throw new ShopifyApiError('Invalid response format from Shopify API', [createShopifyErrorDetail(validationError.toString())])
  }

  const validatedErrors = result.data
  const topLevelMessage = validatedErrors.message || 'Failed to fetch data from Shopify.'
  const formattedGqlErrors: ShopifyErrorDetail[] = []

  if (Array.isArray(validatedErrors.graphQLErrors)) {
    for (const error of validatedErrors.graphQLErrors) {
      // Validate individual error structure
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

      const errorResult = GraphQLErrorSchema.safeParse(error)

      if (errorResult.success) {
        const validError = errorResult.data
        formattedGqlErrors.push(createShopifyErrorDetail(validError.message, validError.locations, validError.path, validError.extensions))
      } else {
        // Fallback for invalid structure
        formattedGqlErrors.push(createShopifyErrorDetail('Invalid error format received from Shopify'))
      }
    }
  }

  throw new ShopifyApiError(topLevelMessage, formattedGqlErrors, validatedErrors.networkStatusCode)
}
