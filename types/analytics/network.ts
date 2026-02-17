// Path: src/types/analytics/network.ts

export type BrowserTrackingPayload = {
  eventName: string
  eventId: string
  eventSourceUrl: string
  eventTime?: number
  actionSource?: string
  userData?: Record<string, any>
  eventData?: Record<string, any>
}

// Payload for /api/checkout/capture-identifiers/route.ts
export type CaptureIdentifiersPayload = {
  cartId?: string | null
  checkoutUrl: string
  eventId?: string
  userData?: Record<string, any>
}
