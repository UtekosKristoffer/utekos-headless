// Path: src/db/zod/schemas/ShopifyMenuResponseSchema.ts

import { ShopifyMenuItemSchema } from '@/db/zod/schemas/ShopifyMenuItemSchema'
import { z } from '@/db/zod/zodConfig'
/**
 * Schema for validating Shopify menu item structure.
 * Uses z.lazy() for recursive validation with proper optional handling.
 */
/**
 * Schema for validating the complete menu response from Shopify API.
 * Handles nullable menu with proper validation.
 * Uses z.lazy() for recursive validation with proper optional handling.
 */
export const ShopifyMenuResponseSchema = z.object({
  menu: z
    .object({
      items: z.array(ShopifyMenuItemSchema).default([])
    })
    .nullable()
})

export const ShopifyMenuResponseJSONSchema = z.toJSONSchema(
  ShopifyMenuResponseSchema
)
