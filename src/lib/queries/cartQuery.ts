//Path: src/lib/queries/cartQuery.ts
export const cartQuery = `
query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl 
      totalQuantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
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
                image {
                  url
                  altText
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`

export default cartQuery
