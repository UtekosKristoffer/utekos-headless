// Path: src/db/zod/schemas/UpdateCartSchema.ts

import { z } from '@/db/zod/zodConfig'

/**
 * Schema for updating cart lines with Norwegian error messages.
 */
export const UpdateCartSchema = z.object({
  lineId: z.string().min(1, {
    error: 'Linje-ID er påkrevd'
  }),
  quantity: z.number().int().min(0, {
    error: 'Antall må være 0 eller høyere'
  })
})

export const UpdateCartJSONSchema = z.toJSONSchema(UpdateCartSchema)
