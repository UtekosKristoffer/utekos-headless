// Path: src/lib/helpers/cart/createAddToCartFormConfig.ts
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { ShopifyProductVariant } from '@types'
import { AddToCartSchemaClient } from '@/db/zod/schemas/AddToCartSchema.client'
import type { z } from '@/db/zod/zodClient'

export type AddToCartFormValuesClient = z.infer<typeof AddToCartSchemaClient>

/**
 * Konfig for react-hook-form i AddToCart (klient).
 * - Bruker Zod Mini via AddToCartSchemaClient for minimal bundle.
 * - Unngår unødvendige felter i defaultValues (holder optional helt utelatt).
 */
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
