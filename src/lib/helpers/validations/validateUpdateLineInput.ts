'use server'

import { fromZodError } from 'zod-validation-error'
import { UpdateCartSchema } from '@/db/zod/schemas'
import type { UpdateCartLineInput } from '@/types/cart'

/**
 * Validates add-to-cart input using global errorMap for consistent messaging.
 */

/**
 * Validates update-line input using global errorMap for consistent messaging.
 */
export const validateUpdateLineInput = (input: UpdateCartLineInput): void => {
  const result = UpdateCartSchema.safeParse(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}
