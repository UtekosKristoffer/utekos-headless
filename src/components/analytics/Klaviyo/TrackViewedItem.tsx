import type { ShopifyProduct } from '@types'

export function trackViewedProduct(product: ShopifyProduct) {
  let klaviyo = window.klaviyo || []
  let item = {
    Name: product.title,
    ProductID: product.id.substring(product.id.lastIndexOf('/') + 1),
    ImageURL: product.selectedOrFirstAvailableVariant.image?.url ?? '',
    Handle: product.handle,
    Brand: product.vendor,
    Price: product.selectedOrFirstAvailableVariant.price.amount,
    Metadata: {
      Brand: product.vendor,
      Price: product.selectedOrFirstAvailableVariant.price.amount,
      CompareAtPrice:
        product.selectedOrFirstAvailableVariant.compareAtPrice?.amount
    }
  }
  klaviyo.track('Viewed Product', item)
  klaviyo.trackViewedItem(item)
}

export function trackAddedToCart(product: ShopifyProduct) {
  let klaviyo = window.klaviyo || []
  let item = {
    Name: product.title,
    ProductID: product.id.substring(product.id.lastIndexOf('/') + 1),
    ImageURL: product.selectedOrFirstAvailableVariant.image?.url ?? '',
    Handle: product.handle,
    Brand: product.vendor,
    Price: product.selectedOrFirstAvailableVariant.price.amount
  }
  klaviyo.track('Hydrogen Added To Cart', item)
}
