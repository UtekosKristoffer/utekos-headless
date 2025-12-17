# Layouts and Pages

@doc-version: 16.0.10 @last-updated: 2025-10-22

Next.js uses **file-system based routing** with folders and files to define routes.

## Creating a Page

A **page** is UI rendered on a specific route. Create by adding a `page` file in the `app` directory with a default exported React component.

```tsx filename="app/page.tsx"
export default function Page() {
    return <h1>Hello Next.js!</h1>
}
```

## Creating a Layout

A **layout** is UI shared between multiple pages. Layouts preserve state, remain interactive, and don't rerender on navigation.

Define by default exporting a React component from a `layout` file. The component accepts a `children` prop (page or nested layout).

```tsx filename="app/layout.tsx"
export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body>
                <main>{children}</main>
            </body>
        </html>
    )
}
```

**Root layout** (at `app` directory root) is **required** and must contain `html` and `body` tags.

## Creating Nested Routes

Nested routes are composed of multiple URL segments (e.g., `/blog/[slug]`).

- **Folders** define route segments mapping to URL segments
- **Files** (`page`, `layout`) create UI for segments

Nest folders to create nested routes:

```tsx filename="app/blog/page.tsx"
export default async function Page() {
    const posts = await getPosts()
    return (
        <ul>
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </ul>
    )
}
```

## Dynamic Segments

Wrap folder names in square brackets (e.g., `[slug]`) to create dynamic route segments.

```tsx filename="app/blog/[slug]/page.tsx"
export default async function BlogPostPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = await getPost(slug)
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    )
}
```

## Search Params

Access in Server Component pages via `searchParams` prop:

```tsx filename="app/page.tsx"
export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const filters = (await searchParams).filters
}
```

Using `searchParams` opts into **dynamic rendering**.

Client Components use `useSearchParams` hook.

**When to use:**
- `searchParams` prop: Load data for page (pagination, filtering from database)
- `useSearchParams`: Client-only filtering (already loaded data)

## Linking Between Pages

Use `<Link>` component for navigation with prefetching and client-side transitions:

```tsx filename="app/ui/post.tsx"
import Link from 'next/link'

export default async function Post({ post }) {
    return (
        <ul>
            {posts.map(post => (
                <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </li>
            ))}
        </ul>
    )
}
```

## Route Props Helpers

Globally available utility types:

- **PageProps**: Props for `page` components (includes `params`, `searchParams`)
- **LayoutProps**: Props for `layout` components (includes `children`, named slots)

```tsx filename="app/blog/[slug]/page.tsx"
export default async function Page(props: PageProps<'/blog/[slug]'>) {
    const { slug } = await props.params
    return <h1>Blog post: {slug}</h1>
}
```

Generated during `next dev`, `next build`, or `next typegen`.

---

# layout.js API Reference

@doc-version: 16.0.10 @last-updated: 2025-10-20

## Props

### `children` (required)

Layout components must accept and use a `children` prop populated with wrapped route segments.

### `params` (optional)

Promise resolving to object containing dynamic route parameters from root segment down.

```tsx filename="app/dashboard/[team]/layout.tsx"
export default async function Layout({
    params
}: {
    params: Promise<{ team: string }>
}) {
    const { team } = await params
}
```

| Route                            | URL            | `params`                           |
| -------------------------------- | -------------- | ---------------------------------- |
| `app/dashboard/[team]/layout.js` | `/dashboard/1` | `Promise<{ team: '1' }>`           |
| `app/shop/[tag]/[item]/layout.js`| `/shop/1/2`    | `Promise<{ tag: '1', item: '2' }>` |

Must use `async/await` or React's `use` function.

### LayoutProps Helper

```tsx filename="app/dashboard/layout.tsx"
export default function Layout(props: LayoutProps<'/dashboard'>) {
    return <section>{props.children}</section>
}
```

## Root Layout

**Required** at `app` directory root. Must define `<html>` and `<body>` tags.

```tsx filename="app/layout.tsx"
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>{children}</body>
        </html>
    )
}
```

- Use Metadata API for `<head>` tags, not manual addition
- Can create multiple root layouts with route groups
- Navigating across multiple root layouts causes full page load

## Caveats

### Request Object

Layouts are cached during navigation. Access request data via `headers()` and `cookies()` APIs in Server Components.

```tsx filename="app/shop/layout.tsx"
import { cookies } from 'next/headers'

export default async function Layout({ children }) {
    const cookieStore = await cookies()
    const theme = cookieStore.get('theme')
    return '...'
}
```

