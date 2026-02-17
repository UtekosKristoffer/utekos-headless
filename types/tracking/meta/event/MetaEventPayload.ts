// Path: types/tracking/meta/event/MetaEventPayload.ts

import type { GA4DataPayload } from 'types/tracking/google/GA4DataPayload'
import type { MetaEventData } from './MetaEventData'
import type { MetaUserData } from '../MetaUserData'
import type { MetaEventType } from './MetaEventType'

export type MetaEventPayload = {
  eventName: MetaEventType | undefined
  eventId: string | undefined
  eventSourceUrl: string | undefined
  eventTime?: number | undefined
  actionSource: 'website' | undefined
  userData: MetaUserData | undefined
  eventData?: MetaEventData | undefined
  ga4Data?: GA4DataPayload | undefined
}
