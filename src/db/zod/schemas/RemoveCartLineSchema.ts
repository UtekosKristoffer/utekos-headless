// Path: src/db/zod/schemas/RemoveCartLineSchema.ts

import { z } from '@/db/zod/zodConfig'

/**
 * Schema for removing cart lines with Norwegian error messages.
 */
export const RemoveCartLineSchema = z.object({
  lineId: z.string().min(1, {
    error: 'En gyldig linje-ID er påkrevd.'
  })
})

export const RemoveCartLineJSONSchema = z.toJSONSchema(RemoveCartLineSchema)
