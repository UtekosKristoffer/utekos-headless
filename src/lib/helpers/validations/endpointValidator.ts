import { fromError, ValidationError } from 'zod-validation-error'

import { EndpointSchema } from '@/db/zod/schemas/EndpointSchema'
import { z } from '@/db/zod/zodConfig'
import * as Either from '@/lib/utils/either' // Importer alt som "Either"

export type Endpoint = z.infer<typeof EndpointSchema>
 
/**
 * Validerer input og returnerer resultatet som en Either.
 * Siden Zods .parse() er synkron, men vår tryCatch er bygget for å håndtere
 * både synkron og asynkron kode, bruker vi `async/await` for konsistens.
 */
export async function endpointValidator(
  value: z.input<typeof EndpointSchema>
): Promise<Either.Either<ValidationError, Endpoint>> {
  return Either.tryCatch(
    () => EndpointSchema.parse(value),
    error => {
      if (error instanceof z.ZodError) {
        return fromError(error)
      }
      return new ValidationError('Uventet feil under parsing')
    }
  )
}
