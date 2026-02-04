import type { CheckoutAttribution, OrderPaid } from '@types'
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
