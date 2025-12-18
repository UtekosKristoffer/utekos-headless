// Path: src/components/analytics/CampaignPageTracker.tsx
'use client'

import { useEffect, useRef } from 'react'
import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import { getOrSetExternalId } from '@/components/analytics/MetaPixel/getOrSetExternalId'
import type { MetaEventPayload } from '@types'

export function CampaignPageTracker() {
  const hasFired = useRef(false)

  useEffect(() => {
    if (hasFired.current) return
    hasFired.current = true

    const eventName = 'ViewContent'
    const eventId = generateEventID().replace('evt_', 'camp_')

    const customData = {
      content_name: 'Kampanje: Julegaver Lokal Levering',
      content_category: 'Campaign',
      content_type: 'product_group',
      delivery_category: 'local_delivery_bergen',
      value: 0,
      currency: 'NOK'
    }

    const firePixel = () => {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', eventName, customData, { eventID: eventId })
        return true
      }
      return false
    }
    if (!firePixel()) {
      const intervalId = setInterval(() => {
        if (firePixel()) {
          clearInterval(intervalId)
        }
      }, 500)

      setTimeout(() => clearInterval(intervalId), 5000)
    }

    requestAnimationFrame(() => {
      const externalId = getOrSetExternalId()
      const fbc = getCookie('_fbc')
      const fbp = getCookie('_fbp')
      const userHash = getCookie('ute_user_hash')
      const sourceUrl = window.location.href
      const timestamp = Math.floor(Date.now() / 1000)

      const payload: MetaEventPayload = {
        eventName,
        eventId,
        eventSourceUrl: sourceUrl,
        eventTime: timestamp,
        actionSource: 'website',
        userData: {
          external_id: externalId || undefined,
          fbc: fbc || undefined,
          fbp: fbp || undefined,
          email_hash: userHash || undefined,
          client_user_agent: navigator.userAgent
        },
        eventData: customData
      }

      fetch('/api/meta-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(err => console.error('[Campaign Tracker] CAPI failed:', err))
    })
  }, [])

  return null
}
