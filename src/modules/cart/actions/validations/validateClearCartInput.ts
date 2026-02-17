// Path: src/lib/helpers/validations/validateClearCartInput.ts
'use server'
import 'server-only'

import { fromZodError } from 'zod-validation-error'
import { ClearCartLineSchema } from '@/db/zod/schemas/ClearCartLineSchema'
import type { ClearCartLineInput } from '@types'

export async function validateClearCartInput(
  input: ClearCartLineInput
): Promise<void> {
  const result = await ClearCartLineSchema.safeParseAsync(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}
