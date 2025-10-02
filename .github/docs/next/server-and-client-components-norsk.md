# Server- og klientkomponenter

Som standard er layouts og sider
[Server Components](https://react.dev/reference/rsc/server-components), som lar
deg hente data og rendre deler av brukergrensesnittet på serveren, eventuelt
cache resultatet, og streame det til klienten. Når du trenger interaktivitet
eller nettleser-APIer, kan du bruke
[Client Components](https://react.dev/reference/rsc/use-client) for å legge til
funksjonalitet.

Denne siden forklarer hvordan Server- og klientkomponenter fungerer i Next.js og
når du bør bruke dem, med eksempler på hvordan du kan komponere dem sammen i
applikasjonen din.

## Når skal du bruke server- og klientkomponenter?

Klient- og servermiljøene har ulike kapabiliteter. Server- og klientkomponenter
lar deg kjøre logikk i hvert miljø avhengig av brukstilfellet.

Bruk **Client Components** når du trenger:

- [State](https://react.dev/learn/managing-state) og
  [event handlers](https://react.dev/learn/responding-to-events). F.eks.
  `onClick`, `onChange`.
- [Livssykluslogikk](https://react.dev/learn/lifecycle-of-reactive-effects).
  F.eks. `useEffect`.
- Kun nettleser-APIer. F.eks. `localStorage`, `window`, `Navigator.geolocation`,
  osv.
- [Egendefinerte hooks](https://react.dev/learn/reusing-logic-with-custom-hooks).

Bruk **Server Components** når du trenger:

- Hente data fra databaser eller APIer nær kilden.
- Bruke API-nøkler, tokens og andre hemmeligheter uten å eksponere dem til
  klienten.
- Redusere mengden JavaScript som sendes til nettleseren.
- Forbedre [First Contentful Paint (FCP)](https://web.dev/fcp/), og streame
  innhold progressivt til klienten.

For eksempel er `<Page>`-komponenten en serverkomponent som henter data om et
innlegg, og sender det som props til `<LikeButton>` som håndterer interaktivitet
på klientsiden.

```tsx filename="app/[id]/page.tsx" highlight={1,12} switcher
import LikeButton from '@/app/ui/like-button'
import { getPost } from '@/lib/data'

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)

  return (
    <div>
      <main>
        <h1>{post.title}</h1>
        {/* ... */}
        <LikeButton likes={post.likes} />
      </main>
    </div>
  )
}
```

```jsx filename="app/[id]/page.js" highlight={1,12} switcher
import LikeButton from '@/app/ui/like-button'
import { getPost } from '@/lib/data'

export default async function Page({ params }) {
  const post = await getPost(params.id)

  return (
    <div>
      <main>
        <h1>{post.title}</h1>
        {/* ... */}
        <LikeButton likes={post.likes} />
      </main>
    </div>
  )
}
```

```tsx filename="app/ui/like-button.tsx" highlight={1} switcher
'use client'

import { useState } from 'react'

export default function LikeButton({ likes }: { likes: number }) {
  // ...
}
```

```jsx filename="app/ui/like-button.js" highlight={1} switcher
'use client'

import { useState } from 'react'

export default function LikeButton({ likes }) {
  // ...
}
```

## Hvordan fungerer server- og klientkomponenter i Next.js?

### På serveren

På serveren bruker Next.js Reacts APIer for å orkestrere rendering. Renderingen
deles opp i biter, etter individuelle rutesegmenter
([layouts og sider](/docs/app/getting-started/layouts-and-pages.md)):

- **Server Components** rendres til et spesielt dataformat kalt React Server
  Component Payload (RSC Payload).
- **Client Components** og RSC Payload brukes til å
  [prerendre](/docs/app/getting-started/partial-prerendering.md#how-does-partial-prerendering-work)
  HTML.

> **Hva er React Server Component Payload (RSC)?**
>
> RSC Payload er en kompakt binær representasjon av det rendrede React Server
> Components-treet. Det brukes av React på klienten for å oppdatere nettleserens
> DOM. RSC Payload inneholder:
>
> - Det rendrede resultatet av serverkomponenter
> - Plassholdere for hvor klientkomponenter skal rendres og referanser til deres
>   JavaScript-filer
> - Alle props sendt fra en serverkomponent til en klientkomponent

### På klienten (første lasting)

Deretter, på klienten:

1. **HTML** brukes for å umiddelbart vise en rask, ikke-interaktiv
   forhåndsvisning av ruten til brukeren.
2. **RSC Payload** brukes for å forene klient- og serverkomponent-treet.
3. **JavaScript** brukes for å hydrere klientkomponenter og gjøre applikasjonen
   interaktiv.

> **Hva er hydrering?**
>
> Hydrering er Reacts prosess for å koble
> [event handlers](https://react.dev/learn/responding-to-events) til DOM, for å
> gjøre statisk HTML interaktiv.

### Navigeringer etter første lasting

Ved senere navigeringer:

- **RSC Payload** forhåndshentes og caches for umiddelbar navigering.
- **Client Components** rendres helt på klienten, uten server-rendret HTML.

## Eksempler

### Bruke klientkomponenter

Du kan lage en klientkomponent ved å legge til
[`"use client"`](https://react.dev/reference/react/use-client)-direktivet øverst
i filen, over importene.

```tsx filename="app/ui/counter.tsx" highlight={1} switcher
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>{count} likes</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

```jsx filename="app/ui/counter.tsx" highlight={1} switcher
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>{count} likes</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

`"use client"` brukes for å deklarere en **grense** mellom server- og
klientmodul-grafene (trær).

Når en fil er merket med `"use client"`, **regnes alle dens importer og
barnekomponenter som en del av klientbundelen**. Dette betyr at du ikke trenger
å legge til direktivet på hver komponent som skal kjøres på klienten.

### Redusere JS-bundlestørrelse

For å redusere størrelsen på klientens JavaScript-bundler, legg til
`'use client'` på spesifikke interaktive komponenter i stedet for å merke store
deler av brukergrensesnittet som klientkomponenter.

For eksempel inneholder `<Layout>`-komponenten stort sett statiske elementer som
logo og navigasjonslenker, men inkluderer en interaktiv søkebar. `<Search />` er
interaktiv og må være en klientkomponent, men resten av layouten kan forbli en
serverkomponent.

```tsx filename="app/layout.tsx" highlight={12} switcher
// Client Component
import Search from './search'
// Server Component
import Logo from './logo'

// Layout er en serverkomponent som standard
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Logo />
        <Search />
      </nav>
      <main>{children}</main>
    </>
  )
}
```

```jsx filename="app/layout.js" highlight={12} switcher
// Client Component
import Search from './search'
// Server Component
import Logo from './logo'

// Layout er en serverkomponent som standard
export default function Layout({ children }) {
  return (
    <>
      <nav>
        <Logo />
        <Search />
      </nav>
      <main>{children}</main>
    </>
  )
}
```

```tsx filename="app/ui/search.tsx" highlight={1} switcher
'use client'

export default function Search() {
  // ...
}
```

```jsx filename="app/ui/search.js" highlight={1} switcher
'use client'

export default function Search() {
  // ...
}
```

### Sende data fra server til klientkomponenter

Du kan sende data fra serverkomponenter til klientkomponenter via props.

```tsx filename="app/[id]/page.tsx" highlight={1,7} switcher
import LikeButton from '@/app/ui/like-button'
import { getPost } from '@/lib/data'

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)

  return <LikeButton likes={post.likes} />
}
```

```jsx filename="app/[id]/page.js" highlight={1,7} switcher
import LikeButton from '@/app/ui/like-button'
import { getPost } from '@/lib/data'

export default async function Page({ params }) {
  const post = await getPost(params.id)

  return <LikeButton likes={post.likes} />
}
```

```tsx filename="app/ui/like-button.tsx" highlight={1} switcher
'use client'

export default function LikeButton({ likes }: { likes: number }) {
  // ...
}
```

```jsx filename="app/ui/like-button.js" highlight={1} switcher
'use client'

export default function LikeButton({ likes }) {
  // ...
}
```

Alternativt kan du streame data fra en serverkomponent til en klientkomponent
med [`use`-hooken](https://react.dev/reference/react/use). Se et
[eksempel](/docs/app/getting-started/fetching-data.md#streaming-data-with-the-use-hook).

> **Nyttig å vite**: Props sendt til klientkomponenter må være
> [serialiserbare](https://react.dev/reference/react/use-server#serializable-parameters-and-return-values)
> av React.

### Interleaving server- og klientkomponenter

Du kan sende serverkomponenter som en prop til en klientkomponent. Dette lar deg
visuelt nest server-rendret brukergrensesnitt inne i klientkomponenter.

Et vanlig mønster er å bruke `children` for å lage et _slot_ i en
`<ClientComponent>`. For eksempel en `<Cart>`-komponent som henter data på
serveren, inne i en `<Modal>`-komponent som bruker klienttilstand for å toggle
synlighet.

```tsx filename="app/ui/modal.tsx" switcher
'use client'

export default function Modal({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

```jsx filename="app/ui/modal.js" switcher
'use client'

export default function Modal({ children }) {
  return <div>{children}</div>
}
```

Deretter, i en overordnet serverkomponent (f.eks. `<Page>`), kan du sende en
`<Cart>` som child til `<Modal>`:

```tsx filename="app/page.tsx"  highlight={7} switcher
import Modal from './ui/modal'
import Cart from './ui/cart'

export default function Page() {
  return (
    <Modal>
      <Cart />
    </Modal>
  )
}
```

```jsx filename="app/page.js" highlight={7} switcher
import Modal from './ui/modal'
import Cart from './ui/cart'

export default function Page() {
  return (
    <Modal>
      <Cart />
    </Modal>
  )
}
```

I dette mønsteret vil alle serverkomponenter rendres på serveren på forhånd,
inkludert de som sendes som props. Den resulterende RSC-payloaden vil inneholde
referanser til hvor klientkomponenter skal rendres i komponenttreet.

### Context providers

[React context](https://react.dev/learn/passing-data-deeply-with-context) brukes
ofte for å dele global tilstand som gjeldende tema. Men React context støttes
ikke i serverkomponenter.

For å bruke context, lag en klientkomponent som aksepterer `children`:

```tsx filename="app/theme-provider.tsx" switcher
'use client'

import { createContext } from 'react'

export const ThemeContext = createContext({})

export default function ThemeProvider({
  children
}: {
  children: React.ReactNode
}) {
  return <ThemeContext.Provider value='dark'>{children}</ThemeContext.Provider>
}
```

```jsx filename="app/theme-provider.js" switcher
'use client'

import { createContext } from 'react'

export const ThemeContext = createContext({})

export default function ThemeProvider({ children }) {
  return <ThemeContext.Provider value='dark'>{children}</ThemeContext.Provider>
}
```

Deretter importerer du den i en serverkomponent (f.eks. `layout`):

```tsx filename="app/layout.tsx" switcher
import ThemeProvider from './theme-provider'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

```jsx filename="app/layout.js" switcher
import ThemeProvider from './theme-provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

Serverkomponenten din kan nå rendre provider direkte, og alle andre
klientkomponenter i appen kan konsumere denne contexten.

> **Nyttig å vite**: Du bør rendre providers så dypt som mulig i treet – legg
> merke til at `ThemeProvider` kun wrapper `{children}` i stedet for hele
> `<html>`-dokumentet. Dette gjør det enklere for Next.js å optimalisere de
> statiske delene av serverkomponentene dine.

### Tredjepartskomponenter

Når du bruker en tredjepartskomponent som er avhengig av kun-klient-funksjoner,
kan du wrappe den i en klientkomponent for å sikre at den fungerer som
forventet.

For eksempel kan `<Carousel />` importeres fra `acme-carousel`-pakken. Denne
komponenten bruker `useState`, men har ikke `"use client"`-direktivet.

Hvis du bruker `<Carousel />` inne i en klientkomponent, vil den fungere som
forventet:

```tsx filename="app/gallery.tsx" switcher
'use client'

import { useState } from 'react'
import { Carousel } from 'acme-carousel'

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>View pictures</button>
      {/* Fungerer, siden Carousel brukes i en klientkomponent */}
      {isOpen && <Carousel />}
    </div>
  )
}
```

```jsx filename="app/gallery.js" switcher
'use client'

import { useState } from 'react'
import { Carousel } from 'acme-carousel'

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>View pictures</button>
      {/*  Fungerer, siden Carousel brukes i en klientkomponent */}
      {isOpen && <Carousel />}
    </div>
  )
}
```

Men hvis du prøver å bruke den direkte i en serverkomponent, vil du få en feil.
Dette er fordi Next.js ikke vet at `<Carousel />` bruker kun-klient-funksjoner.

For å løse dette kan du wrappe tredjepartskomponenter som er avhengige av
kun-klient-funksjoner i dine egne klientkomponenter:

```tsx filename="app/carousel.tsx" switcher
'use client'

import { Carousel } from 'acme-carousel'

export default Carousel
```

```jsx filename="app/carousel.js" switcher
'use client'

import { Carousel } from 'acme-carousel'

export default Carousel
```

Nå kan du bruke `<Carousel />` direkte i en serverkomponent:

```tsx filename="app/page.tsx" switcher
import Carousel from './carousel'

export default function Page() {
  return (
    <div>
      <p>View pictures</p>
      {/*  Fungerer, siden Carousel er en klientkomponent */}
      <Carousel />
    </div>
  )
}
```

```jsx filename="app/page.js" switcher
import Carousel from './carousel'

export default function Page() {
  return (
    <div>
      <p>View pictures</p>
      {/*  Fungerer, siden Carousel er en klientkomponent */}
      <Carousel />
    </div>
  )
}
```

> **Råd til bibliotekforfattere**
>
> Hvis du bygger et komponentbibliotek, legg til `"use client"`-direktivet på
> entry points som er avhengige av kun-klient-funksjoner. Dette lar brukerne
> dine importere komponenter i serverkomponenter uten å måtte lage wrappers.
>
> Det er verdt å merke seg at noen bundlere kan fjerne
> `"use client"`-direktiver. Du finner et eksempel på hvordan du konfigurerer
> esbuild for å inkludere `"use client"`-direktivet i
> [React Wrap Balancer](https://github.com/shuding/react-wrap-balancer/blob/main/tsup.config.ts#L10-L13)
> og
> [Vercel Analytics](https://github.com/vercel/analytics/blob/main/packages/web/tsup.config.js#L26-L30)
> repositoryene.

### Forebygge miljøforgiftning

JavaScript-moduler kan deles mellom både server- og klientkomponentmoduler.
Dette betyr at det er mulig å ved et uhell importere kun-server-kode til
klienten. For eksempel, vurder følgende funksjon:

```ts filename="lib/data.ts" switcher
export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY
    }
  })

  return res.json()
}
```

```js filename="lib/data.js" switcher
export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY
    }
  })

  return res.json()
}
```

Denne funksjonen inneholder en `API_KEY` som aldri bør eksponeres til klienten.

I Next.js inkluderes kun miljøvariabler med prefiks `NEXT_PUBLIC_` i
klientbundelen. Hvis variabler ikke har prefiks, erstatter Next.js dem med en
tom streng.

Som et resultat, selv om `getData()` kan importeres og kjøres på klienten, vil
den ikke fungere som forventet.

For å forhindre utilsiktet bruk i klientkomponenter, kan du bruke
[`server-only`-pakken](https://www.npmjs.com/package/server-only).

Deretter importerer du pakken i en fil som inneholder kun-server-kode:

```js filename="lib/data.js"
import 'server-only'

export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY
    }
  })

  return res.json()
}
```

Nå vil du få en byggefeil hvis du prøver å importere modulen i en
klientkomponent.

Den tilsvarende
[`client-only`-pakken](https://www.npmjs.com/package/client-only) kan brukes for
å merke moduler som inneholder kun-klient-logikk, som kode som aksesserer
`window`-objektet.

I Next.js er det **valgfritt** å installere `server-only` eller `client-only`.
Men hvis linting-reglene dine flagger overflødige avhengigheter, kan du
installere dem for å unngå problemer.

```bash package="npm"
npm install server-only
```

```bash package="yarn"
yarn add server-only
```

```bash package="pnpm"
pnpm add server-only
```

```bash package="bun"
bun add server-only
```

Next.js håndterer `server-only` og `client-only`-importer internt for å gi
tydeligere feilmeldinger når en modul brukes i feil miljø. Innholdet i disse
pakkene fra NPM brukes ikke av Next.js.

Next.js tilbyr også egne typedefinisjoner for `server-only` og `client-only`,
for TypeScript-konfigurasjoner der
[`noUncheckedSideEffectImports`](https://www.typescriptlang.org/tsconfig/#noUncheckedSideEffectImports)
er aktivert.

## Neste steg

Lær mer om APIene som er nevnt på denne siden.

- [use client](/docs/app/api-reference/directives/use-client.md)
  - Lær hvordan du bruker use client-direktivet for å rendre en komponent på
    klienten.
