# use client

Direktivet `'use client'` erklærer et inngangspunkt for komponenter som skal
renderes på **klientsiden** og brukes når du lager interaktive brukergrensesnitt
(UI) som krever klient-side JavaScript-funksjonalitet, som tilstandshåndtering,
hendelseshåndtering og tilgang til nettleser-APIer. Dette er en React-funksjon.

> **Nyttig å vite:**
>
> Du trenger ikke å legge til `'use client'`-direktivet i hver fil som
> inneholder Client Components. Du må bare legge det til i filer der du ønsker
> at komponentene skal kunne brukes direkte fra Server Components.
> `'use client'` definerer klient-server
> [grensen](https://nextjs.org/docs/app/building-your-application/rendering#network-boundary),
> og komponentene som eksporteres fra slike filer fungerer som inngangspunkt til
> klienten.

## Bruk

For å erklære et inngangspunkt for Client Components, legg til `'use client'`
direktivet **øverst i filen**, før eventuelle imports:

```tsx filename="app/components/counter.tsx" highlight={1} switcher
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

```jsx filename="app/components/counter.js" highlight={1} switcher
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

Når du bruker `'use client'`-direktivet, må props til Client Components være
[serialiserbare](https://react.dev/reference/rsc/use-client#serializable-types).
Dette betyr at props må være i et format som React kan serialisere når data
sendes fra server til klient.

```tsx filename="app/components/counter.tsx" highlight={4} switcher
'use client'

export default function Counter({
  onClick /* ❌ Funksjon er ikke serialiserbar */
}) {
  return (
    <div>
      <button onClick={onClick}>Increment</button>
    </div>
  )
}
```

```jsx filename="app/components/counter.js" highlight={4} switcher
'use client'

export default function Counter({
  onClick /* ❌ Funksjon er ikke serialiserbar */
}) {
  return (
    <div>
      <button onClick={onClick}>Increment</button>
    </div>
  )
}
```

## Nøsting av Client Components i Server Components

Kombinering av Server og Client Components lar deg bygge applikasjoner som er
både ytelseseffektive og interaktive:

1. **Server Components**: Brukes for statisk innhold, datainnhenting og
   SEO-vennlige elementer.
2. **Client Components**: Brukes for interaktive elementer som krever tilstand,
   effekter eller nettleser-APIer.
3. **Komponentkomposisjon**: Nøst Client Components i Server Components etter
   behov for en tydelig separasjon av server- og klientlogikk.

I følgende eksempel:

- `Header` er en Server Component som håndterer statisk innhold.
- `Counter` er en Client Component som gir interaktivitet på siden.

```tsx filename="app/page.tsx" highlight={2,8} switcher
import Header from './header'
import Counter from './counter' // Dette er en Client Component

export default function Page() {
  return (
    <div>
      <Header />
      <Counter />
    </div>
  )
}
```

```jsx filename="app/page.js" highlight={2,8} switcher
import Header from './header'
import Counter from './counter' // Dette er en Client Component

export default function Page() {
  return (
    <div>
      <Header />
      <Counter />
    </div>
  )
}
```

## Referanse

Se [React-dokumentasjonen](https://react.dev/reference/rsc/use-client) for mer
informasjon om `'use client'`.