### Query Params

Layouts don't rerender on navigation, can't access search params directly. Use Page `searchParams` prop or `useSearchParams` hook in Client Component.

### Pathname

Access current pathname in Client Component using `usePathname` hook.

### Fetching Data

Layouts can't pass data to `children`. Fetch same data multiple times - React `cache` or `fetch` automatically dedupes requests.

### Accessing Child Segments

Use `useSelectedLayoutSegment` or `useSelectedLayoutSegments` in Client Component.

## Examples

### Metadata

```tsx filename="app/layout.tsx"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Next.js'
}
```

### Active Nav Links

```tsx filename="app/ui/nav-links.tsx"
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function NavLinks() {
    const pathname = usePathname()
    return (
        <nav>
            <Link className={`link ${pathname === '/' ? 'active' : ''}`} href='/'>
                Home
            </Link>
        </nav>
    )
}
```

### Display Content Based on Params

```tsx filename="app/dashboard/layout.tsx"
export default async function DashboardLayout({
    params
}: {
    params: Promise<{ team: string }>
}) {
    const { team } = await params
    return (
        <section>
            <h1>Welcome to {team}'s Dashboard</h1>
        </section>
    )
}
```

### Reading Params in Client Components

```tsx filename="app/page.tsx"
'use client'

import { use } from 'react'

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)
}
```

---

# Cache Components

@doc-version: 16.0.10 @last-updated: 2025-11-05

**Opt-in feature.** Enable with `cacheComponents: true` in next.config.

Cache Components mixes static, cached, and dynamic content in a single route - combining static site speed with dynamic rendering flexibility.

## How Rendering Works

At build time, Next.js renders component tree. Output is **automatically added to static shell** unless components:
- Access network resources
- Use certain system APIs
- Require incoming request data

Handle non-prerenderable components by:
- Wrapping in `<Suspense>` (defer to request time with fallback UI)
- Using `use cache` directive (cache result if no request data needed)

Unhandled components cause `Uncached data was accessed outside of <Suspense>` error.

This approach is **Partial Prerendering** - generates static shell (HTML + RSC Payload) delivered instantly.

## Automatically Prerendered Content

Synchronous I/O, module imports, and pure computations complete during prerendering - automatically included in static shell.

```tsx filename="page.tsx"
import fs from 'node:fs'

export default async function Page() {
    const content = fs.readFileSync('./config.json', 'utf-8')
    const constants = await import('./constants.json')
    const processed = JSON.parse(content).items.map(item => item.value * 2)
    
    return <div>{/* ... */}</div>
}
```

## Defer Rendering to Request Time

### Dynamic Content

External systems provide content asynchronously. Defer rendering with Suspense boundary for latest data on each request.

```tsx filename="page.tsx"
import { Suspense } from 'react'

async function DynamicContent() {
    const data = await fetch('https://api.example.com/data')
    const users = await db.query('SELECT * FROM users')
    return <div>Not in static shell</div>
}

export default async function Page() {
    return (
        <>
            <h1>Part of static shell</h1>
            <Suspense fallback={<p>Loading..</p>}>
                <DynamicContent />
            </Suspense>
        </>
    )
}
```

Prerendering stops at async operations. Fallback is in static shell; content streams at request time.

### Runtime Data

Requires request context - only available when user makes request:
- `cookies()` - User cookie data
- `headers()` - Request headers
- `searchParams` - URL query parameters
- `params` - Dynamic route parameters (unless samples via `generateStaticParams`)

```tsx filename="page.tsx"
import { cookies } from 'next/headers'
import { Suspense } from 'react'

async function RuntimeData({ searchParams }) {
    const cookieStore = await cookies()
    const search = await searchParams
    return <div>Not in static shell</div>
}

export default async function Page(props) {
    return (
        <Suspense fallback={<p>Loading..</p>}>
            <RuntimeData searchParams={props.searchParams} />
        </Suspense>
    )
}
```

Runtime data cannot be cached with `use cache`. Components accessing runtime APIs must be wrapped in `<Suspense>`.

### Non-deterministic Operations

Operations like `Math.random()`, `Date.now()`, `crypto.randomUUID()` produce different values each execution. Call after dynamic/runtime data access or use `connection()`.

