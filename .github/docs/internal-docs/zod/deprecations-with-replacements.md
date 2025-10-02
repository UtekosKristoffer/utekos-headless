# ZOD GRUNNLEGGENDE

## zodConfig.ts

Vår globale Zod-konfigurasjon med norske feilmeldinger.

- Sikrer at alle valideringsfeil i applikasjonen har konsistente og
  brukervennlige meldinger på norsk.

**Merk:** Konfigurasjonen må evalueres jevnlig og holdes oppdatert.

### `zod-validation-error`

Selv om Zod v4 sin nye `z.prettifyError()` kan formatere feil til en lesbar
streng, gir `zod-validation-error` en mer komplett og tilpassbar løsning som
passer bedre til våre behov.

Bruk `createErrorMap()` globalt og `fromError()` lokalt for å håndtere
valideringsfeil. Dette følger beste praksis og bør videreføres.

```ts
// Path: src/bd/zod/zodConfig.ts

import * as z from 'zod'
import { createErrorMap } from 'zod-validation-error'

/**
 * Global Zod-konfigurasjon med norske feilmeldinger.
 * Sikrer konsistente og brukervennlige valideringsfeil på norsk i hele applikasjonen.
 */

z.config({
  customError: createErrorMap({
    displayInvalidFormatDetails: true,
    maxAllowedValuesToDisplay: 5,
    maxUnrecognizedKeysToDisplay: 3,
    allowedValuesSeparator: ', ',
    allowedValuesLastSeparator: ' eller ',
    wrapAllowedValuesInQuote: true
  })
})

export { z }
```

---

## ZodError

**Oppdaterte issue-formater**

Issue-formatene er betydelig forenklet.

```ts
import * as z from 'zod' // v4

type IssueFormats =
  | z.core.$ZodIssueInvalidType
  | z.core.$ZodIssueTooBig
  | z.core.$ZodIssueTooSmall
  | z.core.$ZodIssueInvalidStringFormat
  | z.core.$ZodIssueNotMultipleOf
  | z.core.$ZodIssueUnrecognizedKeys
  | z.core.$ZodIssueInvalidValue
  | z.core.$ZodIssueInvalidUnion
  | z.core.$ZodIssueInvalidKey // ny: brukes for z.record/z.map
  | z.core.$ZodIssueInvalidElement // ny: brukes for z.map/z.set
  | z.core.$ZodIssueCustom
```

---

### `.flatten()`

**`flatten()` er utfaset**

Metoden `.flatten()` på `ZodError` er utfaset. Bruk heller den nye funksjonen
`z.treeifyError()`. Se dokumentasjon for formatering av feil.

---

### `z.treeifyError()`

For å konvertere (treeify) en feil til et nestet objekt, bruk
`z.treeifyError()`.

```ts
const tree = z.treeifyError(result.error);

// =>
{
  errors: [ 'Unrecognized key: "extraKey"' ],
  properties: {
    username: { errors: [ 'Invalid input: expected string, received number' ] },
    favoriteNumbers: {
      errors: [],
      items: [
        undefined,
        {
          errors: [ 'Invalid input: expected number, received string' ]
        }
      ]
    }
  }
}
```

Resultatet er en struktur som speiler skjemaet. Du kan enkelt hente ut feil på
en gitt sti. Feltet `errors` inneholder feilmeldinger på en sti, og
spesialfeltene `properties` og `items` lar deg traversere dypere.

```ts
tree.properties?.username?.errors
// => ["Invalid input: expected string, received number"]
```

```ts
tree.properties?.favoriteNumbers?.items?.[1]?.errors
// => ["Invalid input: expected number, received string"]
```

Bruk alltid optional chaining (**?.**) for å unngå feil ved tilgang til nestede
felter.

---

## Oppdatert `z.string()`

**Format-metoder som `.email()` er utfaset**

String-formater er nå egne subklasser av ZodString, ikke interne refinements.

APIene er flyttet til toppnivået i zod, og er mindre verbose og mer
tree-shakable.

