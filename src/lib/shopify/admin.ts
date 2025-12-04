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

    return json.data.products.edges.map((edge: any) => {
      const product = edge.node
      const flatVariants = product.variants.edges.map((vEdge: any) => {
        const v = vEdge.node
        const weightData = v.inventoryItem?.measurement?.weight

        return {
          ...v,
          weight: weightData?.value || null,
          weightUnit: weightData?.unit ? mapWeightUnit(weightData.unit) : 'kg'
        }
      })

      return {
        ...product,
        variants: {
          edges: flatVariants.map((v: any) => ({ node: v }))
        }
      }
    })
  } catch (error) {
    console.error('[Shopify Admin] Failed to fetch products:', error)
    throw error
  }
}
