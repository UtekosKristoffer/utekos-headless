import 'server-only'
import { mapToGA4EventName } from './mapToGA4EventName'
import { trackServerEvent } from './trackingServerEvent'

const GTM_OWNED_EVENTS = new Set([
  'PageView',
  'ViewContent',
  'AddToCart',
  'InitiateCheckout',
  'Purchase'
])

function buildEventParams(eventData?: Record<string, any>): Record<string, any> {
  const data = eventData ?? {}
  const params: Record<string, any> = {}

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
  payload: any,
  userContext: { clientIp?: string; userAgent?: string }
) {
  const { eventName, eventData, ga4Data } = payload ?? {}

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


  if (GTM_OWNED_EVENTS.has(eventName)) {
    return {
      success: true,
      provider: 'google',
      transport: 'gtm_web_to_sgtm',
      skipped: true,
      reason: 'handled_by_google_tag'
    }
  }

  const gaEventName = mapToGA4EventName(eventName)

  const result = await trackServerEvent(
    {
      name: gaEventName,
      params: buildEventParams(eventData)
    },
    {
      clientId: ga4Data.client_id,
      sessionId:
        ga4Data.session_id !== undefined ?
          String(ga4Data.session_id)
        : undefined,
      userAgent: userContext.userAgent,
      ipOverride: userContext.clientIp,
      debugMode: process.env.GA_MP_DEBUG === '1'
    }
  )

  if (!result.ok) {
    return {
      success: false,
      provider: 'google',
      error: result.reason,
      details: result.details
    }
  }

  return {
    success: true,
    provider: 'google',
    transport: 'next_api_to_sgtm'
  }
}