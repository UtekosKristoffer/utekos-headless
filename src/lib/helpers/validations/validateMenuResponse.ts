// Path: src/lib/helpers/validations/validateMenuResponse.ts

import { fromError } from 'zod-validation-error'
import { MenuNotFoundError, InvalidMenuDataError } from '@/lib/errors'
import { ShopifyMenuResponseSchema, MenuHandleSchema } from '@/db/zod/schemas'

export const validateMenuResponse = (response: unknown, handle: string) => {
  const result = ShopifyMenuResponseSchema.safeParse(response)

  if (!result.success) {
    const validationError = fromError(result.error)
    throw new InvalidMenuDataError(`Invalid menu response structure: ${validationError.toString()}`)
  }

  if (result.data.menu === null) {
    throw new MenuNotFoundError(handle)
  }

  return result.data.menu
}
