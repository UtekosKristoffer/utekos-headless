export const checkoutUrlQuery: string =`    
query checkoutURL($cartId: ID!) {
  cart(id: $cartId) {
    checkoutUrl
  }
}
`
export function checkoutUrl(cartId: string): string {
  return checkoutUrlQuery.replace('$cartId', JSON.stringify(cartId))
}