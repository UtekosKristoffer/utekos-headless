// Path: src/lib/helpers/validations/validateRemoveCartLineInput.ts
'use server'
import 'server-only'

import { fromZodError } from 'zod-validation-error'
import { RemoveCartLineSchema } from '@/db/zod/schemas/RemoveCartLineSchema'
import type { RemoveCartLineInput } from '@types'

/**
 * Må være async i Next.js 15 når filen er 'use server'.
 * Bruker safeParseAsync og kaster norsk, lesbar feil.
 */
export async function validateRemoveCartLineInput(
  input: RemoveCartLineInput
): Promise<void> {
  const result = await RemoveCartLineSchema.safeParseAsync(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}
