# Oppdatere data

Du kan oppdatere data i Next.js ved å bruke Reacts
[Server Functions](https://react.dev/reference/rsc/server-functions). Denne
siden forklarer hvordan du kan [opprette](#creating-server-functions) og
[kalle](#invoking-server-functions) Server Functions.

## Hva er Server Functions?

En **Server Function** er en asynkron funksjon som kjører på serveren. De kan
kalles fra klienten via en nettverksforespørsel, og må derfor være asynkrone.

I en `action`- eller mutasjonskontekst kalles de også **Server Actions**.

Som konvensjon er en Server Action en async-funksjon brukt sammen med
[`startTransition`](https://react.dev/reference/react/startTransition). Dette
skjer automatisk når funksjonen:

- Sendes til et `<form>` via `action`-prop.
- Sendes til en `<button>` via `formAction`-prop.

I Next.js integreres Server Actions med rammeverkets
[caching](/docs/app/guides/caching.md)-arkitektur. Når en action kalles, kan
Next.js returnere både oppdatert UI og nye data i én server-runde.

Bak kulissene bruker actions `POST`-metoden, og kun denne HTTP-metoden kan kalle
dem.

## Opprette Server Functions

En Server Function kan defineres ved å bruke
[`use server`](https://react.dev/reference/rsc/use-server)-direktivet. Du kan
plassere direktivet øverst i en **asynkron** funksjon for å markere funksjonen
som en Server Function, eller øverst i en fil for å markere alle eksportene i
den filen.

```ts filename="app/lib/actions.ts" switcher
export async function createPost(formData: FormData) {
  'use server'
  const title = formData.get('title')
  const content = formData.get('content')

  // Oppdater data
  // Revalider cache
}

export async function deletePost(formData: FormData) {
  'use server'
  const id = formData.get('id')

  // Oppdater data
  // Revalider cache
}
```

```js filename="app/lib/actions.js" switcher
export async function createPost(formData) {
  'use server'
  const title = formData.get('title')
  const content = formData.get('content')

  // Oppdater data
  // Revalider cache
}

export async function deletePost(formData) {
  'use server'
  const id = formData.get('id')

  // Oppdater data
  // Revalider cache
}
```

### Server Components

Server Functions kan skrives direkte i Server Components ved å legge til
`"use server"`-direktivet øverst i funksjonskroppen:

```tsx filename="app/page.tsx" switcher
export default function Page() {
  // Server Action
  async function createPost(formData: FormData) {
    'use server'
    // ...
  }

  return <></>
}
```

```jsx filename="app/page.js" switcher
export default function Page() {
  // Server Action
  async function createPost(formData) {
    'use server'
    // ...
  }

  return <></>
}
```

> **Nyttig å vite:** Server Components støtter progressiv forbedring som
> standard, noe som betyr at skjemaer som kaller Server Actions vil bli sendt
> selv om JavaScript ikke er lastet inn eller er deaktivert.

### Client Components

Det er ikke mulig å definere Server Functions i Client Components. Du kan
imidlertid kalle dem i Client Components ved å importere dem fra en fil som har
`"use server"`-direktivet øverst:

```ts filename="app/actions.ts" switcher
'use server'

export async function createPost() {}
```

```js filename="app/actions.js" switcher
'use server'

export async function createPost() {}
```

```tsx filename="app/ui/button.tsx" switcher
'use client'

import { createPost } from '@/app/actions'

export function Button() {
  return <button formAction={createPost}>Create</button>
}
```

```jsx filename="app/ui/button.js" switcher
'use client'

import { createPost } from '@/app/actions'

export function Button() {
  return <button formAction={createPost}>Create</button>
}
```

> **Nyttig å vite:** I Client Components vil skjemaer som kaller Server Actions
> legge inn innsendinger i kø hvis JavaScript ikke er lastet inn, og vil bli
> prioritert for hydrering. Etter hydrering oppdateres ikke nettleseren ved
> skjema-innsending.

### Sende actions som props

Du kan også sende en action til en Client Component som en prop:

```jsx
<ClientComponent updateItemAction={updateItem} />
```

```tsx filename="app/client-component.tsx" switcher
'use client'

export default function ClientComponent({
  updateItemAction
}: {
  updateItemAction: (formData: FormData) => void
}) {
  return <form action={updateItemAction}>{/* ... */}</form>
}
```

```jsx filename="app/client-component.js" switcher
'use client'

export default function ClientComponent({ updateItemAction }) {
  return <form action={updateItemAction}>{/* ... */}</form>
}
```

## Kalle Server Functions

Det finnes to hovedmåter å kalle en Server Function på:

1. [Forms](#forms) i Server og Client Components
2. [Event Handlers](#event-handlers) og [useEffect](#useeffect) i Client
   Components

> **Nyttig å vite:** Server Functions er laget for server-side mutasjoner.
> Klienten sender og venter på dem én om gangen. Dette er en
> implementasjonsdetalj og kan endres. Hvis du trenger parallell datainnhenting,
> bruk
> [data fetching](/docs/app/getting-started/fetching-data.md#server-components)
> i Server Components, eller utfør parallelt arbeid inne i én Server Function
> eller
> [Route Handler](/docs/app/guides/backend-for-frontend.md#manipulating-data).

### Forms

React utvider HTML
[`<form>`](https://react.dev/reference/react-dom/components/form)-elementet for
å tillate at Server Function kalles med HTML `action`-prop.

Når funksjonen kalles i et skjema, mottar den automatisk
[`FormData`](https://developer.mozilla.org/docs/Web/API/FormData/FormData)-
objektet. Du kan hente ut data ved å bruke native
[`FormData`-metoder](https://developer.mozilla.org/en-US/docs/Web/API/FormData#instance_methods):

```tsx filename="app/ui/form.tsx" switcher
import { createPost } from '@/app/actions'

export function Form() {
  return (
    <form action={createPost}>
      <input type='text' name='title' />
      <input type='text' name='content' />
      <button type='submit'>Create</button>
    </form>
  )
}
```

```jsx filename="app/ui/form.js" switcher
import { createPost } from '@/app/actions'

export function Form() {
  return (
    <form action={createPost}>
      <input type='text' name='title' />
      <input type='text' name='content' />
      <button type='submit'>Create</button>
    </form>
  )
}
```

```ts filename="app/actions.ts" switcher
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')

  // Oppdater data
  // Revalider cache
}
```

```js filename="app/actions.js" switcher
'use server'

export async function createPost(formData) {
  const title = formData.get('title')
  const content = formData.get('content')

  // Oppdater data
  // Revalider cache
}
```

### Event Handlers

Du kan kalle en Server Function i en Client Component ved å bruke event handlers
som `onClick`.

```tsx filename="app/like-button.tsx" switcher
'use client'

import { incrementLike } from './actions'
import { useState } from 'react'

export default function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes)

  return (
    <>
      <p>Total Likes: {likes}</p>
      <button
        onClick={async () => {
          const updatedLikes = await incrementLike()
          setLikes(updatedLikes)
        }}
      >
        Like
      </button>
    </>
  )
}
```

```jsx filename="app/like-button.js" switcher
'use client'

import { incrementLike } from './actions'
import { useState } from 'react'

export default function LikeButton({ initialLikes }) {
  const [likes, setLikes] = useState(initialLikes)

  return (
    <>
      <p>Total Likes: {likes}</p>
      <button
        onClick={async () => {
          const updatedLikes = await incrementLike()
          setLikes(updatedLikes)
        }}
      >
        Like
      </button>
    </>
  )
}
```

## Eksempler

### Vise pending state

Mens en Server Function kjører, kan du vise en loading-indikator med Reacts
[`useActionState`](https://react.dev/reference/react/useActionState)-hook. Denne
hooken returnerer en `pending`-boolean:

```tsx filename="app/ui/button.tsx" switcher
'use client'

import { useActionState, startTransition } from 'react'
import { createPost } from '@/app/actions'
import { LoadingSpinner } from '@/app/ui/loading-spinner'

export function Button() {
  const [state, action, pending] = useActionState(createPost, false)

  return (
    <button onClick={() => startTransition(action)}>
      {pending ?
        <LoadingSpinner />
      : 'Create Post'}
    </button>
  )
}
```

```jsx filename="app/ui/button.js" switcher
'use client'

import { useActionState, startTransition } from 'react'
import { createPost } from '@/app/actions'
import { LoadingSpinner } from '@/app/ui/loading-spinner'

export function Button() {
  const [state, action, pending] = useActionState(createPost, false)

  return (
    <button onClick={() => startTransition(action)}>
      {pending ?
        <LoadingSpinner />
      : 'Create Post'}
    </button>
  )
}
```

### Revalidere

Etter en oppdatering kan du revalidere Next.js-cachen og vise oppdaterte data
ved å kalle
[`revalidatePath`](/docs/app/api-reference/functions/revalidatePath.md) eller
[`revalidateTag`](/docs/app/api-reference/functions/revalidateTag.md) inne i
Server Function:

```ts filename="app/lib/actions.ts" switcher
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  'use server'
  // Oppdater data
  // ...

  revalidatePath('/posts')
}
```

```js filename="app/actions.js" switcher
import { revalidatePath } from 'next/cache'

export async function createPost(formData) {
  'use server'
  // Oppdater data
  // ...
  revalidatePath('/posts')
}
```

### Omdirigere

Du kan omdirigere brukeren til en annen side etter en oppdatering ved å kalle
[`redirect`](/docs/app/api-reference/functions/redirect.md) inne i Server
Function.

```ts filename="app/lib/actions.ts" switcher
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  // Oppdater data
  // ...

  revalidatePath('/posts')
  redirect('/posts')
}
```

```js filename="app/actions.js" switcher
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData) {
  // Oppdater data
  // ...

  revalidatePath('/posts')
  redirect('/posts')
}
```

Å kalle `redirect`
[kaster](/docs/app/api-reference/functions/redirect.md#behavior) et
rammeverk-håndtert kontrollflyt-unntak. All kode etter dette vil ikke kjøre.
Hvis du trenger ferske data, kall
[`revalidatePath`](/docs/app/api-reference/functions/revalidatePath.md) eller
[`revalidateTag`](/docs/app/api-reference/functions/revalidateTag.md) først.

### Cookies

Du kan `get`, `set` og `delete` cookies inne i en Server Action ved å bruke
[`cookies`](/docs/app/api-reference/functions/cookies.md)-APIet.

Når du
[setter eller sletter](/docs/app/api-reference/functions/cookies.md#understanding-cookie-behavior-in-server-actions)
en cookie i en Server Action, re-renderer Next.js den nåværende siden og dens
layouts på serveren slik at **UI gjenspeiler den nye cookie-verdien**.

> **Nyttig å vite**: Serveroppdateringen gjelder for det nåværende React-treet,
> og re-renderer, monterer eller demonterer komponenter etter behov.
> Klienttilstand bevares for re-renderede komponenter, og effekter kjøres på
> nytt hvis avhengighetene har endret seg.

```ts filename="app/actions.ts" switcher
'use server'

import { cookies } from 'next/headers'

export async function exampleAction() {
  const cookieStore = await cookies()

  // Hent cookie
  cookieStore.get('name')?.value

  // Sett cookie
  cookieStore.set('name', 'Delba')

  // Slett cookie
  cookieStore.delete('name')
}
```

```js filename="app/actions.js" switcher
'use server'

import { cookies } from 'next/headers'

export async function exampleAction() {
  // Hent cookie
  const cookieStore = await cookies()

  // Hent cookie
  cookieStore.get('name')?.value

  // Sett cookie
  cookieStore.set('name', 'Delba')

  // Slett cookie
  cookieStore.delete('name')
}
```

### useEffect

Du kan bruke Reacts [`useEffect`](https://react.dev/reference/react/useEffect)-
hook for å kalle en Server Action når komponenten monteres eller en avhengighet
endres. Dette er nyttig for mutasjoner som avhenger av globale hendelser eller
må trigges automatisk. For eksempel `onKeyDown` for app-snarveier, en
intersection observer-hook for uendelig scrolling, eller når komponenten
monteres for å oppdatere visningstelling:

```tsx filename="app/view-count.tsx" switcher
'use client'

import { incrementViews } from './actions'
import { useState, useEffect, useTransition } from 'react'

export default function ViewCount({ initialViews }: { initialViews: number }) {
  const [views, setViews] = useState(initialViews)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const updatedViews = await incrementViews()
      setViews(updatedViews)
    })
  }, [])

  // Du kan bruke `isPending` for å gi brukeren tilbakemelding
  return <p>Total Views: {views}</p>
}
```

```jsx filename="app/view-count.js" switcher
'use client'

import { incrementViews } from './actions'
import { useState, useEffect, useTransition } from 'react'

export default function ViewCount({ initialViews }) {
  const [views, setViews] = useState(initialViews)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const updatedViews = await incrementViews()
      setViews(updatedViews)
    })
  }, [])

  // Du kan bruke `isPending` for å gi brukeren tilbakemelding
  return <p>Total Views: {views}</p>
}
```

## API-referanse

Les mer om funksjonene nevnt på denne siden ved å lese API-referansen.

- [revalidatePath](/docs/app/api-reference/functions/revalidatePath.md)
  - API-referanse for revalidatePath-funksjonen.
- [revalidateTag](/docs/app/api-reference/functions/revalidateTag.md)
  - API-referanse for revalidateTag-funksjonen.
- [redirect](/docs/app/api-reference/functions/redirect.md)
  - API-referanse for redirect-funksjonen.
