// Path: src/lib/actions/submitContactForm.ts
'use server'
import 'server-only'
import { Resend } from 'resend'
import { EmailTemplate } from '@/components/email/EmailTemplate'
import {
  ServerContactFormSchema,
  type ServerContactFormData
} from '@/db/zod/schemas/ServerContactFormSchema'
import { z } from '@/db/zod/zodConfig'
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

const resend = new Resend(process.env.RESEND_API_KEY)
const CONTACT_TO_EMAIL = 'kristoffer.hjelmeland@gmail.com'

function coerceEmptyToUndefined<T extends Record<string, any>>(
  obj: T,
  keys: string[]
): T {
  const clone = { ...obj }
  for (const k of keys) {
    if (k in clone && clone[k] === '') {
      delete clone[k]
    }
  }
  return clone
}

async function notifySlack(payload: ServerContactFormData): Promise<void> {
  const url = process.env.SLACK_CONTACT_WEBHOOK_URL
  if (!url) return

  const body = {
    text: `Ny kontakthenvendelse fra ${payload.name} <${payload.email}>`,
    blocks: [
      { type: 'header', text: { type: 'plain_text', text: 'Kontaktmelding' } },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Navn:*\n${payload.name}` },
          { type: 'mrkdwn', text: `*E-post:*\n${payload.email}` },
          { type: 'mrkdwn', text: `*Telefon:*\n${payload.phone ?? '—'}` },
          { type: 'mrkdwn', text: `*Land:*\n${payload.country}` },
          { type: 'mrkdwn', text: `*Ordrenr:*\n${payload.orderNumber ?? '—'}` }
        ]
      },
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `*Melding:*\n${payload.message}` }
      }
    ]
  }

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store'
  })
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Normaliser FormData
  const raw = Object.fromEntries(formData.entries())

  // Konverter til riktig format med eksplisitt typing
  const formValues: Record<string, any> = {
    name: raw.name,
    email: raw.email,
    phone: raw.phone || undefined,
    country: raw.country,
    orderNumber: raw.orderNumber || undefined,
    message: raw.message,
    privacy: raw.privacy === 'on'
  }

  const cleaned = coerceEmptyToUndefined(formValues, ['phone', 'orderNumber'])
  const parsed = await ServerContactFormSchema.safeParseAsync(cleaned)
  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error)
    const properties = tree.properties ?? {}
    return {
      message: 'Validering feilet. Vennligst sjekk feltene og prøv igjen.',
      errors: {
        ...(properties.name?.errors ? { name: properties.name.errors } : {}),
        ...(properties.email?.errors ? { email: properties.email.errors } : {}),
        ...(properties.phone?.errors ? { phone: properties.phone.errors } : {}),
        ...(properties.country?.errors ?
          { country: properties.country.errors }
        : {}),
        ...(properties.orderNumber?.errors ?
          { orderNumber: properties.orderNumber.errors }
        : {}),
        ...(properties.message?.errors ?
          { message: properties.message.errors }
        : {}),
        ...(properties.privacy?.errors ?
          { privacy: properties.privacy.errors }
        : {})
      }
    }
  }

  const data = parsed.data

  try {
    const from = process.env.CONTACT_FROM_EMAIL
    if (!process.env.RESEND_API_KEY || !from) {
      throw new Error(
        'Mangler RESEND_API_KEY eller CONTACT_FROM_EMAIL i miljøvariabler.'
      )
    }

    const { error } = await resend.emails.send({
      from: from, // F.eks: "Utekos <noreply@utekos.no>"
      to: CONTACT_TO_EMAIL,
      replyTo: data.email, // Sett reply-to til kundens e-post
      subject: `Kontakt | ${data.name} (${data.email})`,
      react: EmailTemplate({
        ...data,
        phone: data.phone ?? '—',
        orderNumber: data.orderNumber ?? '—'
      }), // HTML versjon
      text: [
        // Plain text fallback
        `Navn: ${data.name}`,
        `E-post: ${data.email}`,
        `Telefon: ${data.phone ?? '—'}`,
        `Land: ${data.country}`,
        `Ordrenummer: ${data.orderNumber ?? '—'}`,
        '',
        'Melding:',
        data.message
      ].join('\n')
    })

    if (error) {
      console.error('Resend error:', error)
      throw new Error('Failed to send email')
    }

    // Slack-varsel (valgfritt)
    await notifySlack(data)

    return { message: 'Takk for din henvendelse!', data }
  } catch (error) {
    console.error('Submit contact form error:', error)
    return {
      message:
        'Noe gikk galt under innsending. Prøv igjen senere eller kontakt oss på info@utekos.no.'
    }
  }
}
