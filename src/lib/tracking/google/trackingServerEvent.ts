// Path: src/lib/tracking/server.ts

import 'server-only'
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'
import type { AnalyticsEvent, TrackingOverrides } from '@types'

const SGTM_ENDPOINT = process.env.NEXT_PUBLIC_SGTM_ENDPOINT
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const API_SECRET = process.env.NEXT_PUBLIC_GA_API_SECRET

export async function trackServerEvent(
  event: AnalyticsEvent,
  overrides?: TrackingOverrides // <-- Dette argumentet manglet i definisjonen din
) {
  if (!MEASUREMENT_ID || !API_SECRET || !SGTM_ENDPOINT) {
    return
  }

  try {
    let clientId: string
    let sessionId: string | undefined
    let fbp: string | undefined
    let fbc: string | undefined
    let emailHash: string | undefined
    let userAgent = overrides?.userAgent || 'Next.js Server'

    if (overrides) {
      clientId = overrides.clientId || uuidv4()
      sessionId = overrides.sessionId
      fbp = overrides.fbp
      fbc = overrides.fbc
      emailHash = overrides.emailHash
    } else {
      const cookieStore = await cookies()
      const gaCookie = cookieStore.get('_ga')?.value
      clientId = gaCookie ? parseGaCookie(gaCookie) : uuidv4()

      const sessionCookie = cookieStore
        .getAll()
        .find(c => c.name.startsWith('_ga_') && c.name !== '_ga')
      sessionId =
        sessionCookie ? parseSessionId(sessionCookie.value) : undefined

      fbp = cookieStore.get('_fbp')?.value
      fbc = cookieStore.get('_fbc')?.value
      emailHash = cookieStore.get('email_hash')?.value
    }

    const payload = {
      client_id: clientId,
      timestamp_micros: Date.now() * 1000,
      non_personalized_ads: false,
      events: [
        {
          name: event.name,
          params: {
            ...event.params,
            ...event.ecommerce,
            session_id: sessionId,
            engagement_time_msec: 100,
            debug_mode: process.env.NODE_ENV === 'development' ? 1 : undefined
          }
        }
      ],
      user_data: {
        fbc: fbc,
        fbp: fbp,
        sha256_email_address: emailHash
      }
    }

    const endpoint = `${SGTM_ENDPOINT}/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`

    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })
  } catch (error) {
    console.error('[Tracking] Error:', error)
  }
}

function parseGaCookie(cookieValue: string): string {
  const parts = cookieValue.split('.')
  if (parts.length >= 3) {
    return parts.slice(2).join('.')
  }
  return cookieValue
}

function parseSessionId(cookieValue: string): string | undefined {
  const parts = cookieValue.split('.')
  if (parts.length >= 3) {
    return parts[2]
  }
  return undefined
}
