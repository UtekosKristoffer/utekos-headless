import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareContext } from '@/lib/middleware/utils/createMiddlewareContext'
import { detectAdInteractions } from '@/lib/middleware/services/detectAdInteractions'
import { planMiddlewareActions } from '@/lib/middleware/services/planMiddlewareActions'
import { executeMiddlewareActions } from '@/lib/middleware/infrastructure/executeMiddlewareActions'
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

  if (!context.isTargetRoute) {
    return NextResponse.next()
  }

  const response = NextResponse.next()

  const interactions = detectAdInteractions(context.url.searchParams)

  const actionPlan = planMiddlewareActions(interactions, context.isProduction)

  await executeMiddlewareActions(request, response, actionPlan, context)

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
