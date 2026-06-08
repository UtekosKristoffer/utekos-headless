import { mapToGA4EventName } from './mapToGA4EventName'

function buildItems(eventData: Record<string, unknown>): Array<Record<string, unknown>> | undefined {
  if (Array.isArray(eventData.contents)) {
    return eventData.contents.map(content => {
      const item = content as Record<string, unknown>

      return {
        item_id: item.id,
        quantity: item.quantity,
        price: item.item_price
      }
    })
  }

  if (Array.isArray(eventData.content_ids)) {
    return eventData.content_ids.map(id => ({
      item_id: String(id),
      ...(eventData.content_name ? { item_name: eventData.content_name } : {})
    }))
  }

  return undefined
}

export function pushGoogleDataLayerEvent(
  eventName: string,
  eventId: string,
  eventData: Record<string, unknown> = {}
): void {
  if (typeof window === 'undefined') {
    return
  }

  const items = buildItems(eventData)
  const ecommerce = {
    ...(eventData.currency ? { currency: eventData.currency } : {}),
    ...(eventData.value !== undefined ? { value: eventData.value } : {}),
    ...(eventData.coupon ? { coupon: eventData.coupon } : {}),
    ...(items ? { items } : {})
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: mapToGA4EventName(eventName),
    event_id: eventId,
    ...(Object.keys(ecommerce).length > 0 ? { ecommerce } : {}),
    event_data: eventData
  })
}
