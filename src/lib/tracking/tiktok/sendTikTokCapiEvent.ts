import { hashAdData } from '@/lib/tracking/utils/hashAdData'
import { logToAppLogs } from '@/lib/tracking/log/logToAppLogs'
import type { UnifiedAnalyticsEvent } from 'types/analytics/events'
import type { TrackingAdapterResult } from 'types/analytics/events/TrackingAdapterResult'

const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID

function mapToTikTokEventName(
  eventName: UnifiedAnalyticsEvent['eventName']
): string {
  const map: Record<string, string> = {
    Purchase: 'Purchase',
    Lead: 'CompleteRegistration',
    AddToCart: 'AddToCart',
    InitiateCheckout: 'InitiateCheckout',
    ViewContent: 'ViewContent',
    PageView: 'PageView'
  }
  return map[eventName] || eventName
}

export async function sendTikTokCapiEvent(
  event: UnifiedAnalyticsEvent
): Promise<TrackingAdapterResult> {
  const provider = 'tiktok'
  if (!TIKTOK_ACCESS_TOKEN || !TIKTOK_PIXEL_ID)
    return { success: false, provider, error: 'Missing Config' }

  const { user, data } = event
  const ttEventName = mapToTikTokEventName(event.eventName)

  const payload = {
    event_source: 'web',
    event_source_id: TIKTOK_PIXEL_ID,
    data: [
      {
        event: ttEventName,
        event_id: event.eventId,
        event_time: event.occurredAt,
        user: {
          ...(user.ttclid ? { ttclid: user.ttclid } : {}),
          ...(user.ttp ? { ttp: user.ttp } : {}),
          ...(user.emailHash ? { email: user.emailHash }
          : user.email ? { email: hashAdData(user.email) }
          : {}),
          ...(user.phone ? { phone: hashAdData(user.phone) } : {}),
          ...(user.externalId ?
            { external_id: hashAdData(user.externalId) }
          : {}),
          ...(user.clientIpAddress ? { ip: user.clientIpAddress } : {}), // TikTok krever 'ip'
          ...(user.clientUserAgent ? { user_agent: user.clientUserAgent } : {})
        },
        properties: {
          ...(data?.currency ?
            { currency: data.currency }
          : { currency: 'NOK' }),
          ...(data?.value !== undefined ? { value: data.value } : {}),
          ...(data?.transactionId ? { order_id: data.transactionId } : {}),
          ...(data?.contentIds?.length ?
            { content_id: data.contentIds[0] }
          : {}),
          ...(data?.contents?.length ?
            {
              content_type: 'product',
              contents: data.contents.map(c => ({
                content_id: c.id,
                price: c.price ?? 0,
                quantity: c.quantity
              }))
            }
          : {})
        },
        page: { url: event.sourceUrl }
      }
    ]
  }

  try {
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
    const responseData = await res.json()

    if (responseData.code === 0) {
      await logToAppLogs('INFO', `🎵 TikTok CAPI Sent: ${ttEventName}`, {
        eventId: event.eventId
      })
      return { success: true, provider }
    }
    await logToAppLogs('ERROR', `🚨 TikTok CAPI Failed: ${ttEventName}`, {
      error: responseData
    })
    return { success: false, provider, error: 'API Error' }
  } catch (error: any) {
    return { success: false, provider, error: error.message || String(error) }
  }
}
