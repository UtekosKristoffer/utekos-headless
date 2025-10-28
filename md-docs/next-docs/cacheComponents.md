# cacheComponents

@doc-version: 16.0.0

The `cacheComponents` flag is a feature in Next.js that causes data fetching
operations in the App Router to be excluded from pre-renders unless they are
explicitly cached. This can be useful for optimizing the performance of dynamic
data fetching in Server Components.

It is useful if your application requires fresh data fetching during runtime
rather than serving from a pre-rendered cache.

It is expected to be used in conjunction with
[`use cache`](/docs/app/api-reference/directives/use-cache.md) so that your data
fetching happens at runtime by default unless you define specific parts of your
application to be cached with `use cache` at the page, function, or component
level.

## Usage

To enable the `cacheComponents` flag, set it to `true` in your `next.config.ts`
file:

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true
}

export default nextConfig
```

When `cacheComponents` is enabled, you can use the following cache functions and
configurations:

- The [`use cache` directive](/docs/app/api-reference/directives/use-cache.md)
- The
  [`cacheLife` function](/docs/app/api-reference/config/next-config-js/cacheLife.md)
  with `use cache`
- The [`cacheTag` function](/docs/app/api-reference/functions/cacheTag.md)

## Notes

- While `cacheComponents` can optimize performance by ensuring fresh data
  fetching during runtime, it may also introduce additional latency compared to
  serving pre-rendered content.

## Version History

| Version | Change                                                                                                                            |
| ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 16.0.0  | `cacheComponents` introduced. This flag controls the `ppr`, `useCache`, and `dynamicIO` flags as a single, unified configuration. |

# cacheLife

@doc-version: 16.0.0

The `cacheLife` option allows you to define **custom cache profiles** when using
the [`cacheLife`](/docs/app/api-reference/functions/cacheLife.md) function
inside components or functions, and within the scope of the
[`use cache` directive](/docs/app/api-reference/directives/use-cache.md).

## Usage

To define a profile, enable the
[`cacheComponents` flag](/docs/app/api-reference/config/next-config-js/cacheComponents.md)
and add the cache profile in the `cacheLife` object in the `next.config.js`
file. For example, a `blog` profile:

```ts filename="next.config.ts" switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    blog: {
      stale: 3600, // 1 hour
      revalidate: 900, // 15 minutes
      expire: 86400 // 1 day
    }
  }
}

export default nextConfig
```

```js filename="next.config.js" switcher
module.exports = {
  cacheComponents: true,
  cacheLife: {
    blog: {
      stale: 3600, // 1 hour
      revalidate: 900, // 15 minutes
      expire: 86400 // 1 day
    }
  }
}
```

You can now use this custom `blog` configuration in your component or function
as follows:

```tsx filename="app/actions.ts" highlight={4,5} switcher
import { cacheLife } from 'next/cache'

export async function getCachedData() {
  'use cache'
  cacheLife('blog')
  const data = await fetch('/api/data')
  return data
}
```

```jsx filename="app/actions.js" highlight={4,5} switcher
import { cacheLife } from 'next/cache'

export async function getCachedData() {
  'use cache'
  cacheLife('blog')
  const data = await fetch('/api/data')
  return data
}
```

## Reference

The configuration object has key values with the following format:

| **Property** | **Value** | **Description**                                                                                           | **Requirement**                             |
| ------------ | --------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `stale`      | `number`  | Duration the client should cache a value without checking the server.                                     | Optional                                    |
| `revalidate` | `number`  | Frequency at which the cache should refresh on the server; stale values may be served while revalidating. | Optional                                    |
| `expire`     | `number`  | Maximum duration for which a value can remain stale before switching to dynamic.                          | Optional - Must be longer than `revalidate` |

# cacheTag

@doc-version: 16.0.0

The `cacheTag` function allows you to tag cached data for on-demand
invalidation. By associating tags with cache entries, you can selectively purge
or revalidate specific cache entries without affecting other cached data.

## Usage

To use `cacheTag`, enable the
[`cacheComponents` flag](/docs/app/api-reference/config/next-config-js/cacheComponents.md)
in your `next.config.js` file:

```ts filename="next.config.ts" switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true
}

export default nextConfig
```

```js filename="next.config.js" switcher
const nextConfig = {
  cacheComponents: true
}

export default nextConfig
```

The `cacheTag` function takes one or more string values.

```tsx filename="app/data.ts" switcher
import { cacheTag } from 'next/cache'

export async function getData() {
  'use cache'
  cacheTag('my-data')
  const data = await fetch('/api/data')
  return data
}
```

```jsx filename="app/data.js" switcher
import { cacheTag } from 'next/cache'

