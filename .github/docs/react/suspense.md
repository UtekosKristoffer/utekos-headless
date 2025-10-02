# Suspense

## Overview

`<Suspense>` lets you display a fallback until its children have finished
loading.

```jsx
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>
```

---

## Reference

### Usage

- Displaying a fallback while content is loading
- Revealing content together at once
- Revealing nested content as it loads
- Showing stale content while fresh content is loading
- Preventing already revealed content from hiding
- Indicating that a Transition is happening
- Resetting Suspense boundaries on navigation
- Providing a fallback for server errors and client-only content

---

## Troubleshooting

- How do I prevent the UI from being replaced by a fallback during an update?

---

## API Reference

### `<Suspense>`

#### Props

- **children**: The actual UI you intend to render. If children suspends while
  rendering, the Suspense boundary will switch to rendering fallback.
- **fallback**: An alternate UI to render in place of the actual UI if it has
  not finished loading. Any valid React node is accepted, though in practice, a
  fallback is a lightweight placeholder view, such as a loading spinner or
  skeleton. Suspense will automatically switch to fallback when children
  suspends, and back to children when the data is ready. If fallback suspends
  while rendering, it will activate the closest parent Suspense boundary.

#### Caveats

- React does not preserve any state for renders that got suspended before they
  were able to mount for the first time. When the component has loaded, React
  will retry rendering the suspended tree from scratch.
- If Suspense was displaying content for the tree, but then it suspended again,
  the fallback will be shown again unless the update causing it was caused by
  `startTransition` or `useDeferredValue`.
- If React needs to hide the already visible content because it suspended again,
  it will clean up layout Effects in the content tree. When the content is ready
  to be shown again, React will fire the layout Effects again. This ensures that
  Effects measuring the DOM layout don’t try to do this while the content is
  hidden.
- React includes under-the-hood optimizations like Streaming Server Rendering
  and Selective Hydration that are integrated with Suspense. Read an
  architectural overview and watch a technical talk to learn more.

---

## Usage Examples

### Displaying a fallback while content is loading

You can wrap any part of your application with a Suspense boundary:

```jsx
<Suspense fallback={<Loading />}>
  <Albums />
</Suspense>
```

React will display your loading fallback until all the code and data needed by
the children has been loaded.

#### Example

**ArtistPage.js**

```jsx
import { Suspense } from 'react'
import Albums from './Albums.js'

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        <Albums artistId={artist.id} />
      </Suspense>
    </>
  )
}

function Loading() {
  return <h2>🌀 Loading...</h2>
}
```

**Albums.js**

```jsx
import { use } from 'react'
import { fetchData } from './data.js'

export default function Albums({ artistId }) {
  const albums = use(fetchData(`/${artistId}/albums`))
  return (
    <ul>
      {albums.map(album => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  )
}
```

> **Note:** Only Suspense-enabled data sources will activate the Suspense
> component. They include:
>
> - Data fetching with Suspense-enabled frameworks like Relay and Next.js
> - Lazy-loading component code with `lazy`
> - Reading the value of a cached Promise with `use`
>
> Suspense does not detect when data is fetched inside an Effect or event
> handler.

---

### Revealing content together at once

By default, the whole tree inside Suspense is treated as a single unit. For
example, even if only one of these components suspends waiting for some data,
all of them together will be replaced by the loading indicator:

```jsx
<Suspense fallback={<Loading />}>
  <Biography />
  <Panel>
    <Albums />
  </Panel>
</Suspense>
```

#### Example

**ArtistPage.js**

```jsx
import { Suspense } from 'react'
import Albums from './Albums.js'
import Biography from './Biography.js'
import Panel from './Panel.js'

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        <Biography artistId={artist.id} />
        <Panel>
          <Albums artistId={artist.id} />
        </Panel>
      </Suspense>
    </>
  )
}

function Loading() {
  return <h2>🌀 Loading...</h2>
}
```

**Panel.js**

```jsx
export default function Panel({ children }) {
  return <section className='panel'>{children}</section>
}
```

**Biography.js**

```jsx
import { use } from 'react'
import { fetchData } from './data.js'

export default function Biography({ artistId }) {
  const bio = use(fetchData(`/${artistId}/bio`))
  return (
    <section>
      <p className='bio'>{bio}</p>
    </section>
  )
}
```

**Albums.js**

```jsx
import { use } from 'react'
import { fetchData } from './data.js'

export default function Albums({ artistId }) {
  const albums = use(fetchData(`/${artistId}/albums`))
  return (
    <ul>
      {albums.map(album => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  )
}
```

---

### Revealing nested content as it loads

You can nest multiple Suspense components to create a loading sequence. Each
Suspense boundary’s fallback will be filled in as the next level of content
becomes available.

```jsx
<Suspense fallback={<BigSpinner />}>
  <Biography />
  <Suspense fallback={<AlbumsGlimmer />}>
    <Panel>
      <Albums />
    </Panel>
  </Suspense>
</Suspense>
```

#### Example

**ArtistPage.js**

```jsx
import { Suspense } from 'react'
import Albums from './Albums.js'
import Biography from './Biography.js'
import Panel from './Panel.js'

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<BigSpinner />}>
        <Biography artistId={artist.id} />
        <Suspense fallback={<AlbumsGlimmer />}>
          <Panel>
            <Albums artistId={artist.id} />
          </Panel>
        </Suspense>
      </Suspense>
    </>
  )
}

function BigSpinner() {
  return <h2>🌀 Loading...</h2>
}

function AlbumsGlimmer() {
  return (
    <div className='glimmer-panel'>
      <div className='glimmer-line' />
      <div className='glimmer-line' />
      <div className='glimmer-line' />
    </div>
  )
}
```

