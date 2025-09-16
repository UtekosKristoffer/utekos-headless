import { checkoutUrlQuery } from '@/api/graphql/queries/cart/checkoutUrlQuery'
export function checkoutUrl(cartId: string): string {
  return checkoutUrlQuery.replace('$cartId', JSON.stringify(cartId))
}
