import { graphql } from "@/gql";

const ShortProductsQuery = graphql(/* GraphQL */ `
  query ShopifyProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`);

export default ShortProductsQuery;
