# EKSEMPEL 1

## Dette blir løsningen

Next.js App Router **streamer automatisk** alle deler av applikasjonen som er
klare til å vises i nettleseren, slik at ferdig innhold kan vises umiddelbart
uten å vente på resterende innhold. Dette skjer langs `<Suspense>`-grenser. Hvis
du oppretter en fil `loading.tsx`, opprettes en `<Suspense>`-grense automatisk.

---

## Prefetching og React Query

Med prefetching-mønstrene beskrevet ovenfor er **React Query** fullt kompatibel
med streaming. Når data for hver `<Suspense>`-grense er ferdig, kan Next.js
rendre og streame innholdet til nettleseren. Dette fungerer selv om du bruker
`useQuery`, fordi suspenderingen skjer når du awaiter prefetch.

Fra og med **React Query v5.40.0** trenger du ikke å awaite alle prefetches for
at dette skal fungere. Pending Queries kan også dehydreres og sendes til
klienten. Dette lar deg starte prefetch så tidlig som mulig uten å blokkere en
hel `<Suspense>`-grense, og streamer data til klienten etter hvert som queryen
fullføres.

> **Eksempel:**  
> Du kan prefetch innhold som kun er synlig etter brukerinteraksjon, eller
> awaite og rendre første side av en infinite query, men starte prefetch av side
> 2 uten å blokkere rendering.

---

## Konfigurasjon av QueryClient for Pending Queries

For å få dette til å fungere, må vi instruere `queryClient` til å dehydere
pending Queries. Dette kan gjøres globalt eller ved å sende inn opsjonen direkte
til `dehydrate`.

Flytt `getQueryClient()` ut av `app/providers.tsx` slik at den kan brukes både i
server- og klientkomponenter.

```typescript
// app/get-query-client.ts
import {
  isServer,
  QueryClient,
  defaultShouldDehydrateQuery
} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000
      },
      dehydrate: {
        // inkluder pending queries i dehydrering
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query)
          || query.state.status === 'pending',
        shouldRedactErrors: error => {
          // Ikke rediger Next.js serverfeil
          return false
        }
      }
    }
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (isServer) {
    // Server: alltid lag en ny query client
    return makeQueryClient()
  } else {
    // Browser: lag en ny query client hvis vi ikke allerede har en
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
```

> **Merk:**  
> Dette fungerer i Next.js og Server Components fordi React kan serialisere
> Promises over wire når du sender dem til Client Components.

---

## Bruk av HydrationBoundary uten await

Du trenger ikke lenger awaite prefetches:

```typescript
// app/posts/page.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from './get-query-client'
import Posts from './posts'

export default function PostsPage() {
    const queryClient = getQueryClient()

    // ingen await
    queryClient.prefetchQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Posts />
        </HydrationBoundary>
    )
}
```

På klienten vil Promise bli lagt inn i QueryCache. Du kan nå bruke
`useSuspenseQuery` i `Posts`-komponenten for å bruke denne Promisen:

```typescript
// app/posts/posts.tsx
'use client'

export default function Posts() {
  const { data } = useSuspenseQuery({ queryKey: ['posts'], queryFn: getPosts })

  // ...
}
```

Du kan også bruke `useQuery` istedenfor `useSuspenseQuery`, og Promisen vil
fortsatt bli plukket opp korrekt. Men Next.js vil ikke suspendere i det
tilfellet, og komponenten vil rendre i pending status, noe som også velger bort
server rendering av innholdet.

---

## Serialisering av ikke-JSON data

Hvis du bruker ikke-JSON datatyper og serialiserer query-resultater på serveren,
kan du spesifisere `dehydrate.serializeData` og `hydrate.deserializeData` for å
sikre at data i cachen har samme format på server og klient.

```typescript
// app/get-query-client.ts
import { QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query'
import { deserialize, serialize } from './transformer'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      hydrate: {
        deserializeData: deserialize
      },
      dehydrate: {
        serializeData: serialize
      }
    }
  })
}
```

**Eksempel på bruk:**

```typescript
// app/posts/page.tsx
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import { getQueryClient } from './get-query-client'
import { serialize } from './transformer'
import Posts from './posts'

export default function PostsPage() {
    const queryClient = getQueryClient()

    queryClient.prefetchQuery({
        queryKey: ['posts'],
        queryFn: () => getPosts().then(serialize), // serialiser data på server
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Posts />
        </HydrationBoundary>
    )
}
```

```typescript
// app/posts/posts.tsx
'use client'

export default function Posts() {
  const { data } = useSuspenseQuery({ queryKey: ['posts'], queryFn: getPosts })

  // ...
}
```

Nå kan `getPosts` returnere f.eks. Temporal datetime-objekter, og data vil bli
serialisert og deserialisert på klienten, forutsatt at din transformer håndterer
disse datatypene.

---

## Fullt eksempel

### getQueryClient.ts

```typescript
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
        // include pending queries in dehydration
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending'
      }
    }
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
```

### layout.tsx

```typescript
import Providers from './providers'
import type React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

### page.tsx

```typescript
import React from 'react'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { pokemonOptions } from '@/app/pokemon'
import { getQueryClient } from '@/app/get-query-client'
import { PokemonInfo } from './pokemon-info'

export default function Home() {
  const queryClient = getQueryClient()

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

### pokemonOptions.tsx

```tsx
import { queryOptions } from '@tanstack/react-query'

export const pokemonOptions = queryOptions({
  queryKey: ['pokemon'],
  queryFn: async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/25')

    return response.json()
  }
})
```

### pokemon-info.tsx

```tsx
import React from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { pokemonOptions } from '@/app/pokemon'

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

### providers.tsx

```typescript
'use client'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getQueryClient } from '@/app/get-query-client'
import type * as React from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
```

---

> **Oppsummering:**  
> Med Next.js App Router og TanStack Query kan du effektivt streame data og UI
> til klienten, inkludert pending queries, og håndtere avansert serialisering
> for ikke-JSON data. Dette gir optimal ytelse og fleksibilitet for moderne
> e-handelsapplikasjoner.
