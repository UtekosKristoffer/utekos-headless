# cookies

`cookies` er en **asynkron** funksjon som lar deg lese HTTP-forespørselscookies
i
[Server Components](/docs/app/getting-started/server-and-client-components.md),
og lese/skrive utgående cookies i
[Server Actions](/docs/app/getting-started/updating-data.md) eller
[Route Handlers](/docs/app/api-reference/file-conventions/route.md).

```tsx filename="app/page.tsx" switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

```js filename="app/page.js" switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

## Referanse

### Metoder

Følgende metoder er tilgjengelige:

| Metode                      | Returtype         | Beskrivelse                                                        |
| --------------------------- | ----------------- | ------------------------------------------------------------------ |
| `get('name')`               | Objekt            | Tar imot et cookienavn og returnerer et objekt med navn og verdi.  |
| `getAll()`                  | Array av objekter | Returnerer en liste over alle cookies med et gitt navn.            |
| `has('name')`               | Boolean           | Tar imot et cookienavn og returnerer en boolean om cookien finnes. |
| `set(name, value, options)` | -                 | Tar imot navn, verdi og options og setter utgående cookie.         |
| `delete(name)`              | -                 | Tar imot et cookienavn og sletter cookien.                         |
| `clear()`                   | -                 | Sletter alle cookies.                                              |
| `toString()`                | String            | Returnerer en strengrepresentasjon av cookies.                     |

### Options

Når du setter en cookie, støttes følgende egenskaper fra `options`-objektet:

