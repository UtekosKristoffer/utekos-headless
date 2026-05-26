import { getClientMetaUserData } from '@/lib/tracking/meta/getClientMetaUserData'
import { getClientGA4Data } from '@/lib/tracking/google/getClientGA4Data'
import { sendMetaPixelEvent } from '@/lib/tracking/meta/sendMetaPixelEvent'
import type { MetaEventData, MetaEventPayload, MetaEventType } from 'types/tracking/meta/event'
import type { MetaUserData } from 'types/tracking/meta'
import type { GA4DataPayload } from 'types/tracking/google/GA4DataPayload'

type DispatchMetaTrackingEventInput = {
  eventName: MetaEventType
  eventId: string
  eventData?: MetaEventData
  eventSourceUrl?: string
  eventTime?: number
  userData?: Partial<MetaUserData>
  ga4Data?: GA4DataPayload
  sendBrowserEvent?: boolean
}

export async function dispatchMetaTrackingEvent({
  eventName,
  eventId,
  eventData,
  eventSourceUrl,
  eventTime,
  userData,
  ga4Data,
  sendBrowserEvent = true
}: DispatchMetaTrackingEventInput): Promise<void> {
  const resolvedGa4Data = ga4Data ?? getClientGA4Data()

  if (sendBrowserEvent) {
    sendMetaPixelEvent(eventName, eventData, eventId)
  }

  const payload: MetaEventPayload = {
    eventName,
    eventId,
    eventSourceUrl: eventSourceUrl || (typeof window !== 'undefined' ? window.location.href : undefined),
    eventTime: eventTime || Math.floor(Date.now() / 1000),
    actionSource: 'website',
    userData: getClientMetaUserData(userData),
    eventData,
    ga4Data: resolvedGa4Data
  }

  try {
    const response = await fetch('/api/tracking-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[Meta Tracking] ${eventName} failed (${response.status})`, errorText.slice(0, 300))
    }
  } catch (error) {
    console.error(`[Meta Tracking] ${eventName} network failure`, error)
  }
}
