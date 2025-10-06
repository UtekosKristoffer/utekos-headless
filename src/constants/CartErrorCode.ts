// Path: src/constants/CartErrorCode.ts
/**
 * Klient-trygg, tre-shakebar konstant uten Zod-import.
 * Bruk denne i UI/klientkode. Trengs runtime-validering på klient,
 * importer egen mini-schema (se kommentar nedenfor).
 */
export const CartErrorCode = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  MISSING_CART_ID: 'MISSING_CART_ID',
  API_ERROR: 'API_ERROR',
  UNEXPECTED_SERVER_ERROR: 'UNEXPECTED_SERVER_ERROR'
} as const

export type CartErrorCodeType =
  (typeof CartErrorCode)[keyof typeof CartErrorCode]

/** Type guard for evt. løse strenger (letter logging/telemetri i klient). */
const set = new Set<string>(Object.values(CartErrorCode))
export function isCartErrorCode(value: unknown): value is CartErrorCodeType {
  return typeof value === 'string' && set.has(value)
}

/**
 * Hvis du trenger KLIENT-runtime-validering:
 *  Lag src/db/zod/schemas/CartErrorCodeSchema.client.ts som bruker zod/mini:
 *
 *   'use client'
 *   import { z } from '@/db/zod/zodClient'
 *   export const CartErrorCodeSchemaClient = z.enum([
 *     'VALIDATION_ERROR','MISSING_CART_ID','API_ERROR','UNEXPECTED_SERVER_ERROR'
 *   ])
 *
 *  og bruk den der du faktisk må parse på klienten.
 */
