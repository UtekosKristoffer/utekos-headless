'use server'

import { Resend } from 'resend'
import { WelcomeEmail } from '@/components/emails/WelcomeEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendTestEmail(formData: FormData) {
  const email = formData.get('email') as string

  if (!email) return { message: 'Mangler e-post' }

  try {
    const { error } = await resend.emails.send({
      from: 'Utekos <kundeservice@utekos.no>',
      to: email,
      subject: '[TEST] Velkommen til Utekos!',
      react: WelcomeEmail({ email, discountCode: 'TEST-KODE-123' })
    })

    if (error) {
      return { message: `Feil: ${error.message}` }
    }

    return { message: `✅ Test sendt til ${email}!` }
  } catch (e: any) {
    return { message: `Exception: ${e.message}` }
  }
}
