// Path: src/lib/meta/catalogSync.ts

import { getAllProductsForMetaSync } from '@/lib/shopify/admin'
import { FacebookAdsApi, ProductCatalog } from 'facebook-nodejs-business-sdk'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'

const ACCESS_TOKEN =
  process.env.CATALOG_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN
const CATALOG_ID = '690208780604782'
const WEBSITE_BASE_URL = 'https://utekos.no'
if (!ACCESS_TOKEN) {
  throw new Error('Missing META_ACCESS_TOKEN for Catalog Sync')
}

FacebookAdsApi.init(ACCESS_TOKEN)

function getOptionValue(
  options: any[],
  nameToCheck: string[]
): string | undefined {
  const option = options.find((o: any) =>
    nameToCheck.includes(o.name.toLowerCase())
  )
  return option ? option.value : undefined
}

export async function syncProductsToMetaCatalog() {
  console.log('[Meta Catalog] Starting sync...')

  const products = await getAllProductsForMetaSync()
  console.log(
    `[Meta Catalog] Fetched ${products.length} products from Shopify.`
  )

  const batchRequests: any[] = []

  for (const product of products) {
    if (product.availableForSale !== true) continue
    product.category.id
    const googleProductCategory = 203
    const cleanProductId = cleanShopifyId(product.id)
    for (const variantEdge of product.variants.edges) {
      const variant = variantEdge.node
      const variantId = cleanShopifyId(variant.id)
      if (!variantId) continue
      const link = `${WEBSITE_BASE_URL}/produkter/${product.handle}?variant=${encodeURIComponent(variant.id)}`
      const imageUrl = variant.image?.url || product.featuredImage?.url || ''
      const brand = product.vendor || 'Utekos'
      const color = getOptionValue(variant.selectedOptions, ['farge', 'color'])
      const size = getOptionValue(variant.selectedOptions, [
        'size',
        'størrelse',
        'str'
      ])

      const ageGroup = 'adult'
      const gender = 'unisex'

      const payloadData = {
        id: `${product.id}_${variant.id}`,
        title: `${product.title} - ${variant.title}`,
        description:
          product.Htmldescription ?
            product.Htmldescription.replace(/<[^>]*>?/gm, '').substring(0, 5000)
          : product.title,
        availability:
          variant.quantityAvailable && variant.quantityAvailable > 0 ?
            'in stock'
          : 'out of stock',
        condition: 'new',
        price: `${variant.price} NOK`,
        compareAtPrice:
          variant.compareAtPrice ? `${variant.compareAtPrice} NOK` : undefined,
        link: link,
        image_link: imageUrl,
        brand: brand,
        color: color,
        size: size,
        retailer_id: variantId,
        item_group_id: cleanProductId,
        google_product_category: googleProductCategory,
        age_group: ageGroup,
        gender: gender,
        ...(variant.weight && {
          shipping_weight: `${variant.weight} ${variant.weightUnit.toLowerCase()}`
        })
      }

      if (variant.compareAtPrice) {
        payloadData.price = `${variant.compareAtPrice} NOK`
      }

      batchRequests.push({
        method: 'UPDATE',
        retailer_id: variantId,
        data: payloadData
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
