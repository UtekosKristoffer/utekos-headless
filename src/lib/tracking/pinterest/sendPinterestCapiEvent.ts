import { hashAdData } from '@/lib/tracking/utils/hashAdData'
import { logToAppLogs } from '@/lib/tracking/log/logToAppLogs'
import type { UnifiedAnalyticsEvent } from 'types/analytics/events'
import type { TrackingAdapterResult } from 'types/analytics/events/TrackingAdapterResult'

const PINTEREST_TOKEN = process.env.PINTEREST_ACCESS_TOKEN
const PINTEREST_AD_ACCOUNT_ID = process.env.PINTEREST_AD_ACCOUNT_ID

function mapToPinterestEventName(
  eventName: UnifiedAnalyticsEvent['eventName']
): string {
  const map: Record<string, string> = {
    Purchase: 'checkout',
    Lead: 'lead',
    AddToCart: 'add_to_cart',
    PageView: 'page_visit',
    ViewContent: 'page_visit',
    InitiateCheckout: 'checkout'
  }
  return map[eventName] || 'custom'
}

const ensureArray = (val?: string) => (val ? [val] : undefined)

export async function sendPinterestCapiEvent(
  event: UnifiedAnalyticsEvent
): Promise<TrackingAdapterResult> {
  const provider = 'pinterest'
  if (!PINTEREST_TOKEN || !PINTEREST_AD_ACCOUNT_ID)
    return { success: false, provider, error: 'Missing Config' }

  const { user, data } = event
  const pinEventName = mapToPinterestEventName(event.eventName)

  const payload = {
    event_name: pinEventName,
    action_source: 'web',
    event_time: event.occurredAt,
    event_id: event.eventId,
    event_source_url: event.sourceUrl,
    user_data: {
      ...(user.emailHash ? { em: ensureArray(user.emailHash) }
      : user.email ? { em: ensureArray(hashAdData(user.email)) }
      : {}),
      ...(user.phone ? { ph: ensureArray(hashAdData(user.phone)) } : {}),
      ...(user.firstName ?
        { fn: ensureArray(hashAdData(user.firstName)) }
      : {}),
      ...(user.lastName ? { ln: ensureArray(hashAdData(user.lastName)) } : {}),
      ...(user.city ? { ct: ensureArray(hashAdData(user.city)) } : {}),
      ...(user.state ? { st: ensureArray(hashAdData(user.state)) } : {}),
      ...(user.zip ? { zp: ensureArray(hashAdData(user.zip)) } : {}),
      ...(user.countryCode ?
        { country: ensureArray(hashAdData(user.countryCode)) }
      : {}),
      ...(user.externalId ?
        { external_id: ensureArray(hashAdData(user.externalId)) }
      : {}),
      ...(user.clientIpAddress ?
        { client_ip_address: user.clientIpAddress }
      : {}),
      ...(user.clientUserAgent ?
        { client_user_agent: user.clientUserAgent }
      : {}),
      ...(user.epik ? { click_id: user.epik } : {})
    },
    custom_data: {
      ...(data?.currency ? { currency: data.currency } : { currency: 'NOK' }),
      ...(data?.value !== undefined ? { value: String(data.value) } : {}),
      ...(data?.transactionId ? { order_id: data.transactionId } : {}),
      ...(data?.contentIds ? { content_ids: data.contentIds } : {}),
      ...(data?.contents && data.contents.length > 0 ?
        {
          num_items: data.contents.reduce(
            (acc, c) => acc + (c.quantity || 1),
            0
          ),
          contents: data.contents.map(c => ({
            item_price: String(c.price || 0),
            quantity: c.quantity || 1
          }))
        }
      : {})
    }
  }

  try {
    const res = await fetch(
      `https://api.pinterest.com/v5/ad_accounts/${PINTEREST_AD_ACCOUNT_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PINTEREST_TOKEN}`
        },
        body: JSON.stringify({ data: [payload] })
      }
    )

    if (res.ok) {
      await logToAppLogs('INFO', `📌 Pinterest CAPI Sent: ${pinEventName}`, {
        eventId: event.eventId
      })
      return { success: true, provider }
    }
    return { success: false, provider, error: await res.text() }
  } catch (error: any) {
    return { success: false, provider, error: error.message }
  }
}
