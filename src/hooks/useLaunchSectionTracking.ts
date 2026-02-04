import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { productName, currentPrice } from '@/api/constants'
import type { MetaUserData, MetaEventPayload, MetaEventType } from '@types'

export function useLaunchSectionTracking(variantId: string) {
  const getUserData = (): MetaUserData => {
    return {
      external_id: getCookie('ute_ext_id') || undefined,
      fbc: getCookie('_fbc') || undefined,
      fbp: getCookie('_fbp') || undefined,
      email_hash: getCookie('ute_user_hash') || undefined,
      client_user_agent:
        typeof navigator !== 'undefined' ? navigator.userAgent : undefined
    }
  }

  const trackEvent = (eventName: string, customEventName: string) => {
    const contentId = cleanShopifyId(variantId) || variantId
    const eventID = generateEventID().replace(
      'evt_',
      `${eventName.toLowerCase().substring(0, 3)}_`
    )
    const sourceUrl = window.location.href

    const eventData = {
      content_name: `${eventName} ${productName}`,
      content_ids: [contentId],
      content_type: 'product' as const,
      value: currentPrice,
      currency: 'NOK'
    }

    if (typeof window !== 'undefined' && (window as any).fbq) {
      ;(window as any).fbq('trackCustom', customEventName, eventData, {
        eventID
      })
    }

    const capiPayload: MetaEventPayload = {
      eventName: customEventName as MetaEventType,
      eventId: eventID,
      eventSourceUrl: sourceUrl,
      eventTime: Math.floor(Date.now() / 1000),
      actionSource: 'website',
      userData: getUserData(),
      eventData: eventData
    }

    fetch('/api/tracking-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(capiPayload),
      keepalive: true
    }).catch(console.error)
  }

  return { trackEvent }
}
