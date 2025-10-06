// Path: src/db/zod/schemas/ContactFormSchema.ts

import { z } from '@/db/zod/zodConfig'

export const ClientContactFormSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(), // Valideringen er fjernet
  country: z.string().min(1),
  orderNumber: z.string().optional(),
  message: z.string().min(10),
  privacy: z.boolean().refine(value => value === true)
})

export const ServerContactFormSchema = ClientContactFormSchema
