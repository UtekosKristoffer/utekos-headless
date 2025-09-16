import type { Cart, ShopifyCart } from '@types'
import { removeEdgesAndNodes } from './removeEdgesAndNodes'
export const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalAmount) {
    cart.cost.totalAmount = {
      amount: '0.0',
      currencyCode: cart.cost.totalAmount.currencyCode
    }
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  }
}
