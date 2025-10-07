// Path: src/lib/actions/submitContactForm.ts
'use server'
import 'server-only'

import { ContactSubmissionEmail } from '@/components/emails/contact-submission-email'
import {
  ServerContactFormSchema,
  type ServerContactFormData
} from '@/db/zod/schemas/ServerContactFormSchema'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)
const sendToEmail = process.env.CONTACT_FORM_SEND_TO_EMAIL

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
  const rawFormData = {
    ...Object.fromEntries(formData.entries()),
    privacy: formData.get('privacy') === 'on'
  }

  // NYTT: Logg for å se data i terminalen
  console.log('Mottatt skjemadata på serveren:', rawFormData)

  if ('phone' in rawFormData && rawFormData.phone === '')
    delete (rawFormData as Record<string, unknown>).phone
  if ('orderNumber' in rawFormData && rawFormData.orderNumber === '')
    delete (rawFormData as Record<string, unknown>).orderNumber

  const result = await ServerContactFormSchema.safeParseAsync(rawFormData)

  if (!result.success) {
    const flattenedErrors = z.flattenError(result.error)
    return {
      message: 'Validering feilet. Vennligst sjekk feltene og prøv igjen.',
      errors: flattenedErrors.fieldErrors
    }
  }

  if (!sendToEmail) {
    console.error('CONTACT_FORM_SEND_TO_EMAIL er ikke definert i .env.local')
    return {
      message:
        'Serverkonfigurasjonsfeil. Innsending er midlertidig utilgjengelig.'
    }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Utekos Kontaktskjema <onboarding@resend.dev>',
      to: sendToEmail,
      replyTo: result.data.email,
      subject: `Ny henvendelse fra ${result.data.name}`,
      react: ContactSubmissionEmail({
        ...result.data
      })
    })

    if (error) {
      console.error('Resend API Error:', error)
      return { message: 'Noe gikk galt under sending av e-post. Prøv igjen.' }
    }

    return { message: 'Takk for din henvendelse!', data: result.data }
  } catch (exception) {
    console.error('Submit Error:', exception)
    return {
      message: 'En uventet feil oppstod. Vennligst prøv igjen senere.'
    }
  }
}
