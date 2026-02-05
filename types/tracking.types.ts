import type {
  CheckoutAttribution,
  ClientUserData,
  OrderPaid,
  MetaEventPayload,
  MetaUserData
} from '@types'
import type { NextResponse } from 'next/server'
export interface EnrichedCustomerData {
  email?: string | undefined
  phone?: string | undefined
  externalId?: string | undefined
  firstName?: string | undefined
  lastName?: string | undefined
  city?: string | undefined
  state?: string | undefined
  zip?: string | undefined
  countryCode?: string | undefined
  clientIp?: string | undefined
  userAgent?: string | undefined
  fbp?: string | undefined
  fbc?: string | undefined
  ttclid?: string | undefined
  ttp?: string | undefined
}

export interface TrackingContext {
  order: OrderPaid
  customer: EnrichedCustomerData
  redisData: CheckoutAttribution | null
  contentIds: string[]
  ga_client_id?: string
  ga_session_id?: string
}

export interface ServiceResult {
  success: boolean
  events_received?: number
  fbtrace_id?: string
  error?: string
  details?: any
}

export type WebhookResult =
  | { success: true; order: OrderPaid }
  | { success: false; errorResponse: NextResponse }

export interface EnrichedEventContext {
  userData: ClientUserData
  clientIp: string
  userAgent: string
  sourceInfo: {
    emoji: string
    name: string
  }
}
export interface EventCookies {
  fbp?: string | undefined
  fbc?: string | undefined
  externalId?: string | undefined
  userHash?: string | undefined
  scCid?: string | undefined
  epik?: string | undefined
  ttclid?: string | undefined
  ttp?: string | undefined
}

export type ValidationResult =
  | { success: true; payload: MetaEventPayload }
  | { success: false; errorResponse: NextResponse }

export interface TrackingServiceResult {
  success: boolean
  events_received?: number | undefined
  fbtrace_id?: string | undefined
  error?: string | undefined
  details?: unknown | undefined
}

export interface TrackingUserData extends MetaUserData {
  scid?: string | undefined
  click_id?: string | undefined
  epik?: string | undefined
  ttclid?: string | undefined
  ttp?: string | undefined
}

export interface GA4DataPayload {
  client_id?: string
  session_id?: string
  items?: any[]
  value?: number
  currency?: string
}

export interface GoogleIds {
  clientId?: string | undefined
  sessionId?: string | undefined
}

export interface PinterestLeadProps {
  eventId: string
  emailHash: string
  clientIp: string | undefined
  userAgent: string
  url: string
  clickId?: string | undefined
  fbp?: string | undefined
  fbc?: string | undefined
}

export interface TikTokLeadProps {
  eventId: string
  emailHash: string
  clientIp: string | undefined
  userAgent: string
  url: string
  ttclid?: string | undefined
  ttp?: string | undefined
}
