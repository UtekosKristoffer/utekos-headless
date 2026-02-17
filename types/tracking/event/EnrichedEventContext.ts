// Path: types/tracking/event/EnrichedEventContext.ts
import type { ClientUserData } from 'types/tracking/meta/ClientUserData'

export type EnrichedEventContext = {
  userData: ClientUserData
  clientIp: string
  userAgent: string
  sourceInfo: {
    emoji: string
    name: string
  }
}
