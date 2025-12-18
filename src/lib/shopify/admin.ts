import type {
  ProductVariantConnection,
  ProductVariantEdge,
  ShopifyProductOperation,
  ShopifyProductVariant,
  WeightUnit,
  ShopifyProduct
} from '@types'

const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
const API_VERSION = '2025-10'

if (!SHOPIFY_ADMIN_API_TOKEN || !SHOPIFY_STORE_DOMAIN) {
  throw new Error('Missing Shopify Admin API credentials')
}

const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${API_VERSION}/graphql.json`

function mapWeightUnit(unit: string): string {
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

export async function getAllProductsForMetaSync() {
  const query = `
    query getAllProducts {
      products(first: 250) {
        edges {
          node {
            id
            title
            handle
            descriptionHtml
            vendor
            productType
            status
            tags
            productCategory {
              productTaxonomyNode {
                fullName
                name
              }
            }
            featuredImage {
              url
            }
            options {
              name
              values
            }
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  sku
                  barcode
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

    const json = await response.json()

    if (json.errors) {
      throw new Error(`GraphQL Errors: ${JSON.stringify(json.errors)}`)
    }

    const EXCLUDED_PRODUCT_IDS = [
      '9227603149048', // Utekos Buff
      '7710325899512' // Utekos Stapper
    ]

    const EXCLUDED_VARIANT_IDS = ['42903234642168']
    const filteredEdges: ProductVariantEdge[] = json.data.products.edges.filter(
      (edge: ShopifyProduct) => {
        const nodeId: string = edge.id // F.eks "gid://shopify/Product/9227603149048"
        const isExcludedProduct = EXCLUDED_PRODUCT_IDS.some(id =>
          nodeId.endsWith(id)
        )

        return !isExcludedProduct
      }
    )

    return filteredEdges.map(edges => {
      const product = edges.node.product

      const validVariantEdges = product.variants.edges.filter((vEdge: any) => {
        const variantId: ShopifyProductVariant = vEdge.node.id // F.eks "gid://shopify/ProductVariant/42903234642168"
        const isExcludedVariant = EXCLUDED_VARIANT_IDS.some(id => variantId.id)
        return !isExcludedVariant
      })

      const flatVariants: ProductVariantEdge[] = validVariantEdges.map(
        (variantEdge: ProductVariantEdge) => {
          const variant = variantEdge.node
          const weightData: WeightUnit | number =
            product.weight || variant.weight
          return {
            node: {
              ...variant,
              weight: weightData?.value || null,
              weightUnit:
                weightData?.unit ? mapWeightUnit(weightData.unit) : 'kg'
            }
          }
        }
      )

      return {
        ...product,
        variants: {
          edges: flatVariants
        }
      }
    })
  } catch (error) {
    console.error('[Shopify Admin] Failed to fetch products:', error)
    throw error
  }
}
