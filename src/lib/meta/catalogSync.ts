import { getAllProductsForMetaSync } from '@/lib/shopify/admin'
import { FacebookAdsApi, ProductCatalog } from 'facebook-nodejs-business-sdk'

const ACCESS_TOKEN =
  process.env.CATALOG_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN
const CATALOG_ID = '690208780604782'
const WEBSITE_BASE_URL = 'https://utekos.no'

if (!ACCESS_TOKEN) {
  throw new Error('Missing META_ACCESS_TOKEN for Catalog Sync')
}

FacebookAdsApi.init(ACCESS_TOKEN)

function cleanId(gid: string): string {
  return gid.split('/').pop() || gid
}

export async function syncProductsToMetaCatalog() {
  console.log('[Meta Catalog] Starting sync...')

  const products = await getAllProductsForMetaSync()
  console.log(
    `[Meta Catalog] Fetched ${products.length} products from Shopify.`
  )

  const batchRequests: any[] = []

  for (const product of products) {
    if (product.status !== 'ACTIVE') continue

    for (const variantEdge of product.variants.edges) {
      const variant = variantEdge.node
      const variantId = cleanId(variant.id)

      const link = `${WEBSITE_BASE_URL}/produkter/${product.handle}?variant=${variantId}`

      const imageUrl = variant.image?.url || product.featuredImage?.url || ''

      batchRequests.push({
        method: 'UPDATE',
        retailer_id: variantId,
        data: {
          id: variantId,
          title: `${product.title} - ${variant.title}`,
          description:
            product.descriptionHtml ?
              product.descriptionHtml
                .replace(/<[^>]*>?/gm, '')
                .substring(0, 5000)
            : product.title,
          availability:
            variant.inventoryQuantity > 0 ? 'in stock' : 'out of stock',
          condition: 'new',
          price: `${variant.price} NOK`,
          link: link,
          image_link: imageUrl,
          brand: product.vendor || 'Utekos',
          item_group_id: cleanId(product.id),
          ...(variant.compareAtPrice && {
            sale_price: `${variant.price} NOK`,
            price: `${variant.compareAtPrice} NOK`
          })
        }
      })
    }
  }

  if (batchRequests.length === 0) {
    console.log('[Meta Catalog] No active variants to sync.')
    return
  }

  try {
    const catalog = new ProductCatalog(CATALOG_ID)

    const response = await catalog.createItemsBatch([], {
      item_type: 'PRODUCT_ITEM',
      requests: batchRequests
    })

    console.log('[Meta Catalog] Sync successful!', response)
    return response
  } catch (error: any) {
    console.error(
      '[Meta Catalog] Sync failed:',
      error.response ? error.response.data : error
    )
    throw error
  }
}
