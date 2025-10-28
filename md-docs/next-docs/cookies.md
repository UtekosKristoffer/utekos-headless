# cookies

@doc-version: 16.0.0

`cookies` is an **async** function that allows you to read the HTTP incoming
request cookies in
[Server Components](/docs/app/getting-started/server-and-client-components.md),
and read/write outgoing request cookies in
[Server Actions](/docs/app/getting-started/updating-data.md) or
[Route Handlers](/docs/app/api-reference/file-conventions/route.md).

```tsx filename="app/page.tsx" switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

```js filename="app/page.js" switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

## Reference

### Methods

The following methods are available:

| Method                      | Return Type      | Description                                                                     |
| --------------------------- | ---------------- | ------------------------------------------------------------------------------- |
| `get('name')`               | Object           | Accepts a cookie name and returns an object with the name and value.            |
| `getAll()`                  | Array of objects | Returns a list of all the cookies with a matching name.                         |
| `has('name')`               | Boolean          | Accepts a cookie name and returns a boolean based on if the cookie exists.      |
| `set(name, value, options)` | -                | Accepts a cookie name, value, and options and sets the outgoing request cookie. |
| `delete(name)`              | -                | Accepts a cookie name and deletes the cookie.                                   |
| `clear()`                   | -                | Deletes all cookies.                                                            |
| `toString()`                | String           | Returns a string representation of the cookies.                                 |

### Options

When setting a cookie, the following properties from the `options` object are
supported:

