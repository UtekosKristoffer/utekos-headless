// Path: types/persistence/PersistedCheckoutAttributionSnapshot.ts
import type { CustomerAnalyticsProfile } from 'types/analytics/identity'

export type PersistedCheckoutAttributionSnapshot = {
  cartId: string | null
  fbp?: string | undefined
  fbc?: string | undefined
  external_id?: string | undefined
  email_hash?: string | undefined
  scid?: string | undefined
  click_id?: string | undefined
  epik?: string | undefined
  client_user_agent?: string | undefined
  client_ip_address?: string | undefined
  first_name?: string | undefined
  last_name?: string | undefined
  email?: string | undefined
  phone?: string | undefined
  city?: string | undefined
  state?: string | undefined
  zip?: string | undefined
  country?: string | undefined
  checkoutUrl: string | null
  capturedAtTimestamp: number
  triggeredByEventId?: string | undefined
  gaClientId?: string | undefined
  gaSessionId?: string | undefined
  attributionSignals: CustomerAnalyticsProfile
}
