// Path: src/lib/helpers/validations/validateUpdateLineInput.ts

import { fromZodError } from 'zod-validation-error'

import { UpdateCartSchema } from '@/db/zod/schemas/UpdateCartSchema'
import type { UpdateCartLineInput } from '@types'

/**
 * Validates update-line input using global errorMap for consistent messaging.
 */
export const validateUpdateLineInput = async (
  input: UpdateCartLineInput
): Promise<void> => {
  const result = UpdateCartSchema.safeParse(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}
