// Path: src/db/zod/schemas/ProductIdsSchema.ts

import { z } from '@/db/zod/zodConfig'

export const ProductIdsSchema = z
  .array(
    z.string().min(1, {
      error: 'Produkt-ID kan ikke være tom.'
    })
  )
  .min(1, {
    error: 'Minst ett produkt-ID må oppgis.'
  })

export const ProductIdsJSONSchema = ProductIdsSchema.describe('Array of Product IDs as strings')
