// Path: src/lib/helpers/validations/validateUpdateLineInput.ts
'use server'
import 'server-only'

import { fromZodError } from 'zod-validation-error'
import { UpdateCartSchema } from '@/db/zod/schemas/UpdateCartSchema'
import type { UpdateCartLineInput } from '@types'

/**
 * Server Action-hjelper må være async i Next.js 15.
 * Validerer data og kaster norsk, lesbar feil ved ugyldig input.
 */
export async function validateUpdateLineInput(
  input: UpdateCartLineInput
): Promise<void> {
  const result = await UpdateCartSchema.safeParseAsync(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}
