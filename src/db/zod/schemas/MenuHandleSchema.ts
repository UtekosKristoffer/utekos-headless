// Path: src/db/zod/schemas/MenuHandleSchema.ts

import { z } from '@/db/zod/zodConfig'

/**
 * Input validator for menu handle parameter.
 */
export const MenuHandleSchema = z.string().min(1, {
  error: 'Menu handle er påkrevd.'
})

export const MenuHandleJSONSchema = z.toJSONSchema(MenuHandleSchema)
