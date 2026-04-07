import 'server-only'
import { randomUUID } from 'crypto'
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
  params?: Record<string, unknown>
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
  userData?: Record<string, unknown> | undefined
  userProperties?: Record<string, unknown> | undefined
  userAgent?: string | undefined
  ipOverride?: string | undefined
  debugMode?: boolean | undefined
  requestId?: string | undefined
  allowDirectFallback?: boolean | undefined
  fallbackOnSgtmSuccess?: boolean | undefined
}

export type TrackTransport = 'sgtm' | 'direct_ga4'

export type TrackFallbackTrigger = 'sgtm_error' | 'confirmed_sgtm_blocker'

export type TrackPayloadSummary = {
  eventName: string
  measurementId: string
  sgtmHost: string
  hasClientId: boolean
  hasSessionId: boolean
  hasUserId: boolean
  hasUserData: boolean
  userPropertyCount: number
  itemCount: number
  value?: number
  currency?: string
  transactionId?: string
}

export type TrackDispatchDiagnostics = {
  requestId: string
  payloadSummary: TrackPayloadSummary
  validation: {
    attempted: boolean
    status?: number | undefined
    messageCount?: number | undefined
  }
  sgtm: {
    attempted: boolean
    status?: number | undefined
    ok?: boolean | undefined
    responseText?: string | undefined
  }
  directGa4: {
    attempted: boolean
    trigger?: TrackFallbackTrigger | undefined
    status?: number | undefined
    ok?: boolean | undefined
    responseText?: string | undefined
  }
}

export type TrackServerEventResult =
  | {
      ok: true
      status: number
      requestId: string
      transport: TrackTransport
      fallbackUsed: boolean
      diagnostics: TrackDispatchDiagnostics
    }
  | {
      ok: false
      reason: 'missing_credentials' | 'missing_client_id' | 'ga_error'
      requestId: string
      fallbackUsed: boolean
      status?: number | undefined
      transport?: TrackTransport | undefined
      details?: unknown
      diagnostics: TrackDispatchDiagnostics
    }

const GA_MEASUREMENT_ID =
  process.env.GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

const GA_API_SECRET = process.env.GA_API_SECRET

const GA_SERVER_CONTAINER_URL = (
  process.env.GA_SERVER_CONTAINER_URL ||
  process.env.NEXT_PUBLIC_GA_SERVER_CONTAINER_URL ||
  'https://sgtm.utekos.no'
).replace(/\/$/, '')

const GA_DIRECT_COLLECT_URL =
  'https://region1.google-analytics.com/mp/collect' +
  `?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`

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

function truncateText(input: string, maxLength = 1200): string {
  return input.length <= maxLength
    ? input
    : `${input.slice(0, maxLength)}...<truncated>`
}

function buildPayloadSummary(
  event: AnalyticsEvent,
  tracking: {
    clientId?: string | undefined
    sessionId?: number | undefined
    userId?: string | undefined
    userData?: Record<string, unknown> | undefined
    userProperties?:
      | Record<string, { value: string | number | boolean }>
      | undefined
  }
): TrackPayloadSummary {
  const mergedParams = {
    ...(event.params || {}),
    ...(event.ecommerce || {})
  } as Record<string, unknown>

  const items = Array.isArray(mergedParams.items) ? mergedParams.items : []
  const rawValue = mergedParams.value
  const currency =
    typeof mergedParams.currency === 'string' ? mergedParams.currency : undefined
  const transactionId =
    typeof mergedParams.transaction_id === 'string'
      ? mergedParams.transaction_id
      : undefined
  const value =
    typeof rawValue === 'number'
      ? rawValue
      : Number.isFinite(Number(rawValue))
      ? Number(rawValue)
      : undefined

  return {
    eventName: event.name,
    measurementId: GA_MEASUREMENT_ID || 'missing',
    sgtmHost: GA_SERVER_CONTAINER_URL,
    hasClientId: !!tracking.clientId,
    hasSessionId: tracking.sessionId !== undefined,
    hasUserId: !!tracking.userId,
    hasUserData: !!tracking.userData && Object.keys(tracking.userData).length > 0,
    userPropertyCount: tracking.userProperties
      ? Object.keys(tracking.userProperties).length
      : 0,
    itemCount: items.length,
    ...(value !== undefined ? { value } : {}),
    ...(currency ? { currency } : {}),
    ...(transactionId ? { transactionId } : {})
  }
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

function shouldUseDirectFallback(
  overrides: TrackingOverrides | undefined,
  sgtmOk: boolean
): TrackFallbackTrigger | undefined {
  const fallbackEnabled =
    overrides?.allowDirectFallback === true
    && process.env.GA_DIRECT_FALLBACK_ENABLED === '1'

  if (!fallbackEnabled) {
    return undefined
  }

  if (!sgtmOk) {
    return 'sgtm_error'
  }

  if (
    overrides?.fallbackOnSgtmSuccess === true
    && process.env.GA_DIRECT_FALLBACK_ON_SGTM_SUCCESS === '1'
  ) {
    return 'confirmed_sgtm_blocker'
  }

  return undefined
}

async function postMeasurementProtocolRequest(
  endpoint: string,
  payload: Record<string, unknown>,
  userAgent: string
): Promise<{
  ok: boolean
  status?: number | undefined
  responseText?: string | undefined
}> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })

    const responseText = response.ok ?
      undefined
    : truncateText(await response.text().catch(() => ''))

    return {
      ok: response.ok,
      status: response.status,
      ...(responseText ? { responseText } : {})
    }
  } catch (error: unknown) {
    return {
      ok: false,
      responseText: truncateText(getErrorMessage(error))
    }
  }
}

