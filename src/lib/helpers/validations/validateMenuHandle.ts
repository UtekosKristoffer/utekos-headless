import { fromError } from 'zod-validation-error'

import { MenuHandleSchema } from '@/db/zod/schemas/MenuHandleSchema'

export const validateMenuHandle = (handle: string): void => {
  const result = MenuHandleSchema.safeParse(handle)
  if (!result.success) {
    const validationError = fromError(result.error)
    throw validationError
  }
}
