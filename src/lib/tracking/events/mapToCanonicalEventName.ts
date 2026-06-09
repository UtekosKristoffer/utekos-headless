import type { MetaEventPayload } from 'types/tracking/meta/event'

const canonicalEventNames = {
  PageView: 'page_view',
  ViewContent: 'view_item',
  AddToCart: 'add_to_cart',
  InitiateCheckout: 'begin_checkout',
  Purchase: 'purchase',
  Search: 'search',
  Lead: 'generate_lead'
} as const satisfies Record<string, NonNullable<MetaEventPayload['canonicalEventName']>>

export function mapToCanonicalEventName(
  eventName: string
): NonNullable<MetaEventPayload['canonicalEventName']> {
  return canonicalEventNames[eventName as keyof typeof canonicalEventNames] ?? 'custom'
}
