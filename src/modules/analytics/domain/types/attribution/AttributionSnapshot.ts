// Path: src/modules/analytics/domain/types/attribution/AttributionSnapshot.ts

export type AttributionSnapshot = {
  cartId: string | null
  checkoutUrl?: string | null
  capturedAtTimestamp: number
  attributionSignals: {
    email?: string
    phone?: string
    firstName?: string
    lastName?: string
    city?: string
    state?: string
    zip?: string
    country?: string
    externalId?: string
    emailHash?: string
    clientUserAgent?: string
    clientIpAddress?: string
    fbp?: string
    fbc?: string
    fbclid?: string
    gaClientId?: string
    gaSessionId?: string
    gclid?: string
    ttclid?: string
    ttp?: string
    epik?: string
    scid?: string
    clickId?: string
  }
}
