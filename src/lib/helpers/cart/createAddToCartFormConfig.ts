// Path: src/lib/helpers/cart/createAddToCartFormConfig.ts
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { ShopifyProductVariant } from '@types'
import { AddToCartSchemaClient } from '@/db/zod/schemas/AddToCartSchema.client'
import type { z } from '@/db/zod/zodClient'

export type AddToCartFormValuesClient = z.infer<typeof AddToCartSchemaClient>

export const createAddToCartFormConfig = (
  selectedVariant: ShopifyProductVariant | null
) => ({
  resolver: zodResolver(AddToCartSchemaClient),
  defaultValues: {
    variantId: selectedVariant?.id ?? '',
    quantity: 1
  },
  mode: 'onChange' as const
})
