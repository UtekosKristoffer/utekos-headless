export const mutationCartLinesUpdate = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) { 
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      id
      note
      createdAt
      updatedAt
      appliedGiftCards {
        balance {
          amount
          currencyCode
        }
        amountUsed {
          amount
          currencyCode
        }
        id
      }
      buyerIdentity {
        email
        phone
        customer {
          acceptsMarketing
          orders {
            edges {
              node {
                email
                billingAddress {
                  name
                  address1
                  address2
                  city
                  id
                }
              }
            }
          }
        }
      }
      discountCodes {
        applicable
        code
      }
      discountAllocations {
        discountedAmount {
          amount
        }
      }
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
        checkoutChargeAmount {
          amount
          amount
        }
      }
      lines {
        edges {
          node {
            merchandise {
              ... on ProductVariant {
                title
                id
                compareAtPrice {
                  amount
                  currencyCode
                }

                image {
                  id
                  url
                  height
                  width
                  altText
                }
                price {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
                unitPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
      code
    }
    warnings {
      code
      message
      target
    }
  }
}
  
`
export type CartLinesUpdateResponse = {
  cartLinesUpdate: {
    cart: {
      id: string
      note: string | null
      createdAt: string
      updatedAt: string
      appliedGiftCards: Array<{
        balance: {
          amount: string
          currencyCode: string
        }
        amountUsed: {
          amount: string
          currencyCode: string
        }
        id: string
      }>
      buyerIdentity: {
        email: string | null
        phone: string | null
        customer: {
          acceptsMarketing: boolean
          orders: {
            edges: Array<{
              node: {
                email: string
                billingAddress: {
                  name: string
                  address1: string
                  address2: string | null
                  city: string
                  id: string
                } | null
              }
            }>
          }
        } | null
      }
      discountCodes: Array<{
        applicable: boolean
        code: string
      }>
      discountAllocations: Array<{
        discountedAmount: {
          amount: string
        }
      }>
      totalQuantity: number
      cost: {
        totalAmount: {
          amount: string
          currencyCode: string
        }
        subtotalAmount: {
          amount: string
          currencyCode: string
        }
        checkoutChargeAmount: {
          amount: string
          currencyCode: string
        }
      }
      lines: {
        edges: Array<{
          node: {
            merchandise: {
              title: string
              id: string
              compareAtPrice?: {
                amount: string
                currencyCode: string
              } | null
              image?: {
                id: string
                url: string
                height?: number | null
                width?: number | null
                altText?: string | null
              } | null
              price: {
                amount: string
                currencyCode: string
              }
              selectedOptions?: Array<{
                name: string
                value: string
              }>
              unitPrice?: {
                amount: string
                currencyCode: string
              } | null
            } | null // Andre merchandise-typer kan legges til her etter behov.
          }
        }>
      }
    } | null
    userErrors: Array<{
      field?: Array<string> | null
      message: string
      code?: string | null
    }>
    warnings: Array<{
      code: string
      message: string
      target?: string | null
    }>
  }
}