| Option        | Type                                   | Beskrivelse                                                                |
| ------------- | -------------------------------------- | -------------------------------------------------------------------------- |
| `name`        | String                                 | Spesifiserer navnet på cookien.                                            |
| `value`       | String                                 | Spesifiserer verdien som skal lagres i cookien.                            |
| `expires`     | Date                                   | Definerer nøyaktig dato når cookien utløper.                               |
| `maxAge`      | Number                                 | Setter levetiden til cookien i sekunder.                                   |
| `domain`      | String                                 | Spesifiserer domenet hvor cookien er tilgjengelig.                         |
| `path`        | String, default: `'/'`                 | Begrenser cookiens scope til en spesifikk path innen domenet.              |
| `secure`      | Boolean                                | Sikrer at cookien kun sendes over HTTPS for økt sikkerhet.                 |
| `httpOnly`    | Boolean                                | Begrenser cookien til HTTP-forespørsler, hindrer tilgang fra klienten.     |
| `sameSite`    | Boolean, `'lax'`, `'strict'`, `'none'` | Kontrollerer cookiens cross-site oppførsel.                                |
| `priority`    | String (`"low"`, `"medium"`, `"high"`) | Spesifiserer cookiens prioritet.                                           |
| `partitioned` | Boolean                                | Indikerer om cookien er [partitioned](https://github.com/privacycg/CHIPS). |

Den eneste egenskapen med standardverdi er `path`.

For mer informasjon om disse options, se
[MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies).

## Nyttig å vite

- `cookies` er en **asynkron** funksjon som returnerer et promise. Du må bruke
  `async/await` eller Reacts [`use`](https://react.dev/reference/react/use)
  funksjon for å få tilgang til cookies.
  - I versjon 14 og tidligere var `cookies` en synkron funksjon. For
    bakoverkompatibilitet kan du fortsatt bruke den synkront i Next.js 15, men
    denne oppførselen vil bli avviklet i fremtiden.
- `cookies` er en
  [Dynamisk API](/docs/app/getting-started/partial-prerendering.md#dynamic-rendering)
  hvor returnerte verdier ikke kan kjennes på forhånd. Bruk av denne i en layout
  eller side vil gjøre ruten dynamisk.
- `.delete`-metoden kan kun kalles:
  - I en [Server Action](/docs/app/getting-started/updating-data.md) eller
    [Route Handler](/docs/app/api-reference/file-conventions/route.md).
  - Hvis den tilhører samme domene som `.set` kalles fra. For wildcard-domener
    må subdomenet være en eksakt match. I tillegg må koden kjøres på samme
    protokoll (HTTP eller HTTPS) som cookien du vil slette.
- HTTP tillater ikke å sette cookies etter streaming har startet, så du må bruke
  `.set` i en [Server Action](/docs/app/getting-started/updating-data.md) eller
  [Route Handler](/docs/app/api-reference/file-conventions/route.md).

## Forstå cookie-oppførsel i Server Components

Når du jobber med cookies i Server Components, er det viktig å forstå at cookies
i bunn og grunn er en klient-side lagringsmekanisme:

- **Lesing av cookies** fungerer i Server Components fordi du får tilgang til
  cookie-data som klientens nettleser sender til serveren i HTTP-headeren.
- **Sette cookies** kan ikke gjøres direkte i en Server Component, selv om du
  bruker Route Handler eller Server Action. Dette er fordi cookies faktisk
  lagres av nettleseren, ikke serveren.

Serveren kan kun sende instruksjoner (via `Set-Cookie`-header) for å be
nettleseren lagre cookies – selve lagringen skjer på klienten. Derfor må
cookie-operasjoner som endrer tilstand (`.set`, `.delete`, `.clear`) utføres i
en Route Handler eller Server Action hvor respons-headerne kan settes riktig.

## Forstå cookie-oppførsel i Server Actions

Etter at du setter eller sletter en cookie i en Server Action, re-renderer
Next.js den aktuelle siden og layoutene på serveren slik at UI reflekterer den
nye cookie-verdien. Se [Caching guide](/docs/app/guides/caching.md#cookies).

UI blir ikke unmountet, men effekter som avhenger av data fra serveren vil kjøre
på nytt.

For å oppdatere cachet data også, kall
[`revalidatePath`](/docs/app/api-reference/functions/revalidatePath.md) eller
[`revalidateTag`](/docs/app/api-reference/functions/revalidateTag.md) inne i
actionen.

## Eksempler

### Hente en cookie

Du kan bruke `(await cookies()).get('name')`-metoden for å hente en enkelt
cookie:

```tsx filename="app/page.tsx" switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

```jsx filename="app/page.js" switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

### Hente alle cookies

Du kan bruke `(await cookies()).getAll()`-metoden for å hente alle cookies med
gitt navn. Hvis `name` ikke er spesifisert, returneres alle tilgjengelige
cookies.

```tsx filename="app/page.tsx" switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  return cookieStore.getAll().map(cookie => (
    <div key={cookie.name}>
      <p>Name: {cookie.name}</p>
      <p>Value: {cookie.value}</p>
    </div>
  ))
}
```

```jsx filename="app/page.js" switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  return cookieStore.getAll().map(cookie => (
    <div key={cookie.name}>
      <p>Name: {cookie.name}</p>
      <p>Value: {cookie.value}</p>
    </div>
  ))
}
```

### Sette en cookie

Du kan bruke `(await cookies()).set(name, value, options)`-metoden i en
[Server Action](/docs/app/getting-started/updating-data.md) eller
[Route Handler](/docs/app/api-reference/file-conventions/route.md) for å sette
en cookie. [`options`-objektet](#options) er valgfritt.

```tsx filename="app/actions.ts" switcher
'use server'

import { cookies } from 'next/headers'

export async function create(data) {
  const cookieStore = await cookies()

  cookieStore.set('name', 'lee')
  // eller
  cookieStore.set('name', 'lee', { secure: true })
  // eller
  cookieStore.set({
    name: 'name',
    value: 'lee',
    httpOnly: true,
    path: '/'
  })
}
```

```js filename="app/actions.js" switcher
'use server'

import { cookies } from 'next/headers'

export async function create(data) {
  const cookieStore = await cookies()

  cookieStore.set('name', 'lee')
  // eller
  cookieStore.set('name', 'lee', { secure: true })
  // eller
  cookieStore.set({
    name: 'name',
    value: 'lee',
    httpOnly: true,
    path: '/'
  })
}
```

### Sjekke om en cookie finnes

Du kan bruke `(await cookies()).has(name)`-metoden for å sjekke om en cookie
finnes:

```tsx filename="app/page.ts" switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const hasCookie = cookieStore.has('theme')
  return '...'
}
```

```jsx filename="app/page.js" switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const hasCookie = cookieStore.has('theme')
  return '...'
}
```

### Slette cookies

Det finnes tre måter å slette en cookie på.

Ved å bruke `delete()`-metoden:

```tsx filename="app/actions.ts" switcher
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
    (await cookies()).delete('name')
}
```

```js filename="app/actions.js" switcher
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
    (await cookies()).delete('name')
}
```

Ved å sette en ny cookie med samme navn og tom verdi:

```tsx filename="app/actions.ts" switcher
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
    (await cookies()).set('name', '')
}
```

```js filename="app/actions.js" switcher
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
    (await cookies()).set('name', '')
}
```

Ved å sette `maxAge` til 0 vil cookien utløpe umiddelbart. `maxAge` tar imot
verdi i sekunder.

```tsx filename="app/actions.ts" switcher
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
    (await cookies()).set('name', 'value', { maxAge: 0 })
}
```

```js filename="app/actions.js" switcher
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
    (await cookies()).set('name', 'value', { maxAge: 0 })
``
}
```

## Versjonshistorikk

| Versjon      | Endringer                                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| `v15.0.0-RC` | `cookies` er nå en asynkron funksjon. En [codemod](/docs/app/guides/upgrading/codemods.md#150) er tilgjengelig. |
| `v13.0.0`    | `cookies` introdusert.                                                                                          |
