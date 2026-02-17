import { logToAppLogs } from '@/lib/tracking/log/logToAppLogs'
import type { UnifiedAnalyticsEvent } from '@/modules/analytics/domain/types/events/UnifiedAnalyticsEvent'
import type { TrackingAdapterResult } from 'types/analytics/events/TrackingAdapterResult'
import type { TikTokPayload } from './types'
import { mapUnifiedEventToTikTokEvent } from './mappers/mapUnifiedEventToTikTokEvent'

const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN
const TIKTOK_PIXEL_ID = process.env.TIKTOK_PIXEL_ID
const TIKTOK_API_URL =
  'https://business-api.tiktok.com/open_api/v1.3/pixel/track/'
const TIKTOK_TEST_CODE = process.env.TIKTOK_TEST_EVENT_CODE

/**
 * Sends a Unified Event to TikTok Events API (CAPI).
 */
export async function sendTikTokEvent(
  event: UnifiedAnalyticsEvent
): Promise<TrackingAdapterResult> {
  const provider = 'tiktok'

  if (!TIKTOK_ACCESS_TOKEN || !TIKTOK_PIXEL_ID) {
    return {
      success: false,
      provider,
      error: 'Missing TikTok Configuration (Access Token or Pixel ID)'
    }
  }

  const tiktokEvent = mapUnifiedEventToTikTokEvent(event)

  if (TIKTOK_TEST_CODE) {
    tiktokEvent.test_event_code = TIKTOK_TEST_CODE
  }

  const payload: TikTokPayload = {
    pixel_code: TIKTOK_PIXEL_ID,
    batch: [tiktokEvent],
    ...(TIKTOK_TEST_CODE && { test_event_code: TIKTOK_TEST_CODE })
  }

  try {
    const response = await fetch(TIKTOK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': TIKTOK_ACCESS_TOKEN
      },
      body: JSON.stringify(payload)
    })

    const responseData = await response.json()

    if (!response.ok || responseData.code !== 0) {
      throw new Error(
        responseData.message || `TikTok API error code: ${responseData.code}`
      )
    }

    await logToAppLogs(
      'INFO',
      `🎵 TikTok Event Sent: ${tiktokEvent.event}`,
      { eventId: event.eventId, code: responseData.code },
      payload
    )

    return {
      success: true,
      provider,
      events_received: 1
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown TikTok API error'

    await logToAppLogs(
      'ERROR',
      `🚨 TikTok Event Failed: ${tiktokEvent.event}`,
      { error: errorMessage }
    )

    return {
      success: false,
      provider,
      error: errorMessage
    }
  }
}
