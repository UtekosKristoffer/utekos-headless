# page.js

Filen `page` lar deg definere brukergrensesnitt som er **unikt** for en rute. Du
kan opprette en side ved å eksportere en komponent som standard fra filen:

```tsx filename="app/blog/[slug]/page.tsx" switcher
export default function Page({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return <h1>My Page</h1>
}
```

```jsx filename="app/blog/[slug]/page.js" switcher
export default function Page({ params, searchParams }) {
  return <h1>My Page</h1>
}
```

## Greit å vite

- Filutvidelsene `.js`, `.jsx`, eller `.tsx` kan brukes for `page`.
- En `page` er alltid **bladet** av rute-undertreet.
- En `page`-fil kreves for å gjøre et rutesegment **offentlig tilgjengelig**.
- Sider er
  [Server Components](https://react.dev/reference/rsc/server-components) som
  standard, men kan settes til en
  [Client Component](https://react.dev/reference/rsc/use-client).

## Referanse

### Props

#### `params` (valgfri)

Et promise som løser til et objekt som inneholder de
[dynamiske ruteparametrene](/docs/app/api-reference/file-conventions/dynamic-routes.md)
fra rotsegmentet ned til den siden.

```tsx filename="app/shop/[slug]/page.tsx" switcher
export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
}
```

```jsx filename="app/shop/[slug]/page.js" switcher
export default async function Page({ params }) {
  const { slug } = await params
}
```

| Eksempel på rute                     | URL         | `params`                                |
| ------------------------------------ | ----------- | --------------------------------------- |
| `app/shop/[slug]/page.js`            | `/shop/1`   | `Promise<{ slug: '1' }>`                |
| `app/shop/[category]/[item]/page.js` | `/shop/1/2` | `Promise<{ category: '1', item: '2' }>` |
| `app/shop/[...slug]/page.js`         | `/shop/1/2` | `Promise<{ slug: ['1', '2'] }>`         |

- Siden `params`-prop er et promise, må du bruke `async/await` eller Reacts
  [`use`](https://react.dev/reference/react/use)-funksjon for å få tilgang til
  verdiene.
  - I versjon 14 og tidligere var `params` en synkron prop. For å hjelpe med
    bakoverkompatibilitet kan du fortsatt få tilgang til den synkront i Next.js
    15, men denne oppførselen vil bli utfaset i fremtiden.

#### `searchParams` (valgfri)

Et promise som løser til et objekt som inneholder
[søkeparametrene](https://developer.mozilla.org/docs/Learn/Common_questions/What_is_a_URL#parameters)
til den gjeldende URL-en. For eksempel:

```tsx filename="app/shop/page.tsx" switcher
export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const filters = (await searchParams).filters
}
```

```jsx filename="app/shop/page.js" switcher
export default async function Page({ searchParams }) {
  const filters = (await searchParams).filters
}
```

Client Component **sider** kan også få tilgang til `searchParams` ved å bruke
Reacts [`use`](https://react.dev/reference/react/use)-hook:

```tsx filename="app/shop/page.tsx" switcher
'use client'
import { use } from 'react'

export default function Page({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const filters = use(searchParams).filters
}
```

```jsx filename="app/page.jsx" switcher
'use client'
import { use } from 'react'

export default function Page({ searchParams }) {
  const filters = use(searchParams).filters
}
```

| Eksempel URL    | `searchParams`                |
| --------------- | ----------------------------- |
| `/shop?a=1`     | `Promise<{ a: '1' }>`         |
| `/shop?a=1&b=2` | `Promise<{ a: '1', b: '2' }>` |
| `/shop?a=1&a=2` | `Promise<{ a: ['1', '2'] }>`  |

- Siden `searchParams`-prop er et promise. Du må bruke `async/await` eller
  Reacts [`use`](https://react.dev/reference/react/use)-funksjon for å få
  tilgang til verdiene.
  - I versjon 14 og tidligere var `searchParams` en synkron prop. For å hjelpe
    med bakoverkompatibilitet kan du fortsatt få tilgang til den synkront i
    Next.js 15, men denne oppførselen vil bli utfaset i fremtiden.
- `searchParams` er et
  **[Dynamisk API](/docs/app/getting-started/partial-prerendering.md#dynamic-rendering)**
  hvis verdier ikke kan kjennes på forhånd. Ved å bruke det vil siden velges inn
  i
  **[dynamisk rendering](/docs/app/getting-started/partial-prerendering.md#dynamic-rendering)**
  ved forespørselstid.
- `searchParams` er et vanlig JavaScript-objekt, ikke en
  `URLSearchParams`-instans.

### Page Props Helper

Du kan type sider med `PageProps` for å få sterkt typede `params` og
`searchParams` fra rute-literalet. `PageProps` er en globalt tilgjengelig
hjelper.

```tsx filename="app/blog/[slug]/page.tsx" switcher
export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  const query = await props.searchParams
  return <h1>Blog Post: {slug}</h1>
}
```

> **Greit å vite**
>
> - Ved å bruke en literal rute (f.eks. `'/blog/[slug]'`) aktiveres
>   autokomplettering og strenge nøkler for `params`.
> - Statiske ruter løser `params` til `{}`.
> - Typer genereres under `next dev`, `next build`, eller med `next typegen`.

## Eksempler

### Vise innhold basert på `params`

Ved å bruke
[dynamiske rutesegmenter](/docs/app/api-reference/file-conventions/dynamic-routes.md)
kan du vise eller hente spesifikt innhold for siden basert på `params`-prop.

```tsx filename="app/blog/[slug]/page.tsx" switcher
export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <h1>Blog Post: {slug}</h1>
}
```

```jsx filename="app/blog/[slug]/page.js" switcher
export default async function Page({ params }) {
  const { slug } = await params
  return <h1>Blog Post: {slug}</h1>
}
```

### Håndtere filtrering med `searchParams`

Du kan bruke `searchParams`-prop for å håndtere filtrering, paginering eller
sortering basert på query string i URL-en.

```tsx filename="app/shop/page.tsx" switcher
export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { page = '1', sort = 'asc', query = '' } = await searchParams

  return (
    <div>
      <h1>Product Listing</h1>
      <p>Search query: {query}</p>
      <p>Current page: {page}</p>
      <p>Sort order: {sort}</p>
    </div>
  )
}
```

```jsx filename="app/shop/page.js" switcher
export default async function Page({ searchParams }) {
  const { page = '1', sort = 'asc', query = '' } = await searchParams

  return (
    <div>
      <h1>Product Listing</h1>
      <p>Search query: {query}</p>
      <p>Current page: {page}</p>
      <p>Sort order: {sort}</p>
    </div>
  )
}
```

### Lese `searchParams` og `params` i Client Components

For å bruke `searchParams` og `params` i en Client Component (som ikke kan være
`async`), kan du bruke Reacts
[`use`](https://react.dev/reference/react/use)-funksjon for å lese promise:

```tsx filename="app/page.tsx" switcher
'use client'

import { use } from 'react'

export default function Page({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = use(params)
  const { query } = use(searchParams)
}
```

```js filename="app/page.js" switcher
'use client'

import { use } from 'react'

export default function Page({ params, searchParams }) {
  const { slug } = use(params)
  const { query } = use(searchParams)
}
```

## Versjonshistorikk

| Versjon      | Endringer                                                                                                            |
| ------------ | -------------------------------------------------------------------------------------------------------------------- |
| `v15.0.0-RC` | `params` og `searchParams` er nå promises. En [codemod](/docs/app/guides/upgrading/codemods.md#150) er tilgjengelig. |
| `v13.0.0`    | `page` introdusert.                                                                                                  |
