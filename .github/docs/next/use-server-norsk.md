# use server

Direktivet `use server` markerer en funksjon eller fil for å kjøres på
**serversiden**. Det kan brukes øverst i en fil for å indikere at alle
funksjoner i filen er server-side, eller inline øverst i en funksjon for å
markere funksjonen som en
[Server Function](https://19.react.dev/reference/rsc/server-functions). Dette er
en React-funksjon.

## Bruk av `use server` øverst i en fil

Eksemplet under viser en fil med `use server`-direktiv øverst. Alle funksjoner i
filen kjøres på serveren.

```tsx filename="app/actions.ts" highlight={1} switcher
'use server'
import { db } from '@/lib/db' // Din databaseklient

export async function createUser(data: { name: string; email: string }) {
  const user = await db.user.create({ data })
  return user
}
```

```jsx filename="app/actions.js" highlight={1} switcher
'use server'
import { db } from '@/lib/db' // Din databaseklient

export async function createUser(data) {
  const user = await db.user.create({ data })
  return user
}
```

### Bruk av Server Functions i en Client Component

For å bruke Server Functions i Client Components må du opprette dine Server
Functions i en dedikert fil med `use server`-direktiv øverst i filen. Disse
Server Functions kan deretter importeres i både Client og Server Components og
kjøres.

Anta at du har en `fetchUsers` Server Function i `actions.ts`:

```tsx filename="app/actions.ts" highlight={1} switcher
'use server'
import { db } from '@/lib/db' // Din databaseklient

export async function fetchUsers() {
  const users = await db.user.findMany()
  return users
}
```

```jsx filename="app/actions.js" highlight={1} switcher
'use server'
import { db } from '@/lib/db' // Din databaseklient

export async function fetchUsers() {
  const users = await db.user.findMany()
  return users
}
```

Da kan du importere `fetchUsers` Server Function inn i en Client Component og
kjøre den på klientsiden.

```tsx filename="app/components/my-button.tsx" highlight={1,2,8} switcher
'use client'
import { fetchUsers } from '../actions'

export default function MyButton() {
  return <button onClick={() => fetchUsers()}>Fetch Users</button>
}
```

```jsx filename="app/components/my-button.js" highlight={1,2,8} switcher
'use client'
import { fetchUsers } from '../actions'

export default function MyButton() {
  return <button onClick={() => fetchUsers()}>Fetch Users</button>
}
```

## Bruk av `use server` inline

I eksemplet under brukes `use server` inline øverst i en funksjon for å markere
den som en
[Server Function](https://19.react.dev/reference/rsc/server-functions):

```tsx filename="app/posts/[id]/page.tsx" switcher highlight={8}
import { EditPost } from './edit-post'
import { revalidatePath } from 'next/cache'

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  async function updatePost(formData: FormData) {
    'use server'
    await savePost(params.id, formData)
    revalidatePath(`/posts/${params.id}`)
  }

  return <EditPost updatePostAction={updatePost} post={post} />
}
```

```jsx filename="app/posts/[id]/page.js" switcher highlight={8}
import { EditPost } from './edit-post'
import { revalidatePath } from 'next/cache'

export default async function PostPage({ params }) {
  const post = await getPost(params.id)

  async function updatePost(formData) {
    'use server'
    await savePost(params.id, formData)
    revalidatePath(`/posts/${params.id}`)
  }

  return <EditPost updatePostAction={updatePost} post={post} />
}
```

## Sikkerhetsbetraktninger

Når du bruker `use server`-direktivet, er det viktig å sikre at all
serverside-logikk er trygg og at sensitiv data forblir beskyttet.

### Autentisering og autorisasjon

Autentiser og autoriser alltid brukere før du utfører sensitive
serverside-operasjoner.

```tsx filename="app/actions.ts" highlight={1,7,8,9,10} switcher
'use server'

import { db } from '@/lib/db' // Din databaseklient
import { authenticate } from '@/lib/auth' // Din autentiseringsbibliotek

export async function createUser(
  data: { name: string; email: string },
  token: string
) {
  const user = authenticate(token)
  if (!user) {
    throw new Error('Unauthorized')
  }
  const newUser = await db.user.create({ data })
  return newUser
}
```

```jsx filename="app/actions.js" highlight={1,7,8,9,10} switcher
'use server'

import { db } from '@/lib/db' // Din databaseklient
import { authenticate } from '@/lib/auth' // Din autentiseringsbibliotek

export async function createUser(data, token) {
  const user = authenticate(token)
  if (!user) {
    throw new Error('Unauthorized')
  }
  const newUser = await db.user.create({ data })
  return newUser
}
```

## Referanse

Se [React-dokumentasjonen](https://react.dev/reference/rsc/use-server) for mer
informasjon om `use server`.