export async function getData() {
  'use cache'
  cacheTag('my-data')
  const data = await fetch('/api/data')
  return data
}
```

You can then purge the cache on-demand using
[`revalidateTag`](/docs/app/api-reference/functions/revalidateTag.md) API in
another function, for example, a
[route handler](/docs/app/api-reference/file-conventions/route.md) or
[Server Action](/docs/app/getting-started/updating-data.md):

```tsx filename="app/action.ts" switcher
'use server'

import { revalidateTag } from 'next/cache'

export default async function submit() {
  await addPost()
  revalidateTag('my-data')
}
```

```jsx filename="app/action.js" switcher
'use server'

import { revalidateTag } from 'next/cache'

export default async function submit() {
  await addPost()
  revalidateTag('my-data')
}
```

## Good to know

- **Idempotent Tags**: Applying the same tag multiple times has no additional
  effect.
- **Multiple Tags**: You can assign multiple tags to a single cache entry by
  passing multiple string values to `cacheTag`.

```tsx
cacheTag('tag-one', 'tag-two')
```

- **Limits**: The max length for a custom tag is 256 characters and the max tag
  items is 128.

## Examples

### Tagging components or functions

Tag your cached data by calling `cacheTag` within a cached function or
component:

```tsx filename="app/components/bookings.tsx" switcher
import { cacheTag } from 'next/cache'

interface BookingsProps {
  type: string
}

export async function Bookings({ type = 'haircut' }: BookingsProps) {
  'use cache'
  cacheTag('bookings-data')

  async function getBookingsData() {
    const data = await fetch(`/api/bookings?type=${encodeURIComponent(type)}`)
    return data
  }

  return //...
}
```

```jsx filename="app/components/bookings.js" switcher
import { cacheTag } from 'next/cache'

export async function Bookings({ type = 'haircut' }) {
  'use cache'
  cacheTag('bookings-data')

  async function getBookingsData() {
    const data = await fetch(`/api/bookings?type=${encodeURIComponent(type)}`)
    return data
  }

  return //...
}
```

### Creating tags from external data

You can use the data returned from an async function to tag the cache entry.

```tsx filename="app/components/bookings.tsx" switcher
import { cacheTag } from 'next/cache'

interface BookingsProps {
  type: string
}

export async function Bookings({ type = 'haircut' }: BookingsProps) {
  async function getBookingsData() {
    'use cache'
    const data = await fetch(`/api/bookings?type=${encodeURIComponent(type)}`)
    cacheTag('bookings-data', data.id)
    return data
  }
  return //...
}
```

```jsx filename="app/components/bookings.js" switcher
import { cacheTag } from 'next/cache'

export async function Bookings({ type = 'haircut' }) {
  async function getBookingsData() {
    'use cache'
    const data = await fetch(`/api/bookings?type=${encodeURIComponent(type)}`)
    cacheTag('bookings-data', data.id)
    return data
  }
  return //...
}
```

### Invalidating tagged cache

Using [`revalidateTag`](/docs/app/api-reference/functions/revalidateTag.md), you
can invalidate the cache for a specific tag when needed:

```tsx filename="app/actions.ts" switcher
'use server'

import { revalidateTag } from 'next/cache'

export async function updateBookings() {
  await updateBookingData()
  revalidateTag('bookings-data')
}
```

```jsx filename="app/actions.js" switcher
'use server'

import { revalidateTag } from 'next/cache'

export async function updateBookings() {
  await updateBookingData()
  revalidateTag('bookings-data')
}
```

## Related

View related API references.

- [cacheComponents](/docs/app/api-reference/config/next-config-js/cacheComponents.md)
  - Learn how to enable the cacheComponents flag in Next.js.
- [use cache](/docs/app/api-reference/directives/use-cache.md)
  - Learn how to use the use cache directive to cache data in your Next.js
    application.
- [revalidateTag](/docs/app/api-reference/functions/revalidateTag.md)
  - API Reference for the revalidateTag function.
- [cacheLife](/docs/app/api-reference/functions/cacheLife.md)
  - Learn how to use the cacheLife function to set the cache expiration time for
    a cached function or component.

# cacheLife

@doc-version: 16.0.0

The `cacheLife` function is used to set the cache lifetime of a function or
component. It should be used alongside the
[`use cache`](/docs/app/api-reference/directives/use-cache.md) directive, and
within the scope of the function or component.

## Usage

To use `cacheLife`, enable the
[`cacheComponents` flag](/docs/app/api-reference/config/next-config-js/cacheComponents.md)
in your `next.config.js` file:

```ts filename="next.config.ts" switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true
}