```ts
z.email()
z.uuid()
z.url()
z.emoji() // validerer én emoji-karakter
z.base64()
z.base64url()
z.nanoid()
z.cuid()
z.cuid2()
z.ulid()
z.ipv4()
z.ipv6()
z.cidrv4() // ip-range
z.cidrv6() // ip-range
z.iso.date()
z.iso.time()
z.iso.datetime()
z.iso.duration()
```

Metodeformene (`z.string().email()`) finnes fortsatt, men er utfaset.

```ts
z.string().email() // ❌ utfaset
z.email() // ✅ anbefalt
```

---

## Feilformatering

### `z.prettifyError()`

Gir en lesbar strengrepresentasjon av feilen.

```ts
const pretty = z.prettifyError(result.error)
```

Eksempel på resultat:

✖ Unrecognized key: "extraKey"  
✖ Invalid input: expected string, received number → at username  
✖ Invalid input: expected number, received string → at favoriteNumbers[1]

---

### `z.formatError()`

Denne er utfaset til fordel for `z.treeifyError()`.

---

### `z.flattenError()`

For flate skjemaer (ett nivå), bruk `z.flattenError()` for å hente et enkelt
feilobjekt.

```ts
const flattened = z.flattenError(result.error);
// { errors: string[], properties: { [key: string]: string[] } }

{
  formErrors: [ 'Unrecognized key: "extraKey"' ],
  fieldErrors: {
    username: [ 'Invalid input: expected string, received number' ],
    favoriteNumbers: [ 'Invalid input: expected number, received string' ]
  }
}
```

`formErrors` inneholder toppnivåfeil (path er []).  
`fieldErrors` gir en array med feil for hvert felt.

```ts
flattened.fieldErrors.username // => [ 'Invalid input: expected string, received number' ]
flattened.fieldErrors.favoriteNumbers // => [ 'Invalid input: expected number, received string' ]
```

---

## `fromZodError`

Konverterer ZodError til ValidationError.

---

## Forskjellen på ZodError og ZodIssue

En ZodError er en samling av én eller flere ZodIssue-instansser. Dette får du
når du kaller `zodSchema.parse()`.

**Argumenter:**

- `zodError` – zod.ZodError; en ZodError-instans (påkrevd)
- `options` – objekt; formateringsvalg (valgfritt)
- `messageBuilder` – funksjon som tar en array av zod.ZodIssue-objekter og
  returnerer en brukervennlig feilmelding (valgfritt)

---

## Feilklasser

Grunnklassen for alle feil i Zod er `$ZodError`.

Av ytelseshensyn arver ikke `$ZodError` fra innebygd Error-klassen! Bruk av
`instanceof Error` vil returnere false.

Zod-pakken har en subklasse av `$ZodError` kalt `ZodError` med noen ekstra
metoder.  
`zod/mini` bruker direkte `$ZodError`.

```ts
export class $ZodError<T = unknown> implements Error {
  public issues: $ZodIssue[]
}
```

---

## Tilpasning av feilmeldinger

Zod 4 standardiserer APIene for feiltilpasning under én samlet error-param.

Tidligere var Zods APIer for feiltilpasning fragmenterte og inkonsistente. Dette
er nå ryddet opp i Zod 4.

### Utfaset: message

Erstattes med error. message-parametret støttes fortsatt, men er utfaset.

```ts
z.string().min(5, { error: 'For kort.' })
```

### Utfaset: invalid_type_error og required_error

Parametrene `invalid_type_error` og `required_error` er fjernet. Disse var en
snarvei for å tilpasse feil, men de kunne ikke brukes sammen med errorMap og
stemte ikke med Zods faktiske issue-koder.

Dette kan nå representeres med den nye error-parameteren:

```ts
z.string({
  error: issue =>
    issue.input === undefined ? 'Dette feltet er påkrevd' : 'Ikke en streng'
})
```

### Utfaset: errorMap

Dette er nå omdøpt til error.

Error-maps kan nå returnere en ren streng (i stedet for `{message: string}`),
eller undefined for å gi kontroll til neste error-map i kjeden.

```ts
z.string().min(5, {
  error: issue => {
    if (issue.code === 'too_small') {
      return `Verdien må være >${issue.minimum}`
    }
  }
})
```
