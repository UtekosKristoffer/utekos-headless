import { getProduct } from './getProduct' // Antar at ShopifyProduct eksporteres her
import type { ShopifyProduct } from '@types'

type JudgeMeReviewData = {
  rating: number
  count: number
}

// Definerer en ny, beriket produkttype
export type ProductWithReviews = ShopifyProduct & {
  reviews?: JudgeMeReviewData
}

// OPPDATERT RETURTYPE HER:
export async function getProductWithReviews(
  handle: string
): Promise<ProductWithReviews | null> {
  const product = await getProduct(handle)
  // Nå er det lov å returnere null
  if (!product) return null

  const shopifyProductId = product.id.split('/').pop()
  if (!shopifyProductId) return product

  const shopDomain = process.env.SHOPIFY_SHOP_DOMAIN
  const publicApiToken = process.env.JUDGEME_PUBLIC_API_TOKEN

  if (!shopDomain || !publicApiToken) {
    console.error(
      'Shopify domain or Judge.me token is not set in environment variables.'
    )
    return product
  }

  try {
    const response = await fetch(
      `https://api.judge.me/v1/widgets/product_review_widget?shop_domain=${shopDomain}&product_id=${shopifyProductId}&api_token=${publicApiToken}`
    )

    if (!response.ok) {
      return product
    }

    const reviewsData = await response.json()
    const widgetData = reviewsData.widget

    if (widgetData && widgetData.rating && widgetData.count > 0) {
      return {
        ...product,
        reviews: {
          rating: widgetData.rating,
          count: widgetData.count
        }
      }
    }
  } catch (error) {
    console.error('Failed to fetch Judge.me reviews:', error)
    return product
  }

  return product
}
