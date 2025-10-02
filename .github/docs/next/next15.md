# Next.js 15

## Overview

Next.js 15 is officially stable and ready for production. This release builds on
the updates from both RC1 and RC2. We've focused heavily on stability while
adding some exciting updates we think you'll love. Try Next.js 15 today:

```bash
# Use the new automated upgrade CLI
npx @next/codemod@canary upgrade latest

# ...or upgrade manually
npm install next@latest react@rc react-dom@rc
```

We're also excited to share more about what's coming next at Next.js Conf this
Thursday, October 24th.

---

## What's New in Next.js 15

### Feature Highlights

- **@next/codemod CLI**: Easily upgrade to the latest Next.js and React
  versions.
- **Async Request APIs (Breaking)**: Incremental step towards a simplified
  rendering and caching model.
- **Caching Semantics (Breaking)**: `fetch` requests, GET Route Handlers, and
  client navigations are no longer cached by default.
- **React 19 Support**: Support for React 19, React Compiler (Experimental), and
  hydration error improvements.
- **Turbopack Dev (Stable)**: Performance and stability improvements.
- **Static Indicator**: New visual indicator shows static routes during
  development.
- **unstable_after API (Experimental)**: Execute code after a response finishes
  streaming.
- **instrumentation.js API (Stable)**: New API for server lifecycle
  observability.
- **Enhanced Forms (`next/form`)**: Enhance HTML forms with client-side
  navigation.
- **next.config**: TypeScript support for `next.config.ts`.
- **Self-hosting Improvements**: More control over Cache-Control headers.
- **Server Actions Security**: Unguessable endpoints and removal of unused
  actions.
- **Bundling External Packages (Stable)**: New config options for App and Pages
  Router.
- **ESLint 9 Support**: Added support for ESLint 9.
- **Development and Build Performance**: Improved build times and Faster Fast
  Refresh.

---

## Upgrade Process

### Smooth upgrades with @next/codemod CLI

We include codemods (automated code transformations) with every major Next.js
release to help automate upgrading breaking changes.

```bash
npx @next/codemod@canary upgrade latest
```

This tool helps you upgrade your codebase to the latest stable or prerelease
versions. The CLI will update your dependencies, show available codemods, and
guide you through applying them.

Learn more about
[Next.js codemod CLI](https://nextjs.org/docs/pages/api-reference/codemod).

---

## Async Request APIs (Breaking Change)

In traditional Server-Side Rendering, the server waits for a request before
rendering any content. However, not all components depend on request-specific
data, so it's unnecessary to wait for the request to render them. Ideally, the
server would prepare as much as possible before a request arrives. To enable
this, and set the stage for future optimizations, we need to know when to wait
for the request.

Therefore, we are transitioning APIs that rely on request-specific data—such as
headers, cookies, params, and searchParams—to be asynchronous.

```js
import { cookies } from 'next/headers'

export async function AdminPanel() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  // ...
}
```

#### Affected APIs

- `cookies`
- `headers`
- `draftMode`
- `params` in `layout.js`, `page.js`, `route.js`, `default.js`,
  `generateMetadata`, and `generateViewport`
- `searchParams` in `page.js`

For migration, use the codemod:

```bash
npx @next/codemod@canary next-async-request-api .
```

---

## Caching Semantics

### GET Route Handlers

GET Route Handlers are no longer cached by default. You can opt into caching
using a static route config option such as:

```js
export const dynamic = 'force-static'
```

### Client Router Cache

The default behavior now has a `staleTime` of 0 for Page segments. You can opt
into the previous behavior:

```js
// next.config.ts
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30
    }
  }
}
export default nextConfig
```

---

## React 19

Next.js 15 aligns with React 19 RC. The App Router uses React 19 RC, and the
Pages Router maintains backward compatibility with React 18.

> Note: Running the Pages Router on React 18 and the App Router on React 19 in
> the same application is not recommended.

---

## React Compiler (Experimental)

The React Compiler is a new experimental compiler created by the React team at
Meta. It reduces the amount of manual memoization developers have to do.

> Note: The React Compiler is currently only available as a Babel plugin, which
> will result in slower development and build times.

---

## Hydration Error Improvements

Next.js 15 adds an improved hydration error view, displaying the source code of
the error with suggestions.

---

## Turbopack Dev

`next dev --turbo` is now stable and ready to speed up your development
experience.

**Performance improvements:**

- Up to 76.7% faster local server startup.
- Up to 96.3% faster code updates with Fast Refresh.
- Up to 45.8% faster initial route compile without caching.

---

## Static Route Indicator

Next.js now displays a Static Route Indicator during development to help you
identify which routes are static or dynamic.

---

## Executing Code After a Response with `unstable_after` (Experimental)

Schedule work to be processed after the response has finished streaming.

```js
// next.config.ts
const nextConfig = {
  experimental: {
    after: true
  }
}
export default nextConfig
```

```js
import { unstable_after as after } from 'next/server'
import { log } from '@/app/utils'

export default function Layout({ children }) {
  after(() => {
    log()
  })
  return <>{children}</>
}
```

---

## instrumentation.js (Stable)

The instrumentation file, with the `register()` API, allows users to tap into
the Next.js server lifecycle.

```js
export async function onRequestError(err, request, context) {
  await fetch('https://...', {
    method: 'POST',
    body: JSON.stringify({ message: err.message, request, context }),
    headers: { 'Content-Type': 'application/json' }
  })
}

export async function register() {
  // init your favorite observability provider SDK
}
```

---

## `<Form>` Component

The new `<Form>` component extends the HTML `<form>` element with prefetching,
client-side navigation, and progressive enhancement.

```js
// app/page.jsx
import Form from 'next/form'

export default function Page() {
  return (
    <Form action='/search'>
      <input name='query' />
      <button type='submit'>Submit</button>
    </Form>
  )
}
```

---

## Support for `next.config.ts`

Next.js now supports the TypeScript `next.config.ts` file type and provides a
`NextConfig` type for autocomplete and type-safe options:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
}

