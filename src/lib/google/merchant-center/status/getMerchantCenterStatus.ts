import { getAllProductsForCatalogSync } from '@/lib/shopify/admin'

import { resolveMerchantProductDataSource } from '../dataSources/resolveMerchantProductDataSource'
import { listMerchantAccountIssues } from '../issues/listMerchantAccountIssues'
import { normalizeMerchantAccountIssue } from '../issues/normalizeMerchantAccountIssue'
import { normalizeMerchantProductStatus } from '../issues/normalizeMerchantProductStatus'
import { listMerchantAggregateProductStatuses } from '../products/listMerchantAggregateProductStatuses'
import { listMerchantProcessedProducts } from '../products/listMerchantProcessedProducts'
import { auditMerchantSiteSignals } from '../site/auditMerchantSiteSignals'
import { getMerchantCenterConfig } from '../config'

export async function getMerchantCenterStatus() {
  const config = getMerchantCenterConfig()
  const dataSource = await resolveMerchantProductDataSource()
  const [catalogProducts, processedProducts, aggregateStatuses, accountIssues] =
    await Promise.all([
      getAllProductsForCatalogSync(),
      listMerchantProcessedProducts(),
      listMerchantAggregateProductStatuses(),
      listMerchantAccountIssues()
    ])

  const managedProducts = processedProducts.filter(
    product => product.dataSource === dataSource.name
  )
  const productsWithIssues = managedProducts
    .map(normalizeMerchantProductStatus)
    .filter(product => product.itemLevelIssues.length > 0)
  const sampleProductHandle = catalogProducts.find(
    product => product.status === 'ACTIVE'
  )?.handle
  const siteAudit = await auditMerchantSiteSignals(sampleProductHandle)

  return {
    checkedAt: new Date().toISOString(),
    accountId: config.accountId,
    dataSource: {
      name: dataSource.name,
      displayName: dataSource.displayName,
      dataSourceId: dataSource.dataSourceId
    },
    totals: {
      catalogProducts: catalogProducts.length,
      processedProducts: processedProducts.length,
      managedProducts: managedProducts.length,
      managedProductsWithIssues: productsWithIssues.length
    },
    aggregateProductStatuses: aggregateStatuses,
    accountIssues: accountIssues.map(normalizeMerchantAccountIssue),
    sampleProductsWithIssues: productsWithIssues.slice(0, 50),
    siteAudit
  }
}
