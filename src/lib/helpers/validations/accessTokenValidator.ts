// Path src/lib/helpers/validations/accessTokenValidator.ts

import { fromError, ValidationError } from 'zod-validation-error'

import { AccessTokenSchema } from '@/db/zod/schemas/AccessTokenSchema'
import { z } from '@/db/zod/zodConfig'
import * as Either from '@/lib/utils/either' // Importer alt som "Either"

export type AccessToken = z.infer<typeof AccessTokenSchema>

/**
 * Validerer input og returnerer resultatet som en Either.
 * Siden Zods .parse() er synkron, men vår tryCatch er bygget for å håndtere
 * både synkron og asynkron kode, bruker vi `async/await` for konsistens.
 */
export async function accessTokenValidator(
  value: z.input<typeof AccessTokenSchema>
): Promise<Either.Either<ValidationError, AccessToken>> {
  return Either.tryCatch(
    () => AccessTokenSchema.parse(value),
    error => {
      if (error instanceof z.ZodError) {
        return fromError(error)
      }
      return new ValidationError('Uventet feil under parsing')
    }
  )
}
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
