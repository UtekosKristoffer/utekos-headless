// Path: src/lib/helpers/validations/validateAddLineInput.ts
'use server'
import 'server-only'

import { AddToCartSchema } from '@/db/zod/schemas/AddToCartSchema' // SERVER-skjema (full Zod)
import type { AddToCartFormValues } from '@types'
import { fromZodError } from 'zod-validation-error'

/**
 * Server Action-hjelper MÅ være async i Next.js 15.
 * Validerer data og kaster lesbar (norsk) feil ved ugyldig input.
 */
export async function validateAddLineInput(
  input: AddToCartFormValues
): Promise<void> {
  const result = await AddToCartSchema.safeParseAsync(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}
