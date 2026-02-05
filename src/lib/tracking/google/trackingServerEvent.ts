import 'server-only'
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'
import type { AnalyticsEvent, TrackingOverrides } from '@types'

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const API_SECRET = process.env.GA_API_SECRET

export async function trackServerEvent(
  event: AnalyticsEvent,
  overrides?: TrackingOverrides
) {
  if (!MEASUREMENT_ID || !API_SECRET) {
    console.warn('[Tracking] Mangler GA4 credentials')
    return
  }

  try {
    let clientId: string | undefined
    let sessionId: string | undefined
    let fbp: string | undefined
    let fbc: string | undefined
    let userAgent = overrides?.userAgent || 'Next.js Server'
    let userData = overrides?.userData || {}
    let userProperties = overrides?.userProperties || {}
    if (overrides?.clientId) {
      clientId = overrides.clientId
      sessionId = overrides.sessionId
      fbp = overrides.fbp
      fbc = overrides.fbc
    } else {
      try {
        const cookieStore = await cookies()
        const gaCookie = cookieStore.get('_ga')?.value
        if (gaCookie) {
          const parts = gaCookie.split('.')
          if (parts.length >= 4) {
            clientId = parts.slice(2).join('.')
          }
        }
        const containerId = MEASUREMENT_ID.replace('G-', '')
        const sessionCookie = cookieStore.get(`_ga_${containerId}`)?.value

        if (sessionCookie) {
          sessionId = sessionCookie.split('.')[2]
        }

        fbp = cookieStore.get('_fbp')?.value
        fbc = cookieStore.get('_fbc')?.value
      } catch (error) {}
    }

    if (!clientId) {
      clientId = uuidv4()
    }

    const payload = {
      client_id: clientId,
      user_id: overrides?.userId,
      timestamp_micros: overrides?.timestampMicros || Date.now() * 1000,
      non_personalized_ads: false,
      user_data: {
        ...userData,
        fbc: fbc,
        fbp: fbp
      },
      user_properties: userProperties,
      events: [
        {
          name: event.name,
          params: {
            ...event.params,
            ...event.ecommerce,
            session_id: sessionId,
            engagement_time_msec: 100,
            debug_mode: process.env.NODE_ENV === 'development' ? 1 : undefined,
            ip_override: overrides?.ipOverride,
            user_agent: userAgent
          }
        }
      ]
    }

    const endpoint = `https://region1.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!response.ok) {
      const text = await response.text()
      console.error(`[Tracking] GA4 Error (${response.status}):`, text)
    }
  } catch (error) {
    console.error('[Tracking] Critical Error:', error)
  }
}
