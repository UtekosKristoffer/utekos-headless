# zod-validation-error

**zod-validation-error** er et bibliotek som pakker Zod-valideringsfeil inn i enkle, brukervennlige meldinger. Selv om Zod v4 har forbedret sine egne verktøy for feilformatering, tilbyr dette biblioteket en mer spesialisert og robust løsning for å håndtere valideringsfeil mot sluttbrukere.

## Funksjoner

- Brukervennlige feilmeldinger med omfattende konfigurasjonsmuligheter
- Bevarer originale feildetaljer tilgjengelig via `error.details`
- Tilbyr en tilpasset error map for bedre, brukervennlige meldinger
- Støtter både Zod v3 og v4

## Hvorfor bruke `zod-validation-error`?

**zod-validation-error** skiller seg fra Zod v4s innebygde `z.prettifyError` på flere punkter som er svært relevante for vårt prosjekt.

### Sluttbrukerfokus

Biblioteket er utformet for å generere feilmeldinger som kan vises direkte til sluttbrukere i skjemaer eller API-responser.

### Omfattende tilpasning

Via `createErrorMap()`-funksjonen får du utstrakte konfigurasjonsmuligheter, som styrer:

- Om path skal inkluderes i feilmeldingen
- Hvordan feilmeldinger for union og array slås sammen
- Lokalisering av dato- og tallverdier
- Begrenset visning av tillatte verdier og ukjente nøkler

### Feilhåndteringsverktøy

I tillegg til formatering gir biblioteket enhetlige `ValidationError`-klasser og type guards (`isValidationError`, `isZodErrorLike`) som forenkler feiloppdagelse og -håndtering på tvers av ulike arkitektoniske mønstre.

## Sentral funksjonalitet

### `ValidationError`

En utvidelse av standard Error-klassen som kan inneholde den originale Zod-feilen i `cause`-feltet for feilsøking.

**Argumenter:**

- `message` – string; feilmelding (påkrevd)
- `options` – ErrorOptions; error options iht. JavaScript-definisjon (valgfritt)
- `options.cause` – kan inneholde original Zod-feil (valgfritt)

**Eksempel 1:** Opprett ny ValidationError med melding

```ts
import { ValidationError } from 'zod-validation-error';

const error = new ValidationError('foobar');
console.log(error instanceof Error); // true
```

**Eksempel 2:** Opprett ValidationError med melding og options.cause

```ts
import { z as zod } from 'zod';
import { ValidationError } from 'zod-validation-error';

const error = new ValidationError('foobar', {
    cause: new zod.ZodError([
        {
            origin: 'number',
            code: 'too_small',
            minimum: 0,
            inclusive: false,
            path: ['id'],
            message: 'Number must be greater than 0 at "id"',
            input: -1,
        },
    ]),
});

console.log(error.details); // viser issues fra zod error
```

### `createErrorMap()`

Denne funksjonen oppretter en tilpasset error map som brukes av Zod. Vår eksisterende `zodConfig.ts`-fil bruker denne for å sikre konsistente, norske feilmeldinger globalt.

**Argumenter:**

- `options` – objekt; formateringsvalg (valgfritt)

**Eksempel:**

```ts
import { z as zod } from 'zod';
import { createErrorMap } from 'zod-validation-error';

zod.config({
    customError: createErrorMap({
        displayInvalidFormatDetails: true,
    }),
});
```

**Vårt prosjekt:**

```ts
// Path: src/db/zod/zodConfig.ts

import * as z from 'zod'
import { createErrorMap } from 'zod-validation-error'

/**
 * Global Zod-konfigurasjon med norske feilmeldinger.
 * Sikrer at alle valideringsfeil i applikasjonen har
 * konsistente, brukervennlige meldinger på norsk.
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

### `createMessageBuilder`

Oppretter zod-validation-error sin standard MessageBuilder, som brukes til å produsere brukervennlige feilmeldinger.

**Argumenter:**

- `options` – objekt; formateringsvalg (valgfritt)

### `fromZodError()`

Konverterer en ZodError-instans til en ValidationError-instans.

**Argumenter:**

- `zodError` – zod.ZodError; en ZodError-instans (påkrevd)
- `options` – objekt; formateringsvalg (valgfritt)
- `messageBuilder` – funksjon som tar en array av zod.ZodIssue-objekter og returnerer en brukervennlig feilmelding (valgfritt)

### `fromError()`

En mer generisk versjon av `fromZodError()` som kan akseptere enhver ukjent feil og forsøke å konvertere den til en ValidationError. Vår kodebase bruker denne for feilhåndtering i funksjoner som `validateMenuHandle.ts` og `handleShopifyErrors.ts`.

**Argumenter:**

- `error` – unknown; en feil (påkrevd)
- `options` – objekt; formateringsvalg (valgfritt)
- `messageBuilder` – funksjon som tar en array av zod.ZodIssue-objekter og returnerer en brukervennlig feilmelding (valgfritt)

### `isValidationError`

Type guard utility-funksjon basert på instanceof-sammenligning.

**Argumenter:**

- `error` – error-instans (påkrevd)

**Eksempel:**

```ts
import { z as zod } from 'zod';
import { ValidationError, isValidationError } from 'zod-validation-error';

const err = new ValidationError('foobar');
isValidationError(err); // true

const invalidErr = new Error('foobar');
isValidationError(invalidErr); // false
```

### `isValidationErrorLike`

Type guard utility-funksjon basert på heuristikk.

**Hvorfor heuristikk?** Fordi multi-versjons-inkonsistenser kan oppstå. For eksempel kan en avhengighet bruke en eldre versjon av zod-validation-error internt, og da vil instanceof-sammenligning gi feil resultat.

## API-stabilitet

Biblioteket er kompatibelt med både Zod v3 og v4 og bruker `isZodErrorLike`-funksjonen for å sikre pålitelighet selv ved versjonskonflikter.

## Konklusjon

Selv om Zod v4s nye `z.prettifyError()` kan formatere feil til en lesbar streng, tilbyr **zod-validation-error** en mer komplett og tilpassbar løsning som er bedre egnet for våre behov. Vår nåværende praksis med å bruke `createErrorMap()` globalt og `fromError()` lokalt for å håndtere valideringsfeil er i tråd med beste praksis og bør videreføres.

