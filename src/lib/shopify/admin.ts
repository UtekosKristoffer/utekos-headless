// Path: src/lib/shopify/admin.ts
import type {
  MetaCatalogProduct,
  MetaCatalogShippingWeightUnit,
  MetaCatalogVariant
} from '@/lib/tracking/meta/metaCatalogTypes'

const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
const API_VERSION = '2026-04'

if (!SHOPIFY_ADMIN_API_TOKEN || !SHOPIFY_STORE_DOMAIN) {
  throw new Error('Missing Shopify Admin API credentials')
}

const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${API_VERSION}/graphql.json`

type ShopifyWeightUnit =
  | 'KILOGRAMS'
  | 'GRAMS'
  | 'POUNDS'
  | 'OUNCES'
  | string

type ShopifyMetaSyncVariantNode = {
  id: string
  title: string
  price: string
  compareAtPrice: string | null
  inventoryQuantity: number | null
  image: {
    url: string
  } | null
  selectedOptions: Array<{
    name: string
    value: string
  }>
  customLabel0: {
    value: string
  } | null
  customLabel1: {
    value: string
  } | null
  customLabel2: {
    value: string
  } | null
  customLabel3: {
    value: string
  } | null
  customLabel4: {
    value: string
  } | null
  inventoryItem: {
    measurement: {
      weight: {
        value: number
        unit: ShopifyWeightUnit
      } | null
    } | null
  } | null
}

type ShopifyMetaSyncProductNode = {
  id: string
  title: string
  handle: string
  descriptionHtml: string
  vendor: string | null
  status: string
  featuredImage: {
    url: string
  } | null
  variants: {
    edges: Array<{
      node: ShopifyMetaSyncVariantNode
    }>
  }
}

type ShopifyMetaSyncQueryResponse = {
  data?: {
    products: {
      edges: Array<{
        node: ShopifyMetaSyncProductNode
      }>
    }
  }
  errors?: unknown
}

function mapWeightUnit(unit: ShopifyWeightUnit): MetaCatalogShippingWeightUnit {
  switch (unit) {
    case 'KILOGRAMS':
      return 'kg'
    case 'GRAMS':
      return 'g'
    case 'POUNDS':
      return 'lb'
    case 'OUNCES':
      return 'oz'
    default:
      return 'kg'
  }
}

function mapVariant(node: ShopifyMetaSyncVariantNode): MetaCatalogVariant {
  const weightData = node.inventoryItem?.measurement?.weight

  return {
    id: node.id,
    title: node.title,
    price: node.price,
    compareAtPrice: node.compareAtPrice,
    inventoryQuantity: node.inventoryQuantity,
    image: node.image,
    selectedOptions: node.selectedOptions,
    weight: weightData?.value || null,
    weightUnit: weightData?.unit ? mapWeightUnit(weightData.unit) : 'kg',
    customLabel0: node.customLabel0,
    customLabel1: node.customLabel1,
    customLabel2: node.customLabel2,
    customLabel3: node.customLabel3,
    customLabel4: node.customLabel4
  }
}

function mapProduct(node: ShopifyMetaSyncProductNode): MetaCatalogProduct {
  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    descriptionHtml: node.descriptionHtml,
    vendor: node.vendor,
    status: node.status,
    featuredImage: node.featuredImage,
    variants: {
      edges: node.variants.edges.map(variantEdge => ({
        node: mapVariant(variantEdge.node)
      }))
    }
  }
}

export async function getAllProductsForMetaSync(): Promise<MetaCatalogProduct[]> {
  const query = `
    query getAllProductsForMetaSync {
      products(first: 250) {
        edges {
          node {
            id
            title
            handle
            descriptionHtml
            vendor
            status
            featuredImage {
              url
            }
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  price
                  compareAtPrice
                  inventoryQuantity
                  inventoryItem {
                    measurement {
                      weight {
                        value
                        unit
                      }
                    }
                  }
                  image {
                    url
                  }
                  selectedOptions {
                    name
                    value
                  }
                  customLabel0: metafield(namespace: "mm-google-shopping", key: "custom_label_0") {
                    value
                  }
                  customLabel1: metafield(namespace: "mm-google-shopping", key: "custom_label_1") {
                    value
                  }
                  customLabel2: metafield(namespace: "mm-google-shopping", key: "custom_label_2") {
                    value
                  }
                  customLabel3: metafield(namespace: "mm-google-shopping", key: "custom_label_3") {
                    value
                  }
                  customLabel4: metafield(namespace: "mm-google-shopping", key: "custom_label_4") {
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch(SHOPIFY_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_TOKEN as string
      },
      body: JSON.stringify({ query })
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Shopify Admin API Error (${response.status}): ${text}`)
    }

    const json = (await response.json()) as ShopifyMetaSyncQueryResponse

    if (json.errors) {
      throw new Error(`GraphQL Errors: ${JSON.stringify(json.errors)}`)
    }

    return json.data?.products.edges.map(edge => mapProduct(edge.node)) ?? []
  } catch (error) {
    console.error('[Shopify Admin] Failed to fetch products for Meta sync:', error)
    throw error
  }
}
