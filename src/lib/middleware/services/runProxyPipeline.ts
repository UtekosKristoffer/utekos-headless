import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { ProxyPipelineDependencies, MiddlewareContext } from '@types'

export async function runProxyPipeline(
  request: NextRequest,
  context: MiddlewareContext,
  deps: ProxyPipelineDependencies
): Promise<NextResponse> {
  // 1. Initialize Response
  const response = NextResponse.next()

  // 2. Logic: Analyze & Plan
  const interactions = deps.detectInteractions(context.url.searchParams)
  const plan = deps.planActions(interactions, context.isProduction)

  // 3. Effect: Apply Cookies (Sync)
  // Endrer respons-objektet før vi sender det videre
  deps.applyCookies(response, plan.cookiesToSet)

  // 4. Effect: Dispatch Logs (Async)
  // Vi venter på denne for å sikre at Edge-runtime ikke kutter requesten
  await deps.dispatchLogs(request, plan.logsToDispatch, {
    userAgent: context.userAgent,
    referer: context.referer
  })

  // 5. Chain: Hand over to next handler (Legacy)
  // Vi sender den modifiserte responsen inn i legacy-handleren
  return deps.legacyHandler(request, response)
}
