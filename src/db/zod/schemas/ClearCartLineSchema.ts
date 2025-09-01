// Path: src/db/zod/schemas/ClearCartLineSchema.ts

import { z } from '@/db/zod/zodConfig'

/**
 * Schema for clearing cart - expects no arguments.
 */
export const ClearCartLineSchema = z.unknown().refine(val => val === undefined || (typeof val === 'object' && val !== null && Object.keys(val).length === 0), { error: 'Tøm handlekurv forventer ingen argumenter.' })

export const ClearCartLineJSONSchema = z.toJSONSchema(ClearCartLineSchema)