export default nextConfig
```

```js filename="next.config.js" switcher
const nextConfig = {
  cacheComponents: true
}

export default nextConfig
```

Then, import and invoke the `cacheLife` function within the scope of the
function or component:

```tsx filename="app/page.tsx" highlight={5} switcher
'use cache'
import { cacheLife } from 'next/cache'

export default async function Page() {
  cacheLife('hours')
  return <div>Page</div>
}
```

```jsx filename="app/page.js" highlight={5} switcher
'use cache'
import { cacheLife } from 'next/cache'

export default async function Page() {
  cacheLife('hours')
  return <div>Page</div>
}
```

## Reference

### Default cache profiles

Next.js provides a set of named cache profiles modeled on various timescales. If
you don't specify a cache profile in the `cacheLife` function alongside the
`use cache` directive, Next.js will automatically apply the `default` cache
profile.

However, we recommend always adding a cache profile when using the `use cache`
directive to explicitly define caching behavior.

| **Profile** | `stale`    | `revalidate` | `expire` | **Description**                                                          |
| ----------- | ---------- | ------------ | -------- | ------------------------------------------------------------------------ |
| `default`   | 5 minutes  | 15 minutes   | 1 year   | Default profile, suitable for content that doesn't need frequent updates |
| `seconds`   | 30 seconds | 1 second     | 1 minute | For rapidly changing content requiring near real-time updates            |
| `minutes`   | 5 minutes  | 1 minute     | 1 hour   | For content that updates frequently within an hour                       |
| `hours`     | 5 minutes  | 1 hour       | 1 day    | For content that updates daily but can be slightly stale                 |
| `days`      | 5 minutes  | 1 day        | 1 week   | For content that updates weekly but can be a day old                     |
| `weeks`     | 5 minutes  | 1 week       | 30 days  | For content that updates monthly but can be a week old                   |
| `max`       | 5 minutes  | 30 days      | 1 year   | For very stable content that rarely needs updating                       |

The string values used to reference cache profiles don't carry inherent meaning;
instead they serve as semantic labels. This allows you to better understand and
manage your cached content within your codebase.

> **Good to know:** Updating the
> [`staleTimes`](/docs/app/api-reference/config/next-config-js/staleTimes.md)
> and
> [`expireTime`](/docs/app/api-reference/config/next-config-js/expireTime.md)
> config options also updates the `stale` and `expire` properties of the
> `default` cache profile.

### Custom cache profiles

You can configure custom cache profiles by adding them to the
[`cacheLife`](/docs/app/api-reference/config/next-config-js/cacheLife.md) option
in your `next.config.ts` file.

Cache profiles are objects that contain the following properties:

| **Property** | **Value** | **Description**                                                                                                             | **Requirement**                             |
| ------------ | --------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `stale`      | `number`  | Duration the client should cache a value without checking the server.                                                       | Optional                                    |
| `revalidate` | `number`  | Frequency at which the cache should refresh on the server; stale values may be served while revalidating.                   | Optional                                    |
| `expire`     | `number`  | Maximum duration for which a value can remain stale before switching to dynamic fetching; must be longer than `revalidate`. | Optional - Must be longer than `revalidate` |

The "stale" property differs from the
[`staleTimes`](/docs/app/api-reference/config/next-config-js/staleTimes.md)
setting in that it specifically controls client-side router caching. While
`staleTimes` is a global setting that affects all instances of both dynamic and
static data, the `cacheLife` configuration allows you to define "stale" times on
a per-function or per-route basis.

### `stale` time in the client router cache

The "stale" property does not set the `Cache-control: max-age` header. Instead,
it controls the client-side router cache. The server sends this value to the
client via the `x-nextjs-stale-time` response header (in seconds), which the
client router uses to determine how long to cache the route before needing to
revalidate.

**The client enforces a minimum stale time of 30 seconds**: This ensures that
prefetched data remains usable long enough for users to click on links after
they've been prefetched. Without this minimum, very short stale times would
cause prefetched data to expire before it could be used, making prefetching
ineffective.

This minimum only applies to time-based expiration. When you call
[`revalidateTag`](/docs/app/api-reference/functions/revalidateTag.md),
[`revalidatePath`](/docs/app/api-reference/functions/revalidatePath.md),
[`updateTag`](/docs/app/api-reference/functions/updateTag.md), or
[`refresh`](/docs/app/api-reference/functions/refresh.md) from a Server Action,
the entire client cache is immediately cleared, bypassing the stale time
entirely.

## Examples

### Defining reusable cache profiles

You can create a reusable cache profile by defining them in your
`next.config.ts` file. Choose a name that suits your use case and set values for
the `stale`, `revalidate`, and `expire` properties. You can create as many
custom cache profiles as needed. Each profile can be referenced by its name as a
string value passed to the `cacheLife` function.

```ts filename="next.config.ts" switcher
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    biweekly: {
      stale: 60 * 60 * 24 * 14, // 14 days
      revalidate: 60 * 60 * 24, // 1 day
      expire: 60 * 60 * 24 * 14 // 14 days
    }
  }
}

