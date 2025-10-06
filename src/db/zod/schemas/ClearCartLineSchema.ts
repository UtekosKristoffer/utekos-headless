// Path: src/db/zod/schemas/ClearCartLineSchema.ts
import 'server-only'
import { z } from '@/db/zod/zodConfig'

/**
 * Schema for clearing cart - expects an empty object.
 * z.object({}).strict() -> z.infer<typeof ClearCartLineSchema> === {}
 */
export const ClearCartLineSchema = z.object({}).strict()

export const ClearCartLineJSONSchema = z.toJSONSchema(ClearCartLineSchema)
