'use server'
import { SHOPIFY_STORE_DOMAIN } from 'src/constants'

const GET_ALL_PRODUCTS_FOR_FEED_QUERY = `
  query getAllProductsForFeed($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          handle
          title
          description
          productType
          featuredImage {
            url
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                sku
                barcode # Dette er GTIN
                price {
                  amount
                  currencyCode
                }
                quantityAvailable
                image {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`

// 2. Definer typene for responsen (forenklet)
// Disse bør matche typene i din 'route.ts'
type VariantNode = {
  id: string
  title: string
  sku: string | null
  barcode: string | null
  price: {
    amount: string
    currencyCode: string
  }
  quantityAvailable: number
  image: {
    url: string
  } | null
}

type ProductNode = {
  id: string
  handle: string
  title: string
  description: string
  productType: string
  featuredImage: {
    url: string
  } | null
  variants: {
    edges: Array<{ node: VariantNode }>
  }
}

type TransformedProductNode = {
  id: string
  handle: string
  title: string
  description: string
  productType: string
  featuredImage: {
    url: string
  } | null
  variants: VariantNode[]
}

type ShopifyResponse = {
  data: {
    products: {
      pageInfo: {
        hasNextPage: boolean
        endCursor: string | null
      }
      edges: Array<{ node: ProductNode }>
    }
  }
  errors?: any[]
}

// 3. Lag en gjenbrukbar 'shopifyFetch' (hvis du ikke har en)
async function shopifyAdminFetch<T extends Record<string, any>>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2025-10/graphql.json`

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store' // Viktig for ferske data i en feed
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Shopify API-feil: ${response.status} ${errorText}`)
  }

  const json = await response.json()

  if ('errors' in json && Array.isArray(json.errors)) {
    interface ShopifyError {
      message: string
    }

    throw new Error(
      `Shopify GraphQL-feil: ${(json.errors as ShopifyError[]).map(e => e.message).join(', ')}`
    )
  }

  return json as T
}

export async function getProductsForFeed(): Promise<TransformedProductNode[]> {
  let allProducts: ProductNode[] = []
  let hasNextPage = true
  let cursor: string | null = null
  const BATCH_SIZE = 50 // Hent 50 produkter om gangen

  console.log('Starter henting av produkter for Google Feed...')

  while (hasNextPage) {
    const variables: { first: number; after: string | null } = {
      first: BATCH_SIZE,
      after: cursor
    }

    const result = await shopifyAdminFetch<ShopifyResponse>(
      GET_ALL_PRODUCTS_FOR_FEED_QUERY,
      variables
    )

    const products = result.data.products.edges.map(edge => edge.node)
    allProducts = allProducts.concat(products)

    const pageInfo = result.data.products.pageInfo
    hasNextPage = pageInfo.hasNextPage
    cursor = pageInfo.endCursor

    console.log(
      `Hentet ${products.length} produkter. Har neste side: ${hasNextPage}`
    )
  }

  console.log(`Total
t antall produkter hentet: ${allProducts.length}`)

  // Nå må vi transformere variantene til en flatere struktur
  // som 'route.ts' forventer
  return allProducts.map(product => ({
    ...product,
    variants: product.variants.edges.map(edge => edge.node)
  }))
}
