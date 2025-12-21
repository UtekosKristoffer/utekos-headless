// Path: src/components/analytics/KlaviyoMarketing.tsx
'use client'

import Cookies from 'js-cookie'
import type { ShopifyProduct } from '@types'
import { getOrSetExternalId } from '../MetaPixel/getOrSetExternalId'
import { track } from '@vercel/analytics/react'
import type { OrderPaid, MarketingParams } from '@types'

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

export function trackStartedCheckout(
  cartId: string,
  lines: any[], // Bør types som CartLine[] hvis tilgjengelig i @types
  checkoutUrl: string,
  totalValue: number
) {
  if (typeof window === 'undefined' || !window.klaviyo) return

  const marketingParams = getMarketingParams()
  const items = lines.map(line => {
    const variant = line.merchandise
    const product = variant.product
    const productId = product.id.substring(product.id.lastIndexOf('/') + 1)

    return {
      ProductID: productId,
      SKU: variant.sku || variant.id,
      ProductName: product.title,
      Quantity: line.quantity,
      ItemPrice: parseFloat(variant.price.amount),
      RowTotal: parseFloat(variant.price.amount) * line.quantity,
      ProductURL: window.location.origin + `/produkter/${product.handle}`,
      ImageURL: variant.image?.url || '',
      ProductCategories: product.tags || []
    }
  })

  const itemNames = items.map(i => i.ProductName)
  const categories = [...new Set(items.flatMap(i => i.ProductCategories))]
  const payload = {
    $event_id: `${cartId}_${Math.floor(Date.now() / 1000)}`,
    $value: totalValue,
    ItemNames: itemNames,
    CheckoutURL: checkoutUrl,
    Categories: categories,
    Items: items,
    Metadata: {
      Source: marketingParams.source,
      Medium: marketingParams.medium,
      CampaignID: marketingParams.campaign_id
    }
  }

  window.klaviyo.track('Started Checkout', payload)
}
