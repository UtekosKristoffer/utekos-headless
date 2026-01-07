'use server'

import { z } from 'zod'
import { createNewsletterSubscriber } from '@/api/lib/customers/createNewsletterSubscriber'

const schema = z.object({
  email: z.string().email()
})

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email')

  const result = schema.safeParse({ email })

  if (!result.success) {
    return { success: false, message: 'Ugyldig e-postadresse.' }
  }

  try {
    const response = await createNewsletterSubscriber(result.data.email)

    if (!response.success) {
      console.error('Newsletter Error:', response.error)
      return { success: false, message: 'Noe gikk galt. Prøv igjen senere.' }
    }
    return { success: true, message: 'Takk! Du er nå påmeldt.' }
  } catch (error) {
    console.error('Newsletter Exception:', error)
    return { success: false, message: 'Noe gikk galt. Prøv igjen senere.' }
  }
}
