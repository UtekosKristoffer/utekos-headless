//Path: src/lib/queries/cartQuery.ts

import cartFragment from '@/lib/fragments/cartFragment'
export const getCartQuery = `
query getCart($cartId: ID!) {
    cart(id: $cartId) {
        ...cart
      }
    }
  ${cartFragment}
`
