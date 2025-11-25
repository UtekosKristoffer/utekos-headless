// Path: src/components/analytics/MetaPixel/sendPageViewToCAPI.ts
import { getPageViewParams } from './getPageViewParams'

type PageViewPayload = {
  eventName: 'PageView'
  eventData: Record<string, unknown>
  eventId: string
  eventSourceUrl: string
  eventTime: number
  userData?: {
    external_id?: string
    fbc?: string
    fbp?: string
    client_user_agent?: string
  }
}

export async function sendPageViewToCAPI(
  pathname: string,
  eventId: string,
  searchParams?: URLSearchParams | null,
  externalId?: string | null,
  fbc?: string | null,
  fbp?: string | null
) {
  if (typeof window === 'undefined') return

  // Endring: Tillater sending hvis prod ELLER hvis test-kode er satt
  if (
    process.env.NODE_ENV !== 'production'
    && !process.env.NEXT_PUBLIC_META_TEST_EVENT_CODE
  ) {
    return
  }

  try {
    const params = getPageViewParams(pathname, searchParams)

    const payload: PageViewPayload = {
      eventName: 'PageView',
      eventData: params,
      eventId,
      eventSourceUrl: window.location.href,
      eventTime: Math.floor(Date.now() / 1000)
    }

    const userData: PageViewPayload['userData'] = {}
    if (externalId) userData.external_id = externalId
    if (fbc) userData.fbc = fbc
    if (fbp) userData.fbp = fbp
    if (typeof navigator !== 'undefined')
      userData.client_user_agent = navigator.userAgent

    if (Object.keys(userData).length > 0) {
      payload.userData = userData
    }

    const response = await fetch('/api/meta-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    })

    if (!response.ok) {
      let error: unknown = null
      try {
        error = await response.json()
      } catch {
        error = response.statusText
      }
      console.error('Meta CAPI PageView error:', error)
    }
  } catch (error) {
    console.error('Meta CAPI PageView failed to send:', error)
  }
}
