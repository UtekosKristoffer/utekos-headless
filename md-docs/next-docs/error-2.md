# Next.js Error: Uncached Data Accessed Outside of `<Suspense>`

## Error Overview

When the `cacheComponents` feature is enabled, Next.js requires a parent
`<Suspense>` boundary around any component that awaits data accessed on every
user request. This ensures Next.js can provide a useful fallback UI while data
is being accessed and rendered.

## Key Concepts

### Default Behavior

- **Asynchronous data**: Next.js assumes all async data is accessed on each user
  request
- **Exception**: Data explicitly cached using `"use cache"`
- **Request-specific data**: Headers, cookies, and similar APIs are inherently
  per-request

### Solution Strategy

The appropriate fix depends on:

1. What data you're accessing
2. How you want your Next.js app to behave

---

## Solution 1: Cache Data for Prerendering

**Use Case**: Data that should be cached and reused across requests during
prerendering

### Before

```javascript
// app/page.js
async function getRecentArticles() {
    return db.query(...)
}

export default async function Page() {
    const articles = await getRecentArticles(token);
    return <ArticleList articles={articles}>
}
```

### After

```javascript
// app/page.js
import { cacheTag, cacheLife } from 'next/cache'

async function getRecentArticles() {
    "use cache"
    // Revalidate via webhook or server action using revalidateTag("articles")
    cacheTag("articles")
    // Auto-revalidate after one hour
    cacheLife('hours')
    return db.query(...)
}

export default async function Page() {
    const articles = await getRecentArticles(token);
    return <ArticleList articles={articles}>
}
```

---

## Solution 2: Add Suspense Boundary for Per-Request Data

**Use Case**: Data that must be fetched fresh on every user request

### Before

```javascript
// app/page.js
async function getLatestTransactions() {
    return db.query(...)
}

export default async function Page() {
    const transactions = await getLatestTransactions(token);
    return <TransactionList transactions={transactions}>
}
```

### After

```javascript
// app/page.js
import { Suspense } from 'react'

async function TransactionList() {
    const transactions = await db.query(...)
    return ...
}

function TransactionSkeleton() {
    return <ul>...</ul>
}

export default async function Page() {
    return (
        <Suspense fallback={<TransactionSkeleton />}>
            <TransactionList/>
        </Suspense>
    )
}
```

**Important**: Place the `<Suspense>` boundary based on desired fallback UI
location (can be immediately above the component or even in Root Layout)

---

## Solution 3: Move Header Access Deeper in Component Tree

**Use Case**: Accessing request headers via `headers()`, `cookies()`, or
`draftMode()`

### Before

```javascript
// app/inbox.js
export async function Inbox({ token }) {
    const email = await getEmail(token)
    return (
        <ul>
            {email.map((e) => (
                <EmailRow key={e.id} />
            ))}
        </ul>
    )
}

// app/page.js
import { cookies } from 'next/headers'
import { Inbox } from './inbox'

export default async function Page() {
    const token = (await cookies()).get('token')
    return (
        <Suspense fallback="loading your inbox...">
            <Inbox token={token}>
        </Suspense>
    )
}
```

### After

```javascript
// app/inbox.js
import { cookies } from 'next/headers'

export async function Inbox() {
    const token = (await cookies()).get('token')
    const email = await getEmail(token)
    return (
        <ul>
            {email.map((e) => (
                <EmailRow key={e.id} />
            ))}
        </ul>
    )
}

// app/page.js
import { Inbox } from './inbox'

export default async function Page() {
    return (
        <Suspense fallback="loading your inbox...">
            <Inbox>
        </Suspense>
    )
}
```

**Alternative**: Add a `<Suspense>` boundary above the component accessing
request headers

---

## Solution 4: Pass Params and SearchParams as Promises

**Use Case**: Layout `params`, Page `params`, and `searchParams` are promises
that might be awaited too early

### Principle

Pass these props as promises to deeper components and await them closer to where
the actual param or searchParam is required.

### Before

```javascript
// app/map.js
export async function Map({ lat, lng }) {
    const mapData = await fetch(`https://...?lat=${lat}&lng=${lng}`)
    return drawMap(mapData)
}

// app/page.js
import { cookies } from 'next/headers'
import { Map } from './map'

export default async function Page({ searchParams }) {
    const { lat, lng } = await searchParams;
    return (
        <Suspense fallback="loading your inbox...">
            <Map lat={lat} lng={lng}>
        </Suspense>
    )
}
```

### After

```javascript
// app/map.js
export async function Map({ coords }) {
    const { lat, lng } = await coords
    const mapData = await fetch(`https://...?lat=${lat}&lng=${lng}`)
    return drawMap(mapData)
}

// app/page.js
import { cookies } from 'next/headers'
import { Map } from './map'

export default async function Page({ searchParams }) {
    const coords = searchParams.then(sp => ({ lat: sp.lat, lng: sp.lng }))
    return (
        <Suspense fallback="loading your inbox...">
            <Map coord={coords}>
        </Suspense>
    )
}
```

**Alternative**: Add a `<Suspense>` boundary above the component accessing
params or searchParams

---

## Solution 5: Adjust Cache Lifetime for Short-Lived Caches

**Use Case**: `"use cache"` with very short `cacheLife()` that's too brief for
practical prerendering

### Benefits of Short-Lived Caches

- Client router cache can reuse entries in the browser
- Protects upstream APIs during high request traffic
- Non-zero caching time still provides value

### Before

```javascript
// app/page.js
import { cacheLife } from 'next/cache'

async function getDashboard() {
    "use cache"
    // 1 second cache: too short for server prerendering
    // Client router can reuse for up to 30 seconds unless manually refreshed
    cacheLife('seconds')
    return db.query(...)
}

export default async function Page() {
    const data = await getDashboard(token);
    return <Dashboard data={data}>
}
```

### After

```javascript
// app/page.js
import { cacheLife } from 'next/cache'

async function getDashboard() {
    "use cache"
    // 1 minute cache: long enough for Next.js to produce fully or partially prerendered page
    cacheLife('minutes')
    return db.query(...)
}

export default async function Page() {
    const data = await getDashboard(token);
    return <Dashboard data={data}>
}
```

**Alternative**: Add a `<Suspense>` boundary above the component accessing
short-lived cached data

---

## Summary: Decision Tree

```
Is the data request-specific (headers, cookies)?
├─ YES → Move API access deeper in component tree OR add Suspense boundary
└─ NO → Continue

Should data be cached and prerendered?
├─ YES → Use "use cache" with appropriate cacheLife()
└─ NO → Add Suspense boundary around component

Is cacheLife() too short for prerendering?
├─ YES → Increase cacheLife() to 'minutes' or longer OR add Suspense boundary
└─ NO → Implementation complete
```
