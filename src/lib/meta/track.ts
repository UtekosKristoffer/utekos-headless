// Path: lib/meta/track.ts
type ContentItem = { id: string; quantity: number; item_price?: number }
type TrackCommon = { eventID?: string }
type TrackViewContent = TrackCommon & {
  content_type: 'product' | 'product_group'
  content_ids?: string[]
  contents?: ContentItem[]
  value?: number
  currency?: string
}
type TrackAddToCart = TrackCommon & {
  contents: ContentItem[]
  content_type: 'product'
  value?: number
  currency?: string
}
type TrackInitiateCheckout = TrackCommon & {
  contents?: ContentItem[]
  num_items?: number
  value?: number
  currency?: string
}
type TrackPurchase = TrackCommon & {
  contents: ContentItem[]
  content_type: 'product'
  value: number
  currency: string
  order_id?: string
}

export function trackViewContent(p: TrackViewContent) {
  if (typeof window !== 'undefined' && window.fbq)
    window.fbq('track', 'ViewContent', p, { eventID: p.eventID })
}
export function trackAddToCart(p: TrackAddToCart) {
  if (typeof window !== 'undefined' && window.fbq)
    window.fbq('track', 'AddToCart', p, { eventID: p.eventID })
}
export function trackInitiateCheckout(p: TrackInitiateCheckout) {
  if (typeof window !== 'undefined' && window.fbq)
    window.fbq('track', 'InitiateCheckout', p, { eventID: p.eventID })
}
export function trackPurchase(p: TrackPurchase) {
  if (typeof window !== 'undefined' && window.fbq)
    window.fbq('track', 'Purchase', p, { eventID: p.eventID })
}
