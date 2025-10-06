// Path: src/lib/helpers/validations/validateClearCartInput.ts
'use server'
import 'server-only'

import { fromZodError } from 'zod-validation-error'
import { ClearCartLineSchema } from '@/db/zod/schemas/ClearCartLineSchema'
import type { ClearCartLineInput } from '@types'

/**
 * Server Action-hjelper må være async i Next.js 15.
 * Validerer at input er et tomt objekt og kaster norsk, lesbar feil ved avvik.
 */
export async function validateClearCartInput(
  input: ClearCartLineInput
): Promise<void> {
  const result = await ClearCartLineSchema.safeParseAsync(input)
  if (!result.success) {
    throw fromZodError(result.error)
  }
}