---

### Showing stale content while fresh content is loading

#### Example

```jsx
import { Suspense, useState } from 'react'
import SearchResults from './SearchResults.js'

export default function App() {
  const [query, setQuery] = useState('')
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={query} />
      </Suspense>
    </>
  )
}
```

**SearchResults.js**

```jsx
import { use } from 'react'
import { fetchData } from './data.js'

export default function SearchResults({ query }) {
  if (query === '') {
    return null
  }
  const albums = use(fetchData(`/search?q=${query}`))
  if (albums.length === 0) {
    return (
      <p>
        No matches for <i>"{query}"</i>
      </p>
    )
  }
  return (
    <ul>
      {albums.map(album => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  )
}
```

#### Using `useDeferredValue`

```jsx
export default function App() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  )
}
```

#### Visual indication for stale results

```jsx
<div
  style={{
    opacity: query !== deferredQuery ? 0.5 : 1
  }}
>
  <SearchResults query={deferredQuery} />
</div>
```

**App.js**

```jsx
import { Suspense, useState, useDeferredValue } from 'react'
import SearchResults from './SearchResults.js'

export default function App() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const isStale = query !== deferredQuery
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <div style={{ opacity: isStale ? 0.5 : 1 }}>
          <SearchResults query={deferredQuery} />
        </div>
      </Suspense>
    </>
  )
}
```

---

### Preventing already revealed content from hiding

#### Example

```jsx
import { Suspense, useState } from 'react'
import IndexPage from './IndexPage.js'
import ArtistPage from './ArtistPage.js'
import Layout from './Layout.js'

export default function App() {
  return (
    <Suspense fallback={<BigSpinner />}>
      <Router />
    </Suspense>
  )
}

function Router() {
  const [page, setPage] = useState('/')

  function navigate(url) {
    setPage(url)
  }

  let content
  if (page === '/') {
    content = <IndexPage navigate={navigate} />
  } else if (page === '/the-beatles') {
    content = (
      <ArtistPage
        artist={{
          id: 'the-beatles',
          name: 'The Beatles'
        }}
      />
    )
  }
  return <Layout>{content}</Layout>
}

function BigSpinner() {
  return <h2>🌀 Loading...</h2>
}
```

**Layout.js**

```jsx
export default function Layout({ children }) {
  return (
    <div className='layout'>
      <section className='header'>Music Browser</section>
      <main>{children}</main>
    </div>
  )
}
```

**IndexPage.js**

```jsx
export default function IndexPage({ navigate }) {
  return (
    <button onClick={() => navigate('/the-beatles')}>
      Open The Beatles artist page
    </button>
  )
}
```

**ArtistPage.js**

```jsx
import { Suspense } from 'react'
import Albums from './Albums.js'
import Biography from './Biography.js'
import Panel from './Panel.js'

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Biography artistId={artist.id} />
      <Suspense fallback={<AlbumsGlimmer />}>
        <Panel>
          <Albums artistId={artist.id} />
        </Panel>
      </Suspense>
    </>
  )
}

function AlbumsGlimmer() {
  return (
    <div className='glimmer-panel'>
      <div className='glimmer-line' />
      <div className='glimmer-line' />
      <div className='glimmer-line' />
    </div>
  )
}
```

#### Using `startTransition`

```jsx
function Router() {
  const [page, setPage] = useState('/')

  function navigate(url) {
    startTransition(() => {
      setPage(url)
    })
  }
  // ...
}
```

---

### Indicating that a Transition is happening

You can use `useTransition` to get a boolean `isPending` value and show an
indicator.

> Suspense-enabled routers are expected to wrap the navigation updates into
> Transitions by default.

---

### Resetting Suspense boundaries on navigation

You can express different content with a key:

```jsx
<ProfilePage key={queryParams.id} />
```

---

### Providing a fallback for server errors and client-only content

If you use one of the streaming server rendering APIs (or a framework that
relies on them), React will also use your `<Suspense>` boundaries to handle
errors on the server.

```jsx
;<Suspense fallback={<Loading />}>
  <Chat />
</Suspense>

function Chat() {
  if (typeof window === 'undefined') {
    throw Error('Chat should only render on the client.')
  }
  // ...
}
```

---

## Troubleshooting

### How do I prevent the UI from being replaced by a fallback during an update?

Replacing visible UI with a fallback creates a jarring user experience. This can
happen when an update causes a component to suspend, and the nearest Suspense
boundary is already showing content to the user.

To prevent this from happening, mark the update as non-urgent using
`startTransition`. During a Transition, React will wait until enough data has
loaded to prevent an unwanted fallback from appearing:

```jsx
function handleNextPageClick() {
  // If this update suspends, don't hide the already displayed content
  startTransition(() => {
    setCurrentPage(currentPage + 1)
  })
}
```

React will only prevent unwanted fallbacks during non-urgent updates. It will
not delay a render if it’s the result of an urgent update. You must opt in with
an API like `startTransition` or `useDeferredValue`.

If your router is integrated with Suspense, it should wrap its updates into
`startTransition` automatically.

---

## Navigation

- Previous: [StrictMode](./StrictMode.md)
