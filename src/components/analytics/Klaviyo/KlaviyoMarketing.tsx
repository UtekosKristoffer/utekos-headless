'use client'

import Cookies from 'js-cookie'
import type { ShopifyProduct } from '@types'
import { getOrSetExternalId } from '../MetaPixel/getOrSetExternalId'
import { track } from '@vercel/analytics/react'
import type { OrderPaid, MarketingParams } from '@types'

/**
 * Hjelper: Henter markedsføringsdata fra cookies trygt
 */
function getMarketingParams(): MarketingParams {
  const marketingParamsJson = Cookies.get('marketing_params')
  if (!marketingParamsJson) return {}

  try {
    return JSON.parse(marketingParamsJson)
  } catch (error) {
    console.warn(
      'KlaviyoTracker: Failed to parse marketing_params cookie',
      error
    )
    return {}
  }
}

/**
 * Generisk funksjon for å spore hva som helst (tilsvarer trackEvent i klassen din).
 * Nyttig hvis du vil spore 'Newsletter Signup' eller 'Clicked Banner'.
 */
export function trackCustomEvent(
  eventName: string,
  properties: Record<string, unknown> = {}
) {
  if (typeof window === 'undefined' || !window.klaviyo) return

  const marketingParams = getMarketingParams()
  const payload = {
    ...properties,
    Source: marketingParams.source,
    Medium: marketingParams.medium,
    CampaignID: marketingParams.campaign_id
  }

  window.klaviyo.track(eventName, payload)
}
export function trackViewedProduct(product: ShopifyProduct) {
  if (typeof window === 'undefined' || !window.klaviyo) return

  const marketingParams = getMarketingParams()
  const variant = product.selectedOrFirstAvailableVariant

  const item = {
    Name: product.title,
    ProductID: product.id.substring(product.id.lastIndexOf('/') + 1),
    ImageURL: variant.image?.url || '',
    Handle: product.handle,
    Brand: product.vendor,
    Price: variant.price.amount,
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
}

export function trackAddedToCart(product: ShopifyProduct) {
  if (typeof window === 'undefined' || !window.klaviyo) return

  const marketingParams = getMarketingParams()
  const variant = product.selectedOrFirstAvailableVariant
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

  window.klaviyo.track('Added To Cart', item)
}

export function trackPurchase(order: OrderPaid) {
  track('Purchase', {
    value: parseFloat(order.total_price),
    currency: order.currency,
    orderId: order.id,
    itemCount: order.line_items.length
  })
}
