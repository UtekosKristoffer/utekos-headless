// Path: src/components/analytics/CampaignPageTracker.tsx
'use client'

import { useEffect, useRef } from 'react'
import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import type { MetaUserData, MetaEventPayload } from '@types' // Antar du har disse typene tilgjengelig basert på koden din

export function CampaignPageTracker() {
  const hasFired = useRef(false)

  useEffect(() => {
    if (hasFired.current) return
    hasFired.current = true
    const eventID = generateEventID().replace('evt_', 'camp_')
    const timestamp = Math.floor(Date.now() / 1000)
    const sourceUrl = window.location.href
    const eventName = 'ViewContent'
    const customData = {
      content_name: 'Utekos Local Delivery Campaign 2025-12-18',
      content_category: 'Campaign',
      content_type: 'product_group',
      delivery_category: 'local_delivery_bergen'
    }

    if (typeof window !== 'undefined' && (window as any).fbq) {
      ;(window as any).fbq('track', eventName, customData, { eventID })
    }

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
      // Legg gjerne til country/city her hvis du har IP-oppslag i API-et ditt,
      // men nettleser sender dette implisitt.
    }

    const capiPayload: MetaEventPayload = {
      eventName,
      eventId: eventID,
      eventSourceUrl: sourceUrl,
      eventTime: timestamp,
      actionSource: 'website',
      userData,
      eventData: customData // CAPI bruker ofte 'custom_data' feltet for parameters
    }

    // Send til din eksisterende API route
    fetch('/api/meta-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(capiPayload),
      keepalive: true
    }).catch(err => console.error('CAPI Error:', err))
  }, [])

  return null // Rendrer ingenting visuelt
}
