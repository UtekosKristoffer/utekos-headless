import { shopifyAdminFetch } from '@/api/shopify/admin/adminFetch'
import { customerCreateMutation } from '@/api/graphql/mutations/customerCreate'

type CustomerCreateOperation = {
  data: {
    customerCreate: {
      customer: { id: string; email: string } | null
      userErrors: { field: string[]; message: string }[]
    }
  }
}

export async function createNewsletterSubscriber(email: string) {
  const response = await shopifyAdminFetch<CustomerCreateOperation>({
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
  })

  if (response.error || !response.body) {
    console.error('[Newsletter] Admin Fetch Failed:', response.error)
    return { success: false, error: 'Kunne ikke kontakte Shopify.' }
  }

  const { customerCreate } = response.body.data

  if (customerCreate.userErrors && customerCreate.userErrors.length > 0) {
    const error = customerCreate.userErrors[0]

    if (!error) {
      return { success: false, error: 'Unknown error occurred.' }
    }

    // Admin API har ikke 'code', så vi sjekker meldingen eller feltet
    const isEmailTaken =
      error.message.toLowerCase().includes('taken')
      || error.message.toLowerCase().includes('already exists')
      || (error.field
        && error.field.includes('email')
        && error.message.includes('taken'))

    if (isEmailTaken) {
      return { success: true, status: 'ALREADY_EXISTS' }
    }

    console.error('[Newsletter] User Error:', error.message)
    return { success: false, error: error.message }
  }

  return { success: true, customer: customerCreate.customer }
}
