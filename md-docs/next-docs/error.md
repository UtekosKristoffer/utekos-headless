# Next.js Error: Cannot Access Date Before Uncached Data

## Error Description

**Error Code**: Cannot access `Date.now()`, `Date()`, or `new Date()` before
other uncached data or Request data in a Server Component

### Why This Error Occurred

- `Date.now()`, `Date()`, or `new Date()` was accessed in a Server Component
  before:
  - Uncached data via `fetch()` or native database drivers
  - Request data via built-in APIs: `cookies()`, `headers()`, `connection()`,
    `searchParams`
- This interferes with Next.js prerendering and prefetching capabilities

---

## Solution Strategies

### 1. Performance/Logging Use Cases

**Use `performance.now()` for diagnostic purposes**

#### Before (Incorrect)

```typescript
// app/page.js
export default async function Page() {
    const start = Date.now();
    const data = computeDataSlowly(...);
    const end = Date.now();
    console.log(`somethingSlow took ${end - start} milliseconds to complete`)
    return ...
}
```

#### After (Correct)

```typescript
// app/page.js
export default async function Page() {
    const start = performance.now();
    const data = computeDataSlowly(...);
    const end = performance.now();
    console.log(`somethingSlow took ${end - start} milliseconds to complete`)
    return ...
}
```

**Important Notes**:

- For absolute time reporting to observability tools: use
  `performance.timeOrigin + performance.now()`
- `performance.now()` values must NOT influence rendered output
- Never pass `performance.now()` values into Cache Functions as arguments or
  props

---

### 2. Cacheable Use Cases

**Move time reads inside cached functions with `"use cache"`**

Use when you want to read the time when a cache entry is created (e.g.,
build-time rendering or static page revalidation).

#### Before (Incorrect)

```typescript
// app/page.js
async function InformationTable() {
    const data = await fetch(...)
    return (
        <section>
            <h1>Latest Info...</h1>
            <table>{renderData(data)}</table>
        </section>
    )
}

export default async function Page() {
    return (
        <main>
            <InformationTable />
            Last Refresh: {new Date().toString()}
        </main>
    )
}
```

#### After (Correct)

```typescript
// app/page.js
async function InformationTable() {
    "use cache"
    const data = await fetch(...)
    return (
        <>
            <section>
                <h1>Latest Info...</h1>
                <table>{renderData(data)}</table>
            </section>
            Last Refresh: {new Date().toString()}
        </>
    )
}

export default async function Page() {
    return (
        <main>
            <InformationTable />
        </main>
    )
}
```

---

### 3. Request-Time Use Cases

#### Option A: Move Time to Client Component

**Best for**: Display purposes or when time needs to update independently of
page navigation

**Requirements**:

- Client Component must have a Suspense boundary above it
- Consider narrow Suspense boundaries for better loading experience

##### Before (Server Component)

```typescript
// app/page.js
function RelativeTime({ when }) {
    return computeTimeAgo(new Date(), when)
}

export default async function Page() {
    const data = await ...
    return (
        <main>
            ...
            <Suspense>
                <RelativeTime when={data.createdAt} />
            </Suspense>
        </main>
    )
}
```

##### After (Client Component)

```typescript
// app/relative-time.js
'use client'

import { useReducer, useEffect } from 'react'

export function RelativeTime({ when }) {
  const [_, update] = useReducer(() => ({}), {})
  const timeAgo = computeTimeAgo(new Date(), when)

  // Whenever the timeAgo value changes a new timeout is
  // scheduled to update the component. Now the time can
  // rerender without having the Server Component render again.
  useEffect(() => {
    const updateAfter = computeTimeUntilNextUpdate(timeAgo)
    let timeout = setTimeout(() => {
      update()
    }, updateAfter)
    return () => {
      clearTimeout(timeout)
    }
  })

  return timeAgo
}
```

```typescript
// app/page.js
import { RelativeTime } from './relative-time'

export default async function Page() {
    const data = await ...
    return (
        <main>
            ...
            <Suspense>
                <RelativeTime when={data.createdAt} />
            </Suspense>
        </main>
    )
}
```

**Note**: Accessing current time in a Client Component excludes it from
prerendered server HTML, but Next.js allows this because it can compute the time
dynamically when the user requests the HTML page or in the browser.

---

#### Option B: Guard Time with `await connection()`

**Best for**: When you need to make rendering decisions using current time on
the server

**Requirements**:

- Must precede time read with `await connection()`
- Must have a Suspense boundary above the component
- Provides fallback UI for prerendering

##### Before (Incorrect)

```typescript
// app/page.js
export default async function Page() {
    const currentTime = Date.now()
    if (currentTime > someTriggerDate) {
        return <SpecialBanner />
    } else {
        return <NormalBanner />
    }
}
```

##### After (Correct)

```typescript
// app/page.js
import { Suspense } from 'react'
import { connection } from 'next/server'

async function BannerSkeleton() {
    // ...skeleton UI
}

export default async function Page() {
    return (
        <Suspense fallback={<BannerSkeleton />}>
            <DynamicBanner />
        </Suspense>
    )
}

async function DynamicBanner() {
    await connection();
    const currentTime = Date.now();
    if (currentTime > someTriggerDate) {
        return <SpecialBanner />
    } else {
        return <NormalBanner />
    }
}
```

**Alternative Approaches**:

- Move uncached `fetch()` before time read
- Read `cookies()` before time read
- Use any Request data access before time read

---

## Third-Party Code Considerations

**Problem**: Time access may occur inside 3rd party code that you cannot modify.

**Solution**: Apply the strategies above in your own project code:

- Use `"use cache"` directive in your wrapper functions
- Use `await connection()` before calling 3rd party code
- Move 3rd party time-dependent code to Client Components

The strategies work regardless of how deeply the time is read in the dependency
chain.

---

## Summary Table

| Use Case                          | Strategy                      | Key API/Directive                 |
| --------------------------------- | ----------------------------- | --------------------------------- |
| Performance tracking/logging      | Use `performance.now()`       | `performance.now()`               |
| Cacheable timestamps              | Cache function with time read | `"use cache"`                     |
| Display/UI updates                | Move to Client Component      | `'use client'` + `Suspense`       |
| Server-side conditional rendering | Guard with connection         | `await connection()` + `Suspense` |
