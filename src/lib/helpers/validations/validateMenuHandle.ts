import { MenuHandleSchema } from '@/db/zod/schemas'
import { fromError } from 'zod-validation-error'

export const validateMenuHandle = (handle: string): void => {
  const result = MenuHandleSchema.safeParse(handle)
  if (!result.success) {
    const validationError = fromError(result.error)
    throw validationError
  }
}
