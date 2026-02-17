import { prepareAddToCartEvent } from '@/lib/tracking/logic/prepareAddToCartEvent'
import { dispatchAddToCartPixels } from '@/lib/tracking/pixels/dispatchAddToCartPixels'
import { sendAddToCartCapi } from '@/lib/tracking/capi/sendAddToCartCapi'
import type { TrackAddToCartOptions } from 'types/cart'

export async function trackAddToCart(
  input: TrackAddToCartOptions
): Promise<void> {
  const eventData = prepareAddToCartEvent(input)

  dispatchAddToCartPixels({
    eventData,
    product: input.product,
    selectedVariant: input.selectedVariant
  })

  await sendAddToCartCapi(eventData)
}
