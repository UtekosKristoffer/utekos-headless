// Path: src/proxy.ts

```tsx
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createHash } from 'crypto'

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|videos).*)'
  ]
}

const BLOCKED_USER_AGENTS = [
  'python-httpx',
  'python-requests',
  'aiohttp', 
  'scrapy',
  'curl',
  'wget'
]

const SENSITIVE_PATHS_REGEX =
  /\.(env|git|config|aws|yml|yaml|sql|bak|backup|key|secret)|^\/admin/i

export function proxy(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || ''
  const { pathname } = request.nextUrl

  const isBlockedAgent = BLOCKED_USER_AGENTS.some(agent =>
    userAgent.includes(agent)
  )

  if (isBlockedAgent) {
    return new NextResponse(null, { status: 403, statusText: 'Forbidden' })
  }

  if (SENSITIVE_PATHS_REGEX.test(pathname)) {
    return new NextResponse(null, { status: 403, statusText: 'Forbidden' })
  }

  const response = NextResponse.next()
  const fbclid = request.nextUrl.searchParams.get('fbclid')
  const rawEmail = request.nextUrl.searchParams.get('user_email')

  if (rawEmail) {
    const hashedEmail = createHash('sha256')
      .update(rawEmail.trim().toLowerCase())
      .digest('hex')

    response.cookies.set({
      name: 'ute_user_hash',
      value: hashedEmail,
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: false
    })

    if (process.env.NODE_ENV === 'production') {
      console.log('[Proxy] Captured and hashed user_email from URL')
    }
  }

  if (fbclid) {
    if (process.env.NODE_ENV === 'production') {
      console.log(`[Proxy] Captured fbclid from URL: ${fbclid}`)
    }

    const existingFbc = request.cookies.get('_fbc')?.value

    let shouldUpdate = true
    if (existingFbc) {
      const parts = existingFbc.split('.')
      const existingFbclid = parts.length > 0 ? parts[parts.length - 1] : null

      if (existingFbclid === fbclid) {
        if (process.env.NODE_ENV === 'production') {
          console.log(
            '[Proxy] fbclid matches existing cookie. Skipping update.'
          )
        }
        shouldUpdate = false
      }
    }

    if (shouldUpdate) {
      const version = 'fb'
      const subdomainIndex = 1
      const creationTime = Date.now()
      const formattedFbc = `${version}.${subdomainIndex}.${creationTime}.${fbclid}`

      if (process.env.NODE_ENV === 'production') {
        console.log(`[Proxy] Setting new _fbc cookie: ${formattedFbc}`)
      }

      response.cookies.set({
        name: '_fbc',
        value: formattedFbc,
        path: '/',
        maxAge: 60 * 60 * 24 * 90,
        sameSite: 'lax',
        secure: true,
        httpOnly: false
      })
    }
  }

  return response
}
```