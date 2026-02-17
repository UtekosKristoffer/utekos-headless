// Path: src/components/analytics/MetaPixel/trackNewsletterConversion.ts
'use client'

import { generateEventID } from '@/lib/tracking/utils/generateEventID'
import { getOrSetExternalId } from '@/lib/tracking/capi/getOrSetExternalId'
import type { MetaEventPayload } from '@types'

export async function trackNewsletterConversion(
  email: string,
  source: 'popup' | 'footer'
) {
  // Bytter ut 'evt_' med 'lead_' for enklere debugging i Network tab
  const eventId = generateEventID().replace('evt_', 'lead_')

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
      external_id: getOrSetExternalId() || undefined,
      email: email
    },
    eventData: {
      content_category: 'Newsletter',
      content_name:
        source === 'popup' ? 'Newsletter Popup' : 'Footer Newsletter'
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
      level: 'INFO',
      data: { source, hasEmail: !!email },
      context: { url: window.location.href }
    })
  }).catch(() => {})
}
