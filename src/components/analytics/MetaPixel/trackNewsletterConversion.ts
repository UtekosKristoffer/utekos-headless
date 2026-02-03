// Path: src/components/analytics/MetaPixel/trackNewsletterConversion.ts
'use client'

import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { getOrSetExternalId } from '@/components/analytics/MetaPixel/getOrSetExternalId'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import type { MetaEventPayload } from '@types'

export async function trackNewsletterConversion(
  email: string,
  source: 'popup' | 'footer'
) {
  const eventId = generateEventID()
  const externalId = getOrSetExternalId()
  const fbc = getCookie('_fbc')
  const fbp = getCookie('_fbp')
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq(
      'track',
      'Lead',
      {
        content_category: 'Newsletter',
        content_name:
          source === 'popup' ? 'Newsletter Popup' : 'Footer Newsletter'
      },
      { eventID: eventId }
    )
  }

  const payload: MetaEventPayload = {
    eventName: 'Lead',
    eventId,
    eventSourceUrl: window.location.href,
    eventTime: Math.floor(Date.now() / 1000),
    actionSource: 'website',
    userData: {
      external_id: externalId || undefined,
      fbc: fbc || undefined,
      fbp: fbp || undefined,
      email: email,
      client_user_agent: navigator.userAgent
    },
    eventData: {
      content_category: 'Newsletter',
      content_name: source
    }
  }
  fetch('/api/tracking-events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true
  }).catch(err => console.error('[Newsletter Tracking] CAPI failed:', err))

  fetch('/api/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'Newsletter Subscription',
      level: 'info',
      data: { source, hasEmail: !!email },
      context: { url: window.location.href }
    })
  }).catch(() => {})
}
