import { dispatchMetaTrackingEvent } from '@/lib/tracking/meta/dispatchMetaTrackingEvent'
import type { AddToCartEventData } from 'types/cart'

export async function sendAddToCartCapi(eventData: AddToCartEventData): Promise<void> {
  await dispatchMetaTrackingEvent({
    eventName: 'AddToCart',
    eventId: eventData.eventID,
    sendBrowserEvent: false,
    eventData: {
      value: eventData.value,
      currency: eventData.currency,
      content_name: eventData.contentName,
      content_ids: eventData.contentIds,
      content_type: 'product',
      contents: eventData.contents,
      num_items: eventData.totalQty
    }
  })
}
