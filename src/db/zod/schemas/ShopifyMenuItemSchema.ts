// Path: src/db/zod/schemas/ShopifyMenuItemSchema.ts

import { z } from '@/db/zod/zodConfig'
import type { ShopifyMenuItem } from '@/types/menu'

/**
 * Schema for validating Shopify menu item structure.
 * Uses z.lazy() for recursive validation with proper optional handling.
 */
export const ShopifyMenuItemSchema: z.ZodType<ShopifyMenuItem> = z.lazy(() =>
  z.object({
    title: z.string().min(1, {
      error: 'Menyelement må ha en tittel.'
    }),
    url: z.string().url({
      error: 'Menyelement må ha en gyldig URL.'
    }),
    items: z.array(ShopifyMenuItemSchema).optional()
  })
)

export const ShopifyMenuItemJSONSchema = z.toJSONSchema(ShopifyMenuItemSchema)
