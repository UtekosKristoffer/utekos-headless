// Path: src/modules/products/graphql/queries.ts

import productFragment from '@/lib/graphql/fragments/productFragment'

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`

export const getProductsQuery = /* GraphQL */ `
  query getProducts(
    $query: String
    $first: Int
    $reverse: Boolean
    $sortKey: ProductSortKeys
  ) {
    products(
      query: $query
      first: $first
      reverse: $reverse
      sortKey: $sortKey
    ) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`
