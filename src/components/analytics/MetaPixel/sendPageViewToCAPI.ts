// Path: src/components/analytics/MetaPixel/sendPageViewToCAPI.ts
import { getPageViewParams } from './getPageViewParams'
import { getCookie } from './getCookie'
import type { MetaEventPayload } from '@types'

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
    const payload: MetaEventPayload = {
      eventName: 'PageView',
      eventId,
      eventSourceUrl: window.location.href,
      eventTime: Math.floor(Date.now() / 1000),
      userData: {
        external_id: externalId || undefined,
        fbc: fbc || undefined,
        fbp: fbp || undefined,
        email_hash: emailHash || undefined,
        client_user_agent: navigator.userAgent
      },
      eventData: params
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
