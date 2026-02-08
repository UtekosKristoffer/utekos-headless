// Path: src/app/api/tracking-events/route.ts

import { type NextRequest } from 'next/server'
import { adaptRequestToEventContext } from '@/lib/tracking/utils/adaptRequestToEventContext'
import { parseAndValidateEventPayload } from '@/lib/tracking/utils/parseAndValidateEventPayload'
import { createTrackingResponse } from '@/lib/tracking/utils/createTrackingResponse'
import { processBrowserEvent } from '@/lib/tracking/services/processBrowserEvent'
import { sendMetaBrowserEvent } from '@/lib/tracking/meta/sendMetaBrowserEvent'
import { sendPinterestBrowserEvent } from '@/lib/tracking/pinterest/sendPinterestBrowserEvent'
import { sendTikTokBrowserEvent } from '@/lib/tracking/tiktok/sendTikTokBrowserEvent'
import { sendGA4BrowserEvent } from '@/lib/tracking/google/sendGA4BrowserEvent'
import { sendSnapchatBrowserEvent } from '@/lib/tracking/snapchat/sendSnapchatBrowserEvent'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'

export async function POST(request: NextRequest) {
  const validation = await parseAndValidateEventPayload(request)

  if (!validation.success) {
    return validation.errorResponse
  }

  const context = adaptRequestToEventContext(request)
  const epikFromUrl = request.nextUrl.searchParams.get('epik')

  const enhancedCookies = {
    ...context.cookies,
    epik: epikFromUrl || context.cookies.epik || context.cookies.epik
  }
  const result = await processBrowserEvent(
    validation.payload,
    enhancedCookies, // Send med de forbedrede cookiene som inneholder sikker epik
    { clientIp: context.clientIp, userAgent: context.userAgent },
    {
      sendMeta: sendMetaBrowserEvent,
      sendPinterest: sendPinterestBrowserEvent,
      sendTikTok: sendTikTokBrowserEvent,
      sendGoogle: sendGA4BrowserEvent,
      sendSnapchat: sendSnapchatBrowserEvent,
      logger: logToAppLogs
    }
  )

  return createTrackingResponse(result)
}
