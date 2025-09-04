// Path: src/db/zod/schemas/AccessTokenSchema.ts
import { z } from '@/db/zod/zodConfig'

/**
 * Schema for validating Shopify Storefront Access Token.
 * Uses the global errorMap but can override specific messages.
 */
export const AccessTokenSchema = z
  .string()
  .min(1, { error: 'Access token kan ikke være tom.' })
  .brand<'AccessToken'>()

export const AccessTokenJSONSchema = z.toJSONSchema(AccessTokenSchema)