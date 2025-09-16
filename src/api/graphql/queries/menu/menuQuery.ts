//Path: api/graphql/queries/menu/menuQuery.ts
export const menuQuery = `
  query getMenu($handle: String!) {
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
`
