// Path: src/db/zod/schemas/CartErrorCodeSchema.ts
import 'server-only'
import { z } from '@/db/zod/zodConfig'

/** Server-side schema for runtime-validering på server. */
export const CartErrorCodeSchema = z.enum([
  'VALIDATION_ERROR',
  'MISSING_CART_ID',
  'API_ERROR',
  'UNEXPECTED_SERVER_ERROR'
])

export type CartErrorCode = z.infer<typeof CartErrorCodeSchema>
