// Path: src/types/commerce/contact/ContactForm.ts

import type { ServerContactFormData } from '@/db/zod/schemas/ServerContactFormSchema'
export type ContactFormState = {
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    phone?: string[]
    country?: string[]
    orderNumber?: string[]
    message?: string[]
    privacy?: string[]
  }
  data?: ServerContactFormData
}
