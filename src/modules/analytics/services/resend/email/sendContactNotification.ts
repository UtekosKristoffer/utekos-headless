import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const INTERNAL_RECIPIENTS = [
  'post@utekos.no',
  'kristoffer@utekos.no',
  'erling@utekos.no',
  'kundeservice@utekos.no'
]

interface ContactEmailProps {
  name: string
  email: string
  message: string
  phone?: string | undefined
}

interface EmailResult {
  success: boolean
  data?: unknown
  error?: unknown
}

export async function sendContactNotification(
  data: ContactEmailProps
): Promise<EmailResult> {
  const { name, email, message, phone } = data

  try {
    const result = await resend.emails.send({
      from: 'Utekos <kundeservice@utekos.no>',
      to: INTERNAL_RECIPIENTS,
      replyTo: email,
      subject: `Ny henvendelse fra ${name}`,
      text: `
Navn: ${name}
E-post: ${email}
Telefon: ${phone ?? 'Ikke oppgitt'}

Melding:
${message}
      `
    })

    if (result.error) {
      return {
        success: false,
        error: result.error
      }
    }

    return {
      success: true,
      data: result.data
    }
  } catch (error) {
    return {
      success: false,
      error
    }
  }
}