```tsx
import { connection } from 'next/server'
import { Suspense } from 'react'

async function UniqueContent() {
    await connection()
    const random = Math.random()
    const uuid = crypto.randomUUID()
    return <div>{random} - {uuid}</div>
}

export default async function Page() {
    return (
        <Suspense fallback={<p>Loading..</p>}>
            <UniqueContent />
        </Suspense>
    )
}
```

## Using `use cache`

Caches return value of async functions/components. Arguments and closed-over values become cache key - different inputs create separate cache entries.

Cached content revalidates:
- Automatically based on cache lifetime
- On-demand using `revalidateTag` or `updateTag`

### During Prerendering

For data unlikely to change frequently, use `use cache` to include in static shell.

```tsx filename="app/page.tsx"
import { cacheLife } from 'next/cache'

export default async function Page() {
    'use cache'
    cacheLife('hours')
    
    const users = await db.query('SELECT * FROM users')
    return <ul>{/* ... */}</ul>
}
```

`cacheLife` accepts profile names (`'hours'`, `'days'`, `'weeks'`) or custom config:

```tsx
cacheLife({
    stale: 3600,      // 1 hour until stale
    revalidate: 7200, // 2 hours until revalidated
    expire: 86400     // 1 day until expired
})
```

### With Runtime Data

Extract values from runtime APIs, pass as arguments to cached functions.

```tsx filename="app/profile/page.tsx"
import { cookies } from 'next/headers'
import { Suspense } from 'react'

async function ProfileContent() {
    const session = (await cookies()).get('session')?.value
    return <CachedContent sessionId={session} />
}

async function CachedContent({ sessionId }: { sessionId: string }) {
    'use cache'
    const data = await fetchUserData(sessionId)
    return <div>{data}</div>
}
```

### With Non-deterministic Operations

Within `use cache` scope, non-deterministic operations execute during prerendering - same output for all users.

```tsx
export default async function Page() {
    'use cache'
    const random = Math.random()
    const uuid = crypto.randomUUID()
    return <div>{random} - {uuid}</div>
}
```

### Tagging and Revalidating

Tag cached data with `cacheTag`, revalidate with `updateTag` (immediate) or `revalidateTag` (eventual consistency).

```tsx filename="app/actions.ts"
import { cacheTag, updateTag } from 'next/cache'

export async function getCart() {
    'use cache'
    cacheTag('cart')
    // fetch data
}

export async function updateCart(itemId: string) {
    'use server'
    // update cart
    updateTag('cart')
}
```

## Complete Example

```tsx filename="app/blog/page.tsx"
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { cacheLife } from 'next/cache'

export default function BlogPage() {
    return (
        <>
            {/* Static - prerendered automatically */}
            <header><h1>Our Blog</h1></header>
            
            {/* Cached dynamic - in static shell */}
            <BlogPosts />
            
            {/* Runtime dynamic - streams at request time */}
            <Suspense fallback={<p>Loading...</p>}>
                <UserPreferences />
            </Suspense>
        </>
    )
}

async function BlogPosts() {
    'use cache'
    cacheLife('hours')
    const posts = await fetch('https://api.vercel.app/blog').then(r => r.json())
    return <section>{/* posts */}</section>
}

async function UserPreferences() {
    const theme = (await cookies()).get('theme')?.value || 'light'
    return <aside>Your theme: {theme}</aside>
}
```

## Enabling Cache Components

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    cacheComponents: true
}

export default nextConfig
```

When enabled, `GET` Route Handlers follow same prerendering model as pages.

## Navigation Uses Activity

When `cacheComponents` enabled, Next.js uses React's `<Activity>` to preserve component state during client-side navigation.

Rather than unmounting previous route, sets Activity mode to `"hidden"`:
- Component state preserved when navigating away
- Navigate back shows previous route with intact state
- Effects cleaned up when hidden, recreated when visible

## Migrating Route Segment Configs

### `dynamic = "force-dynamic"`
**Not needed.** All pages dynamic by default - just remove it.

### `dynamic = "force-static"`
Remove it. Add `use cache` with long `cacheLife` for dynamic data. Wrap runtime data access in `Suspense`.

### `revalidate`
**Replace with `cacheLife`.**

```tsx
// Before: export const revalidate = 3600
// After:
import { cacheLife } from 'next/cache'

export default async function Page() {
    'use cache'
    cacheLife('hours')
    return <div>...</div>
}
```

### `fetchCache`
**Not needed.** With `use cache`, all data fetching automatically cached.

### `runtime = 'edge'`
**Not supported.** Cache Components requires Node.js runtime.

