// Path: src/lib/helpers/validations/validateClearCartInput.ts

import { fromZodError } from 'zod-validation-error'

import { ClearCartLineSchema } from '@/db/zod/schemas/ClearCartLineSchema'
import type { ClearCartLineInput } from '@/types/cart'

/**
 * Validates clear-cart input using global errorMap for consistent messaging.
 */
export const validateClearCartInput = (input: ClearCartLineInput): void => {
  const result = ClearCartLineSchema.safeParse(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}
