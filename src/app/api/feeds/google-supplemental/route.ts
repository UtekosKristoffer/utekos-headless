'use cache'
import { NextResponse } from 'next/server'
import { cacheLife } from 'next/cache'
import { getProductsForFeed } from '@/lib/shopify/feed'

// export const revalidate = 3600; // FJERNET: Ikke kompatibel med cacheComponents

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.dittdomene.no'
const COUNTRY_CODE = 'NO'

// Antar at getProductsForFeed returnerer denne typen
// Juster denne om nødvendig for å matche TransformedProductNode
type ProductFeedItem = {
  id: string
  handle: string
  variants: Array<{
    id: string
  }>
}

function getNumericId(gid: string): string {
  if (typeof gid !== 'string') return ''
  const parts = gid.split('/')
  return parts[parts.length - 1] || ''
}

export async function GET() {
  // LAGT TIL: Setter cache-tiden ved hjelp av den nye metoden
  cacheLife('hours')

  try {
    const products: ProductFeedItem[] = await getProductsForFeed()

    if (!Array.isArray(products)) {
      throw new Error('getProductsForFeed returnerte ikke en array')
    }

    const tsvRows: string[] = []
    tsvRows.push('id\tlink')

    for (const product of products) {
      if (
        !product
        || !product.id
        || !product.handle
        || !Array.isArray(product.variants)
      ) {
        continue
      }

      const productId = getNumericId(product.id)
      const productUrl = `${BASE_URL}/produkter/${product.handle}`

      for (const variant of product.variants) {
        if (!variant || !variant.id) {
          continue
        }

        const variantId = getNumericId(variant.id)
        const merchantCenterId = `shopify_${COUNTRY_CODE}_${productId}_${variantId}`
        const correctLink = productUrl

        tsvRows.push(`${merchantCenterId}\t${correctLink}`)
      }
    }

    const tsvContent = tsvRows.join('\n')

    return new NextResponse(tsvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/tab-separated-values; charset=utf-8',
        // Denne Cache-Control-headeren er fin å ha,
        // men cacheLife styrer Next.js-cachen.
        'Cache-Control': 's-maxage=3600, stale-while-revalidate'
      }
    })
  } catch (error) {
    console.error('Feil ved generering av Google Supplemental Feed:', error)
    return new NextResponse('Intern serverfeil', { status: 500 })
  }
}
