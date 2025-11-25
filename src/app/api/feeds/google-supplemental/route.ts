import { NextResponse } from 'next/server'
import { getProductsForFeed } from '@/lib/shopify/feed'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.utekos.no'
const COUNTRY_CODE = 'NO'

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
        'Cache-Control': 's-maxage=3600, stale-while-revalidate'
      }
    })
  } catch (error) {
    let errorMessage = 'Intern serverfeil'
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    }
    console.error('Feil ved generering av Google Supplemental Feed:', error)

    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
