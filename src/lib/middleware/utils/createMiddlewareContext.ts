import type { NextRequest } from 'next/server'
import type { MiddlewareContext } from '@types'
export function createMiddlewareContext(
  request: NextRequest
): MiddlewareContext {
  const userAgent = request.headers.get('user-agent') || ''
  const url = request.nextUrl
  const pathname = url.pathname
  const {
    isBlockedUserAgent
  } = require('@/lib/middleware/guards/isBlockedUserAgent')

  return {
    userAgent,
    referer: request.headers.get('referer') || '',
    url,
    pathname,
    isProduction: process.env.NODE_ENV === 'production',
    // Sentraliser rute-logikken her
    isTargetRoute:
      !pathname.startsWith('/_next') && !pathname.startsWith('/api/internal'),
    isBlockedAgent: isBlockedUserAgent(userAgent)
  }
}
