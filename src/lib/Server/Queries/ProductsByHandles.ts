import { graphql } from "@/gql";

const ProductsByHandles = graphql(/* GraphQL */ `
    query ProductsByHandles($query: String!) {
      products(first: ${handles.length}, query: $query) {
        edges {
          node {
            id
            title
            handle
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
`);

export default ProductsByHandles;
