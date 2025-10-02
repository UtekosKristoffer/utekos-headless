# route.js

Route Handlers lar deg lage egendefinerte forespørselshåndterere for en gitt
rute ved å bruke Web
[Request](https://developer.mozilla.org/docs/Web/API/Request) og
[Response](https://developer.mozilla.org/docs/Web/API/Response) API-er.

```ts filename="route.ts" switcher
export async function GET() {
  return Response.json({ message: 'Hello World' })
}
```

```js filename="route.js" switcher
export async function GET() {
  return Response.json({ message: 'Hello World' })
}
```

## Referanse

### HTTP-metoder

En **route**-fil lar deg lage egendefinerte forespørselshåndterere for en gitt
rute. Følgende
[HTTP-metoder](https://developer.mozilla.org/docs/Web/HTTP/Methods) støttes:
`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD` og `OPTIONS`.

```ts filename="route.ts" switcher
export async function GET(request: Request) {}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// Hvis `OPTIONS` ikke er definert, vil Next.js automatisk implementere `OPTIONS` og sette riktig Response `Allow`-header avhengig av de andre metodene som er definert i Route Handler.
export async function OPTIONS(request: Request) {}
```

```js filename="route.js" switcher
export async function GET(request) {}

export async function HEAD(request) {}

export async function POST(request) {}

export async function PUT(request) {}

export async function DELETE(request) {}

export async function PATCH(request) {}

// Hvis `OPTIONS` ikke er definert, vil Next.js automatisk implementere `OPTIONS` og sette riktig Response `Allow`-header avhengig av de andre metodene som er definert i Route Handler.
export async function OPTIONS(request) {}
```

### Parametre

#### `request` (valgfritt)

`request`-objektet er et
[NextRequest](/docs/app/api-reference/functions/next-request.md)-objekt, som er
en utvidelse av Web
[Request](https://developer.mozilla.org/docs/Web/API/Request) API-et.
`NextRequest` gir deg ytterligere kontroll over den innkommende forespørselen,
inkludert enkel tilgang til `cookies` og et utvidet, parsede URL-objekt
`nextUrl`.

```ts filename="route.ts" switcher
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl
}
```

```js filename="route.js" switcher
export async function GET(request) {
  const url = request.nextUrl
}
```

#### `context` (valgfritt)

- **`params`**: et promise som løser til et objekt som inneholder
  [dynamiske ruteparametre](/docs/app/api-reference/file-conventions/dynamic-routes.md)
  for den aktuelle ruten.

```ts filename="app/dashboard/[team]/route.ts" switcher
export async function GET(
  request: Request,
  { params }: { params: Promise<{ team: string }> }
) {
  const { team } = await params
}
```

```js filename="app/dashboard/[team]/route.js" switcher
export async function GET(request, { params }) {
  const { team } = await params
}
```

| Eksempel                         | URL            | `params`                           |
| -------------------------------- | -------------- | ---------------------------------- |
| `app/dashboard/[team]/route.js`  | `/dashboard/1` | `Promise<{ team: '1' }>`           |
| `app/shop/[tag]/[item]/route.js` | `/shop/1/2`    | `Promise<{ tag: '1', item: '2' }>` |
| `app/blog/[...slug]/route.js`    | `/blog/1/2`    | `Promise<{ slug: ['1', '2'] }>`    |

### Route Context Helper

Du kan type Route Handler-konteksten med `RouteContext` for å få sterkt typede
`params` fra en rute-literal. `RouteContext` er en global tilgjengelig hjelper.

```ts filename="app/users/[id]/route.ts" switcher
import type { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, ctx: RouteContext<'/users/[id]'>) {
  const { id } = await ctx.params
  return Response.json({ id })
}
```

> **Nyttig å vite**
>
> - Typer genereres under `next dev`, `next build` eller `next typegen`.

## Eksempler

### Cookies

Du kan lese eller sette cookies med
[`cookies`](/docs/app/api-reference/functions/cookies.md) fra `next/headers`.

```ts filename="route.ts" switcher
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()

  const a = cookieStore.get('a')
  const b = cookieStore.set('b', '1')
  const c = cookieStore.delete('c')
}
```

```js filename="route.js" switcher
import { cookies } from 'next/headers'

export async function GET(request) {
  const cookieStore = await cookies()

  const a = cookieStore.get('a')
  const b = cookieStore.set('b', '1')
  const c = cookieStore.delete('c')
}
```

Alternativt kan du returnere et nytt `Response`-objekt ved å bruke
[`Set-Cookie`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie)-headeren.

```ts filename="app/api/route.ts" switcher
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `token=${token.value}` }
  })
}
```

```js filename="app/api/route.js" switcher
import { cookies } from 'next/headers'

export async function GET(request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `token=${token.value}` }
  })
}
```

Du kan også bruke de underliggende Web API-ene for å lese cookies fra
forespørselen
([`NextRequest`](/docs/app/api-reference/functions/next-request.md)):

```ts filename="app/api/route.ts" switcher
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')
}
```

```js filename="app/api/route.js" switcher
export async function GET(request) {
  const token = request.cookies.get('token')
}
```

### Headers

Du kan lese headers med
[`headers`](/docs/app/api-reference/functions/headers.md) fra `next/headers`.

```ts filename="route.ts" switcher
import { headers } from 'next/headers'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const headersList = await headers()
  const referer = headersList.get('referer')
}
```

```js filename="route.js" switcher
import { headers } from 'next/headers'

export async function GET(request) {
  const headersList = await headers()
  const referer = headersList.get('referer')
}
```

Denne `headers`-instansen er skrivebeskyttet. For å sette headers må du
returnere et nytt `Response`-objekt med nye `headers`.

```ts filename="app/api/route.ts" switcher
import { headers } from 'next/headers'

export async function GET(request: Request) {
  const headersList = await headers()
  const referer = headersList.get('referer')

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { referer: referer }
  })
}
```

```js filename="app/api/route.js" switcher
import { headers } from 'next/headers'

export async function GET(request) {
  const headersList = await headers()
  const referer = headersList.get('referer')

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { referer: referer }
  })
}
```

Du kan også bruke de underliggende Web API-ene for å lese headers fra
forespørselen
([`NextRequest`](/docs/app/api-reference/functions/next-request.md)):

```ts filename="app/api/route.ts" switcher
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
}
```

```js filename="app/api/route.js" switcher
export async function GET(request) {
  const requestHeaders = new Headers(request.headers)
}
```

### Revalidere cachet data

Du kan
[revalidere cachet data](/docs/app/guides/incremental-static-regeneration.md)
ved å bruke `revalidate`-konfigurasjonsalternativet for rutesegment.

```ts filename="app/posts/route.ts" switcher
export const revalidate = 60

export async function GET() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()

  return Response.json(posts)
}
```

```js filename="app/posts/route.js" switcher
export const revalidate = 60

export async function GET() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()

  return Response.json(posts)
}
```

### Redirects

```ts filename="app/api/route.ts" switcher
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  redirect('https://nextjs.org/')
}
```

```js filename="app/api/route.js" switcher
import { redirect } from 'next/navigation'

export async function GET(request) {
  redirect('https://nextjs.org/')
}
```

### Dynamiske rutesegmenter

Route Handlers kan bruke
[dynamiske segmenter](/docs/app/api-reference/file-conventions/dynamic-routes.md)
for å lage forespørselshåndterere fra dynamiske data.

```ts filename="app/items/[slug]/route.ts" switcher
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params // 'a', 'b' eller 'c'
}
```

```js filename="app/items/[slug]/route.js" switcher
export async function GET(request, { params }) {
  const { slug } = await params // 'a', 'b' eller 'c'
}
```

| Rute                        | Eksempel-URL | `params`                 |
| --------------------------- | ------------ | ------------------------ |
| `app/items/[slug]/route.js` | `/items/a`   | `Promise<{ slug: 'a' }>` |
| `app/items/[slug]/route.js` | `/items/b`   | `Promise<{ slug: 'b' }>` |
| `app/items/[slug]/route.js` | `/items/c`   | `Promise<{ slug: 'c' }>` |

### URL Query-parametre

Forespørselsobjektet som sendes til Route Handler er en `NextRequest`-instans,
som inkluderer
[noen ekstra hjelpefunksjoner](/docs/app/api-reference/functions/next-request.md#nexturl),
for eksempel for enklere håndtering av query-parametre.

```ts filename="app/api/search/route.ts" switcher
import { type NextRequest } from 'next/server'

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  // query er "hello" for /api/search?query=hello
}
```

```js filename="app/api/search/route.js" switcher
export function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  // query er "hello" for /api/search?query=hello
}
```

### Streaming

Streaming brukes ofte sammen med Large Language Models (LLMs), som OpenAI, for
AI-generert innhold. Les mer om
[AI SDK](https://sdk.vercel.ai/docs/introduction).

```ts filename="app/api/chat/route.ts" switcher
import { openai } from '@ai-sdk/openai'
import { StreamingTextResponse, streamText } from 'ai'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = await streamText({
    model: openai('gpt-4-turbo'),
    messages
  })

  return new StreamingTextResponse(result.toAIStream())
}
```

```js filename="app/api/chat/route.js" switcher
import { openai } from '@ai-sdk/openai'
import { StreamingTextResponse, streamText } from 'ai'

export async function POST(req) {
  const { messages } = await req.json()
  const result = await streamText({
    model: openai('gpt-4-turbo'),
    messages
  })

  return new StreamingTextResponse(result.toAIStream())
}
```

Disse abstraksjonene bruker Web API-ene for å lage en stream. Du kan også bruke
de underliggende Web API-ene direkte.

```ts filename="app/api/route.ts" switcher
// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next()

      if (done) {
        controller.close()
      } else {
        controller.enqueue(value)
      }
    }
  })
}

function sleep(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

const encoder = new TextEncoder()

async function* makeIterator() {
  yield encoder.encode('<p>One</p>')
  await sleep(200)
  yield encoder.encode('<p>Two</p>')
  await sleep(200)
  yield encoder.encode('<p>Three</p>')
}

export async function GET() {
  const iterator = makeIterator()
  const stream = iteratorToStream(iterator)

  return new Response(stream)
}
```

```js filename="app/api/route.js" switcher
// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next()

      if (done) {
        controller.close()
      } else {
        controller.enqueue(value)
      }
    }
  })
}

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

const encoder = new TextEncoder()

async function* makeIterator() {
  yield encoder.encode('<p>One</p>')
  await sleep(200)
  yield encoder.encode('<p>Two</p>')
  await sleep(200)
  yield encoder.encode('<p>Three</p>')
}

export async function GET() {
  const iterator = makeIterator()
  const stream = iteratorToStream(iterator)

  return new Response(stream)
}
```

### Request Body

Du kan lese `Request`-body ved å bruke standard Web API-metoder:

```ts filename="app/items/route.ts" switcher
export async function POST(request: Request) {
  const res = await request.json()
  return Response.json({ res })
}
```

```js filename="app/items/route.js" switcher
export async function POST(request) {
  const res = await request.json()
  return Response.json({ res })
}
```

### Request Body FormData

Du kan lese `FormData` ved å bruke funksjonen `request.formData()`:

```ts filename="app/items/route.ts" switcher
export async function POST(request: Request) {
  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email')
  return Response.json({ name, email })
}
```

```js filename="app/items/route.js" switcher
export async function POST(request) {
  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email')
  return Response.json({ name, email })
}
```

Siden `formData`-data er strenger, kan du bruke
[`zod-form-data`](https://www.npmjs.com/zod-form-data) for å validere
forespørselen og hente data i ønsket format (f.eks. `number`).

### CORS

Du kan sette CORS-headere for en spesifikk Route Handler ved å bruke standard
Web API-metoder:

```ts filename="app/api/route.ts" switcher
export async function GET(request: Request) {
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  })
}
```

```js filename="app/api/route.js" switcher
export async function GET(request) {
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  })
}
```

> **Nyttig å vite**:
>
> - For å legge til CORS-headere til flere Route Handlers, kan du bruke
>   [Middleware](/docs/app/api-reference/file-conventions/middleware.md#cors)
>   eller
>   [`next.config.js`-filen](/docs/app/api-reference/config/next-config-js/headers.md#cors).
> - Alternativt, se vårt
>   [CORS-eksempel](https://github.com/vercel/examples/blob/main/edge-functions/cors/lib/cors.ts)-pakke.

### Webhooks

Du kan bruke en Route Handler for å motta webhooks fra tredjepartstjenester:

```ts filename="app/api/route.ts" switcher
export async function POST(request: Request) {
  try {
    const text = await request.text()
    // Prosesser webhook-payload
  } catch (error) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400
    })
  }

  return new Response('Success!', {
    status: 200
  })
}
```

```js filename="app/api/route.js" switcher
export async function POST(request) {
  try {
    const text = await request.text()
    // Prosesser webhook-payload
  } catch (error) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400
    })
  }

  return new Response('Success!', {
    status: 200
  })
}
```

Merk at, i motsetning til API Routes med Pages Router, trenger du ikke bruke
`bodyParser` eller annen ekstra konfigurasjon.

### Ikke-UI-responser

Du kan bruke Route Handlers til å returnere ikke-UI-innhold. Merk at
[`sitemap.xml`](/docs/app/api-reference/file-conventions/metadata/sitemap.md#generating-a-sitemap-using-code-js-ts),
[`robots.txt`](/docs/app/api-reference/file-conventions/metadata/robots.md#generate-a-robots-file),
[`app icons`](/docs/app/api-reference/file-conventions/metadata/app-icons.md#generate-icons-using-code-js-ts-tsx)
og
[open graph images](/docs/app/api-reference/file-conventions/metadata/opengraph-image.md)
har innebygd støtte.

```ts filename="app/rss.xml/route.ts" switcher
export async function GET() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">

<channel>
    <title>Next.js Documentation</title>
    <link>https://nextjs.org/docs</link>
    <description>The React Framework for the Web</description>
</channel>

</rss>`,
    {
      headers: {
        'Content-Type': 'text/xml'
      }
    }
  )
}
```

```js filename="app/rss.xml/route.js" switcher
export async function GET() {
  return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">

<channel>
    <title>Next.js Documentation</title>
    <link>https://nextjs.org/docs</link>
    <description>The React Framework for the Web</description>
</channel>

</rss>`)
}
```

### Segment-konfigurasjonsalternativer

Route Handlers bruker samme
[rutesegment-konfigurasjon](/docs/app/api-reference/file-conventions/route-segment-config.md)
som sider og layouts.

```ts filename="app/items/route.ts" switcher
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
```

```js filename="app/items/route.js" switcher
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
```

Se
[API-referansen](/docs/app/api-reference/file-conventions/route-segment-config.md)
for mer informasjon.

## Versjonshistorikk

| Versjon      | Endringer                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| `v15.0.0-RC` | `context.params` er nå et promise. En [codemod](/docs/app/guides/upgrading/codemods.md#150) er tilgjengelig |
| `v15.0.0-RC` | Standard caching for `GET`-handlers ble endret fra statisk til dynamisk                                     |
| `v13.2.0`    | Route Handlers ble introdusert.                                                                             |
