import type { ShopifyProduct } from '@types'
import { getMarketingParams } from './getMarketingParams'

export function trackViewedProduct(product: ShopifyProduct): void {
  if (typeof window === 'undefined') return

  const marketingParams = getMarketingParams()
  const variant = product.selectedOrFirstAvailableVariant

  const item = {
    Title: product.title,
    ItemId: product.id.substring(product.id.lastIndexOf('/') + 1),
    Categories: product.tags,
    ImageUrl: variant.image?.url || '',
    Url: window.location.href, // Denne er nå trygg pga sjekken øverst
    Metadata: {
      Brand: product.vendor,
      Price: variant.price.amount,
      CompareAtPrice: variant.compareAtPrice,
      Source: marketingParams.source,
      Medium: marketingParams.medium,
      CampaignID: marketingParams.campaign_id
    }
  }

  window.klaviyo.track('Viewed Product', item) // track-kallet
  window.klaviyo.trackViewedItem(item) // trackViewedItem-kallet
}
