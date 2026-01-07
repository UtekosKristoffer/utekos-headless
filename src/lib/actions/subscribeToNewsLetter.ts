'use server'

import { z } from 'zod'

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
    // TODO: Koble til Klaviyo, Mailchimp eller Shopify API her
    // await shopify.customer.create({ email: result.data.email, accepts_marketing: true })

    // Simulerer en forsinkelse
    await new Promise(resolve => setTimeout(resolve, 500))

    return { success: true, message: 'Takk! Du er nå påmeldt.' }
  } catch (error) {
    return { success: false, message: 'Noe gikk galt. Prøv igjen senere.' }
  }
}
