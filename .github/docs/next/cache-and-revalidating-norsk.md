# Caching og revalidering

Caching er en teknikk for å lagre resultatet av datahenting og andre beregninger
slik at fremtidige forespørsler om samme data kan besvares raskere, uten å gjøre
arbeidet på nytt. Revalidering lar deg oppdatere cache-oppføringer uten å måtte
bygge hele applikasjonen på nytt.

Next.js tilbyr flere API-er for å håndtere caching og revalidering. Denne guiden
forklarer når og hvordan du bruker dem.

- [`fetch`](#fetch)
- [`unstable_cache`](#unstable_cache)
- [`revalidatePath`](#revalidatepath)
- [`revalidateTag`](#revalidatetag)

## `fetch`

Som standard blir
[`fetch`](/docs/app/api-reference/functions/fetch.md)-forespørsler ikke cachet.
Du kan cache individuelle forespørsler ved å sette `cache`-valget til
`'force-cache'`.

```tsx filename="app/page.tsx" switcher
export default async function Page() {
  const data = await fetch('https://...', { cache: 'force-cache' })
}
```

```jsx filename="app/page.jsx" switcher
export default async function Page() {
  const data = await fetch('https://...', { cache: 'force-cache' })
}
```

> **Nyttig å vite**: Selv om `fetch`-forespørsler ikke cachetes som standard,
> vil Next.js
> [prerendre](/docs/app/getting-started/partial-prerendering.md#static-rendering)
> ruter som har `fetch`-forespørsler og cache HTML-en. Hvis du vil garantere at
> en rute er
> [dynamisk](/docs/app/getting-started/partial-prerendering.md#dynamic-rendering),
> bruk [`connection` API](/docs/app/api-reference/functions/connection.md).

For å revalidere data returnert av en `fetch`-forespørsel, kan du bruke
`next.revalidate`-valget.

```tsx filename="app/page.tsx" switcher
export default async function Page() {
  const data = await fetch('https://...', { next: { revalidate: 3600 } })
}
```

```jsx filename="app/page.jsx" switcher
export default async function Page() {
  const data = await fetch('https://...', { next: { revalidate: 3600 } })
}
```

Dette vil revalidere data etter et spesifisert antall sekunder.

Se [`fetch` API-referansen](/docs/app/api-reference/functions/fetch.md) for å
lære mer.

## `unstable_cache`

`unstable_cache` lar deg cache resultatet av databaseforespørsler og andre
asynkrone funksjoner. For å bruke det, pakk funksjonen inn med `unstable_cache`.
For eksempel:

```tsx filename="app/lib/data.ts swichter
import { db } from '@/lib/db'
export async function getUserById(id: string) {
  return db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .then(res => res[0])
}
```

```jsx filename="app/lib/data.js" switcher
import { db } from '@/lib/db'

export async function getUserById(id) {
  return db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .then(res => res[0])
}
```

```tsx filename="app/page.tsx" highlight={2,11,13} switcher
import { unstable_cache } from 'next/cache'
import { getUserById } from '@/app/lib/data'

export default async function Page({
  params
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params

  const getCachedUser = unstable_cache(
    async () => {
      return getUserById(userId)
    },
    [userId] // legg til bruker-ID i cache-nøkkelen
  )
}
```

```jsx filename="app/page.jsx" highlight={2,7,9} switcher
import { unstable_cache } from 'next/cache';
import { getUserById } from '@/app/lib/data';

export default async function Page({ params } }) {
    const { userId } = await params

    const getCachedUser = unstable_cache(
        async () => {
            return getUserById(userId)
        },
        [userId] // legg til bruker-ID i cache-nøkkelen
    );
}
```

Funksjonen aksepterer et tredje valgfritt objekt for å definere hvordan cachen
skal revalideres. Det aksepterer:

- `tags`: et array med tags brukt av Next.js for å revalidere cachen.
- `revalidate`: antall sekunder før cachen skal revalideres.

```tsx filename="app/page.tsx" highlight={6-9} switcher
const getCachedUser = unstable_cache(
  async () => {
    return getUserById(userId)
  },
  [userId],
  {
    tags: ['user'],
    revalidate: 3600
  }
)
```

```jsx filename="app/page.js" highlight={6-9} switcher
const getCachedUser = unstable_cache(
  async () => {
    return getUserById(userId)
  },
  [userId],
  {
    tags: ['user'],
    revalidate: 3600
  }
)
```

Se
[`unstable_cache` API-referansen](/docs/app/api-reference/functions/unstable_cache.md)
for å lære mer.

## `revalidateTag`

`revalidateTag` brukes for å revalidere cache-oppføringer basert på en tag og
etter en hendelse. For å bruke det med `fetch`, start med å tagge funksjonen med
`next.tags`-valget:

```tsx filename="app/lib/data.ts" highlight={3-5} switcher
export async function getUserById(id: string) {
  const data = await fetch(`https://...`, {
    next: {
      tags: ['user']
    }
  })
}
```

```jsx filename="app/lib/data.js" highlight={3-5} switcher
export async function getUserById(id) {
  const data = await fetch(`https://...`, {
    next: {
      tags: ['user']
    }
  })
}
```

Alternativt kan du merke en `unstable_cache`-funksjon med `tags`-valget:

```tsx filename="app/lib/data.ts" highlight={6-8} switcher
export const getUserById = unstable_cache(
  async (id: string) => {
    return db.query.users.findFirst({ where: eq(users.id, id) })
  },
  ['user'], // nødvendig hvis variabler ikke sendes som parametere
  {
    tags: ['user']
  }
)
```

```jsx filename="app/lib/data.js" highlight={6-8} switcher
export const getUserById = unstable_cache(
  async id => {
    return db.query.users.findFirst({ where: eq(users.id, id) })
  },
  ['user'], // nødvendig hvis variabler ikke sendes som parametere
  {
    tags: ['user']
  }
)
```

Deretter kaller du `revalidateTag` i en
[Route Handler](/docs/app/api-reference/file-conventions/route.md) eller Server
Action:

```tsx filename="app/lib/actions.ts" highlight={1} switcher
import { revalidateTag } from 'next/cache'

export async function updateUser(id: string) {
  // Muter data
  revalidateTag('user')
}
```

```jsx filename="app/lib/actions.js" highlight={1} switcher
import { revalidateTag } from 'next/cache'

export async function updateUser(id) {
  // Muter data
  revalidateTag('user')
}
```

Du kan gjenbruke samme tag i flere funksjoner for å revalidere dem alle
samtidig.

Se
[`revalidateTag` API-referansen](/docs/app/api-reference/functions/revalidateTag.md)
for å lære mer.

## `revalidatePath`

`revalidatePath` brukes for å revalidere en rute etter en hendelse. For å bruke
det, kall det i en
[Route Handler](/docs/app/api-reference/file-conventions/route.md) eller Server
Action:

```tsx filename="app/lib/actions.ts" highlight={1} switcher
import { revalidatePath } from 'next/cache'

export async function updateUser(id: string) {
    // Muter data
    revalidatePath('/profile')
```

```jsx filename="app/lib/actions.js" highlight={1} switcher
import { revalidatePath } from 'next/cache'

export async function updateUser(id) {
    // Muter data
    revalidatePath('/profile')
```

Se
[`revalidatePath` API-referansen](/docs/app/api-reference/functions/revalidatePath.md)
for å lære mer.

## API-referanse

Lær mer om funksjonene nevnt på denne siden ved å lese API-referansen.

- [fetch](/docs/app/api-reference/functions/fetch.md)
  - API-referanse for den utvidede fetch-funksjonen.
- [unstable_cache](/docs/app/api-reference/functions/unstable_cache.md)
  - API-referanse for unstable_cache-funksjonen.
- [revalidatePath](/docs/app/api-reference/functions/revalidatePath.md)
  - API-referanse for revalidatePath-funksjonen.
- [revalidateTag](/docs/app/api-reference/functions/revalidateTag.md)
  - API-referanse for revalidateTag-funksjonen.
