import type { ClientUserData, MetaEventPayload, MetaEventRequestResult } from 'types/tracking/meta'

export type LogFunction = (
  level: 'INFO' | 'ERROR' | 'WARN' | 'DEBUG',
  message: string,
  meta?: Record<string, unknown>,
  context?: Record<string, unknown>
) => Promise<void>

export type MetaSender = (
  payload: MetaEventPayload,
  userData: ClientUserData
) => Promise<MetaEventRequestResult>

export type GoogleBrowserEventTransport = 'gtm_web_to_sgtm' | 'sgtm' | 'direct_ga4'

export type GoogleBrowserEventSkipReason = 'handled_by_google_tag' | 'handled_by_healthy_google_tag'

export type GoogleBrowserEventResult =
  | {
      success: true
      provider: 'google'
      transport: GoogleBrowserEventTransport
      skipped?: boolean | undefined
      reason?: GoogleBrowserEventSkipReason | undefined
      fallbackUsed?: boolean | undefined
    }
  | {
      success: false
      provider: 'google'
      error: string
      details?: unknown | undefined
    }

export type GoogleSender = (
  payload: MetaEventPayload,
  context: { clientIp?: string | undefined; userAgent?: string | undefined }
) => Promise<GoogleBrowserEventResult>

export interface TrackingDependencies {
  sendMeta: MetaSender
  sendGoogle: GoogleSender
  logger: LogFunction
}
