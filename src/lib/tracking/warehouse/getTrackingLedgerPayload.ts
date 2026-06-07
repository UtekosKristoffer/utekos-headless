import type { MetaEventPayload } from 'types/tracking/meta'

export function getTrackingLedgerPayload(payload: MetaEventPayload): Record<string, unknown> {
  return {
    eventName: payload.eventName,
    eventId: payload.eventId,
    eventSourceUrl: payload.eventSourceUrl,
    eventTime: payload.eventTime,
    actionSource: payload.actionSource,
    eventData: payload.eventData,
    ga4Data: payload.ga4Data ? { hasClientId: !!payload.ga4Data.client_id } : undefined
  }
}
