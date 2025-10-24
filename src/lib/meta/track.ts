// lib/meta/track.ts

export type ContentItem = Readonly<{
  id: string
  quantity?: number
  item_price?: number
  delivery_category?: string
}>

type TrackOptions = Readonly<{ eventID?: string }>

export type ViewContentParams = Readonly<{
  content_type: 'product' | 'product_group'
  content_ids?: string[]
  contents?: ContentItem[]
  value?: number
  currency?: string
}>

export type AddToCartParams = Readonly<{
  contents: ContentItem[]
  content_type: 'product'
  value?: number
  currency?: string
}>

export type InitiateCheckoutParams = Readonly<{
  contents?: ContentItem[]
  num_items?: number
  value?: number
  currency?: string
}>

// Beholdes for andre løp, men IKKE kall denne i dagens Shopify-flow.
export type PurchaseParams = Readonly<{
  contents: ContentItem[]
  content_type: 'product'
  value: number
  currency: string
  order_id?: string
}>

function hasFbq(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function'
}

export function trackViewContent(
  params: ViewContentParams,
  opts?: TrackOptions
): void {
  if (!hasFbq()) return
  if (opts?.eventID)
    window.fbq('track', 'ViewContent', params, { eventID: opts.eventID })
  else window.fbq('track', 'ViewContent', params)
}

export function trackAddToCart(
  params: AddToCartParams,
  opts?: TrackOptions
): void {
  if (!hasFbq()) return
  if (opts?.eventID)
    window.fbq('track', 'AddToCart', params, { eventID: opts.eventID })
  else window.fbq('track', 'AddToCart', params)
}

export function trackInitiateCheckout(
  params: InitiateCheckoutParams,
  opts?: TrackOptions
): void {
  if (!hasFbq()) return
  if (opts?.eventID)
    window.fbq('track', 'InitiateCheckout', params, { eventID: opts.eventID })
  else window.fbq('track', 'InitiateCheckout', params)
}

// Tilgjengelig for evt. andre flater, men IKKE bruk i Next.js-butikken nå.
export function trackPurchase(
  _params: PurchaseParams,
  _opts?: TrackOptions
): void {
  // Avsiktlig tom for å unngå dobbelt Purchase i Shopify-løpet.
  // Purchase sendes i Custom Pixel på takk-siden + CAPI-webhook, med dedupe på event_id.
}
