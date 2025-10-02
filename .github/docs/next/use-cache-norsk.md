# use cache

> Denne funksjonen er for øyeblikket tilgjengelig i canary-kanalen og kan
> endres. I vårt prosjekt så er funksjonen aktivert.

Direktivet `use cache` lar deg merke en rute, React-komponent eller funksjon som
cache-bar. Det kan brukes øverst i en fil for å indikere at alle eksportene i
filen skal caches, eller inline øverst i en funksjon eller komponent for å cache
returverdien.

## Bruk

`use cache` er for øyeblikket en eksperimentell funksjon. For å aktivere den,
legg til
[`useCache`](/docs/app/api-reference/config/next-config-js/useCache.md)-alternativet
i din `next.config.ts`-fil:

```ts filename="next.config.ts" switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    useCache: true
  }
}

export default nextConfig
```

```js filename="next.config.js" switcher
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useCache: true
  }
}

module.exports = nextConfig
```

> **Nyttig å vite:** `use cache` kan også aktiveres med
> [`cacheComponents`](/docs/app/api-reference/config/next-config-js/cacheComponents.md)-alternativet.

Deretter legger du til `use cache` på fil-, komponent- eller funksjonsnivå:

```tsx
// Filnivå
'use cache'

export default async function Page() {
  // ...
}

// Komponentnivå
export async function MyComponent() {
  'use cache'
  return <></>
}

// Funksjonsnivå
export async function getData() {
  'use cache'
  const data = await fetch('/api/data')
  return data
}
```

## Hvordan `use cache` fungerer

### Cache-nøkler

En cache-oppførings nøkkel genereres ved å serialisere dens input, som
inkluderer:

