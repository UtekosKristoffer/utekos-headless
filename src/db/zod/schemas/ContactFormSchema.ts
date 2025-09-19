import { isValidPhoneNumber } from 'react-phone-number-input'
import { z } from 'zod'
export const ContactFormSchema = z.object({
  name: z.string().min(2, { message: 'Navn må være minst 2 tegn.' }),
  email: z.email({ message: 'Ugyldig e-postadresse.' }),
  phone: z
    .string()
    .refine(value => (value ? isValidPhoneNumber(value) : true), {
      message: 'Ugyldig telefonnummer.'
    })
    .optional(),
  country: z.string().min(1, { message: 'Vennligst velg et land.' }),
  orderNumber: z.string().optional(),
  message: z.string().min(10, { message: 'Meldingen må være minst 10 tegn.' }),
  privacy: z.boolean().refine(val => val, {
    message: 'Du må godta personvernreglene.'
  })
})
