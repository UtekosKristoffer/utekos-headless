// Path: types/product/ShopifyProduct.ts
import type {
  Image,
  Money,
  MetaobjectReference,
  ShopifyImageConnection
} from '@types'
import type { Metafield } from './MetaField'
import type { ProductOption, ProductVariantConnection } from './ProductTypes'
import type { ShopifyProductVariant } from './ShopifyProductVariant'
import type { WeightUnit } from './ProductTypes'
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
