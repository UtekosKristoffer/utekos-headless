// Path: src/app/api/shopify/products-for-gmc/route.ts
import { NextResponse } from 'next/server'
import { z } from '@/db/zod/zodConfig' // SERVER-ONLY zod (v4) med norsk feilkart
import { fromError } from 'zod-validation-error'

export const runtime = 'nodejs'

const ImageSchema = z.object({
  src: z.url()
})

const VariantSchema = z.object({
  price: z.string(),
  inventory_quantity: z.number().int() // kan være negativ ved backorders
})

const ProductSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  body_html: z.string().optional(),
  handle: z.string(),
  images: z.array(ImageSchema).default([]),
  variants: z.array(VariantSchema).default([])
})

const ProductsResponseSchema = z.object({
  products: z.array(ProductSchema)
})

type ProductsResponse = z.infer<typeof ProductsResponseSchema>

// Utgående format (for Google Merchant Center feed i din app)
export type GmcProduct = {
  id: string
  title: string
  description: string
  handle: string
  image: string // hold den som tom streng når mangler (krav hos deg)
  availableForSale: boolean
  price: string // behold som string; evt. legg på valuta senere
}

/* ---------------------------- Utilities -------------------------- */

const stripHtml = (html: string | undefined): string =>
  html ? html.replace(/<[^>]*>/g, '') : ''

/* ------------------------------ GET ------------------------------ */

export async function GET() {
  try {
    const storeDomain = process.env.SHOPIFY_STORE_DOMAIN
    const adminToken = process.env.SHOPIFY_ADMIN_API_TOKEN

    if (!storeDomain || !adminToken) {
      return NextResponse.json(
        { error: 'Mangler SHOPIFY_STORE_DOMAIN eller SHOPIFY_ADMIN_API_TOKEN' },
        { status: 500 }
      )
    }

    const url = `https://${storeDomain}/admin/api/2025-10/products.json?limit=250`

    const response = await fetch(url, {
      headers: {
        'X-Shopify-Access-Token': adminToken,
        'Content-Type': 'application/json'
      }
      // (valgfritt) cache: 'no-store'
    })

    if (!response.ok) {
      // Les eventuell feilmelding fra Shopify (uten any)
      const text = await response.text()
      return NextResponse.json(
        {
          error: 'Shopify svarte ikke OK',
          status: response.status,
          body: text?.slice(0, 1000) // ikke spam loggene
        },
        { status: 502 }
      )
    }

    // Valider responsen strengt med Zod
    const json = (await response.json()) as unknown
    const parsed = ProductsResponseSchema.safeParse(json)

    if (!parsed.success) {
      const validationError = fromError(parsed.error)
      // Logg kort; du har allerede norsk feilkart
      console.error(
        'Validering av Shopify products feilet:',
        validationError.toString()
      )
      return NextResponse.json(
        {
          error: 'Ugyldig format fra Shopify (products)',
          details: validationError.toString()
        },
        { status: 502 }
      )
    }

    const data: ProductsResponse = parsed.data

    // Map til “GMC”-format – uten `any`
    const formattedProducts: GmcProduct[] = data.products.map(product => {
      const firstImage = product.images[0]?.src ?? ''
      const firstVariant = product.variants[0] // kan være undefined
      const available =
        typeof firstVariant?.inventory_quantity === 'number' ?
          firstVariant.inventory_quantity > 0
        : false

      return {
        id: String(product.id),
        title: product.title,
        description: stripHtml(product.body_html),
        handle: product.handle,
        image: firstImage,
        availableForSale: available,
        price: firstVariant?.price ?? '0'
      }
    })

    return NextResponse.json({ products: formattedProducts })
  } catch (err) {
    // Behold typesikker feilhåndtering
    const message =
      err instanceof Error ?
        err.message
      : 'Ukjent feil ved henting av Shopify-produkter'
    console.error('Error fetching Shopify products:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
