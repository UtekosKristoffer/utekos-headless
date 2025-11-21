// Path: src/lib/utils/getCheckoutKey.ts

import { getKeyFromUrl } from './getKeyFromUrl'
import type { OrderPaid } from '@types'
export function getCheckoutKey(order: OrderPaid): string | undefined {
  if (order.cart_token) return order.cart_token
  if (order.token) return order.token

  const orderWithUrl = order as OrderPaid & { order_status_url?: string }

  const urlKey = getKeyFromUrl(orderWithUrl.order_status_url)

  if (urlKey) return urlKey

  return undefined
}
