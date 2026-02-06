import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import type { MetaUserData, MetaEventPayload, AddToCartEventData } from '@types'

export async function sendAddToCartCapi(
  eventData: AddToCartEventData
): Promise<void> {
  const fbp = getCookie('_fbp')
  const fbc = getCookie('_fbc')
  const extId = getCookie('ute_ext_id')
  const emailHash = getCookie('ute_user_hash')
  const scid = getCookie('_scid')
  const clickId = getCookie('sc_click_id')
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : undefined

  const userData: MetaUserData & { scid?: string; click_id?: string } = {
    ...(fbp ? { fbp } : {}),
    ...(fbc ? { fbc } : {}),
    ...(extId ? { external_id: extId } : {}),
    ...(emailHash ? { email_hash: emailHash } : {}),
    ...(ua ? { client_user_agent: ua } : {}),
    ...(scid ? { scid } : {}),
    ...(clickId ? { click_id: clickId } : {})
  }

  const payload: MetaEventPayload = {
    eventName: 'AddToCart',
    eventId: eventData.eventID,
    eventSourceUrl: typeof window !== 'undefined' ? window.location.href : '',
    eventTime: Math.floor(Date.now() / 1000),
    actionSource: 'website',
    userData,
    eventData: {
      value: eventData.value,
      currency: eventData.currency,
      content_name: eventData.contentName,
      content_ids: eventData.contentIds,
      content_type: 'product',
      contents: eventData.contents,
      num_items: eventData.totalQty
    }
  }

  try {
    await fetch('/api/tracking-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    })
  } catch (err) {
    console.error('CAPI AddToCart failed', err)
  }
}
