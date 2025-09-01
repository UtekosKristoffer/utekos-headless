// Path: src/db/zod/schemas/CartErrorCodeSchema.ts

import { z } from '@/db/zod/zodConfig'

/**
 * Schema for cart error codes.
 */
export const CartErrorCodeSchema = z.enum(['VALIDATION_ERROR', 'MISSING_CART_ID', 'API_ERROR', 'UNEXPECTED_SERVER_ERROR'])

export const CartErrorCodeJSONSchema = z.toJSONSchema(CartErrorCodeSchema)
