// Path: src/lib/tracking/snapchat/sendSnapchatCapiEvent.ts

import { hashAdData } from '@/lib/tracking/utils/hashAdData'
import { logToAppLogs } from '@/lib/tracking/log/logToAppLogs'
import type { UnifiedAnalyticsEvent } from 'types/analytics/events'
import type { TrackingAdapterResult } from 'types/analytics/events/TrackingAdapterResult'

const SNAP_ACCESS_TOKEN =
  process.env.SNAP_CAPI_TOKEN || process.env.SNAP_API_TOKEN
const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID

function mapToSnapchatEventName(
  eventName: UnifiedAnalyticsEvent['eventName']
): string {
  const map: Record<string, string> = {
    Purchase: 'PURCHASE',
    Lead: 'SIGN_UP',
    AddToCart: 'ADD_CART',
    PageView: 'PAGE_VIEW',
    ViewContent: 'VIEW_CONTENT',
    InitiateCheckout: 'START_CHECKOUT'
  }
  return map[eventName] || 'CUSTOM_EVENT'
}

export async function sendSnapchatCapiEvent(
  event: UnifiedAnalyticsEvent
): Promise<TrackingAdapterResult> {
  const provider = 'snapchat'
  if (!SNAP_ACCESS_TOKEN || !SNAP_PIXEL_ID)
    return { success: false, provider, error: 'Missing Config' }

  const { user, data } = event
  const snapEventName = mapToSnapchatEventName(event.eventName)

  const payload = {
    pixel_id: SNAP_PIXEL_ID,
    timestamp: event.occurredAt,
    event_conversion_type: 'WEB',
    event_type: snapEventName,
    event_id: event.eventId,
    user_data: {
      ...(user.emailHash ? { hashed_email: user.emailHash }
      : user.email ? { hashed_email: hashAdData(user.email) }
      : {}),
      ...(user.phone ? { hashed_phone_number: hashAdData(user.phone) } : {}),
      ...(user.clientIpAddress ?
        { client_ip_address: user.clientIpAddress }
      : {}),
      ...(user.clientUserAgent ?
        { client_user_agent: user.clientUserAgent }
      : {}),
      ...(user.scid ? { sc_cookie1: user.scid } : {}),
      ...(user.clickId ? { sc_click_id: user.clickId } : {})
    },
    ...(data?.currency ? { currency: data.currency } : { currency: 'NOK' }),
    ...(data?.value !== undefined ? { price: data.value } : {}),
    ...(data?.transactionId ? { transaction_id: data.transactionId } : {}),
    ...(data?.contentIds ? { item_ids: data.contentIds } : {}),
    ...(data?.contents && data.contents.length > 0 ?
      {
        number_items: data.contents.reduce(
          (acc, curr) => acc + (curr.quantity || 1),
          0
        )
      }
    : {}),
    item_category: 'Apparel'
  }

  try {
    const res = await fetch('https://tr.snapchat.com/v2/conversion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SNAP_ACCESS_TOKEN}`
      },
      body: JSON.stringify(payload)
    })

    if (res.ok) {
      await logToAppLogs('INFO', `👻 Snapchat CAPI Sent: ${snapEventName}`, {
        eventId: event.eventId
      })
      return { success: true, provider }
    }
    return { success: false, provider, error: await res.text() }
  } catch (error: any) {
    return { success: false, provider, error: error.message }
  }
}
