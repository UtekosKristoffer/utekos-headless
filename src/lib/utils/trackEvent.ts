// Path: src/lib/utils/trackEvent.ts
import { track } from '@vercel/analytics'
import type { LogPayload } from 'types/tracking/log/LogPayload'

type AnalyticsProperty = string | number | boolean | null

export function trackEvent(
  eventName: string,
  data?: Record<string, AnalyticsProperty>
) {
  track(eventName, data)

  const payload: LogPayload = {
    event: eventName,
    level: 'info'
  }

  if (data) {
    payload.data = data
  }

  fetch('/api/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
    keepalive: true
  }).catch(err => console.error('Tracking failed', err))
}