| Option        | Type                                   | Description                                                                        |
| ------------- | -------------------------------------- | ---------------------------------------------------------------------------------- |
| `name`        | String                                 | Specifies the name of the cookie.                                                  |
| `value`       | String                                 | Specifies the value to be stored in the cookie.                                    |
| `expires`     | Date                                   | Defines the exact date when the cookie will expire.                                |
| `maxAge`      | Number                                 | Sets the cookie’s lifespan in seconds.                                             |
| `domain`      | String                                 | Specifies the domain where the cookie is available.                                |
| `path`        | String, default: `'/'`                 | Limits the cookie's scope to a specific path within the domain.                    |
| `secure`      | Boolean                                | Ensures the cookie is sent only over HTTPS connections for added security.         |
| `httpOnly`    | Boolean                                | Restricts the cookie to HTTP requests, preventing client-side access.              |
| `sameSite`    | Boolean, `'lax'`, `'strict'`, `'none'` | Controls the cookie's cross-site request behavior.                                 |
| `priority`    | String (`"low"`, `"medium"`, `"high"`) | Specifies the cookie's priority                                                    |
| `partitioned` | Boolean                                | Indicates whether the cookie is [partitioned](https://github.com/privacycg/CHIPS). |

The only option with a default value is `path`.

To learn more about these options, see the
[MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies).

## Good to know

- `cookies` is an **asynchronous** function that returns a promise. You must use
  `async/await` or React's [`use`](https://react.dev/reference/react/use)
  function to access cookies.
  - In version 14 and earlier, `cookies` was a synchronous function. To help
    with backwards compatibility, you can still access it synchronously in
    Next.js 15, but this behavior will be deprecated in the future.
- `cookies` is a [Dynamic API](/docs/app/guides/caching.md#dynamic-rendering)
  whose returned values cannot be known ahead of time. Using it in a layout or
  page will opt a route into
  [dynamic rendering](/docs/app/guides/caching.md#dynamic-rendering).
- The `.delete` method can only be called:
  - In a [Server Action](/docs/app/getting-started/updating-data.md) or
    [Route Handler](/docs/app/api-reference/file-conventions/route.md).
  - If it belongs to the same domain from which `.set` is called. For wildcard
    domains, the specific subdomain must be an exact match. Additionally, the
    code must be executed on the same protocol (HTTP or HTTPS) as the cookie you
    want to delete.
- HTTP does not allow setting cookies after streaming starts, so you must use
  `.set` in a [Server Action](/docs/app/getting-started/updating-data.md) or
  [Route Handler](/docs/app/api-reference/file-conventions/route.md).

## Understanding Cookie Behavior in Server Components

When working with cookies in Server Components, it's important to understand
that cookies are fundamentally a client-side storage mechanism:

- **Reading cookies** works in Server Components because you're accessing the
  cookie data that the client's browser sends to the server in the HTTP request
  headers.
- **Setting cookies** cannot be done directly in a Server Component, even when
  using a Route Handler or Server Action. This is because cookies are actually
  stored by the browser, not the server.

The server can only send instructions (via `Set-Cookie` headers) to tell the
browser to store cookies - the actual storage happens on the client side. This
is why cookie operations that modify state (`.set`, `.delete`, `.clear`) must be
performed in a Route Handler or Server Action where the response headers can be
properly set.

## Understanding Cookie Behavior in Server Actions

After you set or delete a cookie in a Server Action, Next.js re-renders the
current page and its layouts on the server so the UI reflects the new cookie
value. See the [Caching guide](/docs/app/guides/caching.md#cookies).

The UI is not unmounted, but effects that depend on data coming from the server
will re-run.

To refresh cached data too, call
[`revalidatePath`](/docs/app/api-reference/functions/revalidatePath.md) or
[`revalidateTag`](/docs/app/api-reference/functions/revalidateTag.md) inside the
action.

## Examples

### Getting a cookie

You can use the `(await cookies()).get('name')` method to get a single cookie:

```tsx filename="app/page.tsx" switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

```jsx filename="app/page.js" switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

### Getting all cookies

You can use the `(await cookies()).getAll()` method to get all cookies with a
matching name. If `name` is unspecified, it returns all the available cookies.

```tsx filename="app/page.tsx" switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  return cookieStore.getAll().map(cookie => (
    <div key={cookie.name}>
      <p>Name: {cookie.name}</p>
      <p>Value: {cookie.value}</p>
    </div>
  ))
}
```

```jsx filename="app/page.js" switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  return cookieStore.getAll().map(cookie => (
    <div key={cookie.name}>
      <p>Name: {cookie.name}</p>
      <p>Value: {cookie.value}</p>
    </div>
  ))
}
```

### Setting a cookie

You can use the `(await cookies()).set(name, value, options)` method in a
[Server Action](/docs/app/getting-started/updating-data.md) or
[Route Handler](/docs/app/api-reference/file-conventions/route.md) to set a
cookie. The [`options` object](#options) is optional.

```tsx filename="app/actions.ts" switcher
'use server'

import { cookies } from 'next/headers'

export async function create(data) {
  const cookieStore = await cookies()

  cookieStore.set('name', 'lee')
  // or
  cookieStore.set('name', 'lee', { secure: true })
  // or
  cookieStore.set({
    name: 'name',
    value: 'lee',
    httpOnly: true,
    path: '/'
  })
}
```

```js filename="app/actions.js" switcher
'use server'

import { cookies } from 'next/headers'

export async function create(data) {
  const cookieStore = await cookies()

  cookieStore.set('name', 'lee')
  // or
  cookieStore.set('name', 'lee', { secure: true })
  // or
  cookieStore.set({
    name: 'name',
    value: 'lee',
    httpOnly: true,
    path: '/'
  })
}
```

### Checking if a cookie exists

You can use the `(await cookies()).has(name)` method to check if a cookie
exists:

```tsx filename="app/page.ts" switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const hasCookie = cookieStore.has('theme')
  return '...'
}
```

```jsx filename="app/page.js" switcher
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const hasCookie = cookieStore.has('theme')
  return '...'
}
```

### Deleting cookies

There are three ways you can delete a cookie.

Using the `delete()` method:

```tsx filename="app/actions.ts" switcher
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
  (await cookies()).delete('name')
}
```

```js filename="app/actions.js" switcher
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
  (await cookies()).delete('name')
}
```

Setting a new cookie with the same name and an empty value:

```tsx filename="app/actions.ts" switcher
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
  (await cookies()).set('name', '')
}
```

```js filename="app/actions.js" switcher
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
  (await cookies()).set('name', '')
}
```

Setting the `maxAge` to 0 will immediately expire a cookie. `maxAge` accepts a
value in seconds.

```tsx filename="app/actions.ts" switcher
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
  (await cookies()).set('name', 'value', { maxAge: 0 })
}
```

```js filename="app/actions.js" switcher
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
  (await cookies()).set('name', 'value', { maxAge: 0 })
``
}
```

## Version History

| Version      | Changes                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------- |
| `v15.0.0-RC` | `cookies` is now an async function. A [codemod](/docs/app/guides/upgrading/codemods.md#150) is available. |
| `v13.0.0`    | `cookies` introduced.                                                                                     |

# Server and Client Components

@doc-version: 16.0.0

By default, layouts and pages are
[Server Components](https://react.dev/reference/rsc/server-components), which
lets you fetch data and render parts of your UI on the server, optionally cache
the result, and stream it to the client. When you need interactivity or browser
APIs, you can use
[Client Components](https://react.dev/reference/rsc/use-client) to layer in
functionality.

This page explains how Server and Client Components work in Next.js and when to
use them, with examples of how to compose them together in your application.

## When to use Server and Client Components?

The client and server environments have different capabilities. Server and
Client components allow you to run logic in each environment depending on your
use case.

Use **Client Components** when you need:

- [State](https://react.dev/learn/managing-state) and
  [event handlers](https://react.dev/learn/responding-to-events). E.g.
  `onClick`, `onChange`.
- [Lifecycle logic](https://react.dev/learn/lifecycle-of-reactive-effects). E.g.
  `useEffect`.
- Browser-only APIs. E.g. `localStorage`, `window`, `Navigator.geolocation`,
  etc.
- [Custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks).

Use **Server Components** when you need:

- Fetch data from databases or APIs close to the source.
- Use API keys, tokens, and other secrets without exposing them to the client.
- Reduce the amount of JavaScript sent to the browser.
- Improve the [First Contentful Paint (FCP)](https://web.dev/fcp/), and stream
  content progressively to the client.

For example, the `<Page>` component is a Server Component that fetches data
about a post, and passes it as props to the `<LikeButton>` which handles
client-side interactivity.

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

## How do Server and Client Components work in Next.js?

### On the server

On the server, Next.js uses React's APIs to orchestrate rendering. The rendering
work is split into chunks, by individual route segments
([layouts and pages](/docs/app/getting-started/layouts-and-pages.md)):

- **Server Components** are rendered into a special data format called the React
  Server Component Payload (RSC Payload).
- **Client Components** and the RSC Payload are used to
  [pre-render](/docs/app/guides/caching.md#rendering-strategies) HTML.

> **What is the React Server Component Payload (RSC)?**
>
> The RSC Payload is a compact binary representation of the rendered React
> Server Components tree. It's used by React on the client to update the
> browser's DOM. The RSC Payload contains:
>
> - The rendered result of Server Components
> - Placeholders for where Client Components should be rendered and references
>   to their JavaScript files
> - Any props passed from a Server Component to a Client Component

### On the client (first load)

Then, on the client:

1. **HTML** is used to immediately show a fast non-interactive preview of the
   route to the user.
2. **RSC Payload** is used to reconcile the Client and Server Component trees.
3. **JavaScript** is used to hydrate Client Components and make the application
   interactive.

> **What is hydration?**
>
> Hydration is React's process for attaching
> [event handlers](https://react.dev/learn/responding-to-events) to the DOM, to
> make the static HTML interactive.

### Subsequent Navigations

On subsequent navigations:

- The **RSC Payload** is prefetched and cached for instant navigation.
- **Client Components** are rendered entirely on the client, without the
  server-rendered HTML.

## Examples

### Using Client Components

You can create a Client Component by adding the
[`"use client"`](https://react.dev/reference/react/use-client) directive at the
top of the file, above your imports.

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

```jsx filename="app/ui/counter.js" highlight={1} switcher
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

`"use client"` is used to declare a **boundary** between the Server and Client
module graphs (trees).

Once a file is marked with `"use client"`, **all its imports and child
components are considered part of the client bundle**. This means you don't need
to add the directive to every component that is intended for the client.

### Reducing JS bundle size

To reduce the size of your client JavaScript bundles, add `'use client'` to
specific interactive components instead of marking large parts of your UI as
Client Components.

For example, the `<Layout>` component contains mostly static elements like a
logo and navigation links, but includes an interactive search bar. `<Search />`
is interactive and needs to be a Client Component, however, the rest of the
layout can remain a Server Component.

```tsx filename="app/layout.tsx" highlight={12} switcher
// Client Component
import Search from './search'
// Server Component
import Logo from './logo'

// Layout is a Server Component by default
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

// Layout is a Server Component by default
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

### Passing data from Server to Client Components

You can pass data from Server Components to Client Components using props.

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

Alternatively, you can stream data from a Server Component to a Client Component
with the [`use` Hook](https://react.dev/reference/react/use). See an
[example](/docs/app/getting-started/fetching-data.md#streaming-data-with-the-use-hook).

> **Good to know**: Props passed to Client Components need to be
> [serializable](https://react.dev/reference/react/use-server#serializable-parameters-and-return-values)
> by React.

### Interleaving Server and Client Components

You can pass Server Components as a prop to a Client Component. This allows you
to visually nest server-rendered UI within Client components.

A common pattern is to use `children` to create a _slot_ in a
`<ClientComponent>`. For example, a `<Cart>` component that fetches data on the
server, inside a `<Modal>` component that uses client state to toggle
visibility.

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

Then, in a parent Server Component (e.g.`<Page>`), you can pass a `<Cart>` as
the child of the `<Modal>`:

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

In this pattern, all Server Components will be rendered on the server ahead of
time, including those as props. The resulting RSC payload will contain
references of where Client Components should be rendered within the component
tree.

### Context providers

[React context](https://react.dev/learn/passing-data-deeply-with-context) is
commonly used to share global state like the current theme. However, React
context is not supported in Server Components.

To use context, create a Client Component that accepts `children`:

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

Then, import it into a Server Component (e.g. `layout`):

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

Your Server Component will now be able to directly render your provider, and all
other Client Components throughout your app will be able to consume this
context.

> **Good to know**: You should render providers as deep as possible in the tree
> – notice how `ThemeProvider` only wraps `{children}` instead of the entire
> `<html>` document. This makes it easier for Next.js to optimize the static
> parts of your Server Components.

### Third-party components

When using a third-party component that relies on client-only features, you can
wrap it in a Client Component to ensure it works as expected.

For example, the `<Carousel />` can be imported from the `acme-carousel`
package. This component uses `useState`, but it doesn't yet have the
`"use client"` directive.

If you use `<Carousel />` within a Client Component, it will work as expected:

```tsx filename="app/gallery.tsx" switcher
'use client'

import { useState } from 'react'
import { Carousel } from 'acme-carousel'

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>View pictures</button>
      {/* Works, since Carousel is used within a Client Component */}
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
      {/*  Works, since Carousel is used within a Client Component */}
      {isOpen && <Carousel />}
    </div>
  )
}
```

However, if you try to use it directly within a Server Component, you'll see an
error. This is because Next.js doesn't know `<Carousel />` is using client-only
features.

To fix this, you can wrap third-party components that rely on client-only
features in your own Client Components:

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

Now, you can use `<Carousel />` directly within a Server Component:

```tsx filename="app/page.tsx" switcher
import Carousel from './carousel'

export default function Page() {
  return (
    <div>
      <p>View pictures</p>
      {/*  Works, since Carousel is a Client Component */}
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
      {/*  Works, since Carousel is a Client Component */}
      <Carousel />
    </div>
  )
}
```

> **Advice for Library Authors**
>
> If you’re building a component library, add the `"use client"` directive to
> entry points that rely on client-only features. This lets your users import
> components into Server Components without needing to create wrappers.
>
> It's worth noting some bundlers might strip out `"use client"` directives. You
> can find an example of how to configure esbuild to include the `"use client"`
> directive in the
> [React Wrap Balancer](https://github.com/shuding/react-wrap-balancer/blob/main/tsup.config.ts#L10-L13)
> and
> [Vercel Analytics](https://github.com/vercel/analytics/blob/main/packages/web/tsup.config.js#L26-L30)
> repositories.

### Preventing environment poisoning

JavaScript modules can be shared between both Server and Client Components
modules. This means it's possible to accidentally import server-only code into
the client. For example, consider the following function:

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

This function contains an `API_KEY` that should never be exposed to the client.

In Next.js, only environment variables prefixed with `NEXT_PUBLIC_` are included
in the client bundle. If variables are not prefixed, Next.js replaces them with
an empty string.

As a result, even though `getData()` can be imported and executed on the client,
it won't work as expected.

To prevent accidental usage in Client Components, you can use the
[`server-only` package](https://www.npmjs.com/package/server-only).

Then, import the package into a file that contains server-only code:

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

Now, if you try to import the module into a Client Component, there will be a
build-time error.

The corresponding
[`client-only` package](https://www.npmjs.com/package/client-only) can be used
to mark modules that contain client-only logic like code that accesses the
`window` object.

In Next.js, installing `server-only` or `client-only` is **optional**. However,
if your linting rules flag extraneous dependencies, you may install them to
avoid issues.

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

Next.js handles `server-only` and `client-only` imports internally to provide
clearer error messages when a module is used in the wrong environment. The
contents of these packages from NPM are not used by Next.js.

Next.js also provides its own type declarations for `server-only` and
`client-only`, for TypeScript configurations where
[`noUncheckedSideEffectImports`](https://www.typescriptlang.org/tsconfig/#noUncheckedSideEffectImports)
is active.

## Next Steps

Learn more about the APIs mentioned in this page.

- [use client](/docs/app/api-reference/directives/use-client.md)
  - Learn how to use the use client directive to render a component on the
    client.
