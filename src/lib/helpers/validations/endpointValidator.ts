// Path: src/lib/helpers/validations/endpointValidator.ts
'use server'
import 'server-only'

import { fromError, ValidationError } from 'zod-validation-error'
import { EndpointSchema, type Endpoint } from '@/db/zod/schemas/EndpointSchema'
import { z } from '@/db/zod/zodConfig'
import * as Either from '@/lib/utils/either'

/**
 * Validerer input og returnerer Either<ValidationError, Endpoint>.
 * Holder async-signaturen for Server Actions, selv om parse er sync.
 */
export async function endpointValidator(
  value: z.input<typeof EndpointSchema>
): Promise<Either.Either<ValidationError, Endpoint>> {
  return Either.tryCatch(
    () => EndpointSchema.parse(value),
    (error: unknown) => {
      if (error instanceof z.ZodError) {
        return fromError(error)
      }
      return new ValidationError('Uventet feil under parsing')
    }
  )
}
