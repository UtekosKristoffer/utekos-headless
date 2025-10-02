# revalidateTag

`revalidateTag` lar deg ugyldiggjøre [cached data](/docs/app/guides/caching.md)
på forespørsel for en spesifikk cache-tag.

## Bruk

`revalidateTag` kan kalles i Server Functions og Route Handlers.

`revalidateTag` kan ikke kalles i Client Components eller Middleware, da den kun
fungerer i servermiljøer.

> **Nyttig å vite**: `revalidateTag` markerer tagget data som utdatert, men
> fersk data hentes kun når sider som bruker den taggen besøkes neste gang.
> Dette betyr at å kalle `revalidateTag` ikke umiddelbart utløser mange
> revalideringer samtidig. Ugyldiggjøringen skjer kun når en side som bruker den
> taggen besøkes neste gang.

## Parametere

```tsx
revalidateTag(tag: string): void;
```

- `tag`: En streng som representerer cache-taggen til dataen du ønsker å
  revalidere. Må ikke overstige 256 tegn. Verdien er case-sensitiv.

Du kan legge til tags i `fetch` slik:

```tsx
fetch(url, { next: { tags: [...] } });
```

## Returnerer

`revalidateTag` returnerer ingen verdi.

## Forhold til `revalidatePath`

`revalidateTag` ugyldiggjør data med spesifikke tags på tvers av alle sider som
bruker disse taggene, mens
[`revalidatePath`](/docs/app/api-reference/functions/revalidatePath.md)
ugyldiggjør spesifikke side- eller layout-stier.

> **Nyttig å vite**: Disse funksjonene har ulike formål og kan brukes sammen for
> omfattende datakonsistens. For detaljerte eksempler og vurderinger, se
> [Relationship with revalidateTag](/docs/app/api-reference/functions/revalidatePath.md#relationship-with-revalidatetag).

## Eksempler

### Server Action

```ts filename="app/actions.ts" switcher
'use server'

import { revalidateTag } from 'next/cache'

export default async function submit() {
  await addPost()
  revalidateTag('posts')
}
```

```js filename="app/actions.js" switcher
'use server'

import { revalidateTag } from 'next/cache'

export default async function submit() {
  await addPost()
  revalidateTag('posts')
}
```

### Route Handler

```ts filename="app/api/revalidate/route.ts" switcher
import type { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag')

  if (tag) {
    revalidateTag(tag)
    return Response.json({ revalidated: true, now: Date.now() })
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing tag to revalidate'
  })
}
```

```js filename="app/api/revalidate/route.js" switcher
import { revalidateTag } from 'next/cache'

export async function GET(request) {
  const tag = request.nextUrl.searchParams.get('tag')

  if (tag) {
    revalidateTag(tag)
    return Response.json({ revalidated: true, now: Date.now() })
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing tag to revalidate'
  })
}
```
