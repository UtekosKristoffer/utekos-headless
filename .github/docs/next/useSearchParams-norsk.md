# useSearchParams

`useSearchParams` er en **Client Component**-hook som lar deg lese gjeldende URL
sin **query string**.

`useSearchParams` returnerer en **read-only** versjon av
[`URLSearchParams`](https://developer.mozilla.org/docs/Web/API/URLSearchParams)
interfacet.

```tsx filename="app/dashboard/search-bar.tsx" switcher
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>Search: {search}</>
}
```

```jsx filename="app/dashboard/search-bar.js" switcher
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>Search: {search}</>
}
```

## Parametre

```tsx
const searchParams = useSearchParams()
```

`useSearchParams` tar ingen parametre.

## Returnerer

`useSearchParams` returnerer en **read-only** versjon av
[`URLSearchParams`](https://developer.mozilla.org/docs/Web/API/URLSearchParams)
interfacet, som inkluderer hjelpe-metoder for å lese query string fra URL:

- [`URLSearchParams.get()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/get):
  Returnerer den første verdien assosiert med søkeparameteren. For eksempel:

  | URL                  | `searchParams.get("a")`                                                                                         |
  | -------------------- | --------------------------------------------------------------------------------------------------------------- |
  | `/dashboard?a=1`     | `'1'`                                                                                                           |
  | `/dashboard?a=`      | `''`                                                                                                            |
  | `/dashboard?b=3`     | `null`                                                                                                          |
  | `/dashboard?a=1&a=2` | `'1'` _- bruk [`getAll()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/getAll) for alle verdier_ |

- [`URLSearchParams.has()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/has):
  Returnerer en boolean som indikerer om gitt parameter eksisterer. For
  eksempel:

  | URL              | `searchParams.has("a")` |
  | ---------------- | ----------------------- |
  | `/dashboard?a=1` | `true`                  |
  | `/dashboard?b=3` | `false`                 |

- Les mer om andre **read-only** metoder for
  [`URLSearchParams`](https://developer.mozilla.org/docs/Web/API/URLSearchParams),
  inkludert
  [`getAll()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/getAll),
  [`keys()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/keys),
  [`values()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/values),
  [`entries()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/entries),
  [`forEach()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/forEach),
  og
  [`toString()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/toString).

> **Nyttig å vite**:
>
> - `useSearchParams` er en
>   [Client Component](/docs/app/getting-started/server-and-client-components.md)
>   hook og **støttes ikke** i
>   [Server Components](/docs/app/getting-started/server-and-client-components.md)
>   for å forhindre utdaterte verdier under
>   [partial rendering](/docs/app/getting-started/linking-and-navigating.md#client-side-transitions).
> - Hvis du ønsker å hente data i en Server Component basert på search params,
>   er det ofte bedre å lese
>   [`searchParams` prop](/docs/app/api-reference/file-conventions/page.md#searchparams-optional)
>   fra tilhørende Page. Du kan så sende den videre som prop til hvilken som
>   helst komponent (Server eller Client) innenfor den Page.
> - Hvis applikasjonen inkluderer `/pages`-mappen, vil `useSearchParams`
>   returnere `ReadonlyURLSearchParams | null`. Verdien `null` er for
>   kompatibilitet under migrering, siden search params ikke kan være kjent
>   under pre-rendering av en side som ikke bruker `getServerSideProps`.

## Oppførsel

### Statisk rendering

Hvis en rute er
[statisk rendret](/docs/app/getting-started/partial-prerendering.md#static-rendering),
vil kall til `useSearchParams` føre til at Client Component-treet opp til
nærmeste
[`Suspense` boundary](/docs/app/api-reference/file-conventions/loading.md#examples)
blir client-side rendret.

Dette gjør at deler av ruten kan rendres statisk, mens den dynamiske delen som
bruker `useSearchParams` rendres på klienten.

Vi anbefaler å pakke Client Component som bruker `useSearchParams` inn i en
`<Suspense/>` boundary. Dette gjør at alle Client Components over kan rendres
statisk og sendes som del av initial HTML.
[Eksempel](/docs/app/api-reference/functions/use-search-params.md#static-rendering).

For eksempel:

```tsx filename="app/dashboard/search-bar.tsx" switcher
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  // Dette vil ikke logges på serveren ved statisk rendering
  console.log(search)

  return <>Search: {search}</>
}
```

```jsx filename="app/dashboard/search-bar.js" switcher
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  // Dette vil ikke logges på serveren ved statisk rendering
  console.log(search)

  return <>Search: {search}</>
}
```

```tsx filename="app/dashboard/page.tsx" switcher
import { Suspense } from 'react'
import SearchBar from './search-bar'

// Denne komponenten som fallback til Suspense boundary
// vil bli rendret i stedet for search bar i initial HTML.
// Når verdien er tilgjengelig under React hydration vil fallback
// bli erstattet med `<SearchBar>`-komponenten.
function SearchBarFallback() {
  return <>placeholder</>
}

export default function Page() {
  return (
    <>
      <nav>
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}
```

```jsx filename="app/dashboard/page.js" switcher
import { Suspense } from 'react'
import SearchBar from './search-bar'

// Denne komponenten som fallback til Suspense boundary
// vil bli rendret i stedet for search bar i initial HTML.
// Når verdien er tilgjengelig under React hydration vil fallback
// bli erstattet med `<SearchBar>`-komponenten.
function SearchBarFallback() {
  return <>placeholder</>
}

export default function Page() {
  return (
    <>
      <nav>
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}
```

> **Nyttig å vite**: I utvikling rendres alle sider on-demand, så
> `useSearchParams` suspenderer ikke. Men pre-rendering av en
> [statisk side](/docs/app/getting-started/partial-prerendering.md#static-rendering)
> som fungerer i utvikling vil feile bygget hvis `useSearchParams` brukes i en
> Client Component som ikke er direkte eller indirekte pakket inn i en
> `Suspense` boundary.

### Dynamisk rendering

Hvis en rute er
[dynamisk rendret](/docs/app/getting-started/partial-prerendering.md#dynamic-rendering),
vil `useSearchParams` være tilgjengelig på serveren under initial server-render
av Client Component.

For eksempel:

```tsx filename="app/dashboard/search-bar.tsx" switcher
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  // Dette vil logges på serveren under initial render
  // og på klienten ved senere navigasjoner.
  console.log(search)

  return <>Search: {search}</>
}
```

```jsx filename="app/dashboard/search-bar.js" switcher
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  // Dette vil logges på serveren under initial render
  // og på klienten ved senere navigasjoner.
  console.log(search)

  return <>Search: {search}</>
}
```

```tsx filename="app/dashboard/page.tsx" switcher
import SearchBar from './search-bar'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <>
      <nav>
        <SearchBar />
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}
```

```jsx filename="app/dashboard/page.js" switcher
import SearchBar from './search-bar'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <>
      <nav>
        <SearchBar />
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}
```

> **Nyttig å vite**: Ved å sette
> [`dynamic` route segment config option](/docs/app/api-reference/file-conventions/route-segment-config.md#dynamic)
> til `force-dynamic` kan du tvinge dynamisk rendering.

### Server Components

#### Pages

For å få tilgang til search params i
[Pages](/docs/app/api-reference/file-conventions/page.md) (Server Components),
bruk
[`searchParams`](/docs/app/api-reference/file-conventions/page.md#searchparams-optional)
prop.

#### Layouts

I motsetning til Pages, får
[Layouts](/docs/app/api-reference/file-conventions/layout.md) (Server
Components) **ikke** `searchParams`-prop. Dette er fordi en delt layout
[ikke rendres på nytt ved navigasjon](/docs/app/getting-started/linking-and-navigating.md#client-side-transitions)
og kan føre til utdaterte `searchParams` mellom navigasjoner. Se
[detaljert forklaring](/docs/app/api-reference/file-conventions/layout.md#query-params).

Bruk heller Page
[`searchParams`](/docs/app/api-reference/file-conventions/page.md) prop eller
[`useSearchParams`](/docs/app/api-reference/functions/use-search-params.md) hook
i en Client Component, som rendres på klienten med oppdaterte `searchParams`.

## Eksempler

### Oppdatere `searchParams`

Du kan bruke [`useRouter`](/docs/app/api-reference/functions/use-router.md)
eller [`Link`](/docs/app/api-reference/components/link.md) for å sette nye
`searchParams`. Etter navigasjon vil gjeldende
[`page.js`](/docs/app/api-reference/file-conventions/page.md) motta oppdatert
[`searchParams` prop](/docs/app/api-reference/file-conventions/page.md#searchparams-optional).

```tsx filename="app/example-client-component.tsx" switcher
'use client'

