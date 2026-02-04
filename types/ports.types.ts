import type {
  MetaEventPayload,
  ClientUserData,
  MetaEventRequestResult
} from '@types'

// Definisjon av Logger-avhengighet
export type LogFunction = (
  level: 'INFO' | 'ERROR' | 'WARN' | 'DEBUG',
  message: string,
  meta?: Record<string, unknown>,
  context?: Record<string, unknown>
) => Promise<void>

// Definisjon av Platform Senders
export type MetaSender = (
  payload: MetaEventPayload,
  userData: ClientUserData
) => Promise<MetaEventRequestResult>

export type PinterestSender = (
  payload: MetaEventPayload,
  userData: ClientUserData,
  epik: string | undefined
) => Promise<void>

export type TikTokSender = (
  payload: MetaEventPayload,
  userData: ClientUserData,
  identifiers: { ttclid?: string; ttp?: string } // exactOptionalPropertyTypes compliant
) => Promise<void>

// Samleobjekt for alle avhengigheter
export interface TrackingDependencies {
  sendMeta: MetaSender
  sendPinterest: PinterestSender
  sendTikTok: TikTokSender
  logger: LogFunction
}
