//Path: src/lib/mutations/cartLinesAdd.ts
'use server'
export const mutationCartLinesAdd = `
  mutation AddToBag($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        // ... (full cart query as before)
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount { amount currencyCode }
          subtotalAmount { amount currencyCode }
        }
        lines(first: 20) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  image { url altText }
                  price { amount currencyCode }
                }
              }
            }
          }
        }
      }
    }
  }
`
