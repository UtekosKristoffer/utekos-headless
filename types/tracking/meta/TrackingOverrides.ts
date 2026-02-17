// Path: types/tracking/meta/TrackingOverrides.ts
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
