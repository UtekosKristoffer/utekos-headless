import { type NextRequest } from 'next/server'
import { adaptRequestToEventContext } from '@/lib/tracking/utils/adaptRequestToEventContext'
import { parseAndValidateEventPayload } from '@/lib/tracking/utils/parseAndValidateEventPayload'
import { createTrackingResponse } from '@/lib/tracking/utils/createTrackingResponse'
import { processBrowserEvent } from '@/lib/tracking/services/processBrowserEvent'
import { sendMetaBrowserEvent } from '@/lib/tracking/meta/sendMetaBrowserEvent'
import { sendPinterestBrowserEvent } from '@/lib/tracking/pinterest/sendPinterestBrowserEvent'
import { sendTikTokBrowserEvent } from '@/lib/tracking/tiktok/sendTikTokBrowserEvent'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'

export async function POST(request: NextRequest) {
  const validation = await parseAndValidateEventPayload(request)
  if (!validation.success) {
    return validation.errorResponse
  }

  const context = adaptRequestToEventContext(request)
  const result = await processBrowserEvent(
    validation.payload,
    context.cookies,
    { clientIp: context.clientIp, userAgent: context.userAgent },
    {
      sendMeta: sendMetaBrowserEvent,
      sendPinterest: sendPinterestBrowserEvent,
      sendTikTok: sendTikTokBrowserEvent,
      logger: logToAppLogs
    }
  )

  return createTrackingResponse(result)
}
