export const OrdersForMetaBackfill = `
  query OrdersForMetaBackfill($query: String!, $cursor: String) {
    orders(
    first: 100
    after: $cursor
    query: $query
    sortKey: PROCESSED_AT
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        name
        createdAt
        processedAt
        currencyCode
        currentTotalPriceSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        customer {
          id
          email
          phone
        }
        billingAddress {
          firstName
          lastName
          city
          province
          provinceCode
          zip
          countryCode
        }
        shippingAddress {
          firstName
          lastName
          city
          province
          provinceCode
          zip
          countryCode
        }
        clientIp
        lineItems(first: 100) {
          edges {
            node {
              id
              quantity
              originalUnitPriceSet {
                shopMoney {
                  amount
                }
              }
              variant {
                id
              }
            }
          }
        }
      }
    }
  }
}
`
