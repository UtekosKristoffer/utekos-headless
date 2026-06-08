import { logAttribution } from '@/lib/tracking/log/logAttribution'
import { trackMicrosoftUetEvent } from '@/lib/tracking/microsoft-uet/trackMicrosoftUetEvent'
import { hasServiceConsent } from '@/lib/tracking/consent/hasServiceConsent'
import { USERCENTRICS_META_SERVICE_NAME } from '@/components/cookie-consent/usercentricsConfig'
import type { DispatchPixelsOptions } from 'types/cart'

export function dispatchAddToCartPixels({
  eventData
}: DispatchPixelsOptions): void {
  const {
    eventID,
    contentName,
    contentIds,
    contents,
    value,
    currency,
    totalQty
  } = eventData

  logAttribution(contentName, value)

  if (typeof window === 'undefined') return

  trackMicrosoftUetEvent({
    category: 'ecommerce',
    action: 'add_to_cart',
    label: contentName,
    value: totalQty,
    revenueValue: value,
    currency,
    productId: contentIds,
    pageType: 'cart',
    eventId: eventID
  })

  if (hasServiceConsent(USERCENTRICS_META_SERVICE_NAME) && window.fbq) {
    window.fbq(
      'track',
      'AddToCart',
      {
        content_name: contentName,
        content_ids: contentIds,
        content_type: 'product',
        value,
        currency,
        contents,
        num_items: totalQty
      },
      { eventID }
    )
  }
}
