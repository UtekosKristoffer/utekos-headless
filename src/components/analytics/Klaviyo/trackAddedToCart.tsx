import { getMarketingParams } from './getMarketingParams'
import type { ShopifyProduct } from '@types'
import { getOrSetExternalId } from '../MetaPixel/getOrSetExternalId'
import { track } from '@vercel/analytics/react' // Husk /react for klientside tracking
export function trackAddedToCart(product: ShopifyProduct) {
  if (typeof window === 'undefined') return
  const marketingParams = getMarketingParams()
  const variant = product.selectedOrFirstAvailableVariant
  track('Added to Cart', {
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
    Customer: getOrSetExternalId(),
    Metadata: {
      Brand: product.vendor,
      Price: variant.price.amount,
      CompareAtPrice: variant.compareAtPrice,
      Source: marketingParams.source,
      Medium: marketingParams.medium,
      CampaignID: marketingParams.campaign_id
    }
  }

  // 2. Send til Klaviyo (Nå trygt pga sjekken øverst + Proxy-oppsettet)
  window.klaviyo.track('Added to Cart', item)
}
