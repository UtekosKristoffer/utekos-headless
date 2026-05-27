import 'server-only'

import { checkGoogleTagManagerScriptHealth } from './checkGoogleTagManagerScriptHealth'
import { mapToGA4EventName } from './mapToGA4EventName'
import { trackServerEvent } from './trackingServerEvent'

import type { MetaEventPayload } from 'types/tracking/meta'
import type { GoogleBrowserEventResult } from 'types/tracking/event'

const GTM_OWNED_EVENTS = new Set(['PageView', 'ViewContent', 'AddToCart', 'InitiateCheckout', 'Purchase'])

const GOOGLE_TAG_MANAGER_ID = process.env.NEXT_GOOGLE_GTM_ID || 'GTM-5TWMJQFP'

const GA_SERVER_CONTAINER_URL = (
  process.env.GA_SERVER_CONTAINER_URL
  || process.env.NEXT_PUBLIC_GA_SERVER_CONTAINER_URL
  || process.env.NEXT_PUBLIC_SGTM_ENDPOINT
  || 'https://sgtm.utekos.no'
).replace(/\/$/, '')

const SHOULD_FALL_BACK_FOR_GTM_OWNED_EVENTS = process.env.GA_GTM_OWNED_SERVER_FALLBACK !== '0'

function buildEventParams(eventData?: Record<string, unknown>): Record<string, unknown> {
  const data = eventData ?? {}
  const params: Record<string, unknown> = {}

  if (data.value !== undefined) {
    const value = Number(data.value)

    if (Number.isFinite(value)) {
      params.value = value
    }
  }

  if (typeof data.currency === 'string' && data.currency) {
    params.currency = data.currency
  }

  if (typeof data.coupon === 'string' && data.coupon) {
    params.coupon = data.coupon
  }

  if (typeof data.url === 'string' && data.url) {
    params.page_location = data.url
  }

  if (typeof data.page_location === 'string' && data.page_location) {
    params.page_location = data.page_location
  }

  if (typeof data.title === 'string' && data.title) {
    params.page_title = data.title
  }

  if (typeof data.page_title === 'string' && data.page_title) {
    params.page_title = data.page_title
  }

  if (typeof data.search_term === 'string' && data.search_term) {
    params.search_term = data.search_term
  }

  if (Array.isArray(data.content_ids) && data.content_ids.length > 0) {
    params.items = data.content_ids.map((id: unknown, index: number) => ({
      item_id: String(id),
      ...(data.content_name ? { item_name: String(data.content_name) } : {}),
      index
    }))
  }

  return params
}

export async function sendGA4BrowserEvent(
  payload: MetaEventPayload,
  userContext: { clientIp?: string | undefined; userAgent?: string | undefined }
): Promise<GoogleBrowserEventResult> {
  const { eventName, eventData, ga4Data } = payload

  if (!eventName) {
    return {
      success: false,
      provider: 'google',
      error: 'Missing eventName'
    }
  }

  if (!ga4Data?.client_id) {
    return {
      success: false,
      provider: 'google',
      error: 'Missing client_id'
    }
  }

  const isGtmOwnedEvent = GTM_OWNED_EVENTS.has(eventName)

  if (isGtmOwnedEvent && !SHOULD_FALL_BACK_FOR_GTM_OWNED_EVENTS) {
    return {
      success: true,
      provider: 'google',
      transport: 'gtm_web_to_sgtm',
      skipped: true,
      reason: 'handled_by_google_tag'
    }
  }

  const gaEventName = mapToGA4EventName(eventName)
  const gtmScriptHealth =
    isGtmOwnedEvent ?
      await checkGoogleTagManagerScriptHealth({
        gtmId: GOOGLE_TAG_MANAGER_ID,
        scriptOrigin: GA_SERVER_CONTAINER_URL
      })
    : { ok: false }

  if (isGtmOwnedEvent && gtmScriptHealth.ok) {
    return {
      success: true,
      provider: 'google',
      transport: 'gtm_web_to_sgtm',
      skipped: true,
      reason: 'handled_by_healthy_google_tag'
    }
  }

  const result = await trackServerEvent(
    {
      name: gaEventName,
      params: buildEventParams(eventData)
    },
    {
      clientId: ga4Data.client_id,
      sessionId: ga4Data.session_id !== undefined ? String(ga4Data.session_id) : undefined,
      userAgent: userContext.userAgent,
      ipOverride: userContext.clientIp,
      debugMode: process.env.GA_MP_DEBUG === '1',
      allowDirectFallback: true,
      skipSgtmDispatch: isGtmOwnedEvent
    }
  )

  if (!result.ok) {
    return {
      success: false,
      provider: 'google',
      error: result.reason,
      ...(result.details !== undefined ? { details: result.details } : {})
    }
  }

  return {
    success: true,
    provider: 'google',
    transport: result.transport,
    fallbackUsed: result.fallbackUsed
  }
}
