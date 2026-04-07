import 'server-only'
import { cookies } from 'next/headers'
import type { CurrencyCode } from 'types/commerce/CurrencyCode'
import { parseClientIdFromGaCookie } from './parseClientIdFromGaCookie'

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
  debugMode?: boolean | undefined
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

const GA_API_SECRET = process.env.GA_API_SECRET

const GA_SERVER_CONTAINER_URL = (
  process.env.GA_SERVER_CONTAINER_URL ||
  process.env.NEXT_PUBLIC_GA_SERVER_CONTAINER_URL ||
  'https://sgtm.utekos.no'
).replace(/\/$/, '')

function toNumericSessionId(input?: string): number | undefined {
  if (!input) return undefined

  const raw = String(input).trim()
  if (!raw) return undefined

  const direct = Number(raw)
  if (Number.isFinite(direct)) {
    return direct
  }

  const normalized = raw.replace(/^GS\d+\.\d+\./, '')
  const tokens = normalized.split(/[.$]/)

  for (const token of tokens) {
    const match = token.match(/^s?(\d{6,})$/)
    if (match?.[1]) {
      const parsed = Number(match[1])
      if (Number.isFinite(parsed)) {
        return parsed
      }
    }
  }

  const embedded = normalized.match(/(?:^|[.$])s?(\d{6,})/)
  if (embedded?.[1]) {
    const parsed = Number(embedded[1])
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }

  return undefined
}

function toGaUserProperties(
  userProperties?: Record<string, unknown>
): Record<string, { value: string | number | boolean }> | undefined {
  if (!userProperties) return undefined

  const entries = Object.entries(userProperties).flatMap(([key, value]) => {
    if (value === undefined || value === null || value === '') return []

    if (
      typeof value !== 'string'
      && typeof value !== 'number'
      && typeof value !== 'boolean'
    ) {
      return []
    }

    return [[key, { value }]]
  })

  return entries.length ? Object.fromEntries(entries) : undefined
}

export async function trackServerEvent(
  event: AnalyticsEvent,
  overrides?: TrackingOverrides
): Promise<TrackServerEventResult> {
  if (!GA_MEASUREMENT_ID || !GA_API_SECRET || !GA_SERVER_CONTAINER_URL) {
    return { ok: false, reason: 'missing_credentials' }
  }

  try {
    let clientId: string | undefined = overrides?.clientId
    let sessionId: number | undefined = toNumericSessionId(overrides?.sessionId)
    const userAgent = overrides?.userAgent || 'Next.js Server'

    try {
      const cookieStore = await cookies()

      if (!clientId) {
        clientId = parseClientIdFromGaCookie(cookieStore.get('_ga')?.value)
      }

      if (sessionId === undefined) {
        const containerId = GA_MEASUREMENT_ID.replace(/^G-/, '')
        const sessionCookie = cookieStore.get(`_ga_${containerId}`)?.value
        sessionId = toNumericSessionId(sessionCookie)
      }
    } catch {
      // No request cookie context available in this execution path.
    }

    if (!clientId) {
      return { ok: false, reason: 'missing_client_id' }
    }

    const userId = overrides?.userId

    const shouldSendUserData =
      !!userId
      && !!overrides?.userData
      && Object.keys(overrides.userData).length > 0

    const userProperties = toGaUserProperties(overrides?.userProperties)

    const payload: Record<string, any> = {
      client_id: clientId,
      ...(userId ? { user_id: userId } : {}),
      timestamp_micros:
        overrides?.timestampMicros ?? Math.floor(Date.now() * 1000),
      ...(shouldSendUserData ? { user_data: overrides!.userData } : {}),
      ...(userProperties ? { user_properties: userProperties } : {}),
      ...(overrides?.ipOverride ? { ip_override: overrides.ipOverride } : {}),
      events: [
        {
          name: event.name,
          params: {
            ...(event.params || {}),
            ...(event.ecommerce || {}),
            ...(sessionId !== undefined ? { session_id: sessionId } : {}),
            engagement_time_msec: 1,
            ...(overrides?.debugMode ? { debug_mode: 1 } : {})
          }
        }
      ]
    }

    if (process.env.GA_MP_VALIDATE === '1') {
      const validationResponse = await fetch(
        `https://region1.google-analytics.com/debug/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': userAgent
          },
          body: JSON.stringify({
            ...payload,
            validation_behavior: 'ENFORCE_RECOMMENDATIONS'
          }),
          cache: 'no-store'
        }
      )

      const validationJson = await validationResponse.json().catch(() => null)
      const validationMessages = Array.isArray(
        validationJson?.validationMessages
      )
        ? validationJson.validationMessages
        : []

      if (!validationResponse.ok || validationMessages.length > 0) {
        return {
          ok: false,
          reason: 'ga_error',
          status: validationResponse.status,
          details:
            validationMessages.length > 0
              ? validationMessages
              : validationJson
        }
      }
    }

    const endpoint =
      `${GA_SERVER_CONTAINER_URL}/mp/collect` +
      `?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`

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