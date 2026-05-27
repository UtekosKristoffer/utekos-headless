// Path: src/app/api/tracking-events/route.ts

import { type NextRequest } from 'next/server'
import { adaptRequestToEventContext } from '@/lib/tracking/utils/adaptRequestToEventContext'
import { parseAndValidateEventPayload } from '@/lib/tracking/utils/parseAndValidateEventPayload'
import { createTrackingResponse } from '@/lib/tracking/utils/createTrackingResponse'
import { processBrowserEvent } from '@/lib/tracking/services/processBrowserEvent'
import { sendMetaBrowserEvent } from '@/lib/tracking/meta/sendMetaBrowserEvent'
import { sendGA4BrowserEvent } from '@/lib/tracking/google/sendGA4BrowserEvent'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'

export async function POST(request: NextRequest) {
  const validation = await parseAndValidateEventPayload(request)

  if (!validation.success) {
    return validation.errorResponse
  }

  const context = adaptRequestToEventContext(request)
  const result = await processBrowserEvent(
    validation.payload,
    context.cookies, // Send med de forbedrede cookiene som inneholder sikker epik
    { clientIp: context.clientIp, userAgent: context.userAgent },
    {
      sendMeta: sendMetaBrowserEvent,
      sendGoogle: sendGA4BrowserEvent,
      logger: logToAppLogs
    }
  )

  return createTrackingResponse(result)
}
