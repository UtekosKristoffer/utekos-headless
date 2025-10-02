// Path: src/db/zod/schemas/ContactFormSchema.ts

import { z } from '@/db/zod/zodConfig'
import { PhoneNumberUtil } from 'google-libphonenumber'

const phoneUtil = PhoneNumberUtil.getInstance()

export const ContactFormSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z
    .string()
    .optional()
    .refine(
      phone => {
        if (!phone) return true
        try {
          const parsedPhone = phoneUtil.parseAndKeepRawInput(phone, 'NO')
          return phoneUtil.isValidNumber(parsedPhone)
        } catch (error) {
          return false
        }
      },
      {
        message: 'Ugyldig telefonnummer.'
      }
    ),
  country: z.string().min(1),
  orderNumber: z.string().optional(),
  message: z.string().min(10),
  privacy: z.boolean().refine(value => value === true, {
    message: 'Du må godta personvernreglene for å fortsette.'
  })
})
