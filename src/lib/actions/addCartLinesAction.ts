// Path: src/lib/actions/addCartLinesAction.ts
'use server'

import { mutationCartDiscountCodesUpdate } from '@/api/graphql/mutations/cart' // <-- NY IMPORT
import { performCartCreateMutation } from '@/lib/actions/perform/performCartCreateMutation'
import { performCartLinesAddMutation } from '@/lib/actions/perform/performCartLinesAddMutation'
import { shopifyFetch } from '@/api/shopify/request/fetchShopify' // <-- NY IMPORT
import { mapThrownErrorToActionResult } from '@/lib/errors/mapThrownErrorToActionResult'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { setCartIdInCookie } from '@/lib/helpers/cart/setCartIdInCookie'
import { normalizeCart } from '@/lib/helpers/normalizers/normalizeCart'
import { validateAddLineInput } from '@/lib/helpers/validations/validateAddLineInput'
import type {
  AddToCartFormValues,
  CartActionsResult,
  CartResponse,
  ShopifyDiscountCodesUpdateOperation 
} from '@types'

export const addCartLinesAction = async (
  input: AddToCartFormValues
): Promise<CartActionsResult> => {
  try {
    validateAddLineInput(input)

    let cartId = await getCartIdFromCookie()
    let rawCart: CartResponse | null | undefined

    if (cartId) {
      rawCart = await performCartLinesAddMutation(cartId, input)
    } else {
      rawCart = await performCartCreateMutation(input)
      if (rawCart) {
        cartId = rawCart.id // Hent den nye cartId-en
        await setCartIdInCookie(rawCart.id)
      }
    }

    if (!rawCart || !cartId) {
      throw new Error('Klarte ikke å legge produkt i handlekurv.')
    }

    if (input.discountCode) {
      await shopifyFetch<ShopifyDiscountCodesUpdateOperation>({
        query: mutationCartDiscountCodesUpdate,
        variables: {
          cartId: cartId,
          discountCodes: [input.discountCode]
        }
      })
    }

    const cart = normalizeCart(rawCart)

    return { success: true, message: 'Vare lagt til.', cart }
  } catch (error) {
    console.error('Feil i addCartLinesAction:', error)
    return mapThrownErrorToActionResult(error)
  }
}