export default nextConfig
```

---

## Improvements for Self-hosting

You can now configure the `expireTime` value in `next.config`. Next.js will use
sharp automatically when using `next start` or running with standalone output
mode.

---

## Enhanced Security for Server Actions

- Dead code elimination: Unused Server Actions won't have their IDs exposed.
- Secure action IDs: Next.js now creates unguessable, non-deterministic IDs.

```js
// app/actions.js
'use server'

export async function updateUserAction(formData) {}
export async function deleteUserAction(formData) {}
```

---

## Optimizing Bundling of External Packages (Stable)

```js
// next.config.ts
const nextConfig = {
  bundlePagesRouterDependencies: true,
  serverExternalPackages: ['package-name']
}
export default nextConfig
```

---

## ESLint 9 Support

Next.js 15 introduces support for ESLint 9, following the end-of-life for ESLint
8 on October 5, 2024.

---

## Development and Build Improvements

### Server Components HMR

Hot Module Replacement (HMR) can re-use fetch responses from previous renders.

### Faster Static Generation for the App Router

Static generation workers now share the fetch cache across pages.

### Advanced Static Generation Control (Experimental)

```js
// next.config.ts
const nextConfig = {
  experimental: {
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 8,
    staticGenerationMinPagesPerWorker: 25
  }
}
export default nextConfig
```

---

## Other Changes

### Breaking Changes

- `next/image`: Removed squoosh in favor of sharp as an optional dependency
- `next/image`: Changed default Content-Disposition to attachment
- `next/image`: Error when src has leading or trailing spaces
- Middleware: Apply react-server condition to limit unrecommended React API
  imports
- `next/font`: Removed support for external @next/font package
- `next/font`: Removed font-family hashing
- Caching: force-dynamic will now set a no-store default to the fetch cache
- Config: Enable swcMinify, missingSuspenseWithCSRBailout, and outputFileTracing
  behavior by default and remove deprecated options
- Remove auto-instrumentation for Speed Insights (must now use the dedicated
  @vercel/speed-insights package)
- Remove .xml extension for dynamic sitemap routes and align sitemap URLs
  between development and production
- Deprecated exporting `export const runtime = "experimental-edge"` in the App
  Router. Switch to `export const runtime = "edge"`
- Calling `revalidateTag` and `revalidatePath` during render will now throw an
  error
- The instrumentation.js and middleware.js files will now use the vendored React
  packages
- The minimum required Node.js version has been updated to 18.18.0
- `next/dynamic`: the deprecated suspense prop has been removed
- Disallow using `ssr: false` option with `next/dynamic` in Server Components

### Improvements

- Metadata: Updated environment variable fallbacks for metadataBase when hosted
  on Vercel
- Fix tree-shaking with mixed namespace and named imports from
  optimizePackageImports
- Parallel Routes: Provide unmatched catch-all routes with all known params
- Config bundlePagesExternals is now stable and renamed to
  bundlePagesRouterDependencies
- Config serverComponentsExternalPackages is now stable and renamed to
  serverExternalPackages
- create-next-app: New projects ignore all .env files by default
- The outputFileTracingRoot, outputFileTracingIncludes and
  outputFileTracingExcludes are now stable
- Avoid merging global CSS files with CSS module files deeper in the tree
- The cache handler can be specified via the NEXT_CACHE_HANDLER_PATH environment
  variable
- The Pages Router now supports both React 18 and React 19
- The Error Overlay now displays a button to copy the Node.js Inspector URL if
  the inspector is enabled
- Client prefetches on the App Router now use the priority attribute
- Next.js now provides an unstable_rethrow function to rethrow Next.js internal
  errors in the App Router
- unstable_after can now be used in static pages
- If a next/dynamic component is used during SSR, the chunk will be prefetched
- The esmExternals option is now supported on the App Router
- The experimental.allowDevelopmentBuild option can be used to allow
  NODE_ENV=development with next build for debugging purposes
- The Server Action transforms are now disabled in the Pages Router
- Build workers will now stop the build from hanging when they exit
- When redirecting from a Server Action, revalidations will now apply correctly
- Dynamic params are now handled correctly for parallel routes on the Edge
  Runtime
- Static pages will now respect staleTime after initial load
- vercel/og updated with a memory leak fix
- Patch timings updated to allow usage of packages like msw for APIs mocking
- Prerendered pages should use static staleTime

---

## Resources

To learn more, check out the
[upgrade guide](https://nextjs.org/docs/pages/api-reference/upgrade-guide).
