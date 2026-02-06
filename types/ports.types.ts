import type {
  MetaEventPayload,
  ClientUserData,
  MetaUserData,
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
  sendSnapchat: (
    payload: MetaEventPayload,
    userData: MetaUserData,
    extra?: { sc_cookie1?: string; sc_click_id?: string }
  ) => Promise<any>
  sendGoogle: (
    payload: MetaEventPayload,
    context: { clientIp?: string; userAgent?: string }
  ) => Promise<any>
  logger: LogFunction
}
