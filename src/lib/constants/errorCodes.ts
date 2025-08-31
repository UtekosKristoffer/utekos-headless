// Path: src/lib/constants/errorCodes.ts
/**
 * Sentraliserte feilkoder for konsistent feilhåndtering på tvers av applikasjonen.
 * Bruker Zod v4 enum pattern for type safety og runtime validering.
 */
import { z } from 'zod'

export const CartErrorCodeSchema = z.enum(['VALIDATION_ERROR', 'MISSING_CART_ID', 'API_ERROR', 'UNEXPECTED_SERVER_ERROR'])

export type CartErrorCode = z.infer<typeof CartErrorCodeSchema>

// Export as const object for easy dot-notation access
export const CartErrorCode = CartErrorCodeSchema.enum

// Legacy support - kan fjernes senere
export const ERROR_CODES = CartErrorCode

