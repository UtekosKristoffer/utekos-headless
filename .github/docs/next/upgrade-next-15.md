# Hvordan oppgradere til versjon 15

## Oppgradering fra 14 til 15

## React 19

- Minimumsversjonene av `react` og `react-dom` er nå 19.
- `useFormState` er blitt erstattet av `useActionState`. `useFormState`-hooken
  er fortsatt tilgjengelig i React 19, men den er utfaset og vil bli fjernet i
  en fremtidig versjon. `useActionState` anbefales og inkluderer ekstra
  egenskaper som å lese `pending`-tilstanden direkte.
  [Les mer](https://react.dev/reference/react/useActionState).
- `useFormStatus` inkluderer nå ekstra nøkler som `data`, `method`, og `action`.
  Hvis du ikke bruker React 19, er kun `pending`-nøkkelen tilgjengelig.
  [Les mer](https://react.dev/reference/react-dom/hooks/useFormStatus).
- Les mer i
  [React 19 oppgraderingsguiden](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

> **Godt å vite:** Hvis du bruker TypeScript, sørg for at du også oppgraderer
> `@types/react` og `@types/react-dom` til deres nyeste versjoner.

## Asynkrone Request APIer (Breaking change)

Tidligere synkrone Dynamiske APIer som avhenger av runtime-informasjon er nå
**asynkrone**:

- [`cookies`](/docs/app/api-reference/functions/cookies.md)
- [`headers`](/docs/app/api-reference/functions/headers.md)
- [`draftMode`](/docs/app/api-reference/functions/draft-mode.md)
- `params` i [`layout.js`](/docs/app/api-reference/file-conventions/layout.md),
  [`page.js`](/docs/app/api-reference/file-conventions/page.md),
  [`route.js`](/docs/app/api-reference/file-conventions/route.md),
  [`default.js`](/docs/app/api-reference/file-conventions/default.md),
  [`opengraph-image`](/docs/app/api-reference/file-conventions/metadata/opengraph-image.md),
  [`twitter-image`](/docs/app/api-reference/file-conventions/metadata/opengraph-image.md),
  [`icon`](/docs/app/api-reference/file-conventions/metadata/app-icons.md), og
  [`apple-icon`](/docs/app/api-reference/file-conventions/metadata/app-icons.md).
- `searchParams` i [`page.js`](/docs/app/api-reference/file-conventions/page.md)

For å lette migreringsbyrden er en
[codemod tilgjengelig](/docs/app/guides/upgrading/codemods.md#150) for å
automatisere prosessen, og APIene kan midlertidig aksesseres synkront.

### `cookies`

#### Anbefalt asynkron bruk

```tsx
import { cookies } from 'next/headers'

// Før
const cookieStore = cookies()
const token = cookieStore.get('token')

// Etter
const cookieStore = await cookies()
const token = cookieStore.get('token')
```

#### Midlertidig synkron bruk

```tsx filename="app/page.tsx" switcher
import { cookies, type UnsafeUnwrappedCookies } from 'next/headers'

// Før
const cookieStore = cookies()
const token = cookieStore.get('token')

// Etter
const cookieStore = cookies() as unknown as UnsafeUnwrappedCookies
// vil logge en advarsel i dev
const token = cookieStore.get('token')
```

```jsx filename="app/page.js" switcher
import { cookies } from 'next/headers'

// Før
const cookieStore = cookies()
const token = cookieStore.get('token')

// Etter
const cookieStore = cookies()
// vil logge en advarsel i dev
const token = cookieStore.get('token')
```

### `headers`

#### Anbefalt asynkron bruk

```tsx
import { headers } from 'next/headers'

// Før
const headersList = headers()
const userAgent = headersList.get('user-agent')

// Etter
const headersList = await headers()
const userAgent = headersList.get('user-agent')
```

#### Midlertidig synkron bruk

```tsx filename="app/page.tsx" switcher
import { headers, type UnsafeUnwrappedHeaders } from 'next/headers'

// Før
const headersList = headers()
const userAgent = headersList.get('user-agent')

// Etter
const headersList = headers() as unknown as UnsafeUnwrappedHeaders
// vil logge en advarsel i dev
const userAgent = headersList.get('user-agent')
```

```jsx filename="app/page.js" switcher
import { headers } from 'next/headers'

// Før
const headersList = headers()
const userAgent = headersList.get('user-agent')

// Etter
const headersList = headers()
// vil logge en advarsel i dev
const userAgent = headersList.get('user-agent')
```

### `draftMode`

#### Anbefalt asynkron bruk

```tsx
import { draftMode } from 'next/headers'

// Før
const { isEnabled } = draftMode()

// Etter
const { isEnabled } = await draftMode()
```

#### Midlertidig synkron bruk

```tsx filename="app/page.tsx" switcher
import { draftMode, type UnsafeUnwrappedDraftMode } from 'next/headers'

// Før
const { isEnabled } = draftMode()

// Etter
// vil logge en advarsel i dev
const { isEnabled } = draftMode() as unknown as UnsafeUnwrappedDraftMode
```

```jsx filename="app/page.js" switcher
import { draftMode } from 'next/headers'

// Før
const { isEnabled } = draftMode()

// Etter
// vil logge en advarsel i dev
const { isEnabled } = draftMode()
```

### `params` & `searchParams`

#### Asynkront Layout

```tsx filename="app/layout.tsx" switcher
// Før
type Params = { slug: string }

export function generateMetadata({ params }: { params: Params }) {
  const { slug } = params
}

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode
  params: Params
}) {
  const { slug } = params
}

// Etter
type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
}

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode
  params: Params
}) {
  const { slug } = await params
}
```

```jsx filename="app/layout.js" switcher
// Før
export function generateMetadata({ params }) {
    const { slug } = params
}

export default async function Layout({ children, params }) {
    const { slug } = params
}

// Etter
export async function generateMetadata({ params }) {
    const { slug } = await params
}

export default async function Layout({ children, params }) {
    const { slug } = await params
}
```

#### Synkront Layout

```tsx filename="app/layout.tsx" switcher
// Før
type Params = { slug: string }

export default function Layout({
  children,
  params
}: {
  children: React.ReactNode
  params: Params
}) {
  const { slug } = params
}

// Etter
import { use } from 'react'

type Params = Promise<{ slug: string }>

export default function Layout(props: {
  children: React.ReactNode
  params: Params
}) {
  const params = use(props.params)
  const slug = params.slug
}
```

```jsx filename="app/layout.js" switcher
// Før
export default function Layout({ children, params }) {
    const { slug } = params
}

// Etter
import { use } from 'react'
export default async function Layout(props) {
    const params = use(props.params)
    const slug = params.slug
}

```

#### Asynkron Side

```tsx filename="app/page.tsx" switcher
// Før
type Params = { slug: string }
type SearchParams = { [key: string]: string | string[] | undefined }

export function generateMetadata({
  params,
  searchParams
}: {
  params: Params
  searchParams: SearchParams
}) {
  const { slug } = params
  const { query } = searchParams
}

export default async function Page({
  params,
  searchParams
}: {
  params: Params
  searchParams: SearchParams
}) {
  const { slug } = params
  const { query } = searchParams
}

// Etter
type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export async function generateMetadata(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
}

export default async function Page(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
}
```

```jsx filename="app/page.js" switcher
// Før
export function generateMetadata({ params, searchParams }) {
  const { slug } = params
  const { query } = searchParams
}

export default function Page({ params, searchParams }) {
  const { slug } = params
  const { query } = searchParams
}

// Etter
export async function generateMetadata(props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
}

export async function Page(props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
}
```

#### Synkron Side

```tsx
'use client'

// Før
type Params = { slug: string }
type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({
  params,
  searchParams
}: {
  params: Params
  searchParams: SearchParams
}) {
  const { slug } = params
  const { query } = searchParams
}

// Etter
import { use } from 'react'

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default function Page(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = use(props.params)
  const searchParams = use(props.searchParams)
  const slug = params.slug
  const query = searchParams.query
}
```

```jsx
// Før
export default function Page({ params, searchParams }) {
    const { slug } = params
    const { query } = searchParams
}

// Etter
import { use } from "react"

export default function Page(props) {
    const params = use(props.params)
    const searchParams = use(props.searchParams)
    const slug = params.slug
    const query = searchParams.query
}

```

#### Route Handlers

```tsx filename="app/api/route.ts" switcher
// Før
type Params = { slug: string }

export async function GET(request: Request, segmentData: { params: Params }) {
  const params = segmentData.params
  const slug = params.slug
}

// Etter
type Params = Promise<{ slug: string }>

export async function GET(request: Request, segmentData: { params: Params }) {
  const params = await segmentData.params
  const slug = params.slug
}
```

```js filename="app/api/route.js" switcher
// Før
export async function GET(request, segmentData) {
  const params = segmentData.params
  const slug = params.slug
}

// Etter
export async function GET(request, segmentData) {
  const params = await segmentData.params
  const slug = params.slug
}
```

## `runtime`-konfigurasjon (Breaking change)

`runtime`-
[segmentkonfigurasjonen](/docs/app/api-reference/file-conventions/route-segment-config.md#runtime)
støttet tidligere en verdi av `experimental-edge` i tillegg til `edge`. Begge
konfigurasjoner refererer til det samme, og for å forenkle alternativene vil vi
nå gi feil hvis `experimental-edge` brukes. For å fikse dette, oppdater din
`runtime`- konfigurasjon til `edge`. En
[codemod](/docs/app/guides/upgrading/codemods.md#app-dir-runtime-config-experimental-edge)
er tilgjengelig for å automatisk gjøre dette.

## `fetch`-forespørsler

[`fetch`-forespørsler](/docs/app/api-reference/functions/fetch.md) blir ikke
lenger cachet som standard.

For å velge spesifikke `fetch`-forespørsler inn i caching, kan du sende
`cache: 'force-cache'`-alternativet.

```js filename="app/layout.js"
export default async function RootLayout() {
  const a = await fetch('https://...') // Ikke cachet
  const b = await fetch('https://...', { cache: 'force-cache' }) // Cachet

  // ...
}
```

For å velge alle `fetch`-forespørsler i et layout eller side inn i caching, kan
du bruke `export const fetchCache = 'default-cache'`
[segmentkonfigurasjon](/docs/app/api-reference/file-conventions/route-segment-config.md).
Hvis individuelle `fetch`-forespørsler spesifiserer et `cache`-alternativ, vil
det bli brukt i stedet.

```js filename="app/layout.js"
// Siden dette er root layout, vil alle fetch-forespørsler i appen
// som ikke setter sitt eget cache-alternativ bli cachet.
export const fetchCache = 'default-cache'

export default async function RootLayout() {
  const a = await fetch('https://...') // Cachet
  const b = await fetch('https://...', { cache: 'no-store' }) // Ikke cachet

  // ...
}
```

## Route Handlers

`GET`-funksjoner i
[Route Handlers](/docs/app/api-reference/file-conventions/route.md) blir ikke
lenger cachet som standard. For å velge `GET`-metoder inn i caching, kan du
bruke et
[rutekonfigurasjon](/docs/app/api-reference/file-conventions/route-segment-config.md)
som `export const dynamic = 'force-static'` i din Route Handler-fil.

```js filename="app/api/route.js"
export const dynamic = 'force-static'

export async function GET() {}
```

## Klient-side Router Cache

Når du navigerer mellom sider via `<Link>` eller `useRouter`, blir
[side](/docs/app/api-reference/file-conventions/page.md)-segmenter ikke lenger
gjenbrukt fra klient-side router cache. Imidlertid blir de fortsatt gjenbrukt
under nettleser-bakover og forover-navigasjon og for delte layout.

For å velge sidesegmenter inn i caching, kan du bruke
[`staleTimes`](/docs/app/api-reference/config/next-config-js/staleTimes.md)
konfigurasjonsalternativet:

```js filename="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180
    }
  }
}

module.exports = nextConfig
```

[Layout](/docs/app/api-reference/file-conventions/layout.md) og
[lastingtilstander](/docs/app/api-reference/file-conventions/loading.md) blir
fortsatt cachet og gjenbrukt ved navigasjon.

## `next/font`

`@next/font`-pakken er blitt fjernet til fordel for den innebygde
[`next/font`](/docs/app/api-reference/components/font.md). En
[codemod er tilgjengelig](/docs/app/guides/upgrading/codemods.md#built-in-next-font)
for å trygt og automatisk omdøpe importene dine.

```js filename="app/layout.js"
// Før
import { Inter } from '@next/font/google'

// Etter
import { Inter } from 'next/font/google'
```

## bundlePagesRouterDependencies

`experimental.bundlePagesExternals` er nå stabil og omdøpt til
`bundlePagesRouterDependencies`.

```js filename="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Før
  experimental: {
    bundlePagesExternals: true
  },

  // Etter
  bundlePagesRouterDependencies: true
}

module.exports = nextConfig
```

## serverExternalPackages

`experimental.serverComponentsExternalPackages` er nå stabil og omdøpt til
`serverExternalPackages`.

```js filename="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Før
  experimental: {
    serverComponentsExternalPackages: ['package-name']
  },

  // Etter
  serverExternalPackages: ['package-name']
}

module.exports = nextConfig
```

## Speed Insights

Automatisk instrumentering for Speed Insights ble fjernet i Next.js 15.

For å fortsette å bruke Speed Insights, følg
[Vercel Speed Insights Quickstart](https://vercel.com/docs/speed-insights/quickstart)
guiden.

## `NextRequest` Geolocation

`geo`- og `ip`-egenskapene på `NextRequest` er blitt fjernet siden disse
verdiene leveres av din hostingleverandør. En
[codemod](/docs/app/guides/upgrading/codemods.md#150) er tilgjengelig for å
automatisere denne migreringen.

Hvis du bruker Vercel, kan du alternativt bruke `geolocation`- og
`ipAddress`-funksjonene fra
[`@vercel/functions`](https://vercel.com/docs/functions/vercel-functions-package)
i stedet:

```ts filename="middleware.ts"
import { geolocation } from '@vercel/functions'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { city } = geolocation(request)

  // ...
}
```

```ts filename="middleware.ts"
import { ipAddress } from '@vercel/functions'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const ip = ipAddress(request)

  // ...
}
```
