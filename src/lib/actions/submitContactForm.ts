// Path: src/lib/actions/submitContactForm.ts
'use server'

import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2, 'Navn må være minst 2 tegn.'),
  email: z.string().email('Ugyldig e-postadresse.'),
  phone: z.string().optional(),
  orderNumber: z.string().optional(),
  message: z.string().min(10, 'Meldingen må være minst 10 tegn.'),
  privacy: z.string().transform(val => val === 'on') // HTML-checkbox sender 'on'
})

// Definerer formen på state-objektet vårt
export interface ContactFormState {
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
    privacy?: string[]
  }
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawFormData = Object.fromEntries(formData.entries())

  const validatedFields = formSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      message: 'Validering feilet. Vennligst sjekk feltene.',
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  if (!validatedFields.data.privacy) {
    return {
      message: 'Validering feilet.',
      errors: {
        privacy: ['Du må godta personvernreglene.']
      }
    }
  }

  try {
    console.log('Mottatte skjemadata på serveren:', validatedFields.data)

    // Returner suksessmelding
    return { message: 'Takk for din henvendelse!' }
  } catch (error) {
    return { message: 'Noe gikk galt. Prøv igjen.' }
  }
}
