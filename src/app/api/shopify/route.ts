import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2025-10/products.json?limit=250`,
      {
        headers: {
          'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN!,
          'Content-Type': 'application/json'
        }
      }
    )

    const data = await response.json()

    // Format produkter for Google Merchant Center
    const formattedProducts = data.products.map((product: any) => ({
      id: product.id.toString(),
      title: product.title,
      description: product.body_html?.replace(/<[^>]*>/g, '') || '', // Fjern HTML
      handle: product.handle,
      image: product.images[0]?.src || '',
      availableForSale: product.variants[0]?.inventory_quantity > 0,
      price: product.variants[0]?.price || '0'
    }))

    return NextResponse.json({ products: formattedProducts })
  } catch (error) {
    console.error('Error fetching Shopify products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
