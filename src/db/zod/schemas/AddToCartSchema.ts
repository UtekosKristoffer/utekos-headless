// Path: src/db/zod/schemas/AddToCartSchema.ts

import { z } from '@/db/zod/zodConfig'
/**
 * Schema for adding items to cart with Norwegian error messages.
 * Uses the global errorMap but can override specific messages.
 */
export const AddToCartSchema = z.object({
  variantId: z.string().min(1, {
    error: 'Vennligst velg en produktvariant.'
  }),
  quantity: z.number().min(1, {
    error: 'Antall må være minst 1.'
  })
})

export const AddToCartJSONSchema = z.toJSONSchema(AddToCartSchema)
