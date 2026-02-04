import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { dispatchLog } from '@/lib/middleware/utils/dispatchLog'
import type { MiddlewareActionPlan, MiddlewareContext } from '@types'

export async function executeMiddlewareActions(
  request: NextRequest,
  response: NextResponse,
  plan: MiddlewareActionPlan,
  context: MiddlewareContext
): Promise<void> {
  for (const cookie of plan.cookiesToSet) {
    response.cookies.set(cookie.name, cookie.value, cookie.options)
  }

  const logPromises = plan.logsToDispatch.map(logData =>
    dispatchLog(request, logData, context.userAgent, context.referer)
  )

  if (logPromises.length > 0) {
    await Promise.all(logPromises)
  }
}
