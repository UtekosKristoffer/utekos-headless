// Path: src/lib/helpers/validations/accessTokenValidator.ts
'use server'
import 'server-only'

import { fromError, ValidationError } from 'zod-validation-error'
import {
  AccessTokenSchema,
  AccessTokenStringSchema,
  type AccessToken
} from '@/db/zod/schemas/AccessTokenSchema'
import { z } from '@/db/zod/zodConfig'
import * as Either from '@/lib/utils/either'

/**
 * Validerer et objekt { token: string } – retur som Either.
 * Async-signatur er påkrevd for server-aksjoner i Next 15.
 * Doc: Next.js krever async-eksporter i `use server`-filer. :contentReference[oaicite:0]{index=0}
 */
export async function accessTokenValidator(
  value: z.input<typeof AccessTokenSchema>
): Promise<Either.Either<ValidationError, { token: AccessToken }>> {
  return Either.tryCatch(
    () => {
      const parsed = AccessTokenSchema.parse(value)
      // Ensure the token property is correctly branded as AccessToken
      return { token: parsed.token as AccessToken }
    },
    (error: unknown) =>
      error instanceof z.ZodError ?
        fromError(error)
      : new ValidationError('Uventet feil under parsing')
  )
}

/**
 * Variant for når du har en **ren streng** (ENV, o.l.)
 */
export async function accessTokenStringValidator(
  token: unknown
): Promise<Either.Either<ValidationError, AccessToken>> {
  return Either.tryCatch(
    () => AccessTokenStringSchema.parse(token),
    (error: unknown) =>
      error instanceof z.ZodError ?
        fromError(error)
      : new ValidationError('Uventet feil under parsing')
  )
}
