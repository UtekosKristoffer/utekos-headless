import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareContext } from '@/lib/middleware/utils/createMiddlewareContext'
import { detectAdInteractions } from '@/lib/middleware/services/detectAdInteractions'
import { planMiddlewareActions } from '@/lib/middleware/services/planMiddlewareActions'
import { applyResponseCookies } from '@/lib/middleware/infrastructure/applyResponseCookies'
import { dispatchAnalyticsLogs } from '@/lib/middleware/infrastructure/dispatchAnalyticsLogs'
import { runProxyPipeline } from '@/lib/middleware/services/runProxyPipeline'
import { handleMarketingParams } from './lib/tracking/proxy/handleMarketingParams'
import { extractMarketingParams } from './lib/tracking/proxy/extractMarketingParams'
import { buildCookieConfigs } from './lib/tracking/proxy/buildCookieConfigs'
import { formatCookieHeader } from './lib/tracking/proxy/formatCookieHeader'
import { hashEmail } from './lib/tracking/hash/hashEmail'
import { formatFbcCookie } from './lib/tracking/proxy/formatFbcCookie'

export async function proxy(request: NextRequest) {
  const context = createMiddlewareContext(request)
  if (context.isBlockedAgent) {
    return new NextResponse(null, { status: 403, statusText: 'Forbidden' })
  }
  if (context.pathname.startsWith('/sporing')) {
    const pathWithoutPrefix = context.pathname.replace(/^\/sporing/, '')

    const sgtmUrl = new URL(pathWithoutPrefix, 'https://sgtm.utekos.no')
    sgtmUrl.search = request.nextUrl.search

    return NextResponse.rewrite(sgtmUrl)
  }

  if (!context.isTargetRoute) {
    return NextResponse.next()
  }

  return runProxyPipeline(request, context, {
    detectInteractions: detectAdInteractions,
    planActions: planMiddlewareActions,
    applyCookies: applyResponseCookies,
    dispatchLogs: dispatchAnalyticsLogs,
    legacyHandler: async (req, res) => handleMarketingParams(req, res)
  })
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
