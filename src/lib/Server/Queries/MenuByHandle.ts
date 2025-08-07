import { graphql } from "@/gql";

const MenuByHandle = graphql(/* GraphQL */ `
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

export default MenuByHandle;
