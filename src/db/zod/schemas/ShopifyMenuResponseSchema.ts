// Path: src/db/zod/schemas/ShopifyMenuResponseSchema.ts

import { MenuItemSchema } from '@/db/zod/schemas/MenuItemSchema'
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
      items: z.array(MenuItemSchema).default([])
    })
    .nullable()
})

export const ShopifyMenuResponseJSONSchema = z.toJSONSchema(
  ShopifyMenuResponseSchema
)
