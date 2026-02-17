// Path: src/modules/cart/services/getCartQuery.ts
import cartFragment from '@/lib/graphql/fragments/cartFragment'
export const getCartQuery = `
query getCart($cartId: ID!) {
    cart(id: $cartId) {
        ...cart
      }
    }
  ${cartFragment}
`
