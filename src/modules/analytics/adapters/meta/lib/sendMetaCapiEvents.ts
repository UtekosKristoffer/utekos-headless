// Path: src/modules/analytics/adapters/meta/sendMetaCapiEvents.ts

import { FacebookAdsApi, EventRequest } from 'facebook-nodejs-business-sdk'
import { logToAppLogs } from '@/lib/tracking/log/logToAppLogs'
import type { UnifiedAnalyticsEvent } from '@/modules/analytics/domain/types/events/UnifiedAnalyticsEvent'
import type { TrackingAdapterResult } from 'types/analytics/events/TrackingAdapterResult'
import { mapUnifiedEventToMetaEvent } from '../mappers/mapUnifiedEventToMetaEvent'

const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
const META_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID
const META_TEST_CODE = process.env.META_TEST_EVENT_CODE

export async function sendMetaCapiEvent(
  event: UnifiedAnalyticsEvent
): Promise<TrackingAdapterResult> {
  const provider = 'meta'

  if (!META_ACCESS_TOKEN || !META_PIXEL_ID) {
    return {
      success: false,
      provider,
      error: 'Missing Meta Configuration (Token or Pixel ID)'
    }
  }
  FacebookAdsApi.init(META_ACCESS_TOKEN)

  try {
    const serverEvent = mapUnifiedEventToMetaEvent(event)

    const request = new EventRequest(
      META_ACCESS_TOKEN,
      META_PIXEL_ID
    ).setEvents([serverEvent])

    if (META_TEST_CODE) {
      request.setTestEventCode(META_TEST_CODE)
    }

    const response = await request.execute()

    await logToAppLogs('INFO', `💙 Meta CAPI Sent: ${event.eventName}`, {
      eventId: event.eventId,
      fbtrace_id: response.fbtrace_id
    })

    return {
      success: true,
      provider,
      events_received: response.events_received
    }
  } catch (error: any) {
    const errorDetails = error.response?.data || error.message

    await logToAppLogs('ERROR', `🚨 Meta CAPI Failed: ${event.eventName}`, {
      error: error.message,
      details: errorDetails
    })

    return {
      success: false,
      provider,
      error: error.message
    }
  }
}