export async function trackServerEvent(
  event: AnalyticsEvent,
  overrides?: TrackingOverrides
): Promise<TrackServerEventResult> {
  const requestId = overrides?.requestId || randomUUID()
  const diagnostics: TrackDispatchDiagnostics = {
    requestId,
    payloadSummary: {
      eventName: event.name,
      measurementId: GA_MEASUREMENT_ID || 'missing',
      sgtmHost: GA_SERVER_CONTAINER_URL,
      hasClientId: false,
      hasSessionId: false,
      hasUserId: false,
      hasUserData: false,
      userPropertyCount: 0,
      itemCount: 0
    },
    validation: {
      attempted: process.env.GA_MP_VALIDATE === '1'
    },
    sgtm: {
      attempted: false
    },
    directGa4: {
      attempted: false
    }
  }

  if (!GA_MEASUREMENT_ID || !GA_API_SECRET || !GA_SERVER_CONTAINER_URL) {
    return {
      ok: false,
      reason: 'missing_credentials',
      requestId,
      fallbackUsed: false,
      diagnostics
    }
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
      diagnostics.payloadSummary = buildPayloadSummary(event, {
        clientId,
        sessionId,
        userId: overrides?.userId
      })

      return {
        ok: false,
        reason: 'missing_client_id',
        requestId,
        fallbackUsed: false,
        diagnostics
      }
    }

    const userId = overrides?.userId

    const shouldSendUserData =
      !!userId
      && !!overrides?.userData
      && Object.keys(overrides.userData).length > 0

    const userProperties = toGaUserProperties(overrides?.userProperties)
    diagnostics.payloadSummary = buildPayloadSummary(event, {
      clientId,
      sessionId,
      userId,
      userData: overrides?.userData,
      userProperties
    })

    const payload: Record<string, unknown> = {
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

      const validationJson: unknown = await validationResponse
        .json()
        .catch(() => null)
      const validationMessages =
        typeof validationJson === 'object'
        && validationJson !== null
        && 'validationMessages' in validationJson
        && Array.isArray(validationJson.validationMessages)
          ? validationJson.validationMessages
          : []

      diagnostics.validation = {
        attempted: true,
        status: validationResponse.status,
        messageCount: validationMessages.length
      }

      if (!validationResponse.ok || validationMessages.length > 0) {
        return {
          ok: false,
          reason: 'ga_error',
          requestId,
          fallbackUsed: false,
          status: validationResponse.status,
          details: validationMessages.length > 0 ? validationMessages : validationJson,
          diagnostics
        }
      }
    }

    const endpoint =
      `${GA_SERVER_CONTAINER_URL}/mp/collect` +
      `?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`

    const sgtmResult = await postMeasurementProtocolRequest(
      endpoint,
      payload,
      userAgent
    )

    diagnostics.sgtm = {
      attempted: true,
      status: sgtmResult.status,
      ok: sgtmResult.ok,
      ...(sgtmResult.responseText ? { responseText: sgtmResult.responseText } : {})
    }

    const directFallbackTrigger = shouldUseDirectFallback(
      overrides,
      sgtmResult.ok
    )

    if (directFallbackTrigger) {
      const directGa4Result = await postMeasurementProtocolRequest(
        GA_DIRECT_COLLECT_URL,
        payload,
        userAgent
      )

      diagnostics.directGa4 = {
        attempted: true,
        trigger: directFallbackTrigger,
        status: directGa4Result.status,
        ok: directGa4Result.ok,
        ...(directGa4Result.responseText ?
          { responseText: directGa4Result.responseText }
        : {})
      }

      if (directGa4Result.ok) {
        return {
          ok: true,
          status: directGa4Result.status ?? sgtmResult.status ?? 200,
          requestId,
          transport: 'direct_ga4',
          fallbackUsed: true,
          diagnostics
        }
      }
    }

    if (!sgtmResult.ok) {
      return {
        ok: false,
        reason: 'ga_error',
        requestId,
        fallbackUsed: diagnostics.directGa4.ok === true,
        status: diagnostics.directGa4.status ?? sgtmResult.status,
        details: {
          sgtm: diagnostics.sgtm,
          ...(diagnostics.directGa4.attempted ? { directGa4: diagnostics.directGa4 } : {})
        },
        diagnostics
      }
    }

    return {
      ok: true,
      status: sgtmResult.status ?? 200,
      requestId,
      transport: 'sgtm',
      fallbackUsed: false,
      diagnostics
    }
  } catch (error: unknown) {
    return {
      ok: false,
      reason: 'ga_error',
      requestId,
      fallbackUsed: false,
      details: getErrorMessage(error),
      diagnostics
    }
  }
}
