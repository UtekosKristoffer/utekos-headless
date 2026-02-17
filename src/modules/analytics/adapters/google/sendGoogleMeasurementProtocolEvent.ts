// Path: src/modules/analytics/adapters/google/endGoogleMeasurementProtocolEvent.ts

import { logToAppLogs } from '@/lib/tracking/log/logToAppLogs'
import type { UnifiedAnalyticsEvent } from '@/modules/analytics/domain/types/events/UnifiedAnalyticsEvent'
import type { TrackingAdapterResult } from 'types/analytics/events/TrackingAdapterResult'
import { mapUnifiedEventToGooglePayload } from './mappers/mapUnifiedEventToGooglePayload'

const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const GA4_API_SECRET = process.env.GA_API_SECRET
const GA4_ENDPOINT = 'https://www.google-analytics.com/mp/collect'

/**
 * GOOGLE ANALYTICS 4 ADAPTER (Measurement Protocol)
 * Sends server-side events to GA4 with support for Ecommerce and User Data.
 */
export async function sendGoogleMeasurementProtocolEvent(
  event: UnifiedAnalyticsEvent
): Promise<TrackingAdapterResult> {
  const provider = 'google'

  if (!GA4_MEASUREMENT_ID || !GA4_API_SECRET) {
    return {
      success: false,
      provider,
      error: 'Missing GA4 Configuration (Measurement ID or API Secret)'
    }
  }

  const payload = mapUnifiedEventToGooglePayload(event)

  try {
    const url = new URL(GA4_ENDPOINT)
    url.searchParams.append('measurement_id', GA4_MEASUREMENT_ID)
    url.searchParams.append('api_secret', GA4_API_SECRET)

    // 4. Execute Request
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    // Note: GA4 MP returns 204 No Content on success.
    // It does NOT return JSON body errors unless using the /debug endpoint.
    if (!response.ok) {
      throw new Error(
        `GA4 API Error: ${response.status} ${response.statusText}`
      )
    }
    await logToAppLogs('INFO', `📈 Google GA4 Sent: ${event.eventName}`, {
      eventId: event.eventId,
      clientId: payload.client_id,
      sessionId: event.user.gaSessionId
    })

    return {
      success: true,
      provider,
      events_received: 1
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown GA4 Error'

    await logToAppLogs('ERROR', `🚨 Google GA4 Failed: ${event.eventName}`, {
      error: errorMessage
    })

    return {
      success: false,
      provider,
      error: errorMessage
    }
  }
}
