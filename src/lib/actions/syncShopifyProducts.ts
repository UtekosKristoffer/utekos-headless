'use server'

export async function syncShopifyToGoogle() {
  const shopifyProducts = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2025-10/products.json`,
    {
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN!
      }
    }
  ).then(res => res.json())

  const response = await fetch(
    'https://your-domain.vercel.app/api/sync-products',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products: shopifyProducts.products })
    }
  )

  return response.json()
}
