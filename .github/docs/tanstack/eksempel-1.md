# EKSEMPEL 2

Denne guiden viser hvordan du bruker TanStack Query (React Query) med Next.js
App Router og Server Components for å prefetch'e data på en effektiv og moderne
måte.

---

## 1. Prefetching med Server Components

Først oppretter vi en Server Component for å håndtere prefetching:

```tsx
// app/posts/page.tsx
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import Posts from './posts'

export default async function PostsPage() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
    })

    return (
        {/* Serialisering er nå så enkelt som å sende props. */}
        {/* HydrationBoundary er en Client Component, så hydrering skjer der. */}
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Posts />
        </HydrationBoundary>
    )
}
```

---

## 2. Klientkomponent med useQuery

Slik ser Client Component-delen ut:

```tsx
// app/posts/posts.tsx
'use client'

export default function Posts() {
  // useQuery kan også brukes i dypere barn til <Posts>
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts()
  })

  // Denne query'en blir ikke prefetched på server og starter først på klienten
  const { data: commentsData } = useQuery({
    queryKey: ['posts-comments'],
    queryFn: getComments
  })

  // ...
}
```

> **Merk:** Det eneste Next.js-spesifikke her er filnavnene – resten fungerer
> likt i alle rammeverk som støtter Server Components.

---

## 3. HydrationBoundary og SSR

I SSR-guiden nevnes at man kan fjerne <HydrationBoundary> boilerplate fra hver
rute, men dette er ikke mulig med Server Components.

---

## 4. Vanlige feil og tips

- **TypeScript-feil med async Server Components:** Oppdater til TypeScript >=
  5.1.3 og @types/react >= 18.2.8. Alternativt bruk
  `{/* @ts-expect-error Server Component */}` som midlertidig løsning.
- **Feil med serialisering:** Ikke send funksjonsreferanser til `queryFn`, kall
  funksjonen direkte for å sikre serialiserbarhet.

---

## 5. Nøsting av Server Components

Server Components kan nestes på flere nivåer i React-treet, slik at data kan
prefetche's nærmere der det brukes.

```tsx
// app/posts/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'
import Posts from './posts'
import CommentsServerComponent from './comments-server'

export default async function PostsPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
      <CommentsServerComponent />
    </HydrationBoundary>
  )
}

// app/posts/comments-server.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'
import Comments from './comments'

export default async function CommentsServerComponent() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts-comments'],
    queryFn: getComments
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Comments />
    </HydrationBoundary>
  )
}
```

> Det er helt greit å bruke <HydrationBoundary> flere steder og
> opprette/dehydrere flere queryClient for prefetching.

---

## 6. Server-side waterfall og parallelle ruter

Hvis du venter på én query før du starter neste, får du en "server-side
waterfall". Dette kan unngås ved å bruke parallelle ruter i Next.js, slik at
data hentes parallelt.

---

## 7. Alternativ: Gjenbruk av queryClient

Du kan bruke én queryClient for alle Server Components:

```tsx
// app/getQueryClient.tsx
import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

// cache() er scoped per request, så data lekker ikke mellom requests
const getQueryClient = cache(() => new QueryClient())
export default getQueryClient
```

> Fordelen er enkel tilgang til queryClient, men ulempen er at all data
> serialiseres hver gang, også irrelevante queries.

---

## 8. Dataeierskap og revalidering

Når du henter data både i Server og Client Components, kan de bli ute av synk
ved revalidering på klienten. Eksempel:

```tsx
// app/posts/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'
import Posts from './posts'

export default async function PostsPage() {
  const queryClient = new QueryClient()

  // Nå bruker vi fetchQuery()
  const posts = await queryClient.fetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Nytt: */}
      <div>Antall innlegg: {posts.length}</div>
      <Posts />
    </HydrationBoundary>
  )
}
```

> Ved revalidering på klienten kan antall innlegg bli ute av synk med listen.

---

## 9. Når bør du bruke React Query med Server Components?

- Migrerer fra React Query til Server Components gradvis
- Ønsker kjent programmeringsparadigme, men vil bruke Server Components der det
  gir mest mening
- Har use case som React Query dekker, men ikke rammeverket

**Tips:** Unngå `queryClient.fetchQuery` med mindre du må fange feil. Ikke
render resultatet på server eller send det videre til andre komponenter.

---

## 10. Oppsummering

- Bruk Server Components til prefetching, ikke til å eie data
- Klient og server kan eie hver sin data, men pass på at de ikke blir ute av
  synk
- Bruk riktig verktøy for jobben – React Query er ikke alltid nødvendig med
  Server Components
