// Path: types/analytics/events/UnifiedAnalyticsEvent.ts

import type { CustomerAnalyticsProfile } from 'types/analytics/identity'
import type { AnalyticsItem } from '@/modules/analytics/domain/schemas/events.schema'
import type { CurrencyCode } from 'types/commerce'

export type UnifiedAnalyticsEvent = {
  eventId: string
  eventName:
    | 'Purchase'
    | 'Lead'
    | 'AddToCart'
    | 'PageView'
    | 'ViewContent'
    | 'InitiateCheckout'
  occurredAt: number
  sourceUrl: string | null
  user: CustomerAnalyticsProfile
  items?: AnalyticsItem[] | undefined
  value?: string | number
  name?: string
  data?: {
    googleAnalyticsClientId?: string | undefined
    googleAnalyticsSessionId?: string | undefined
    sessionId?: string | undefined
    transactionId?: string | undefined
    contents?: AnalyticsItem[]
    contentIds?: string[]
    value?: number
    currency?: CurrencyCode | string
    tax?: number
    shipping?: number
    [key: string]: any
  }
}
