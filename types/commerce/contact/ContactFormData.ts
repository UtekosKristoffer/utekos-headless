// Path: src/types/commerce/contact/ContactFormData.ts
import { z } from 'zod'
import { ClientContactFormSchema } from '@/db/zod/schemas/ClientContactFormSchema'
export type ContactFormData = z.infer<typeof ClientContactFormSchema>

export type ClientContactFormData = ContactFormData
