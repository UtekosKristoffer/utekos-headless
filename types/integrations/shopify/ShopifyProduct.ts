// Path: src/integrations/shopify/ShopifyProduct.ts
import type {
  Image,
  Money,
  Metafield,
  MetaobjectReference,
  ProductOption,
  ProductVariantConnection,
  ShopifyImageConnection,
  ShopifyProductVariant,
  WeightUnit
} from '@types'

export type ShopifyProduct = {
  id: string
  title: string
  handle: string
  productType: string
  totalInventory: number
  updatedAt: string
  collections: {
    nodes: {
      id: string
      title: string
      handle: string
    }[]
  }
  compareAtPriceRange: {
    minVariantPrice: Money
    maxVariantPrice: Money
  }
  priceRange: {
    minVariantPrice: Money
    maxVariantPrice: Money
  }
  availableForSale: boolean
  images: ShopifyImageConnection
  options: ProductOption[]
  description: string
  featuredImage: Image | null
  vendor: string
  tags: string[]
  relatedProducts: ShopifyProduct[]
  metafield?: Metafield | null
  quantityAvailable?: number | null
  category: {
    id: string
    name: string
    ancestors: {
      id: string
      name: string
      ancestors: string
    }
  }
  variantProfile?: MetaobjectReference | null
  seo: {
    title: string | null
    description: string | null
  }
  selectedOrFirstAvailableVariant: ShopifyProductVariant
  variants: ProductVariantConnection
  weight: WeightUnit
}
