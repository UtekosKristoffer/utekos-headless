import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const credentials = JSON.parse(
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}'
    )

    // Rett måte å autentisere på
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/content']
    })

    // Bygg content API med JWT auth
    const content = google.content({
      version: 'v2.1',
      auth: auth
    })

    const merchantId = '5590394844'
    const { products } = await request.json()

    for (const product of products) {
      await content.products.insert({
        merchantId,
        requestBody: {
          offerId: product.id,
          title: product.title,
          description: product.description,
          link: `https://utekos.no/produkter/${product.handle}`,
          imageLink: product.image,
          contentLanguage: 'en',
          targetCountry: 'NO',
          channel: 'online',
          availability: product.availableForSale ? 'in stock' : 'out of stock',
          price: {
            value: product.price,
            currency: 'NOK'
          },
          brand: 'Utekos',
          condition: 'new'
        }
      })
    }

    return NextResponse.json({ success: true, synced: products.length })
  } catch (error) {
    console.error('Error syncing products:', error)
    return NextResponse.json(
      {
        error: 'Failed to sync products',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
