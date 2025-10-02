// Maks antall ord 700 // Status antall ord: 370

# Beste Praksis for Zod og Feilhåndtering

Dette dokumentet definerer de offisielle retningslinjene for datavalidering og
feilhåndtering i dette prosjektet. Alle Zod-implementeringer skal følge disse
prinsippene.

## 1. Grunnprinsipp: Parse, Don't Validate

Vi behandler Zod som et "parsing"-verktøy, ikke bare et valideringsverktøy.
Målet er ikke å sjekke om data er gyldig, men å transformere upålitelig data til
en kjent og trygg datastruktur som resten av applikasjonen kan stole på.

## 2. Vår Validerings-strategi: Funksjonell Feilhåndtering med `Either`

All validering som kan feile, skal returnere en `Either`-type. Dette gjør
feilhåndteringen eksplisitt og forutsigbar. Vi kaster aldri feil fra
valideringsfunksjoner.

### Gjør dette: Returner `Either`

Bruk `Either.tryCatch` til å wrappe Zods `.parse()`-metode. Dette konverterer en
potensiell ZodError til en `Left<ValidationError>`.

```typescript
// Path: src/lib/helpers/validations/accessTokenValidator.ts

import { fromError, ValidationError } from 'zod-validation-error'
import { AccessTokenSchema } from '@/db/zod/schemas/AccessTokenSchema'
import { z } from '@/db/zod/zodConfig'
import * as Either from '@/lib/utils/either'

export type AccessToken = z.infer<typeof AccessTokenSchema>

export async function accessTokenValidator(
  value: z.input<typeof AccessTokenSchema>
): Promise<Either.Either<ValidationError, AccessToken>> {
  return Either.tryCatch(
    () => AccessTokenSchema.parse(value),
    error => fromError(error)
  )
}
```

### Unngå dette: Throwing Errors

Funksjoner som validateUpdateLineInput.ts som bruker safeParse og deretter
throw, skal refaktoreres til å bruke Either-mønsteret.

```typescript
// SKAL REFAKTORERES:
// Path: src/lib/helpers/validations/validateUpdateLineInput.ts

import { fromZodError } from 'zod-validation-error'
import { UpdateCartSchema } from '@/db/zod/schemas/UpdateCartSchema'

export const validateUpdateLineInput = async (
  input: UpdateCartLineInput
): Promise<void> => {
  const result = UpdateCartSchema.safeParse(input)
  if (!result.success) {
    // UNNGÅ DETTE: Ikke kast feil direkte.
    throw fromZodError(result.error)
  }
}
```

## 3. Feilmeldinger: Én Kilde til Sannhet

Alle standard feilmeldinger skal defineres i den globale errorMap-en i
src/db/zod/zodConfig.ts. Dette sikrer at alle meldinger er på norsk og
konsistente.

Unngå å spesifisere feilmeldinger direkte i skjemaene med mindre det er for en
helt unik validering som ikke kan dekkes globalt.

Gjør dette: Stol på global errorMap

```typescript
// Path: src/db/zod/schemas/ProductIdsSchema.ts
import { z } from '@/db/zod/zodConfig'

// Meldingene her vil komme fra den globale konfigurasjonen.
export const ProductIdsSchema = z.array(z.string().min(1)).min(1)
```

```typescript
// UNNGÅ HVIS MULIG:
// Path: src/db/zod/schemas/AddToCartSchema.ts
import { z } from '@/db/zod/zodConfig'

export const AddToCartSchema = z.object({
  variantId: z.string().min(1, 'Variant ID må være en gyldig streng.'), // <-- Unngå denne
  quantity: z.number().min(1, 'Antall må være minst 1.') // <-- og denne
})
```
