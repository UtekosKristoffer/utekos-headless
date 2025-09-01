import { fromZodError } from 'zod-validation-error'
import { RemoveCartLineSchema } from '@/db/zod/schemas'
import type { RemoveCartLineInput } from '@/types/cart'

/**
 * Validates remove-line input using global errorMap for consistent messaging.
 */
export const validateRemoveCartLineInput = (input: RemoveCartLineInput): void => {
  const result = RemoveCartLineSchema.safeParse(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}
