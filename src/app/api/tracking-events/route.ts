// Path: src/app/api/tracking-events/route.ts

import { after, type NextRequest } from 'next/server'
import { adaptRequestToEventContext } from '@/lib/tracking/utils/adaptRequestToEventContext'
import { parseAndValidateEventPayload } from '@/lib/tracking/utils/parseAndValidateEventPayload'
import { createAcceptedTrackingResponse } from '@/lib/tracking/utils/createAcceptedTrackingResponse'
import { processBrowserEvent } from '@/lib/tracking/services/processBrowserEvent'
import { sendMetaBrowserEvent } from '@/lib/tracking/meta/sendMetaBrowserEvent'
import { sendGA4BrowserEvent } from '@/lib/tracking/google/sendGA4BrowserEvent'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'
import { mergeMetaParamBuilderUserData } from '@/lib/tracking/meta/param-builder/mergeMetaParamBuilderUserData'
import { processMetaParamBuilderRequest } from '@/lib/tracking/meta/param-builder/processMetaParamBuilderRequest'
import { setMetaParamBuilderCookies } from '@/lib/tracking/meta/param-builder/setMetaParamBuilderCookies'
import { hasRequestMarketingConsent } from '@/lib/tracking/consent/hasRequestMarketingConsent'
import { createConsentDeniedTrackingResponse } from '@/lib/tracking/utils/createConsentDeniedTrackingResponse'
import { persistAcceptedTrackingEvent } from '@/lib/tracking/warehouse/persistAcceptedTrackingEvent'
import { recordProviderDispatchAttempt } from '@/lib/tracking/warehouse/recordProviderDispatchAttempt'

export async function POST(request: NextRequest) {
  if (!hasRequestMarketingConsent(request)) {
    return createConsentDeniedTrackingResponse()
  }

  const validation = await parseAndValidateEventPayload(request)

  if (!validation.success) {
    return validation.errorResponse
  }

  const context = adaptRequestToEventContext(request)
  const processedRequest = processMetaParamBuilderRequest(request, context.clientIp)
  const payload = mergeMetaParamBuilderUserData(validation.payload, processedRequest)
  const clientIp = processedRequest.clientIp ?? context.clientIp

  after(async () => {
    const [ledgerResult] = await Promise.allSettled([persistAcceptedTrackingEvent(payload)])

    if (ledgerResult.status === 'rejected') {
      await logToAppLogs(
        'ERROR',
        'Tracking event ledger persistence failed',
        {
          eventId: payload.eventId,
          eventName: payload.eventName,
          error: ledgerResult.reason instanceof Error ? ledgerResult.reason.message : 'Unknown database error'
        }
      )
    }

    await processBrowserEvent(
      payload,
      {
        ...context.cookies,
        fbc: processedRequest.fbc ?? context.cookies.fbc,
        fbp: processedRequest.fbp ?? context.cookies.fbp
      },
      { clientIp, userAgent: context.userAgent },
      {
        sendMeta: sendMetaBrowserEvent,
        sendGoogle: sendGA4BrowserEvent,
        logger: logToAppLogs,
        recordAttempt: recordProviderDispatchAttempt
      }
    )
  })

  const response = createAcceptedTrackingResponse(payload)
  setMetaParamBuilderCookies(response, processedRequest.cookiesToSet)

  return response
}