- Build ID (generert for hver build)
- Funksjons-ID (en sikker identifikator unik for funksjonen)
- De
  [serialiserbare](https://react.dev/reference/rsc/use-server#serializable-parameters-and-return-values)
  funksjonsargumentene (eller props).

Argumentene som sendes til den cachede funksjonen, samt verdier den leser fra
foreldrescope, blir automatisk en del av nøkkelen. Dette betyr at samme
cache-oppføring vil gjenbrukes så lenge input er den samme.

## Ikke-serialiserbare argumenter

Eventuelle ikke-serialiserbare argumenter, props eller lukkede verdier blir
referanser inne i den cachede funksjonen, og kan kun sendes gjennom og ikke
inspiseres eller endres. Disse ikke-serialiserbare verdiene fylles inn ved
forespørselstidspunktet og blir ikke en del av cache-nøkkelen.

For eksempel kan en cachet funksjon ta inn JSX som en `children`-prop og
returnere `<div>{children}</div>`, men den kan ikke inspisere selve
`children`-objektet. Dette lar deg nestle ikke-cachet innhold inne i en cachet
komponent.

```tsx filename="app/ui/cached-component.tsx" switcher
function CachedComponent({ children }: { children: ReactNode }) {
  'use cache'
  return <div>{children}</div>
}
```

```jsx filename="app/ui/cached-component.js" switcher
function CachedComponent({ children }) {
  'use cache'
  return <div>{children}</div>
}
```

## Returverdier

Returverdien til den cachebare funksjonen må være serialiserbar. Dette sikrer at
cachet data kan lagres og hentes korrekt.

## `use cache` ved byggetid

Når det brukes øverst i en
[layout](/docs/app/api-reference/file-conventions/layout.md) eller
[page](/docs/app/api-reference/file-conventions/page.md), vil rutesegmentet bli
prerendret, slik at det senere kan [revalideres](#during-revalidation).

Dette betyr at `use cache` ikke kan brukes med
[request-time API-er](/docs/app/getting-started/partial-prerendering.md#dynamic-rendering)
som `cookies` eller `headers`.

## `use cache` ved kjøretid

På **serveren** vil cache-oppføringene til individuelle komponenter eller
funksjoner caches i minnet.

Deretter, på **klienten**, vil alt innhold returnert fra server-cachen lagres i
nettleserens minne for økten eller til det blir
[revalidert](#during-revalidation).

## Under revalidering

Som standard har `use cache` en server-side revalideringsperiode på **15
minutter**. Selv om denne perioden kan være nyttig for innhold som ikke krever
hyppige oppdateringer, kan du bruke `cacheLife` og `cacheTag`-APIene for å
konfigurere når individuelle cache-oppføringer skal revalideres.

- [`cacheLife`](/docs/app/api-reference/functions/cacheLife.md): Konfigurer
  cache-oppføringens levetid.
- [`cacheTag`](/docs/app/api-reference/functions/cacheTag.md): Opprett tagger
  for on-demand revalidering.

Begge disse APIene integreres på tvers av klient- og server-cachelagene, slik at
du kan konfigurere cache-semantikken på ett sted og få dem til å gjelde overalt.

Se [`cacheLife`](/docs/app/api-reference/functions/cacheLife.md) og
[`cacheTag`](/docs/app/api-reference/functions/cacheTag.md)-API-dokumentasjonen
for mer informasjon.

## Eksempler

### Cache hele ruten med `use cache`

For å prerendre en hel rute, legg til `use cache` øverst i **både** `layout`- og
`page`-filene. Hver av disse segmentene behandles som separate entry points i
applikasjonen din, og caches uavhengig.

```tsx filename="app/layout.tsx" switcher
'use cache'

export default function Layout({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}
```

```jsx filename="app/page.tsx" switcher
'use cache'

export default function Layout({ children }) {
  return <div>{children}</div>
}
```

Alle komponenter som importeres og nestles i `page`-filen vil arve
cache-adferden til `page`.

```tsx filename="app/page.tsx" switcher
'use cache'

async function Users() {
  const users = await fetch('/api/users')
  // loop gjennom brukere
}

export default function Page() {
  return (
    <main>
      <Users />
    </main>
  )
}
```

```jsx filename="app/page.js" switcher
'use cache'

async function Users() {
  const users = await fetch('/api/users')
  // loop gjennom brukere
}

export default function Page() {
  return (
    <main>
      <Users />
    </main>
  )
}
```

> **Nyttig å vite**:
>
> - Hvis `use cache` kun legges til i `layout` eller `page`, vil kun det
>   rutesegmentet og komponenter importert inn i det caches.
> - Hvis noen av de nestede barna i ruten bruker
>   [Dynamiske API-er](/docs/app/getting-started/partial-prerendering.md#dynamic-rendering),
>   vil ruten velge bort prerendering.

### Cache komponentens output med `use cache`

Du kan bruke `use cache` på komponentnivå for å cache alle fetches eller
beregninger som utføres i komponenten. Cache-oppføringen vil gjenbrukes så lenge
de serialiserte props gir samme verdi i hver instans.

```tsx filename="app/components/bookings.tsx" highlight={2} switcher
export async function Bookings({ type = 'haircut' }: BookingsProps) {
  'use cache'
  async function getBookingsData() {
    const data = await fetch(`/api/bookings?type=${encodeURIComponent(type)}`)
    return data
  }
  return //...
}

interface BookingsProps {
  type: string
}
```

```jsx filename="app/components/bookings.js" highlight={2} switcher
export async function Bookings({ type = 'haircut' }) {
  'use cache'
  async function getBookingsData() {
    const data = await fetch(`/api/bookings?type=${encodeURIComponent(type)}`)
    return data
  }
  return //...
}
```

### Cache funksjonsoutput med `use cache`

Siden du kan legge til `use cache` på enhver asynkron funksjon, er du ikke
begrenset til å cache komponenter eller ruter. Du kan cache et nettverkskall, en
databaseforespørsel eller en treg beregning.

```tsx filename="app/actions.ts" highlight={2} switcher
export async function getData() {
  'use cache'

  const data = await fetch('/api/data')
  return data
}
```

```jsx filename="app/actions.js" highlight={2} switcher
export async function getData() {
  'use cache'

  const data = await fetch('/api/data')
  return data
}
```

### Interleaving

Hvis du trenger å sende ikke-serialiserbare argumenter til en cachebar funksjon,
kan du sende dem som `children`. Dette betyr at `children`-referansen kan endres
uten å påvirke cache-oppføringen.

```tsx filename="app/page.tsx" switcher
export default async function Page() {
  const uncachedData = await getData()
  return (
    <CacheComponent>
      <DynamicComponent data={uncachedData} />
    </CacheComponent>
  )
}

async function CacheComponent({ children }: { children: ReactNode }) {
  'use cache'
  const cachedData = await fetch('/api/cached-data')
  return (
    <div>
      <PrerenderedComponent data={cachedData} />
      {children}
    </div>
  )
}
```

```jsx filename="app/page.js" switcher
export default async function Page() {
  const uncachedData = await getData()
  return (
    <CacheComponent>
      <DynamicComponent data={uncachedData} />
    </CacheComponent>
  )
}

async function CacheComponent({ children }) {
  'use cache'
  const cachedData = await fetch('/api/cached-data')
  return (
    <div>
      <PrerenderedComponent data={cachedData} />
      {children}
    </div>
  )
}
```

Du kan også sende Server Actions gjennom cachede komponenter til Client
Components uten å kalle dem inne i den cachebare funksjonen.

```tsx filename="app/page.tsx" switcher
import ClientComponent from './ClientComponent'

export default async function Page() {
    const performUpdate = async () => {
        'use server'
        // Utfør en server-side oppdatering
        await db.update(...)
    }

    return <CacheComponent performUpdate={performUpdate} />
}

async function CachedComponent({
    performUpdate,
}: {
    performUpdate: () => Promise<void>
}) {
    'use cache'
    // Ikke kall performUpdate her
    return <ClientComponent action={performUpdate} />
}
```

```jsx filename="app/page.js" switcher
import ClientComponent from './ClientComponent'

export default async function Page() {
    const performUpdate = async () => {
        'use server'
        // Utfør en server-side oppdatering
        await db.update(...)
    }

    return <CacheComponent performUpdate={performUpdate} />
}

async function CachedComponent({ performUpdate }) {
    'use cache'
    // Ikke kall performUpdate her
    return <ClientComponent action={performUpdate} />
}
```

```tsx filename="app/ClientComponent.tsx" switcher
'use client'

export default function ClientComponent({
  action
}: {
  action: () => Promise<void>
}) {
  return <button onClick={action}>Oppdater</button>
}
```

```jsx filename="app/ClientComponent.js" switcher
'use client'

export default function ClientComponent({ action }) {
  return <button onClick={action}>Oppdater</button>
}
```

## Plattformstøtte

| Deploy-alternativ                                                       | Støttet            |
| ----------------------------------------------------------------------- | ------------------ |
| [Node.js server](/docs/app/getting-started/deploying.md#nodejs-server)  | Ja                 |
| [Docker container](/docs/app/getting-started/deploying.md#docker)       | Ja                 |
| [Statisk eksport](/docs/app/getting-started/deploying.md#static-export) | Nei                |
| [Adapters](/docs/app/getting-started/deploying.md#adapters)             | Plattformspesifikk |

Lær hvordan du
[konfigurerer caching](/docs/app/guides/self-hosting.md#caching-and-isr) ved
egenhosting av Next.js.

## Versjonshistorikk

| Versjon   | Endringer                                                  |
| --------- | ---------------------------------------------------------- |
| `v15.0.0` | `"use cache"` introduseres som en eksperimentell funksjon. |

## Relatert

Se relaterte API-referanser.

- [useCache](/docs/app/api-reference/config/next-config-js/useCache.md)
  - Lær hvordan du aktiverer useCache-flagget i Next.js.
- [cacheComponents](/docs/app/api-reference/config/next-config-js/cacheComponents.md)
  - Lær hvordan du aktiverer cacheComponents-flagget i Next.js.
- [cacheLife](/docs/app/api-reference/config/next-config-js/cacheLife.md)
  - Lær hvordan du setter opp cacheLife-konfigurasjoner i Next.js.
- [cacheTag](/docs/app/api-reference/functions/cacheTag.md)
  - Lær hvordan du bruker cacheTag-funksjonen for å håndtere cache-invalidering
    i din Next.js-applikasjon.
- [cacheLife](/docs/app/api-reference/functions/cacheLife.md)
  - Lær hvordan du bruker cacheLife-funksjonen for å sette cache-utløpstid for
    en cachet funksjon eller komponent.
- [revalidateTag](/docs/app/api-reference/functions/revalidateTag.md)
  - API-referanse for revalidateTag-funksjonen.
