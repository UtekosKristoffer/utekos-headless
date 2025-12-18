'use client'

import { useEffect } from 'react'
import type { ShopifyProduct, ShopifyProductVariant } from '@types'
import { ProductVariant } from 'facebook-nodejs-business-sdk'
import { generateEventID } from '../MetaPixel/generateEventID'
import { getOrSetExternalId } from '../MetaPixel/getOrSetExternalId'

export function trackViewedProduct(product: ShopifyProduct) {
  let klaviyo = window.klaviyo || []
  let item = {
    Name: product.title,
    ProductID: product.id.substring(product.id.lastIndexOf('/') + 1),
    ImageURL: product.selectedOrFirstAvailableVariant.image?.url || '',
    Handle: product.handle,
    Brand: product.vendor,
    Price: product.selectedOrFirstAvailableVariant.price.amount,
    Metadata: {
      Brand: product.vendor,
      Price: product.selectedOrFirstAvailableVariant.price.amount,
      CompareAtPrice: product.selectedOrFirstAvailableVariant.compareAtPrice
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
    ImageURL: product.selectedOrFirstAvailableVariant.image?.url || '',
    Handle: product.handle,
    Brand: product.vendor,
    Price: product.selectedOrFirstAvailableVariant.price.amount,
    ProductVariantID: product.selectedOrFirstAvailableVariant.id,
    Value: product.selectedOrFirstAvailableVariant.price.amount,
    Customer: getOrSetExternalId(),
    Metadata: {
      Brand: product.vendor,
      Price: product.selectedOrFirstAvailableVariant.price.amount,
      CompareAtPrice: product.selectedOrFirstAvailableVariant.compareAtPrice
    }
  }
  klaviyo.track('Added To Cart', item)
}
