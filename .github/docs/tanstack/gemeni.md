# Fasit: Mønster for Prefetch-Dehydrate-Hydrate med TanStack Query v5 i Next.js App Router

Dette dokumentet beskriver beste praksis for å integrere server-initiert
datahenting med klient-sidens state management ved hjelp av TanStack Query i et
moderne React 19 og Next.js 15-miljø.

---

## 1. Konseptuelt Overblikk

Målet med dette mønsteret er å kombinere det beste fra to verdener:

- **Ytelsen til Server Components (RSC):** Datahenting startes umiddelbart på
  serveren, noe som eliminerer klient-server-fossefall.
- **Kraften til TanStack Query:** Dataen på klienten blir "levende" og kan dra
  nytte av avansert funksjonalitet som caching, bakgrunnsoppdateringer,
  optimistiske oppdateringer og mutasjoner.

Mønsteret muliggjør streaming av selve dataen (ikke bare UI), ved å sende en
promise fra serveren til klienten.

### Datastrømmen

1. **Server (RSC):** En datahenting initieres via `queryClient.prefetchQuery()`.
   Anropet blir ikke await-et, noe som returnerer en promise umiddelbart og lar
   RSC-en rendre ferdig uten å blokkere.
2. **Server (RSC):** QueryClient-instansen, som nå inneholder den pending
   promisen, blir "dehydrert" med `dehydrate()`.
3. **Grensesnitt (RSC -> CC):** Den dehydrerte tilstanden (som inneholder den
   serialiserte promisen) sendes som en prop til `<HydrationBoundary>`.
4. **Klient (CC):** Inne i `<HydrationBoundary>`, vil `useSuspenseQuery` med
   samme queryKey "plukke opp" promisen fra den hydrerte cachen. Komponentet
   suspenderer til promisen er løst, og integrerer seg sømløst med Reacts
   streaming-arkitektur.

---

## 2. Forutsetninger og Oppsett

For at mønsteret skal fungere korrekt, kreves et spesifikt oppsett for
QueryClient.

### 2.1. QueryClient-instansiering

Det er kritisk å bruke en singleton-tilnærming for QueryClient på klienten for å
unngå at instansen nullstilles ved suspensjon, samtidig som hver server-request
får sin egen, isolerte instans.

```typescript
// src/app/getQueryClient.tsx
import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer
} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000
      },
      dehydrate: {
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending'
      }
    }
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
```

### 2.2. Konfigurasjon for Data-streaming

Den avgjørende konfigurasjonen er `shouldDehydrateQuery`. Ved å utvide
standardfunksjonen til også å inkludere queries med status `pending`, forteller
vi TanStack Query at den skal serialisere og sende aktive promises under
dehydrering.

### 2.3. Providers-komponent

En standard Providers-komponent kreves for å gjøre QueryClient tilgjengelig for
alle Klient-komponenter via React Context.

```typescript
// src/app/Providers.tsx
'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/app/get-query-client'
import type * as React from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
```

---

## 3. Steg-for-steg Implementering

### 3.1. Definere en Gjenbrukbar Query (queryOptions)

For å sikre konsistens og unngå repetisjon, er det beste praksis å definere
`queryKey` og `queryFn` i et gjenbrukbart objekt med `queryOptions`.

```typescript
// src/app/pokemonOptions.tsx
import { queryOptions } from '@tanstack/react-query'

export const pokemonOptions = queryOptions({
  queryKey: ['pokemon'],
  queryFn: async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/25')
    return response.json()
  }
})
```

### 3.2. Prefetch og Dehydrate i en Server Component

Dette er server-delen av mønsteret, typisk i en `page.tsx` eller `layout.tsx`.

```typescript
// src/app/page.tsx
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { pokemonOptions } from '@/app/pokemonOptions'
import { getQueryClient } from '@/app/getQueryClient'
import { PokemonInfo } from './PokemonInfo'

export default function Home() {
    const queryClient = getQueryClient()

    // Start prefetch, men IKKE await. `void` signaliserer "fire-and-forget".
    void queryClient.prefetchQuery(pokemonOptions)

    return (
        <main>
            <h1>Pokemon Info</h1>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <PokemonInfo />
            </HydrationBoundary>
        </main>
    )
}
```

### 3.3. Hydrate og Konsumere i en Client Component

Dette er klient-delen, hvor dataen blir mottatt og brukt.

```typescript
// src/app/PokemonInfo.tsx
'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { pokemonOptions } from '@/app/pokemonOptions'

export function PokemonInfo() {
    const { data } = useSuspenseQuery(pokemonOptions)

    return (
        <div>
            <figure>
                <img src={data.sprites.front_shiny} height={200} alt={data.name} />
                <h2>I'm {data.name}</h2>
            </figure>
        </div>
    )
}
```

---

## 4. Nøkkelprinsipper og "Best Practices"

- **Dataeierskap:** For å unngå inkonsistent UI ved refetching, bør
  Klient-komponenten "eie" og være ansvarlig for å rendre dataen fra TanStack
  Query. Server-komponentens rolle er primært å initiere prefetch.
- **staleTime:** Det er kritisk å sette en `staleTime > 0` i
  QueryClient-konfigurasjonen. Dette forhindrer at `useSuspenseQuery`
  umiddelbart anser den hydrerte dataen som utdatert og trigger en unødvendig
  refetch på klienten.
- **Feilhåndtering:** `prefetchQuery` vil ikke kaste feil. Eventuelle feil i
  datahentingen vil bli fanget av `useSuspenseQuery` på klienten og propagere
  til nærmeste React Error Boundary.
