# Streaming with Server Components

## Overview

The Next.js app router automatically streams any part of the application that is
ready to be displayed to the browser as soon as possible, so finished content
can be displayed immediately without waiting for still pending content. It does
this along `<Suspense>` boundary lines. Note that if you create a file
`loading.tsx`, this automatically creates a `<Suspense>` boundary behind the
scenes.

## React Query Compatibility

With the prefetching patterns described above, React Query is perfectly
compatible with this form of streaming. As the data for each Suspense boundary
resolves, Next.js can render and stream the finished content to the browser.
This works even if you are using `useQuery` as outlined above because the
suspending actually happens when you await the prefetch.

As of React Query v5.40.0, you don't have to await all prefetches for this to
work, as pending Queries can also be dehydrated and sent to the client. This
lets you kick off prefetches as early as possible without letting them block an
entire Suspense boundary, and streams the data to the client as the query
finishes. This can be useful for example if you want to prefetch some content
that is only visible after some user interaction, or say if you want to await
and render the first page of an infinite query, but start prefetching page 2
without blocking rendering.

## Dehydrating Pending Queries

To make this work, we have to instruct the `queryClient` to also dehydrate
pending Queries. We can do this globally, or by passing that option directly to
`dehydrate`.

We will also need to move the `getQueryClient()` function out of our
`app/providers.tsx` file as we want to use it in our server component and our
client provider.

```typescript
// app/get-query-client.ts
import {
  isServer,
  QueryClient,
  defaultShouldDehydrateQuery
} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query)
          || query.state.status === 'pending',
        shouldRedactErrors: error => {
          // We should not catch Next.js server errors
          // as that's how Next.js detects dynamic pages
          // so we cannot redact them.
          // Next.js also automatically redacts errors for us
          // with better digests.
          return false
        }
      }
    }
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
```

> **Note:** This works in NextJs and Server Components because React can
> serialize Promises over the wire when you pass them down to Client Components.

## HydrationBoundary Usage

Then, all we need to do is provide a `HydrationBoundary`, but we don't need to
await prefetches anymore:

```typescript
// app/posts/page.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from './get-query-client'
import Posts from './posts'

// the function doesn't need to be `async` because we don't `await` anything
export default function PostsPage() {
    const queryClient = getQueryClient()

    // look ma, no await
    queryClient.prefetchQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Posts />
        </HydrationBoundary>
    )
}
```

## Client-side Query Usage

On the client, the Promise will be put into the QueryCache for us. That means we
can now call `useSuspenseQuery` inside the Posts component to "use" that Promise
(which was created on the Server):

```typescript
// app/posts/posts.tsx
'use client'

export default function Posts() {
  const { data } = useSuspenseQuery({ queryKey: ['posts'], queryFn: getPosts })

  // ...
}
```

Note that you could also `useQuery` instead of `useSuspenseQuery`, and the
Promise would still be picked up correctly. However, NextJs won't suspend in
that case and the component will render in the pending status, which also opts
out of server rendering the content.

## Serializing Non-JSON Data Types

If you're using non-JSON data types and serialize the query results on the
server, you can specify the `dehydrate.serializeData` and
`hydrate.deserializeData` options to serialize and deserialize the data on each
side of the boundary to ensure the data in the cache is the same format both on
the server and the client:

```typescript
// app/get-query-client.ts
import { QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query'
import { deserialize, serialize } from './transformer'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      // ...
      hydrate: {
        deserializeData: deserialize
      },
      dehydrate: {
        serializeData: serialize
      }
    }
  })
}
```

```typescript
// app/posts/page.tsx
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import { getQueryClient } from './get-query-client'
import { serialize } from './transformer'
import Posts from './posts'

export default function PostsPage() {
    const queryClient = getQueryClient()

    // look ma, no await
    queryClient.prefetchQuery({
        queryKey: ['posts'],
        queryFn: () => getPosts().then(serialize), // <-- serialize the data on the server
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Posts />
        </HydrationBoundary>
    )
}
```

```typescript
// app/posts/posts.tsx
'use client'

export default function Posts() {
  const { data } = useSuspenseQuery({ queryKey: ['posts'], queryFn: getPosts })

  // ...
}
```

Now, your `getPosts` function can return e.g. Temporal datetime objects and the
data will be serialized and deserialized on the client, assuming your
transformer can serialize and deserialize those data types.
