'use server'

import { performCartCreateMutation } from '@/lib/actions/perform/performCartCreateMutation'
import { performCartLinesAddMutation } from '@/lib/actions/perform/performCartLinesAddMutation'
import { mapThrownErrorToActionResult } from '@/lib/errors/mapThrownErrorToActionResult'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { setCartIdInCookie } from '@/lib/helpers/cart/setCartIdInCookie'
import { normalizeCart } from '@/lib/helpers/normalizers/normalizeCart'
import { validateAddLineInput } from '@/lib/helpers/validations/validateAddLineInput'
import { updateTag } from 'next/cache'
import { trackServerEvent } from '@/lib/tracking/google/trackingServerEvent'
import type { AnalyticsItem } from '@types'
import type { CartActionsResult, CartResponse } from '@types'
type CartLineInput = {
  variantId: string
  quantity: number
}

export const addCartLinesAction = async (
  lines: CartLineInput[]
): Promise<CartActionsResult> => {
  try {
    await Promise.all(lines.map(line => validateAddLineInput(line)))

    const cartId = await getCartIdFromCookie()

    let rawCart: CartResponse | null
    if (cartId) {
      rawCart = await performCartLinesAddMutation(cartId, lines)
    } else {
      rawCart = await performCartCreateMutation(lines)
      if (rawCart) {
        await setCartIdInCookie(rawCart.id)
      }
    }

    if (!rawCart) {
      throw new Error('Klarte ikke å legge produkt(er) i handlekurv.')
    }

    if (rawCart.id) {
      updateTag(`cart-${rawCart.id}`)
      updateTag('cart')
    }

    const cart = normalizeCart(rawCart)

    const trackingItems: AnalyticsItem[] = []
    let totalValue = 0
    let currency = 'NOK'

    for (const line of lines) {
      const addedLine = rawCart.lines.edges.find(
        (edge: any) => edge.node.merchandise.id === line.variantId
      )

      if (addedLine) {
        const merchandise = addedLine.node.merchandise
        const price = parseFloat(merchandise.price.amount)

        trackingItems.push({
          item_id: merchandise.id,
          item_name: merchandise.product.title,
          item_variant: merchandise.title,
          item_brand: merchandise.product.vendor,
          price: price,
          quantity: line.quantity
        })

        totalValue += price * line.quantity
        currency = merchandise.price.currencyCode
      }
    }

    if (trackingItems.length > 0) {
      await trackServerEvent({
        name: 'add_to_cart',
        ecommerce: {
          currency: currency as 'NOK' | 'EUR' | 'USD',
          value: totalValue,
          items: trackingItems
        }
      })
    }

    return { success: true, message: 'Varer lagt til.', cart }
  } catch (error) {
    return mapThrownErrorToActionResult(error)
  }
}
