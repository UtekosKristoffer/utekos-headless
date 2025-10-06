// Path: src/db/zod/schemas/AccessTokenSchema.ts

import 'server-only'

import { z } from '@/db/zod/zodConfig'

/**
 * Shopify Storefront Access Token:
 *  - Trimmer inn/ut-whitespace
 *  - Må ikke være tom
 *  - Tillater ikke whitespace i selve tokenet (robust ift. copy/paste-feil)
 *  - Branded for sterkere typesemantikk
 *
 * NB: Ikke håndhev fast lengde – Shopify kan endre format/variasjoner.
 */
export const AccessTokenSchema = z
  .object({
    token: z
      .string()
      .trim()
      .min(1, { message: 'Access token kan ikke være tom.' })
      .regex(/^\S+$/, { message: 'Access token kan ikke inneholde mellomrom.' })
  })
  .brand<'AccessTokenEnvelope'>()

/** Praktisk alias om du validerer en ren streng (ikke objekt) */
export const AccessTokenStringSchema = z
  .string()
  .trim()
  .min(1, { message: 'Access token kan ikke være tom.' })
  .regex(/^\S+$/, { message: 'Access token kan ikke inneholde mellomrom.' })
  .brand<'AccessToken'>()

export type AccessTokenEnvelope = z.infer<typeof AccessTokenSchema>
export type AccessToken = z.infer<typeof AccessTokenStringSchema>
