import { AddToCartSchema } from '@/db/zod/schemas/AddToCartSchema'
import type { AddToCartFormValues } from '@types'
import { fromZodError } from 'zod-validation-error'

export const validateAddLineInput = (input: AddToCartFormValues): void => {
  const result = AddToCartSchema.safeParse(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}
