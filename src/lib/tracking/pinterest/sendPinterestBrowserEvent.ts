import { hashSnapData } from '@/lib/tracking/snapchat/hashSnapData'
import type { MetaEventPayload, ClientUserData } from 'types/tracking/meta'

const PINTEREST_TOKEN = process.env.PINTEREST_ACCESS_TOKEN
const PINTEREST_AD_ACCOUNT_ID = process.env.PINTEREST_AD_ACCOUNT_ID

export async function sendPinterestBrowserEvent(
  payload: MetaEventPayload,
  userData: ClientUserData,
  epik: string | undefined
) {
  if (!PINTEREST_TOKEN || !PINTEREST_AD_ACCOUNT_ID || !payload.eventName) return

  let pinEventName = payload.eventName.toLowerCase()

  switch (payload.eventName as string) {
    case 'AddToCart':
      pinEventName = 'add_to_cart'
      break
    case 'InitiateCheckout':
      pinEventName = 'checkout'
      break
    case 'ViewCategory':
      pinEventName = 'view_category'
      break
    case 'ViewContent':
      pinEventName = 'page_visit'
      break
  }

  try {
    const { eventData } = payload

    const emailList =
      userData.email ? [hashSnapData(userData.email)]
      : userData.email_hash ? [userData.email_hash]
      : undefined

    const extIdList =
      userData.external_id ? [hashSnapData(userData.external_id)] : undefined

    const pinPayload = {
      event_name: pinEventName,
      action_source: 'web',
      event_time: Math.floor(Date.now() / 1000),
      event_id: payload.eventId,
      event_source_url: payload.eventSourceUrl,
      user_data: {
        em: emailList,
        client_ip_address: userData.client_ip_address,
        client_user_agent: userData.client_user_agent,
        click_id: epik || undefined,
        external_id: extIdList
      },
      custom_data: {
        currency: eventData?.currency || 'NOK',
        value: eventData?.value ? String(eventData.value) : undefined,
        content_ids: eventData?.content_ids,
        num_items: eventData?.num_items,
        contents: eventData?.contents?.map(c => ({
          id: c.id,
          quantity: c.quantity,
          item_price: String(c.item_price || '0')
        }))
      }
    }

    const res = await fetch(
      `https://api.pinterest.com/v5/ad_accounts/${PINTEREST_AD_ACCOUNT_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PINTEREST_TOKEN}`
        },
        body: JSON.stringify({ data: [pinPayload] })
      }
    )

    if (!res.ok) {
      console.error('[Pinterest CAPI] Failed:', await res.text())
    }
  } catch (e) {
    console.error('[Pinterest CAPI] Exception:', e)
  }
}
