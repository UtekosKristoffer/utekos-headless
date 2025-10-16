import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const credentials = JSON.parse(
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}'
    )

    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/content']
    })

    // Bruk det gamle (men fungerende) Content API
    const content = google.content({
      version: 'v2.1',
      auth: auth
    })

    const merchantId = '5590394844'
    const { products } = await request.json()

    const results = []

    for (const product of products) {
      try {
        const result = await content.products.insert({
          merchantId: merchantId,
          requestBody: {
            offerId: product.id,
            title: product.title,
            description: product.description,
            link: `https://utekos.no/produkter/${product.handle}`,
            imageLink: product.image,
            contentLanguage: 'en',
            targetCountry: 'NO',
            channel: 'online',
            availability:
              product.availableForSale ? 'in stock' : 'out of stock',
            price: {
              value: product.price,
              currency: 'NOK'
            },
            brand: 'Utekos',
            condition: 'new'
          }
        })

        results.push({ id: product.id, status: 'success' })
      } catch (error: any) {
        console.error(`Error syncing product ${product.id}:`, error.message)
        results.push({
          id: product.id,
          status: 'error',
          message: error.message
        })
      }
    }

    return NextResponse.json({
      success: true,
      synced: results.filter(r => r.status === 'success').length,
      failed: results.filter(r => r.status === 'error').length,
      results
    })
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
