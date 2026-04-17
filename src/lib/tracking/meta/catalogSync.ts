// Path: src/lib/tracking/meta/catalogSync.ts

import { FacebookAdsApi, ProductCatalog } from 'facebook-nodejs-business-sdk'

import { getAllProductsForMetaSync } from '@/lib/shopify/admin'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'

import { buildMetaCatalogItemPayload } from './buildMetaCatalogItemPayload'
import { extractMetaCatalogCustomLabels } from './extractMetaCatalogCustomLabels'
import {
  META_CUSTOM_LABEL_KEYS,
  type MetaCatalogCustomLabelKey,
  type MetaCatalogSyncErrorDetails,
  type MetaCatalogSyncResult,
  type MetaCatalogSyncSummary
} from './metaCatalogTypes'
import { resolveMetaCatalogAccessToken } from './resolveMetaCatalogAccessToken'

const CATALOG_ID = '690208780604782'

const EXCLUDED_PRODUCT_IDS = [
  '9227603149048', // Utekos Buff
  '7710325899512' // Utekos Stapper
]

const EXCLUDED_VARIANT_IDS = ['42903234642168', '42903234609400']

function createMissingLabelCounts(): Record<MetaCatalogCustomLabelKey, number> {
  return META_CUSTOM_LABEL_KEYS.reduce(
    (counts, key) => {
      counts[key] = 0
      return counts
    },
    {} as Record<MetaCatalogCustomLabelKey, number>
  )
}

function createSyncSummary(): MetaCatalogSyncSummary {
  return {
    productsScanned: 0,
    productsExcluded: 0,
    inactiveProductsSkipped: 0,
    productsMissingGroupId: 0,
    variantsScanned: 0,
    variantsExcluded: 0,
    variantsMissingIdentifiers: 0,
    variantsQueued: 0,
    missingLabels: createMissingLabelCounts()
  }
}

function createErrorDetails(error: unknown): MetaCatalogSyncErrorDetails {
  const metaError = error as {
    message?: string
    response?: {
      error?: {
        code?: number | string
        type?: string
        fbtrace_id?: string
        error_subcode?: number | string
        message?: string
      }
    }
  }

  const responseError = metaError.response?.error
  const errorDetails: MetaCatalogSyncErrorDetails = {
    message:
      responseError?.message || metaError.message || 'Meta catalog sync failed',
    raw: error
  }

  const errorCode = responseError?.code ?? responseError?.error_subcode
  if (errorCode !== undefined) {
    errorDetails.code = errorCode
  }

  if (responseError?.type) {
    errorDetails.type = responseError.type
  }

  if (responseError?.fbtrace_id) {
    errorDetails.fbtraceId = responseError.fbtrace_id
  }

  return errorDetails
}

export async function syncProductsToMetaCatalog(): Promise<MetaCatalogSyncResult> {
  const summary = createSyncSummary()
  const resolvedToken = resolveMetaCatalogAccessToken()

  if (!resolvedToken) {
    return {
      success: false,
      catalogId: CATALOG_ID,
      summary,
      error: {
        message:
          'Missing Meta catalog token. Expected META_SYSTEM_USER_TOKEN, CATALOG_ACCESS_TOKEN, or META_ACCESS_TOKEN.'
      }
    }
  }

  FacebookAdsApi.init(resolvedToken.token)

  try {
    console.log('[Meta Catalog] Starting sync...')

    const products = await getAllProductsForMetaSync()
    const batchRequests: Array<{
      method: 'UPDATE'
      data: ReturnType<typeof buildMetaCatalogItemPayload>
    }> = []

    for (const product of products) {
      summary.productsScanned += 1

      const retailerProductGroupId = cleanShopifyId(product.id)
      const variantEdges = product.variants.edges

      if (!retailerProductGroupId) {
        summary.productsMissingGroupId += 1
        summary.variantsMissingIdentifiers += variantEdges.length
        continue
      }

      if (EXCLUDED_PRODUCT_IDS.includes(retailerProductGroupId)) {
        summary.productsExcluded += 1
        summary.variantsExcluded += variantEdges.length
        continue
      }

      if (product.status !== 'ACTIVE') {
        summary.inactiveProductsSkipped += 1
        continue
      }

      for (const variantEdge of variantEdges) {
        summary.variantsScanned += 1

        const variant = variantEdge.node
        const retailerId = cleanShopifyId(variant.id)

        if (!retailerId) {
          summary.variantsMissingIdentifiers += 1
          continue
        }

        if (EXCLUDED_VARIANT_IDS.includes(retailerId)) {
          summary.variantsExcluded += 1
          continue
        }

        const { labels, missingLabels } = extractMetaCatalogCustomLabels(variant)
        for (const missingLabel of missingLabels) {
          summary.missingLabels[missingLabel] += 1
        }

        batchRequests.push({
          method: 'UPDATE',
          data: buildMetaCatalogItemPayload({
            product,
            variant,
            retailerId,
            retailerProductGroupId,
            customLabels: labels
          })
        })

        summary.variantsQueued += 1
      }
    }

    if (batchRequests.length === 0) {
      console.log('[Meta Catalog] No variants queued for sync.')

      return {
        success: true,
        catalogId: CATALOG_ID,
        tokenSource: resolvedToken.source,
        summary,
        batchResponse: null
      }
    }

    const catalog = new ProductCatalog(CATALOG_ID)

    const batchResponse = await catalog.createItemsBatch([], {
      item_type: 'PRODUCT_ITEM',
      requests: batchRequests
    })

    console.log('[Meta Catalog] Sync successful.')

    return {
      success: true,
      catalogId: CATALOG_ID,
      tokenSource: resolvedToken.source,
      summary,
      batchResponse
    }
  } catch (error) {
    const errorDetails = createErrorDetails(error)

    console.error('[Meta Catalog] Sync failed:', errorDetails)

    return {
      success: false,
      catalogId: CATALOG_ID,
      tokenSource: resolvedToken.source,
      summary,
      error: errorDetails
    }
  }
}
