// Path: src/lib/helpers/async/getSortedOptions.ts

/* eslint-disable */

import type { ShopifyProduct } from '@/types/products'

export function getSortedOptions(
  options: ShopifyProduct['options'],
  optionOrder: string[]
) {
  return options
    .filter(option => optionOrder.includes(option.name))
    .sort((a, b) => optionOrder.indexOf(a.name) - optionOrder.indexOf(b.name))
}
