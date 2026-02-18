import { hashSnapData } from '@/lib/tracking/snapchat/hashSnapData'
import type { MetaEventPayload, ClientUserData } from 'types/tracking/meta'

const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID

export async function sendTikTokBrowserEvent(
  payload: MetaEventPayload,
  userData: ClientUserData,
  cookies: { ttclid?: string; ttp?: string }
) {
  if (!TIKTOK_ACCESS_TOKEN || !TIKTOK_PIXEL_ID) return

  try {
    const { eventData } = payload

    const tiktokPayload = {
      event_source: 'web',
      event_source_id: TIKTOK_PIXEL_ID,
      data: [
        {
          event: payload.eventName,
          event_id: payload.eventId,
          event_time: Math.floor(Date.now() / 1000),
          user: {
            ttclid: cookies.ttclid,
            ttp: cookies.ttp,
            ip: userData.client_ip_address,
            user_agent: userData.client_user_agent,
            email:
              userData.email ?
                hashSnapData(userData.email)
              : userData.email_hash,
            phone: userData.phone ? hashSnapData(userData.phone) : undefined,
            external_id:
              userData.external_id ?
                hashSnapData(userData.external_id)
              : undefined
          },
          properties: {
            currency: eventData?.currency || 'NOK',
            value: eventData?.value ? Number(eventData.value) : undefined,
            content_id: eventData?.content_ids?.[0],
            content_type: eventData?.content_type,
            contents: eventData?.contents?.map(c => ({
              content_id: c.id,
              price: Number(c.item_price || 0),
              quantity: Number(c.quantity || 1)
            }))
          },
          page: {
            url: payload.eventSourceUrl
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
        body: JSON.stringify(tiktokPayload)
      }
    )

    const data = await res.json()
    if (data.code !== 0) {
      console.error('[TikTok CAPI] Error:', JSON.stringify(data))
    }
  } catch (e) {
    console.error('[TikTok CAPI] Exception:', e)
  }
}
