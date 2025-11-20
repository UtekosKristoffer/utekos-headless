// Path: src/components/analytics/sendPageViewToCAPI.ts
import { getPageViewParams } from './getPageViewParams'

export async function sendPageViewToCAPI(
  pathname: string,
  eventId: string,
  searchParams?: URLSearchParams | null,
  externalId?: string | null
) {
  try {
    const params = getPageViewParams(pathname, searchParams)

    const response = await fetch('/api/meta-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'PageView',
        eventData: params,
        eventId: eventId,
        eventSourceUrl: window.location.href,
        eventTime: Math.floor(Date.now() / 1000),
        userData: {
          external_id: externalId
        }
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Meta CAPI PageView error:', error)
    }
  } catch (error) {
    console.error('Meta CAPI PageView failed to send:', error)
  }
}
