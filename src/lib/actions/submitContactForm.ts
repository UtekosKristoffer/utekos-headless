// Path: src/lib/actions/submitContactForm.ts
'use server'

import { ContactFormSchema } from '@/db/zod/schemas/ContactFormSchema'
import type { z } from 'zod'

export interface ContactFormState {
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
  data?: z.infer<typeof ContactFormSchema>
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawFormData = {
    ...Object.fromEntries(formData.entries()),
    privacy: formData.get('privacy') === 'on'
  }

  const validatedFields = ContactFormSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      message: 'Validering feilet. Vennligst sjekk feltene og prøv igjen.',
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  try {
    console.log('Skjemadata mottatt på serveren:', validatedFields.data)

    return { message: 'Takk for din henvendelse!', data: validatedFields.data }
  } catch (error) {
    return {
      message: 'Noe gikk galt under innsending. Prøv igjen senere.'
    }
  }
}
