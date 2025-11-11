'use server'

import { z } from 'zod'

export type ActionState = {
  status: 'success' | 'error' | 'idle'
  message: string
}

export async function subscribeToNewsletter(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const emailSchema = z.string()
  z.email('Vennligst skriv inn en gyldig e-postadresse.')

  const result = emailSchema.safeParse(formData.get('email'))

  if (!result.success) {
    const errorMessage =
      result.error.issues[0]?.message || 'Det oppstod en valideringsfeil.'
    return { status: 'error', message: errorMessage }
  }
  const email = result.data

  const mutation = `
    mutation customerCreate($input: CustomerInput!) {
      customerCreate(input: $input) {
        customer {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  // --- HER ER DEN ENDELIGE, KORREKTE STRUKTUREN ---
  const variables = {
    input: {
      email: email,
      emailMarketingConsent: {
        marketingState: 'SUBSCRIBED',
        marketingOptInLevel: 'SINGLE_OPT_IN', // I henhold til beste praksis
        consentUpdatedAt: new Date().toISOString()
      }
    }
  }

  try {
    const response = await fetch(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2025-10/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN!
        },
        body: JSON.stringify({ query: mutation, variables })
      }
    )

    const data = await response.json()

    if (data.errors) {
      console.error('Shopify GraphQL API Errors:', data.errors)
      return {
        status: 'error',
        message: 'Kunne ikke kommunisere med Shopify. Sjekk API-nøkler.'
      }
    }

    if (!data.data) {
      console.error('Unexpected Shopify API response structure:', data)
      return { status: 'error', message: 'Uventet svarformat fra Shopify.' }
    }

    const { customerCreate } = data.data

    if (customerCreate === null) {
      return {
        status: 'success',
        message: 'Takk, du er allerede på listen vår!'
      }
    }

    if (customerCreate.userErrors.length > 0) {
      const errorMessage = customerCreate.userErrors[0]?.message
      if (errorMessage?.includes('Email has already been taken')) {
        return {
          status: 'success',
          message: 'Takk, du er allerede på listen vår!'
        }
      }
      return {
        status: 'error',
        message: errorMessage || 'En ukjent feil oppstod hos Shopify.'
      }
    }

    if (customerCreate.customer) {
      return {
        status: 'success',
        message:
          'Velkommen til familien! Vi gleder oss til å dele mer utekos med deg.'
      }
    }

    return { status: 'error', message: 'En uforutsett feil oppstod.' }
  } catch (error) {
    console.error('Shopify API call failed:', error)
    return {
      status: 'error',
      message: 'Noe gikk galt på serveren. Prøv igjen senere.'
    }
  }
}
