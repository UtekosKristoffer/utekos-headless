import { logToAppLogs } from '@/lib/utils/logToAppLogs'
import type { TikTokLeadProps } from 'types/tracking/tiktok/TikTokLeadProps'

const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID

export async function sendTikTokLead(props: TikTokLeadProps) {
  if (!TIKTOK_ACCESS_TOKEN || !TIKTOK_PIXEL_ID) return

  try {
    const payload = {
      event_source: 'web',
      event_source_id: TIKTOK_PIXEL_ID,
      data: [
        {
          event: 'CompleteRegistration',
          event_id: props.eventId,
          event_time: Math.floor(Date.now() / 1000),
          user: {
            ttclid: props.ttclid,
            ttp: props.ttp,
            email: props.emailHash,
            ip: props.clientIp,
            user_agent: props.userAgent
          },
          page: {
            url: props.url
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
        { eventId: props.eventId },
        { ttclid: props.ttclid ? 'Found' : 'Missing' }
      )
    } else {
      console.error('[TikTok CAPI] API Error:', data)
    }
  } catch (e) {
    console.error('[TikTok CAPI] Network Exception:', e)
  }
}
