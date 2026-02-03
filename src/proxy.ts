import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { hashEmail } from './lib/tracking/hash/hashEmail'
import { formatFbcCookie } from './lib/tracking/proxy/formatFbcCookie'
import { extractMarketingParams } from './lib/tracking/proxy/extractMarketingParams'
import { buildCookieConfigs } from './lib/tracking/proxy/buildCookieConfigs'
import { formatCookieHeader } from './lib/tracking/proxy/formatCookieHeader'
import { handleMarketingParams } from './lib/tracking/proxy/handleMarketingParams'
import { BLOCKED_USER_AGENTS } from '@/api/constants/monitoring'

export async function proxy(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || ''
  const referer = request.headers.get('referer') || ''

  const isBlockedAgent = BLOCKED_USER_AGENTS.some(agent =>
    userAgent.includes(agent)
  )

  if (isBlockedAgent) {
    return new NextResponse(null, { status: 403, statusText: 'Forbidden' })
  }

  const url = new URL(request.url)
  const pathname = url.pathname
  const isTargetRoute =
    !pathname.startsWith('/_next') && !pathname.startsWith('/api/internal')

  if (!isTargetRoute) {
    return NextResponse.next()
  }

  const response = NextResponse.next()

  const scCid = url.searchParams.get('ScCid')
  if (scCid) {
    response.cookies.set('ute_sc_cid', scCid, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 2592000
    })

    try {
      await fetch(new URL('/api/log', request.url), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Referer': referer,
          'User-Agent': userAgent
        },
        body: JSON.stringify({
          level: 'INFO',
          event: '👻 Snapchat Ad Click Detected',
          context: {
            scCid,
            path: pathname,
            source: 'proxy-middleware'
          }
        })
      })
    } catch (err) {
      console.error('Failed to send Snap log:', err)
    }
  }

  const fbclid = url.searchParams.get('fbclid')
  if (fbclid) {
    try {
      await fetch(new URL('/api/log', request.url), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Referer': referer,
          'User-Agent': userAgent
        },
        body: JSON.stringify({
          level: 'INFO',
          event: '💙 Meta Ad Click Detected',
          context: {
            fbclid,
            path: pathname,
            source: 'proxy-middleware'
          }
        })
      })
    } catch (err) {
      console.error('Failed to send Meta log:', err)
    }
  }

  const epik = url.searchParams.get('epik')
  if (epik) {
    response.cookies.set('_epik', epik, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 2592000
    })

    try {
      await fetch(new URL('/api/log', request.url), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Referer': referer,
          'User-Agent': userAgent
        },
        body: JSON.stringify({
          level: 'INFO',
          event: '📌 Pinterest Ad Click Detected',
          context: {
            epik,
            path: pathname,
            source: 'proxy-middleware'
          }
        })
      })
    } catch (err) {
      console.error('Failed to send Pinterest log:', err)
    }
  }

  const ttclid = url.searchParams.get('ttclid')
  if (ttclid) {
    response.cookies.set('ute_ttclid', ttclid, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 2592000
    })

    try {
      await fetch(new URL('/api/log', request.url), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Referer': referer,
          'User-Agent': userAgent
        },
        body: JSON.stringify({
          level: 'INFO',
          event: '🎵 TikTok Ad Click Detected',
          context: {
            ttclid,
            path: pathname,
            source: 'proxy-middleware'
          }
        })
      })
    } catch (err) {
      console.error('Failed to send TikTok log:', err)
    }
  }

  return handleMarketingParams(request, response)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|videos|apple-icon|icon|manifest).*)'
  ]
}

export {
  handleMarketingParams,
  extractMarketingParams,
  buildCookieConfigs,
  formatCookieHeader,
  hashEmail,
  formatFbcCookie
}
