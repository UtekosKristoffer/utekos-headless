import { ProductIdsSchema } from '@/db/zod/schemas/ProductIdsSchema'
import { ZodError } from 'zod'
import { fromError } from 'zod-validation-error'
import { fromZodError } from 'zod-validation-error'
/**
 * Validates product IDs array ensuring all entries are non-empty strings.
 * @param ids - Unknown input to validate as product ID array
 * @returns Validated array of product IDs
 */
export const validateProductIds = (ids: unknown): string[] => {
  const result = ProductIdsSchema.safeParse(ids)
  if (!result.success) {
    const validationError = fromError(result.error)
    throw validationError
  }
  return result.data
}


