import { useEffectEvent } from 'react'
import type { MetaEventType, TrackEventOptions } from '@types'
import { generateEventID } from '@/lib/tracking/utils/generateEventID'
import { sendBrowserEventToCapi } from '@/modules/analytics/client/sendBrowserEventToCapi'
import type { UnifiedAnalyticsEvent } from '@/modules/analytics/domain/types/events/UnifiedAnalyticsEvent'

export function useAnalytics() {
  const trackEvent = useEffectEvent(
    (
      eventName: MetaEventType,
      data: any = {},
      options: TrackEventOptions = {}
    ) => {
      if (typeof window === 'undefined') return

      const eventID =
        options.eventID || generateEventID().replace('evt_', 'track_')
      const sourceUrl = window.location.href
      const timestamp = Math.floor(Date.now() / 1000)

      if (window.fbq) {
        window.fbq('trackCustom', eventName, data, { eventID })
      }

      const unifiedEventName = eventName as UnifiedAnalyticsEvent['eventName']

      let analyticsData: UnifiedAnalyticsEvent['data'] = undefined

      if (Object.keys(data).length > 0) {
        analyticsData = {
          currency: data.currency || 'NOK',
          value: typeof data.value === 'number' ? data.value : undefined,

          ...(data.items && { items: data.items }),

          ...(data.content_ids && { contentIds: data.content_ids }),
          ...(data.order_id && { transactionId: String(data.order_id) })
        }
      }

      sendBrowserEventToCapi({
        eventName: unifiedEventName,
        eventId: eventID,
        occurredAt: timestamp,
        sourceUrl: sourceUrl,
        data: analyticsData
      }).catch(err =>
        console.error('[useAnalytics] Failed to send CAPI event', err)
      )
    }
  )

  return { trackEvent }
}
