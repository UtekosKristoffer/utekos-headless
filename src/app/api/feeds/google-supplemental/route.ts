import { NextResponse } from 'next/server'
import { getProductsForFeed } from '@/lib/shopify/feed'

export const revalidate = 3600 // Cache i 1 time (juster etter behov)

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.utekos.no'
const COUNTRY_CODE = 'NO'
const CURRENCY = 'NOK'
const BRAND_NAME = 'UteKos' // Sett ditt merkevarenavn

// Et grovt eksempel på typen funksjonen din må returnere
// Du må utvide denne basert på hva din Shopify-funksjon gir
type ShopifyProduct = {
  id: string | number // f.eks. 'gid://shopify/Product/12345' ELLER 12345
  handle: string
  title: string
  description: string
  productType: string
  featuredImage: {
    url: string
  } | null
  variants: Array<{
    id: string | number // f.eks. 'gid://shopify/ProductVariant/67890' ELLER 67890
    title: string
    sku: string | null
    barcode: string | null // Dette er GTIN
    price: {
      amount: string
      currencyCode: string
    }
    quantityAvailable: number
    image?: {
      url: string
    } | null
  }>
}

/**
 * Robust hjelpefunksjon for å få den numeriske ID-en,
 * uavhengig om kilden er en GID-streng eller et rent tall/streng.
 */
function getNumericId(id: string | number): string {
  if (typeof id === 'number') {
    return String(id)
  }
  if (typeof id !== 'string') {
    return ''
  }
  // Håndterer "gid://shopify/Product/12345"
  if (id.startsWith('gid://')) {
    const parts = id.split('/')
    return parts[parts.length - 1] || ''
  }
  // Håndterer hvis det allerede er en numerisk streng "12345"
  return id
}

// Hjelpefunksjon for å rydde opp i HTML/tekst
function stripHtml(html: string): string {
  if (!html) return ''
  return html
    .replace(/<[^>]*>?/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export async function GET() {
  try {
    const products: ShopifyProduct[] = await getProductsForFeed()

    if (!Array.isArray(products)) {
      throw new Error('getProductsForFeed returnerte ugyldig data')
    }

    // TSV Header - Dette er alle feltene Google trenger
    const headers = [
      'id',
      'title',
      'description',
      'link',
      'image_link',
      'availability',
      'price',
      'google_product_category', // Valgfri, men anbefalt
      'product_type',
      'brand',
      'gtin',
      'condition',
      'item_group_id'
    ]

    const tsvRows: string[] = [headers.join('\t')]

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

        // 1. id (VIKTIG! Bygger standard Shopify-format)
        const merchantCenterId = `shopify_${COUNTRY_CODE}_${productId}_${variantId}`

        // 2. title
        const title =
          product.variants.length > 1 && variant.title !== 'Default Title' ?
            `${product.title} - ${variant.title}`
          : product.title

        // 3. description
        const description = stripHtml(product.description)

        // 4. link (KRITISK! Din korrekte URL)
        const correctLink = productUrl // Legg til ?variant=ID hvis du trenger det

        // 5. image_link
        const image_link =
          variant.image?.url || product.featuredImage?.url || ''

        // 6. availability
        const availability =
          variant.quantityAvailable > 0 ? 'in stock' : 'out of stock'

        // 7. price
        const price = `${variant.price.amount} ${CURRENCY}`

        // 8. brand
        const brand = BRAND_NAME

        // 9. gtin
        const gtin = variant.barcode || '' // Strekkode fra Shopify

        // 10. condition
        const condition = 'new'

        // 11. item_group_id (For varianter)
        const item_group_id = `shopify_${COUNTRY_CODE}_${productId}`

        // Legg til alle feltene i TSV-raden
        const row = [
          merchantCenterId,
          title,
          description,
          correctLink,
          image_link,
          availability,
          price,
          '', // google_product_category (la stå tom foreløpig)
          product.productType,
          brand,
          gtin,
          condition,
          item_group_id
        ]

        tsvRows.push(row.join('\t'))
      }
    }

    const tsvContent = tsvRows.join('\n')

    return new NextResponse(tsvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/tab-separated-values; charset=utf-8',
        'Cache-Control': `s-maxage=${revalidate}, stale-while-revalidate`
      }
    })
  } catch (error) {
    console.error('Feil ved generering av Google Main Feed:', error)
    return new NextResponse('Intern serverfeil', { status: 500 })
  }
}
