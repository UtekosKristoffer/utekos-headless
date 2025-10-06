// Path: src/lib/helpers/cart/createAddToCartFormConfig.ts
import { zodResolver } from '@hookform/resolvers/zod'
import { AddToCartSchema } from '@/db/zod/schemas/AddToCartSchema'
import type { ShopifyProductVariant } from '@types'

export const createAddToCartFormConfig = (
  selectedVariant: ShopifyProductVariant | null
) => ({
  resolver: zodResolver(AddToCartSchema),
  defaultValues: {
    variantId: selectedVariant?.id ?? '',
    quantity: 1
  },
  mode: 'onChange' as const
})
