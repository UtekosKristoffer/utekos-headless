import { fromZodError } from 'zod-validation-error'

import { RemoveCartLineSchema } from '@/db/zod/schemas/RemoveCartLineSchema'
import type { RemoveCartLineInput } from '@types'

export const validateRemoveCartLineInput = (
  input: RemoveCartLineInput
): void => {
  const result = RemoveCartLineSchema.safeParse(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}
