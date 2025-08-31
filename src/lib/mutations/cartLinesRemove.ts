export const mutationCartLinesRemove = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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
