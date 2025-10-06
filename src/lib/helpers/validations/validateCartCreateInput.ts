// Path: src/lib/helpers/validations/validateCartCreateInput.ts
'use server'
import 'server-only'

import { AddToCartSchema } from '@/db/zod/schemas/AddToCartSchema' // SERVER-skjema (full Zod)
import type { AddToCartFormValues } from '@types'
import { fromZodError } from 'zod-validation-error'

/**
 * Server Action-hjelper MÅ være async i Next.js 15.
 * Validerer cart-create input og kaster lesbar (norsk) feil ved ugyldig data.
 */
export async function validateCartCreateInput(
  input: AddToCartFormValues
): Promise<void> {
  const result = await AddToCartSchema.safeParseAsync(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}
