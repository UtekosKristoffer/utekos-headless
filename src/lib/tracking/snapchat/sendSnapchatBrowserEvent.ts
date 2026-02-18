import type { MetaEventPayload, MetaUserData } from 'types/tracking/meta'

const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID
const SNAP_API_TOKEN = process.env.SNAP_API_TOKEN

export async function sendSnapchatBrowserEvent(
  event: MetaEventPayload | undefined,
  user: MetaUserData | undefined,
  extra?: { sc_cookie1?: string; sc_click_id?: string }
) {
  if (!event || !user || !SNAP_PIXEL_ID || !SNAP_API_TOKEN) return

  const scCookie1 = (user as any).scid || extra?.sc_cookie1
  const clickId = (user as any).click_id || extra?.sc_click_id

  const payload = {
    pixel_id: SNAP_PIXEL_ID,
    timestamp:
      event.eventTime ?
        Math.floor(event.eventTime)
      : Math.floor(Date.now() / 1000),
    event_conversion_type: 'WEB',
    event_type: mapEventName(event.eventName ?? ''),
    event_id: event.eventId,
    user_data: {
      hashed_email: user.email_hash,
      sc_cookie1: scCookie1,
      sc_click_id: clickId,
      client_ip_address: user.client_ip_address,
      client_user_agent: user.client_user_agent
    },
    price: event.eventData?.value,
    currency: event.eventData?.currency,
    item_ids: event.eventData?.content_ids,
    item_category: event.eventData?.content_category,
    description: event.eventData?.content_name,
    number_items: event.eventData?.num_items
  }

  try {
    const res = await fetch('https://tr.snapchat.com/v2/conversion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SNAP_API_TOKEN}`
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(`Snapchat API Error: ${JSON.stringify(errorData)}`)
    }

    return await res.json()
  } catch (error) {
    console.error('Snapchat CAPI Error:', error)
    return null
  }
}

function mapEventName(metaName: string): string {
  switch (metaName) {
    case 'AddToCart':
      return 'ADD_CART'
    case 'Purchase':
      return 'PURCHASE'
    case 'PageView':
      return 'PAGE_VIEW'
    case 'ViewContent':
      return 'VIEW_CONTENT'
    default:
      return 'CUSTOM_EVENT'
  }
}
