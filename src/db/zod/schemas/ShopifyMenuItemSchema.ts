import { z } from '@/db/zod/zodConfig'
import type { ShopifyMenuItem } from '@types'

/**
 * Schema for validating Shopify menu item structure.
 * Uses z.lazy() for recursive validation with proper optional handling.
 */
export const ShopifyMenuItemSchema: z.ZodType<ShopifyMenuItem> = z.lazy(() =>
  z.object({
    title: z.string().min(1, {
      error: 'Menyelement må ha en tittel.' // 'message' er standard, 'error' fungerer også
    }),
    url: z.string().url({
      error: 'Menyelement må ha en gyldig URL.'
    }),
    // LØSNING: Legg til validering for 'path'-feltet
    path: z.string().min(1, {
      error: 'Menyelement må ha en gyldig path.'
    }),
    items: z.array(ShopifyMenuItemSchema).optional()
  })
)

export const ShopifyMenuItemJSONSchema = z.toJSONSchema(ShopifyMenuItemSchema)
