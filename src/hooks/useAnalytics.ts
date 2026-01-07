import { useEffectEvent } from 'react' // 1. Ren import, som du sa
import type { MetaUserData, MetaEventPayload, MetaEventType } from '@types' // 2. Henter riktig type
import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'

export function useAnalytics() {
  // 3. Setter typen på eventName til MetaEventType (ikke string)
  const trackEvent = useEffectEvent(
    (eventName: MetaEventType, data: any = {}) => {
      if (typeof window === 'undefined' || !window.fbq) return

      const eventID = generateEventID().replace('evt_', 'track_')
      const sourceUrl = window.location.href
      const timestamp = Math.floor(Date.now() / 1000)

      // Client-side tracking
      window.fbq('trackCustom', eventName, data, { eventID })

      const fbc = getCookie('_fbc')
      const fbp = getCookie('_fbp')
      const externalId = getCookie('ute_ext_id')
      const emailHash = getCookie('ute_user_hash')

      const userData: MetaUserData = {
        external_id: externalId || undefined,
        fbc: fbc || undefined,
        fbp: fbp || undefined,
        email_hash: emailHash || undefined,
        client_user_agent: navigator.userAgent
      }

      const capiPayload: MetaEventPayload = {
        eventName: eventName, // Nå er dette lovlig (begge er MetaEventType)
        eventId: eventID,
        eventSourceUrl: sourceUrl,
        eventTime: timestamp,
        actionSource: 'website',
        userData,
        eventData: data
      }

      fetch('/api/meta-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(capiPayload),
        keepalive: true
      }).catch(console.error)
    }
  )

  return { trackEvent }
}
