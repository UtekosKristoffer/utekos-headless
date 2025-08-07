import { graphql } from "@/gql";


 export const GetMenu = graphql(/* GraphQL */ `
  query GetMenu($handle: String!) {
      menu(handle: $handle) {
        items {
          title
          url
          items {
            title
            url
          }
        }
      }
    }
      

`);
