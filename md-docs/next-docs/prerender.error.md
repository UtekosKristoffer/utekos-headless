# Prerender Error with Next.js

## Overview

This error occurs during `next build` when prerendering a page fails.
Understanding and resolving this error is critical for successful static site
generation.

---

## Common Causes

The prerender error can occur due to:

1. **Incorrect file structure** - Non-page files in the `pages/` directory
   (Pages Router)
2. **Missing props** - Expecting props that are unavailable during prerendering
3. **Browser-only APIs** - Using browser APIs without proper checks in
   components
4. **Configuration errors** - Incorrect setup in `getStaticProps` or
   `getStaticPaths`

---

## Solutions

### 1. File Structure and Colocation

#### Pages Router (Legacy)

**Restriction**: Only special files can generate pages. Components and styles
must be in separate directories.

**Correct structure:**

```
.
├── components/
│   └── Header.js
├── pages/
│   ├── about.js
│   └── index.js
└── styles/
    └── globals.css
```

#### App Router (Next.js 13+, Recommended)

**Advantage**: Allows colocation of pages and other files in the same folder for
better organization.

**Example structure:**

```
.
└── app/
    ├── about/
    │   └── page.tsx
    ├── blog/
    │   ├── page.tsx
    │   └── PostCard.tsx
    ├── layout.tsx
    └── page.tsx
```

---

### 2. Handle Undefined Props and Missing Data

#### Pages Router Implementation

Use conditional checks in `getStaticProps` to handle missing data:

```javascript
export async function getStaticProps(context) {
  const data = await fetchData(context.params.id)

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: { data }
  }
}
```

**Key principle**: Return `notFound: true` when data is unavailable to render a
404 page instead of causing a prerender error.

---

### 3. Handle Fallback in Dynamic Routes

When using `fallback: true` or `fallback: 'blocking'` in `getStaticPaths`, the
page component must handle loading states:

```javascript
import { useRouter } from 'next/router'

function Post({ post }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

**Key principle**: Always check `router.isFallback` to provide a loading state
while Next.js generates the page on-demand.

---

### 4. Avoid Exporting Pages with Server-Side Rendering

When using `next export` or `output: 'export'` in `next.config.js`:

**Restriction**: Cannot use `getServerSideProps` in any page.

**Solution**: Use `getStaticProps` with revalidation for data fetching:

```javascript
export async function getStaticProps() {
  const res = await fetch('https://api.vercel.app/blog')
  const data = await res.json()

  return {
    props: { data },
    revalidate: 60
  }
}
```

**Key principle**: Static export requires all pages to be prerenderable at build
time.

---

### 5. Disable SSR for Components Using Browser APIs

For components that rely on browser-only APIs (e.g., `window`, `document`):

```javascript
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/BrowserOnlyComponent'),
  { ssr: false }
)

export default function Page() {
  return (
    <div>
      <h1>My page</h1>
      <DynamicComponentWithNoSSR />
    </div>
  )
}
```

**Key principle**: Use `dynamic` import with `ssr: false` to prevent server-side
rendering of components that require browser APIs.

---

## Debugging Checklist

When encountering a prerender error:

1. ✅ Verify file structure matches router requirements (Pages vs App Router)
2. ✅ Check `getStaticProps` returns valid props or `notFound: true`
3. ✅ Confirm dynamic routes handle `router.isFallback` state
4. ✅ Ensure no `getServerSideProps` when using static export
5. ✅ Identify and disable SSR for browser-dependent components

---

## Related Documentation

- Next.js Pages Router: Data Fetching
- Next.js App Router: File Conventions
- Next.js Dynamic Import
- Next.js Static Export
