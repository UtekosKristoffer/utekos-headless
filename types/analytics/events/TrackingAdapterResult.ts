// Path: types/analytics/events/TrackingAdapterResult.ts

export type TrackingAdapterResult = {
  success: boolean
  provider:
    | 'meta'
    | 'google_analytics'
    | 'tiktok'
    | 'pinterest'
    | 'snapchat'
    | 'google'
  error?: string
  events_received?: number
  details?: unknown
}
