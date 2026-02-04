// Path: types/product.types.ts
import type { StaticImageData } from 'next/image'
import type {
  Image,
  Metafield,
  MetaobjectReference,
  Money,
  ShopifyImageConnection
} from '.'

export interface RelatedProductsProps {
  products: ShopifyProduct[]
}

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

export type WeightUnit = {
  unit: string
  value: number
}
export type ShopifySelectedOption = {
  name: string
  value: string
}

export type ProductOption = {
  name: string
  optionValues: {
    name: string
  }[]
}

type SelectedOption = {
  name: string
  value: string
}
export type VariantProfileReference = {
  reference: MetaobjectReference | null
}

export type ProductVariantEdge = {
  node: ShopifyProductVariant
}

export type ProductVariantConnection = {
  edges: ProductVariantEdge[]
}

export type ShopifyProductVariant = {
  id: string
  title: string
  barcode: string | null
  availableForSale: boolean
  currentlyNotInStock: boolean
  selectedOptions: SelectedOption[]
  price: Money
  image: Image | null
  compareAtPrice: Money | null
  product: ShopifyProduct
  metafield: Metafield | null
  sku: string | undefined
  variantProfile: VariantProfileReference | null
  variantProfileData?: Partial<MetaobjectReference>
  weight: number | null
  weightUnit: string
  quantityAvailable: number | null
}

export type ModelKey = 'techdown' | 'dun' | 'mikro'

export interface ColorVariant {
  name: string
  hex: string
}

export interface ProductConfig {
  id: string
  title: string
  subtitle: string
  price: number
  // Støtter både string (fra .src) og StaticImageData for fleksibilitet
  image: string | { src: string; width: number; height: number }
  colors: ColorVariant[]
  sizes: string[]
  features: string[]
}

export interface PurchaseClientViewProps {
  selectedModel: ModelKey
  setSelectedModel: (model: ModelKey) => void
  quantity: number
  setQuantity: (qty: number) => void
  selectedColorIndex: number
  setSelectedColorIndex: (index: number) => void
  selectedSize: string
  setSelectedSize: (size: string) => void
  handleAddToCart: () => void
  isPending: boolean
  currentConfig: ProductConfig
  currentColor: ColorVariant
  isTechDownOffer: boolean
}

export interface UsePurchaseLogicProps {
  products: Record<string, ShopifyProduct | null | undefined>
}
