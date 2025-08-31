## Prefetching with TanStack Query v5 in Next.js 15.5

It starts by creating a QueryClient with a non‑zero staleTime (e.g. sixty seconds) to prevent immediate refetches

- Because QueryClientProvider uses context, you wrap your app in a client component (Providers) that calls getQueryClient() to create a fresh client on the server and reuse one in the browser
- In server components call queryClient.prefetchQuery with your query options to fetch data ahead of time; for infinite queries you can fetch more than the first page by passing a pages option

- Prefetch functions return void and honour the client's default staleTime unless overridden. After prefetching you dehydrate the client and pass its state to a HydrationBoundary. Inside this boundary, client components call useSuspenseQuery or useQuery to read the prefetched data synchronously

- This pattern ensures the initial render is populated from the cache, network requests are deduplicated and further mutations keep the data fresh.

## XState v5

XState v5 modernises the API and changes default behaviours. Machines are created with createMachine and interpreted with createActor; the old Machine and interpret names are gone . Events are now strict objects: you call actor.send({type:'someEvent'}) instead of sending strings . To attach extra data, nest properties under a params field; the library passes this object as the second argument to action and guard functions . All transitions are internal by default; if you need a state to re‑enter like in v4, set reenter:true on the transition or timer . Invoked actors are declared via logic creators and receive context via invoke.input; the old invoke.data field is removed . Final states produce values through a top‑level output property rather than a data field . In the React adapter, the useActor hook accepts actor logic instead of actor instances; to interact with an existing actor, call actor.send and useSelector to read its state

## TanStack Query v5 introduces enhancements that simplify server-state management in React and Next.js.

The new optimistic update pattern no longer forces to write provisional data into the cache; instead the mutation variables are exposed so one can render pending items while the request runs, giving a simpler optimistic UI. Infinite queries can prefetch multiple pages via a pages option when prefetching, loading more than the first page and improving scroll-based lists. The combine option for useQueries merges results from several queries into a single object and memoises it for referential stability, removing the need for manual memo hooks and separate loops. Dedicated useSuspenseQuery and useSuspenseInfiniteQuery hooks replace the suspense:true flag; they deliver fully defined types and stable suspense behaviour without dealing with undefined data. Other changes include type-safe object-based signatures for query options and an optional maxPages setting for infinite queries; together these features make data fetching more predictable and easier to maintain.

## Managing server state in Next.js 15.5 is simpler with TanStack Query

Managing server state in Next.js 15.5 is simpler with TanStack Query handling caching, background updates and errors. A central QueryClient stores results by key and only refetches when data becomes stale or invalidated

- This deduplicates network calls and refreshes cached data. Mutations support optimistic UI by showing pending variables and invalidating queries when complete

- Because queries live outside component state they persist across navigation and reduce rerenders. On the server you prefetch data and dehydrate the client; on the client useQuery or useSuspenseQuery wraps loading, error and success states and rehydrates the cache automatically

- This pattern fits SSR and Suspense: fallback UI renders while a fetch is pending and resolved data streams to the client without blocking other components. The result is a predictable approach to server state that scales from simple fetches to complex invalidation without bespoke state management.

## How to implement Advanced SSR leverages React’s streaming and TanStack Query’s hydration:

- Wrap the component tree with QueryClientProvider and ReactQueryStreamedHydration so server‑prefetched queries stream to the client. A new QueryClient is created for each server request with a staleTime so that prefetched data stays fresh when hydrated

- Layouts wrap children in Providers; pages can call useSuspenseQuery inside Suspense boundaries to concurrently fetch data. In streaming examples multiple wait queries with different delays are wrapped in independent Suspense fallbacks or grouped under a single fallback to control partial rendering. ReactQueryStreamedHydration streams cached results and resolves each Suspense boundary as soon as its data is ready, letting parts of the page display while others still load

- Now we reduce time‑to‑first‑byte and avoid blocking the render pipeline. The pattern works with both Node and Edge runtimes and integrates with our Next caching and prefetching mechanisms.

## QueryClient

- QueryClient is the heart of TanStack Query in a Next.js 15.5 project.
- You create it with sensible defaults, such as a staleTime to stop SSR‑prefetched data from refetching immediately. Wrap your app in a client‑side QueryClientProvider so that useQuery hooks can read and write to the cache.
- On the server call queryClient.prefetchQuery to populate the cache; fetchQuery also populates it but returns data and throws on error, making it suitable for loaders. QueryClient exposes getQueryData and setQueryData for reading and updating cache entries, and invalidateQueries or refetchQueries to mark data as stale or refetch it.
- For advanced scenarios it also offers getQueryCache and getMutationCache for low‑level access to caches. To avoid stale data and issues when React suspends, create a new QueryClient per request on the server and reuse a singleton in the browser.
- This pattern centralises caching and enables retries, background refetching and error boundaries with minimal code.

React 19 introduces new primitives for handling async actions and forms. useActionState wraps an async function and returns a tuple of the last result or error, a wrapped action to pass to a form’s action attribute, and a boolean indicating whether a submission is pending
react.dev
. When a form using this action submits, the work runs inside a transition and the hook updates its pending state automatically
react.dev
. useFormStatus complements it by exposing the parent form’s pending state so child components like buttons can disable themselves
react.dev
. React also adds use(), which lets you read a promise during render; you can await a fetch on the server and later call use() on the same promise in the client to resume it
react.dev
. These hooks remove much of the boilerplate around loading and error states. useTransition remains relevant for non‑form interactions where you need manual control over pending state
react.dev
. Together the changes make form submissions more declarative and highlight the distinction between UI updates and background tasks.

Next.js 15.5 provides fine‑grained cache control through the Data Cache and on‑demand revalidation. Server‑side fetch calls are not cached unless you specify cache:'force-cache' or a next.revalidate value, which caches the response and revalidates after the given seconds
nextjs.org
. For expensive functions use unstable_cache with tags and revalidate options to store the result in the Data Cache and control invalidation
nextjs.org
. To group cache entries, add a tag to a fetch request via next:{tags:['posts']}; after a mutation call the server‑only revalidateTag('posts') to mark all entries with that tag as stale
nextjs.org
. Tags must be case‑sensitive strings shorter than 256 characters; revalidation occurs the next time a page using that tag is requested
nextjs.org
. For single pages you can use revalidatePath; tags are better when multiple pages share the same data
nextjs.org
. This system lets you combine time‑based revalidation and precise invalidation to keep cached data fresh while maintaining performance.


