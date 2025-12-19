// src/lib/helpers/getMarketingParams.ts (eksempel på path)
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import type { MarketingParams } from '@types'

export function getMarketingParams(): MarketingParams {
  const marketingParamsJson = getCookie('marketing_params')
  if (!marketingParamsJson) return {}

  try {
    return JSON.parse(marketingParamsJson)
  } catch (error) {
    return {}
  }
}
