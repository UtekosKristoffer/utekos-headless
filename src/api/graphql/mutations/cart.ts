// Path: api/graphql/mutations/cart.ts

import cartFragment from '@/lib/fragments/cartFragment'

// NY MUTASJON: Denne lager en ny, tom handlepose
export const mutationCartCreate = `
  mutation cartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`

export const mutationCartLinesAdd = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`
export const mutationCartLinesRemove = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`
export const mutationCartLinesUpdate = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`
