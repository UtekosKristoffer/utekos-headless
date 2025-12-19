'use client'

import Cookies from 'js-cookie'
import type { ShopifyProduct } from '@types' // Antar at denne typen er definert i prosjektet ditt
import { getOrSetExternalId } from '../MetaPixel/getOrSetExternalId'

interface MarketingParams {
  campaign_id?: string
  source?: string
  medium?: string
  [key: string]: string | undefined
}

/**
 * Hjelpefunksjon for å hente marketing_params fra cookies.
 * Denne kjører trygt på klienten.
 */
function getMarketingParams(): MarketingParams {
  const marketingParamsJson = Cookies.get('marketing_params')

  if (!marketingParamsJson) {
    return {}
  }

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
 * Sporer visning av produkt (Viewed Product)
 * Inkluderer nå marketing data fra cookies hvis tilgjengelig.
 */
export function trackViewedProduct(product: ShopifyProduct) {
  // Sjekk at vi er i nettleseren og at klaviyo er tilgjengelig
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
      // Fletter inn marketing data i Metadata
      Source: marketingParams.source,
      Medium: marketingParams.medium,
      CampaignID: marketingParams.campaign_id
    }
  }

  // Sender eventene til Klaviyo
  window.klaviyo.track('Viewed Product', item)
  window.klaviyo.trackViewedItem(item)
}

/**
 * Sporer "Added to Cart"
 * Inkluderer også marketing data og knytter det til brukerens sesjon.
 */
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
    Customer: getOrSetExternalId(), // Henter ekstern ID for sporing
    Metadata: {
      Brand: product.vendor,
      Price: variant.price.amount,
      CompareAtPrice: variant.compareAtPrice,
      // Fletter inn marketing data
      Source: marketingParams.source,
      Medium: marketingParams.medium,
      CampaignID: marketingParams.campaign_id
    }
  }

  window.klaviyo.track('Added To Cart', item)
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
