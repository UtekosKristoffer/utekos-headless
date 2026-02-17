import type { CheckoutAttribution, MetaUserData } from '@types'

export interface ExtendedUserData extends MetaUserData {
  scid?: string | undefined
  click_id?: string | undefined
  epik?: string | undefined
  email_hash?: string | undefined
}

export interface CaptureContext {
  cookies: {
    fbp?: string | undefined
    fbc?: string | undefined
    externalId?: string | undefined
    userHash?: string | undefined
    scid?: string | undefined
    click_id?: string | undefined
    epik?: string | undefined
    gaClientId?: string | undefined
    gaSessionId?: string | undefined
  }
  clientIp: string
  userAgent: string
}

export type CaptureResult =
  | { success: true }
  | { success: false; error: string }

export interface CaptureDependencies {
  redisSet: (
    key: string,
    value: CheckoutAttribution,
    ttlSeconds: number
  ) => Promise<void>
  logger: (
    level: 'INFO' | 'ERROR',
    message: string,
    meta?: Record<string, unknown>,
    context?: Record<string, unknown>
  ) => Promise<void>
}
