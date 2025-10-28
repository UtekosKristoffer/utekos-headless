# NextRequest

@doc-version: 16.0.0

NextRequest extends the
[Web Request API](https://developer.mozilla.org/docs/Web/API/Request) with
additional convenience methods.

## `cookies`

Read or mutate the
[`Set-Cookie`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie)
header of the request.

### `set(name, value)`

Given a name, set a cookie with the given value on the request.

```ts
// Given incoming request /home
// Set a cookie to hide the banner
// request will have a `Set-Cookie:show-banner=false;path=/home` header
request.cookies.set('show-banner', 'false')
```

### `get(name)`

Given a cookie name, return the value of the cookie. If the cookie is not found,
`undefined` is returned. If multiple cookies are found, the first one is
returned.

```ts
// Given incoming request /home
// { name: 'show-banner', value: 'false', Path: '/home' }
request.cookies.get('show-banner')
```

### `getAll()`

Given a cookie name, return the values of the cookie. If no name is given,
return all cookies on the request.

```ts
// Given incoming request /home
// [
//   { name: 'experiments', value: 'new-pricing-page', Path: '/home' },
//   { name: 'experiments', value: 'winter-launch', Path: '/home' },
// ]
request.cookies.getAll('experiments')
// Alternatively, get all cookies for the request
request.cookies.getAll()
```

### `delete(name)`

Given a cookie name, delete the cookie from the request.

```ts
// Returns true for deleted, false is nothing is deleted
request.cookies.delete('experiments')
```

### `has(name)`

Given a cookie name, return `true` if the cookie exists on the request.

```ts
// Returns true if cookie exists, false if it does not
request.cookies.has('experiments')
```

### `clear()`

Remove the `Set-Cookie` header from the request.

```ts
request.cookies.clear()
```

## `nextUrl`

Extends the native [`URL`](https://developer.mozilla.org/docs/Web/API/URL) API
with additional convenience methods, including Next.js specific properties.

```ts
// Given a request to /home, pathname is /home
request.nextUrl.pathname
// Given a request to /home?name=lee, searchParams is { 'name': 'lee' }
request.nextUrl.searchParams
```

The following options are available:

| Property       | Type     | Description                                                                            |
| -------------- | -------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `basePath`     | `string` | The [base path](/docs/app/api-reference/config/next-config-js/basePath.md) of the URL. |
| `buildId`      | `string` | `undefined`                                                                            | The build identifier of the Next.js application. Can be [customized](/docs/app/api-reference/config/next-config-js/generateBuildId.md). |
| `pathname`     | `string` | The pathname of the URL.                                                               |
| `searchParams` | `Object` | The search parameters of the URL.                                                      |

> **Note:** The internationalization properties from the Pages Router are not
> available for usage in the App Router. Learn more about
> [internationalization with the App Router](/docs/app/guides/internationalization.md).

## Version History

| Version   | Changes                 |
| --------- | ----------------------- |
| `v15.0.0` | `ip` and `geo` removed. |

# NextResponse

@doc-version: 16.0.0

NextResponse extends the
[Web Response API](https://developer.mozilla.org/docs/Web/API/Response) with
additional convenience methods.

## `cookies`

Read or mutate the
[`Set-Cookie`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie)
header of the response.

### `set(name, value)`

Given a name, set a cookie with the given value on the response.

```ts
// Given incoming request /home
let response = NextResponse.next()
// Set a cookie to hide the banner
response.cookies.set('show-banner', 'false')
// Response will have a `Set-Cookie:show-banner=false;path=/home` header
return response
```

### `get(name)`

Given a cookie name, return the value of the cookie. If the cookie is not found,
`undefined` is returned. If multiple cookies are found, the first one is
returned.

```ts
// Given incoming request /home
let response = NextResponse.next()
// { name: 'show-banner', value: 'false', Path: '/home' }
response.cookies.get('show-banner')
```

### `getAll()`

Given a cookie name, return the values of the cookie. If no name is given,
return all cookies on the response.

```ts
// Given incoming request /home
let response = NextResponse.next()
// [
//   { name: 'experiments', value: 'new-pricing-page', Path: '/home' },
//   { name: 'experiments', value: 'winter-launch', Path: '/home' },
// ]
response.cookies.getAll('experiments')
// Alternatively, get all cookies for the response
response.cookies.getAll()
```

### `delete(name)`

Given a cookie name, delete the cookie from the response.

```ts
// Given incoming request /home
let response = NextResponse.next()
// Returns true for deleted, false if nothing is deleted
response.cookies.delete('experiments')
```

## `json()`

Produce a response with the given JSON body.

```ts filename="app/api/route.ts" switcher
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
}
```

```js filename="app/api/route.js" switcher
import { NextResponse } from 'next/server'

export async function GET(request) {
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
}
```

## `redirect()`

Produce a response that redirects to a
[URL](https://developer.mozilla.org/docs/Web/API/URL).

```ts
import { NextResponse } from 'next/server'

return NextResponse.redirect(new URL('/new', request.url))
```

The [URL](https://developer.mozilla.org/docs/Web/API/URL) can be created and
modified before being used in the `NextResponse.redirect()` method. For example,
you can use the `request.nextUrl` property to get the current URL, and then
modify it to redirect to a different URL.

```ts
import { NextResponse } from 'next/server'

// Given an incoming request...
const loginUrl = new URL('/login', request.url)
// Add ?from=/incoming-url to the /login URL
loginUrl.searchParams.set('from', request.nextUrl.pathname)
// And redirect to the new URL
return NextResponse.redirect(loginUrl)
```

## `rewrite()`

Produce a response that rewrites (proxies) the given
[URL](https://developer.mozilla.org/docs/Web/API/URL) while preserving the
original URL.

```ts
import { NextResponse } from 'next/server'

// Incoming request: /about, browser shows /about
// Rewritten request: /proxy, browser shows /about
return NextResponse.rewrite(new URL('/proxy', request.url))
```

## `next()`

The `next()` method is useful for Proxy, as it allows you to return early and
continue routing.

```ts
import { NextResponse } from 'next/server'

return NextResponse.next()
```

You can also forward `headers` upstream when producing the response, using
`NextResponse.next({ request: { headers } })`:

```ts
import { NextResponse } from 'next/server'

// Given an incoming request...
const newHeaders = new Headers(request.headers)
// Add a new header
newHeaders.set('x-version', '123')
// Forward the modified request headers upstream
return NextResponse.next({
  request: {
    // New request headers
    headers: newHeaders
  }
})
```

This forwards `newHeaders` upstream to the target page, route, or server action,
and does not expose them to the client. While this pattern is useful for passing
data upstream, it should be used with caution because the headers containing
this data may be forwarded to external services.

In contrast, `NextResponse.next({ headers })` is a shorthand for sending headers
from proxy to the client. This is **NOT** good practice and should be avoided.
Among other reasons because setting response headers like `Content-Type`, can
override framework expectations (for example, the `Content-Type` used by Server
Actions), leading to failed submissions or broken streaming responses.

```ts
import { type NextRequest, NextResponse } from 'next/server'

async function proxy(request: NextRequest) {
  const headers = await injectAuth(request.headers)
  // DO NOT forward headers like this
  return NextResponse.next({ headers })
}
```

In general, avoid copying all incoming request headers because doing so can leak
sensitive data to clients or upstream services.

Prefer a defensive approach by creating a subset of incoming request headers
using an allow-list. For example, you might discard custom `x-*` headers and
only forward known-safe headers:

```ts
import { type NextRequest, NextResponse } from 'next/server'

function proxy(request: NextRequest) {
  const incoming = new Headers(request.headers)
  const forwarded = new Headers()

  for (const [name, value] of incoming) {
    const headerName = name.toLowerCase()
    // Keep only known-safe headers, discard custom x-* and other sensitive ones
    if (
      !headerName.startsWith('x-')
      && headerName !== 'authorization'
      && headerName !== 'cookie'
    ) {
      // Preserve original header name casing
      forwarded.set(name, value)
    }
  }

  return NextResponse.next({
    request: {
      headers: forwarded
    }
  })
}
```

I din // app/api/meta/capi/purchase/route.ts

Property 'ip' does not exist on type 'NextRequest'.ts(2339)

her:

const ua = req.headers.get('user-agent') ?? ''

const ip =

    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? req.ip ?? ''

const cookies = req.headers.get('cookie') ?? ''

const fbp = /^|;\s\*\_fbp=([^;]+)/.exec(cookies)?.[1] ?? undefined

const fbc = /^|;\s\*\_fbc=([^;]+)/.exec(cookies)?.[1] ?? undefined

## Typen:

```ts
import type { I18NConfig } from '../../config-shared'

import { NextURL } from '../next-url'

import { RequestCookies } from './cookies'

export declare const INTERNALS: unique symbol

/**

 * This class extends the [Web `Request` API](https://developer.mozilla.org/docs/Web/API/Request) with additional convenience methods.

 *

 * Read more: [Next.js Docs: `NextRequest`](https://nextjs.org/docs/app/api-reference/functions/next-request)

 */

export declare class NextRequest extends Request {
  constructor(input: URL | RequestInfo, init?: RequestInit)

  get cookies(): RequestCookies

  get nextUrl(): NextURL

  /**

     * @deprecated

     * `page` has been deprecated in favour of `URLPattern`.

     * Read more: https://nextjs.org/docs/messages/middleware-request-page

     */

  get page(): void

  /**

     * @deprecated

     * `ua` has been removed in favour of \`userAgent\` function.

     * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent

     */

  get ua(): void

  get url(): string
}

export interface RequestInit extends globalThis.RequestInit {
  nextConfig?: {
    basePath?: string

    i18n?: I18NConfig | null

    trailingSlash?: boolean
  }

  signal?: AbortSignal

  duplex?: 'half'
}
```

```ts
import type { I18NConfig } from '../../config-shared'
import { NextURL } from '../next-url'
import { ResponseCookies } from './cookies'
declare const INTERNALS: unique symbol
/**
 * This class extends the [Web `Response` API](https://developer.mozilla.org/docs/Web/API/Response) with additional convenience methods.
 *
 * Read more: [Next.js Docs: `NextResponse`](https://nextjs.org/docs/app/api-reference/functions/next-response)
 */
export declare class NextResponse<Body = unknown> extends Response {
  [INTERNALS]: {
    cookies: ResponseCookies
    url?: NextURL
    body?: Body
  }
  constructor(body?: BodyInit | null, init?: ResponseInit)
  get cookies(): ResponseCookies
  static json<JsonBody>(
    body: JsonBody,
    init?: ResponseInit
  ): NextResponse<JsonBody>
  static redirect(
    url: string | NextURL | URL,
    init?: number | ResponseInit
  ): NextResponse<unknown>
  static rewrite(
    destination: string | NextURL | URL,
    init?: MiddlewareResponseInit
  ): NextResponse<unknown>
  static next(init?: MiddlewareResponseInit): NextResponse<unknown>
}
interface ResponseInit extends globalThis.ResponseInit {
  nextConfig?: {
    basePath?: string
    i18n?: I18NConfig
    trailingSlash?: boolean
  }
  url?: string
}
interface ModifiedRequest {
  /**
   * If this is set, the request headers will be overridden with this value.
   */
  headers?: Headers
}
interface MiddlewareResponseInit extends globalThis.ResponseInit {
  /**
   * These fields will override the request from clients.
   */
  request?: ModifiedRequest
}
export {}
```
