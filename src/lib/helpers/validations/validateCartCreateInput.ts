// Path: src/lib/helpers/validations/validateCartCreateInput.ts
import { AddToCartSchema } from '@/db/zod/schemas/AddToCartSchema'
import type { AddToCartFormValues } from '@types'
import { fromZodError } from 'zod-validation-error'

export const validateCartCreateInput = (input: AddToCartFormValues): void => {
  const result = AddToCartSchema.safeParse(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}
