//Path: src/lib/queries/menuQuery.ts
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

export default menuQuery
