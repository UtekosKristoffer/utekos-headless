// Path: src/lib/tracking/tiktok/sendTikTokLeadEvent.ts

import { logToAppLogs } from '@/lib/tracking/log/logToAppLogs'
import type { UnifiedAnalyticsEvent } from 'types/analytics/events'

const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID

export async function sendTikTokLeadEvent(event: UnifiedAnalyticsEvent) {
  if (event.eventName !== 'Lead') return
  if (!TIKTOK_ACCESS_TOKEN || !TIKTOK_PIXEL_ID) return
  const { user } = event
  try {
    const payload = {
      event_source: 'web',
      event_source_id: TIKTOK_PIXEL_ID,
      data: [
        {
          event: 'CompleteRegistration',
          event_id: event.eventId,
          event_time: event.occurredAt,
          user: {
            ttclid: user.ttclid,
            ttp: user.ttp,
            email: user.emailHash,
            ip: user.clientIp,
            user_agent: user.userAgent,
            external_id: user.externalId
          },
          page: {
            url: event.sourceUrl
          }
        }
      ]
    }

    const res = await fetch(
      'https://business-api.tiktok.com/open_api/v1.3/event/track/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Token': TIKTOK_ACCESS_TOKEN
        },
        body: JSON.stringify(payload)
      }
    )

    const data = await res.json()
    if (data.code === 0) {
      await logToAppLogs(
        'INFO',
        '🎵 TikTok CAPI: Lead Sent',
        { eventId: event.eventId },
        { ttclid: event.user.ttclid ? 'Found' : 'Missing' }
      )
    } else {
      console.error('[TikTok CAPI] API Error:', data)
    }
  } catch (e) {
    console.error('[TikTok CAPI] Network Exception:', e)
  }
}
