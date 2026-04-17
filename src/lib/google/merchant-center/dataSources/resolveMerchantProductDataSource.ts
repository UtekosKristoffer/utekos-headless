import {
  getMerchantCenterConfig,
  MERCHANT_CENTER_DEFAULTS
} from '../config'
import type { MerchantDataSource } from '../merchantCenterTypes'

import { listMerchantDataSources } from './listMerchantDataSources'

function isEligiblePrimaryApiDataSource(dataSource: MerchantDataSource) {
  return Boolean(
    dataSource.input === 'API' && dataSource.primaryProductDataSource
  )
}

function matchesDefaultTargeting(dataSource: MerchantDataSource) {
  const primarySource = dataSource.primaryProductDataSource
  const countries = primarySource?.countries ?? []

  if (
    primarySource?.feedLabel &&
    primarySource.feedLabel !== MERCHANT_CENTER_DEFAULTS.feedLabel
  ) {
    return false
  }

  if (
    primarySource?.contentLanguage &&
    primarySource.contentLanguage !== MERCHANT_CENTER_DEFAULTS.contentLanguage
  ) {
    return false
  }

  if (countries.length === 0) {
    return true
  }

  return countries.includes(MERCHANT_CENTER_DEFAULTS.countryCode)
}

export async function resolveMerchantProductDataSource() {
  const config = getMerchantCenterConfig()
  const dataSources = await listMerchantDataSources()

  if (config.dataSourceId) {
    const explicitName = `${config.accountName}/dataSources/${config.dataSourceId}`
    const explicitDataSource = dataSources.find(
      dataSource => dataSource.name === explicitName
    )

    if (!explicitDataSource) {
      throw new Error(
        `Configured Merchant data source ${explicitName} was not found in account ${config.accountId}.`
      )
    }

    if (!isEligiblePrimaryApiDataSource(explicitDataSource)) {
      throw new Error(
        `Configured Merchant data source ${explicitName} is not an API-backed primary product data source.`
      )
    }

    return explicitDataSource
  }

  const matchedDataSource = dataSources.find(
    dataSource =>
      isEligiblePrimaryApiDataSource(dataSource) &&
      dataSource.displayName === config.primaryDataSourceDisplayName &&
      matchesDefaultTargeting(dataSource)
  )

  if (!matchedDataSource) {
    throw new Error(
      `No Merchant API primary data source named "${config.primaryDataSourceDisplayName}" was found. Set GOOGLE_MERCHANT_DATA_SOURCE_ID or create that exact API primary product data source first.`
    )
  }

  return matchedDataSource
}
