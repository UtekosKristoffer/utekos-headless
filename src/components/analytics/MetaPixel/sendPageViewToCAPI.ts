// Path: src/components/analytics/MetaPixel/sendPageViewToCAPI.ts
import { getPageViewParams } from './getPageViewParams'
import { getCookie } from './getCookie'

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
    email_hash?: string
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

  if (
    process.env.NODE_ENV !== 'production'
    && !process.env.NEXT_PUBLIC_META_TEST_EVENT_CODE
  ) {
    return
  }

  try {
    const params = getPageViewParams(pathname, searchParams)
    const emailHash = getCookie('ute_user_hash')

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
    if (emailHash) userData.email_hash = emailHash

    if (typeof navigator !== 'undefined') {
      userData.client_user_agent = navigator.userAgent
    }

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
      const errorText = await response.text()
      let errorJson
      try {
        errorJson = JSON.parse(errorText)
      } catch {
        // Hvis parsing feiler, bruk råteksten
        errorJson = errorText
      }

      console.error(
        `[Meta CAPI] PageView Error (${response.status}):`,
        typeof errorJson === 'object' ?
          JSON.stringify(errorJson, null, 2)
        : errorJson
      )
    }
  } catch (error) {
    console.error('[Meta CAPI] PageView network/logic failed:', error)
  }
}
