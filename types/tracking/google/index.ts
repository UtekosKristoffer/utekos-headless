// Path: src/types/tracking/google/index.ts

export type GoogleTrackingIds = {
  client_id?: string
  session_id?: string
  items?: any[]
  value?: number
  currency?: string
  
}
export type GoogleAnalyticsValidationMessage = {
  fieldPath?: string
  description?: string
  validationCode?: string
}

// Underlying types not referenced outside of this file. Should be looked into.
export type GoogleAnalyticsEventInput = {
  name: string
  client_id: string
  params: Record<string, any>
}

export type SendGoogleAnalyticsOptions = {
  session_id?: string | number
  userAgent?: string
  ip_override?: string
  timestamp_micros?: number
  debug?: boolean
}

export type SendGoogleAnalyticsResult =
  | { ok: true; status: number }
  | {
      ok: false
      status?: number
      error: string
      validationMessages?: GoogleAnalyticsValidationMessage[]
    }

export type SendGoogleAnalyticsPurchaseEventResult =
  | {
      sent: true
      result: SendGoogleAnalyticsResult
    }
  | {
      sent: false
      reason: 'missing_client_id' | 'missing_transaction_id' | 'missing_items'
    }
