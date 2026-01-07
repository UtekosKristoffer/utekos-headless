const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const adminAccessToken = process.env.SHOPIFY_ADMIN_API_TOKEN
const apiVersion = '2025-10' // Oppdatert til din versjon

export async function shopifyAdminFetch<T>({
  query,
  variables
}: {
  query: string
  variables?: Record<string, unknown>
}): Promise<{ status: number; body?: T; error?: string }> {
  try {
    if (!domain || !adminAccessToken) {
      throw new Error('Mangler SHOPIFY_ADMIN_ACCESS_TOKEN eller domain')
    }

    const url = `https://${domain}/admin/api/${apiVersion}/graphql.json`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminAccessToken
      },
      body: JSON.stringify({ query, variables })
    })

    const body = await response.json()

    if (body.errors) {
      return { status: response.status, body, error: body.errors[0].message }
    }

    return { status: response.status, body }
  } catch (error) {
    console.error('[Shopify Admin Fetch] Error:', error)
    return {
      status: 500,
      error: error instanceof Error ? error.message : 'Unknown Error'
    }
  }
}
