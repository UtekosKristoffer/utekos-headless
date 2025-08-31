// Path: src/db/zod/cartSchemas.ts
import { z } from 'zod'

/**
 * Schema for adding items to cart with Norwegian error messages.
 * Uses the global errorMap but can override specific messages.
 */
export const AddToCartSchema = z.object({
  variantId: z.string().min(1, {
    error: 'Vennligst velg en produktvariant.'
  }),
  quantity: z.number().min(1, {
    error: 'Antall må være minst 1.'
  })
})

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

/**
 * Schema for removing cart lines with Norwegian error messages.
 */
export const RemoveCartLineSchema = z.object({
  lineId: z.string().min(1, {
    error: 'En gyldig linje-ID er påkrevd.'
  })
})

/**
 * Schema for clearing cart - expects no arguments.
 */
export const ClearCartLineSchema = z.unknown().refine(val => val === undefined || (typeof val === 'object' && val !== null && Object.keys(val).length === 0), { error: 'Tøm handlekurv forventer ingen argumenter.' })

/**
 * JSON Schema representation for API documentation.
 */
export const AddToCartJSONSchema = z.toJSONSchema(AddToCartSchema)
