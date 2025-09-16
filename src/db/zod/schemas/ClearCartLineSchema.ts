// Path: src/db/zod/schemas/ClearCartLineSchema.ts

import { z } from '@/db/zod/zodConfig'

/**
 * Schema for clearing cart - expects no arguments.
 */
/**
 * Schema for clearing cart - expects an empty object.
 * Using z.object({}) ensures that z.infer results in the type `{}`.
 */
export const ClearCartLineSchema = z.object({}).strict()

export const ClearCartLineJSONSchema = z.toJSONSchema(ClearCartLineSchema)
