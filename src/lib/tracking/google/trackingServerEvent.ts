// Path: src/lib/tracking/google/trackingServerEvent.ts
import 'server-only'
import { cookies } from 'next/headers'
import type { CurrencyCode } from 'types/commerce/CurrencyCode'
export type AnalyticsItem = {
  item_id: string
  item_name: string
  price?: number
  quantity?: number
  item_brand?: string
  item_category?: string
  item_variant?: string
  index?: number
  coupon?: string
  discount?: number
  location_id?: string
  item_list_id?: string
  item_list_name?: string
}

export type AnalyticsEvent = {
  name: string
  params?: Record<string, any>
  ecommerce?: {
    currency: CurrencyCode
    value: number
    transaction_id?: string
    coupon?: string
    shipping?: number
    tax?: number
    items: AnalyticsItem[]
    customer_type?: 'new' | 'returning'
  }
}

export type TrackingOverrides = {
  clientId?: string | undefined
  sessionId?: string | undefined
  fbp?: string | undefined
  fbc?: string | undefined
  userId?: string | undefined
  timestampMicros?: number | undefined
  userData?: Record<string, any> | undefined
  userProperties?: Record<string, any> | undefined
  userAgent?: string | undefined
  ipOverride?: string | undefined
}
export type TrackServerEventResult =
  | { ok: true; status: number }
  | {
      ok: false
      reason: 'missing_credentials' | 'missing_client_id' | 'ga_error'
      status?: number
      details?: any
    }

const GA_MEASUREMENT_ID =
  process.env.GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const API_SECRET = process.env.GA_API_SECRET

function parseClientIdFromGaCookie(gaCookie?: string) {
  if (!gaCookie) return undefined
  const parts = gaCookie.split('.')
  if (parts.length >= 4) return parts.slice(2).join('.')
  return undefined
}

function parseSessionIdFromGaContainerCookie(cookieValue?: string) {
  if (!cookieValue) return undefined
  const parts = cookieValue.split('.')
  const sid = parts?.[2]
  return sid ? Number(sid) : undefined
}

export async function trackServerEvent(
  event: AnalyticsEvent,
  overrides?: TrackingOverrides
): Promise<TrackServerEventResult> {
  if (!GA_MEASUREMENT_ID || !API_SECRET) {
    return { ok: false, reason: 'missing_credentials' }
  }

  try {
    let clientId: string | undefined = overrides?.clientId
    let sessionId: number | undefined =
      (
        overrides?.sessionId !== undefined
        && overrides?.sessionId !== null
        && overrides?.sessionId !== ''
      ) ?
        Number(overrides.sessionId)
      : undefined

    const userAgent = overrides?.userAgent || 'Next.js Server'

    if (!clientId) {
      try {
        const cookieStore = await cookies()
        clientId = parseClientIdFromGaCookie(cookieStore.get('_ga')?.value)

        const containerId = GA_MEASUREMENT_ID.replace('G-', '')
        const sessionCookie = cookieStore.get(`_ga_${containerId}`)?.value
        sessionId = parseSessionIdFromGaContainerCookie(sessionCookie)
      } catch {}
    }

    if (!clientId) {
      return { ok: false, reason: 'missing_client_id' }
    }

    const userId = overrides?.userId
    const shouldSendUserData =
      !!userId
      && !!overrides?.userData
      && Object.keys(overrides.userData).length > 0

    const payload: any = {
      client_id: clientId,
      ...(userId ? { user_id: userId } : {}),
      timestamp_micros:
        overrides?.timestampMicros !== undefined ?
          overrides.timestampMicros
        : Math.floor(Date.now() * 1000),
      non_personalized_ads: false,
      ...(shouldSendUserData ? { user_data: overrides!.userData } : {}),
      ...((
        overrides?.userProperties
        && Object.keys(overrides.userProperties).length
      ) ?
        { user_properties: overrides.userProperties }
      : {}),
      ...(overrides?.ipOverride ? { ip_override: overrides.ipOverride } : {}),
      events: [
        {
          name: event.name,
          params: {
            ...(event.params || {}),
            ...(event.ecommerce || {}),
            ...(sessionId !== undefined ? { session_id: sessionId } : {}),
            engagement_time_msec: 1,
            ...(process.env.NODE_ENV === 'development' ? { debug_mode: 1 } : {})
          }
        }
      ]
    }

    const endpoint = `https://region1.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${API_SECRET}`

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    if (!response.ok) {
      const text = await response.text().catch(() => '')
      return {
        ok: false,
        reason: 'ga_error',
        status: response.status,
        details: text
      }
    }

    return { ok: true, status: response.status }
  } catch (error: any) {
    return {
      ok: false,
      reason: 'ga_error',
      details: error?.message || String(error)
    }
  }
}
