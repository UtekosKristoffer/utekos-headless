import { shopifyFetch } from '@/api/shopify/request/fetchShopify'
import { customerCreateMutation } from '@/api/graphql/mutations/customerCreate'
type CustomerCreateOperation = {
  data: {
    customerCreate: {
      customer: { id: string; email: string } | null
      userErrors: { field: string[]; message: string; code: string }[]
    }
  }
  variables: {
    input: {
      email: string
      emailMarketingConsent: {
        marketingState: 'SUBSCRIBED'
        marketingOptInLevel: 'SINGLE_OPT_IN' | 'CONFIRMED_OPT_IN'
      }
      tags: string[]
    }
  }
}

export async function createNewsletterSubscriber(email: string) {
  // Her sender vi inn hele operasjonstypen <CustomerCreateOperation>
  const response = await shopifyFetch<CustomerCreateOperation>({
    query: customerCreateMutation,
    variables: {
      input: {
        email,
        emailMarketingConsent: {
          marketingState: 'SUBSCRIBED',
          marketingOptInLevel: 'SINGLE_OPT_IN'
        },
        tags: ['newsletter_popup', 'prospect']
      }
    }
    // cache: 'no-store' <--- Fjernet denne, da den ikke støttes av typen og er unødvendig for mutasjoner
  })

  if (!response.success || !response.body) {
    return { success: false, error: 'Kunne ikke kontakte Shopify.' }
  }

  // shopifyFetch pakker vanligvis ut 'data', så vi henter customerCreate direkte fra body
  const { customerCreate } = response.body

  if (customerCreate.userErrors && customerCreate.userErrors.length > 0) {
    const error = customerCreate.userErrors[0]

    if (!error) {
      return { success: false, error: 'Unknown error occurred.' }
    }

    if (error.code === 'TAKEN') {
      return { success: true, status: 'ALREADY_EXISTS' }
    }

    return { success: false, error: error.message }
  }

  return { success: true, customer: customerCreate.customer }
}