module.exports = nextConfig
```

```js filename="next.config.js" switcher
const nextConfig = {
  cacheComponents: true,
  cacheLife: {
    biweekly: {
      stale: 60 * 60 * 24 * 14, // 14 days
      revalidate: 60 * 60 * 24, // 1 day
      expire: 60 * 60 * 24 * 14 // 14 days
    }
  }
}

module.exports = nextConfig
```

The example above caches for 14 days, checks for updates daily, and expires the
cache after 14 days. You can then reference this profile throughout your
application by its name:

```tsx filename="app/page.tsx" highlight={5}
'use cache'
import { cacheLife } from 'next/cache'

export default async function Page() {
  cacheLife('biweekly')
  return <div>Page</div>
}
```

### Overriding the default cache profiles

While the default cache profiles provide a useful way to think about how fresh
or stale any given part of cacheable output can be, you may prefer different
named profiles to better align with your applications caching strategies.

You can override the default named cache profiles by creating a new
configuration with the same name as the defaults.

The example below shows how to override the default “days” cache profile:

```ts filename="next.config.ts"
const nextConfig = {
  cacheComponents: true,
  cacheLife: {
    days: {
      stale: 3600, // 1 hour
      revalidate: 900, // 15 minutes
      expire: 86400 // 1 day
    }
  }
}

module.exports = nextConfig
```

### Defining cache profiles inline

For specific use cases, you can set a custom cache profile by passing an object
to the `cacheLife` function:

```tsx filename="app/page.tsx" highlight={5-9} switcher
'use cache'
import { cacheLife } from 'next/cache'

export default async function Page() {
  cacheLife({
    stale: 3600, // 1 hour
    revalidate: 900, // 15 minutes
    expire: 86400 // 1 day
  })

  return <div>Page</div>
}
```

```jsx filename="app/page.js" highlight={5-9} switcher
'use cache'
import { cacheLife } from 'next/cache'

export default async function Page() {
  cacheLife({
    stale: 3600, // 1 hour
    revalidate: 900, // 15 minutes
    expire: 86400 // 1 day
  })

  return <div>Page</div>
}
```

This inline cache profile will only be applied to the function or file it was
created in. If you want to reuse the same profile throughout your application,
you can [add the configuration](#defining-reusable-cache-profiles) to the
`cacheLife` property of your `next.config.ts` file.

### Nested usage of `use cache` and `cacheLife`

When defining multiple caching behaviors in the same route or component tree, if
the inner caches specify their own `cacheLife` profile, the outer cache will
respect the shortest cache duration among them. **This applies only if the outer
cache does not have its own explicit `cacheLife` profile defined.**

For example, if you add the `use cache` directive to your page, without
specifying a cache profile, the default cache profile will be applied implicitly
(`cacheLife(”default”)`). If a component imported into the page also uses the
`use cache` directive with its own cache profile, the outer and inner cache
profiles are compared, and shortest duration set in the profiles will be
applied.

```tsx filename="app/components/parent.tsx" highlight={5,6}
// Parent component
import { cacheLife } from 'next/cache'
import { ChildComponent } from './child'

export async function ParentComponent() {
  'use cache'
  cacheLife('days')

  return (
    <div>
      <ChildComponent />
    </div>
  )
}
```

And in a separate file, we defined the Child component that was imported:

```tsx filename="app/components/child.tsx" highlight={4,5}
// Child component
import { cacheLife } from 'next/cache'

export async function ChildComponent() {
  'use cache'
  cacheLife('hours')
  return <div>Child Content</div>

  // This component's cache will respect the shorter 'hours' profile
}
```

## Related

View related API references.

- [cacheComponents](/docs/app/api-reference/config/next-config-js/cacheComponents.md)
  - Learn how to enable the cacheComponents flag in Next.js.
- [use cache](/docs/app/api-reference/directives/use-cache.md)
  - Learn how to use the use cache directive to cache data in your Next.js
    application.
- [revalidateTag](/docs/app/api-reference/functions/revalidateTag.md)
  - API Reference for the revalidateTag function.
- [cacheTag](/docs/app/api-reference/functions/cacheTag.md)
  - Learn how to use the cacheTag function to manage cache invalidation in your
    Next.js application.
