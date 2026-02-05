import type {
  MetaEventPayload,
  ClientUserData,
  MetaEventRequestResult
} from '@types'

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

export type PinterestSender = (
  payload: MetaEventPayload,
  userData: ClientUserData,
  epik: string | undefined
) => Promise<void>

export type TikTokSender = (
  payload: MetaEventPayload,
  userData: ClientUserData,
  identifiers: { ttclid?: string; ttp?: string }
) => Promise<void>

export interface TrackingDependencies {
  sendMeta: MetaSender
  sendPinterest: PinterestSender
  sendTikTok: TikTokSender
  sendGoogle: (
    payload: MetaEventPayload,
    context: { clientIp?: string; userAgent?: string }
  ) => Promise<any>
  logger: LogFunction
}
