// Path: src/hooks/useAnalytics.ts
import { useEffectEvent } from 'react'
import type { MetaUserData, MetaEventPayload, MetaEventType } from '@types'
import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'

type TrackEventOptions = {
  eventID?: string
}

export function useAnalytics() {
  const trackEvent = useEffectEvent(
    (
      eventName: MetaEventType,
      data: any = {},
      options: TrackEventOptions = {}
    ) => {
      if (typeof window === 'undefined' || !window.fbq) return

      const eventID =
        options.eventID || generateEventID().replace('evt_', 'track_')

      const sourceUrl = window.location.href
      const timestamp = Math.floor(Date.now() / 1000)
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
        eventName: eventName,
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
