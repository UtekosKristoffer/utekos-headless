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
import { persistAcceptedTrackingEvent } from '@/lib/tracking/warehouse/persistAcceptedTrackingEvent'
import { recordProviderDispatchAttempt } from '@/lib/tracking/warehouse/recordProviderDispatchAttempt'
import { getRequestConsentState } from '@/lib/tracking/consent/getRequestConsentState'
import {
  USERCENTRICS_GOOGLE_ANALYTICS_SERVICE_NAME,
  USERCENTRICS_META_SERVICE_NAME
} from '@/components/cookie-consent/usercentricsConfig'

export async function POST(request: NextRequest) {
  const consent = getRequestConsentState(request)
  const providerConsent = {
    meta: consent.services[USERCENTRICS_META_SERVICE_NAME] === true,
    google: consent.services[USERCENTRICS_GOOGLE_ANALYTICS_SERVICE_NAME] === true
  }

  const validation = await parseAndValidateEventPayload(request)

  if (!validation.success) {
    return validation.errorResponse
  }

  const context = adaptRequestToEventContext(request)
  const processedRequest =
    providerConsent.meta ?
      processMetaParamBuilderRequest(request, context.clientIp)
    : {
        cookiesToSet: [],
        clientIp: context.clientIp,
        fbc: undefined,
        fbp: undefined
      }
  const payload =
    providerConsent.meta ?
      mergeMetaParamBuilderUserData(validation.payload, processedRequest)
    : {
        ...validation.payload,
        userData: undefined
      }
  const clientIp = processedRequest.clientIp ?? context.clientIp

  after(async () => {
    const [ledgerResult] = await Promise.allSettled([
      persistAcceptedTrackingEvent(payload, {
        ...consent,
        source: 'usercentrics'
      }, [
        ...(providerConsent.meta ? ['meta'] as const : []),
        ...(providerConsent.google ? ['google'] as const : [])
      ])
    ])

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
      },
      providerConsent
    )
  })

  const response = createAcceptedTrackingResponse(payload)

  if (providerConsent.meta) {
    setMetaParamBuilderCookies(response, processedRequest.cookiesToSet)
  }

  return response
}
