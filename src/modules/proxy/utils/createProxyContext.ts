// Path: src/modules/proxy/utils/createProxyContext.ts

import type { NextRequest } from 'next/server'
import type { ProxyContext } from '@/modules/proxy/types'
import { isBlockedUserAgent } from '@/modules/proxy/guards/isBlockedUserAgent'

export function createProxyContext(request: NextRequest): ProxyContext {
  const userAgent = request.headers.get('user-agent') || ''
  const url = request.nextUrl
  const pathname = url.pathname

  return {
    userAgent,
    referer: request.headers.get('referer') || '',
    url,
    pathname,
    isProduction: process.env.NODE_ENV === 'production',
    isTargetRoute:
      !pathname.startsWith('/_next') && !pathname.startsWith('/api/internal'),
    isBlockedAgent: isBlockedUserAgent(userAgent)
  }
}
