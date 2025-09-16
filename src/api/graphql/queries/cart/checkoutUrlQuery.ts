export const checkoutUrlQuery: string = `    
query checkoutURL($cartId: ID!) {
  cart(id: $cartId) {
    checkoutUrl
  }
}
`
