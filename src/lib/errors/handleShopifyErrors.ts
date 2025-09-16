// Path: src/lib/errors/handleShopifyErrors.ts

import { z } from '@/db/zod/zodConfig'
import { ShopifyApiError } from '@/lib/errors/ShopifyApiError'
import type { ResponseErrors } from '@shopify/graphql-client'
import type { ShopifyErrorDetail } from '@types'
import { fromError } from 'zod-validation-error'

/**
 * Defines the shape of the input for the error detail factory.
 * The types now explicitly include `| undefined` to match Zod's `.optional()`
 * output and satisfy the `exactOptionalPropertyTypes` compiler option.
 */
type ShopifyErrorDetailInput = {
  message: string
  locations?: { line: number; column: number }[] | undefined
  path?: (string | number)[] | undefined
  extensions?: Record<string, unknown> | undefined
}

/**
 * Creates type-safe ShopifyErrorDetail objects from a single input object.
 */
const createShopifyErrorDetail = ({
  message,
  locations,
  path,
  extensions
}: ShopifyErrorDetailInput): ShopifyErrorDetail => {
  const detail: ShopifyErrorDetail = { message }

  if (locations !== undefined) detail.locations = locations
  if (path !== undefined) detail.path = path
  if (extensions !== undefined) detail.extensions = extensions

  return detail
}

/**
 * Parses and validates Shopify client errors into ShopifyApiError instances.
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
    console.error(
      'Shopify API response validation failed:',
      validationError.toString()
    )
    throw new ShopifyApiError('Invalid response format from Shopify API', [
      createShopifyErrorDetail({ message: validationError.toString() })
    ])
  }

  const validatedErrors = result.data
  const topLevelMessage =
    validatedErrors.message || 'Failed to fetch data from Shopify.'
  const formattedGqlErrors: ShopifyErrorDetail[] = []

  if (Array.isArray(validatedErrors.graphQLErrors)) {
    const GraphQLErrorSchema = z.object({
      message: z.string(),
      locations: z
        .array(z.object({ line: z.number(), column: z.number() }))
        .optional(),
      path: z.array(z.union([z.string(), z.number()])).optional(),
      extensions: z.record(z.string(), z.unknown()).optional()
    })

    for (const error of validatedErrors.graphQLErrors) {
      const errorResult = GraphQLErrorSchema.safeParse(error)

      if (errorResult.success) {
        // This call will now work perfectly
        formattedGqlErrors.push(createShopifyErrorDetail(errorResult.data))
      } else {
        formattedGqlErrors.push(
          createShopifyErrorDetail({
            message: 'Invalid error format received from Shopify'
          })
        )
      }
    }
  }

  throw new ShopifyApiError(
    topLevelMessage,
    formattedGqlErrors,
    validatedErrors.networkStatusCode
  )
}
