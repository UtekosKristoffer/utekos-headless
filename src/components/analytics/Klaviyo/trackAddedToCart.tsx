import { getMarketingParams } from './getMarketingParams'
import type { ShopifyProduct } from '@types' // Antar at denne typen er definert i prosjektet ditt
import { getOrSetExternalId } from '../MetaPixel/getOrSetExternalId'
import { track } from '@vercel/analytics'

export function trackAddedToCart(product: ShopifyProduct) {
  if (window.klaviyo) {
    const marketingParams = getMarketingParams()
    const variant = product.selectedOrFirstAvailableVariant
    const trackAtc = track('Added to Cart', {
      product: product.title,
      productId: product.id,
      variantId: variant.id,
      quantity: 1,
      price: parseFloat(variant.price.amount)
    })
    const item = {
      Name: product.title,
      ProductID: product.id.substring(product.id.lastIndexOf('/') + 1),
      ImageURL: variant.image?.url || '',
      Handle: product.handle,
      Brand: product.vendor,
      Price: variant.price.amount,
      ProductVariantID: variant.id,
      Value: variant.price.amount,
      Customer: getOrSetExternalId(), // Henter ekstern ID for sporing
      Metadata: {
        Brand: product.vendor,
        Price: variant.price.amount,
        CompareAtPrice: variant.compareAtPrice,
        Source: marketingParams.source,
        Medium: marketingParams.medium,
        CampaignID: marketingParams.campaign_id
      }
    }

    window.klaviyo.track('Viewed Product', item)
    window.klaviyo.trackViewedItem(item)
    track
  }
}
