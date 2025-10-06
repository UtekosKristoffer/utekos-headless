// Path: src/lib/actions/submitContactForm.ts
'use server'
import 'server-only'

import {
  ServerContactFormSchema,
  type ServerContactFormData
} from '@/db/zod/schemas/ServerContactFormSchema'

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
  data?: ServerContactFormData
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Normaliser og gjør eksplisitt boolean for privacy
  const rawFormData = {
    ...Object.fromEntries(formData.entries()),
    privacy: formData.get('privacy') === 'on'
  }

  if ('phone' in rawFormData && rawFormData.phone === '')
    delete (rawFormData as Record<string, unknown>).phone
  if ('orderNumber' in rawFormData && rawFormData.orderNumber === '')
    delete (rawFormData as Record<string, unknown>).orderNumber

  // Servervalidering (async i use server-fil)
  const result = await ServerContactFormSchema.safeParseAsync(rawFormData)

  if (!result.success) {
    return {
      message: 'Validering feilet. Vennligst sjekk feltene og prøv igjen.',
      errors: result.error.flatten().fieldErrors
    }
  }

  // Her gjør du faktisk arbeid (lagre, sende e-post, osv.)
  try {
    console.log('Skjemadata mottatt på serveren:', result.data)
    return { message: 'Takk for din henvendelse!', data: result.data }
  } catch {
    return { message: 'Noe gikk galt under innsending. Prøv igjen senere.' }
  }
}
