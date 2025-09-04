// Path: src/lib/queries/queryProduct.ts
export const productQuery = `#graphql
query Product($handle: String!) {
  product(handle: $handle) {
    id
    title
    handle
    availableForSale
    options {
      name
      optionValues {
        name
      }
    }
    featuredImage {
      url
      altText
    }
    variants(first: 1) {
      edges {
        node {
          id
          title
          selectedOptions {
            name
            value
          }
          availableForSale
          price {
            amount
          }
          compareAtPrice {
            amount
          }
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
          }
          metafield(namespace: "bridgeFor", key: "VariantHandler") {
            value
            type
            reference {
              ... on Metaobject {
                type
                fields {
                  key 
                  value
                  type
                  
                }
              }
            }
          }
        }
      }
    }
  }
}
`
