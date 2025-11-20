// Path: src/proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next()
  const fbclid = request.nextUrl.searchParams.get('fbclid')

  if (!fbclid) {
    return response
  }

  const existingFbc = request.cookies.get('_fbc')?.value

  if (existingFbc) {
    const parts = existingFbc.split('.')
    const existingFbclid = parts.length > 0 ? parts[parts.length - 1] : null

    if (existingFbclid === fbclid) {
      return response
    }
  }

  const version = 'fb'
  const subdomainIndex = 1
  const creationTime = Date.now()

  const formattedFbc = `${version}.${subdomainIndex}.${creationTime}.${fbclid}`
  response.cookies.set({
    name: '_fbc',
    value: formattedFbc,
    path: '/',
    maxAge: 60 * 60 * 24 * 90,
    sameSite: 'lax',
    secure: true,
    httpOnly: false
  })

  return response
}