export default function ExampleClientComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Få en ny searchParams-string ved å merge gjeldende
  // searchParams med en gitt key/value
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <>
      <p>Sort By</p>

      {/* bruker useRouter */}
      <button
        onClick={() => {
          // <pathname>?sort=asc
          router.push(pathname + '?' + createQueryString('sort', 'asc'))
        }}
      >
        ASC
      </button>

      {/* bruker <Link> */}
      <Link
        href={
          // <pathname>?sort=desc
          pathname + '?' + createQueryString('sort', 'desc')
        }
      >
        DESC
      </Link>
    </>
  )
}
```

```jsx filename="app/example-client-component.js" switcher
'use client'

export default function ExampleClientComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Få en ny searchParams-string ved å merge gjeldende
  // searchParams med en gitt key/value
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <>
      <p>Sort By</p>

      {/* bruker useRouter */}
      <button
        onClick={() => {
          // <pathname>?sort=asc
          router.push(pathname + '?' + createQueryString('sort', 'asc'))
        }}
      >
        ASC
      </button>

      {/* bruker <Link> */}
      <Link
        href={
          // <pathname>?sort=desc
          pathname + '?' + createQueryString('sort', 'desc')
        }
      >
        DESC
      </Link>
    </>
  )
}
```

## Versjonshistorikk

| Versjon   | Endringer                      |
| --------- | ------------------------------ |
| `v13.0.0` | `useSearchParams` introdusert. |
