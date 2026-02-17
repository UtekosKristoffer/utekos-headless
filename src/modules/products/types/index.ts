// Path: types/product.types.ts
import type { MetaobjectReference } from '@/modules/products/types/MetaObject'
import type { ShopifyProductVariant } from '@/modules/products/types/ShopifyProductVariant'
import type { ShopifyProduct } from '@/modules/products/types/ShopifyProduct'
export type RelatedProductsProps = {
  products: ShopifyProduct[]
}

export type WeightUnit = {
  unit: string
  value: number
}

export type ProductOption = {
  name: string
  optionValues: {
    name: string
  }[]
}

export type SelectedOption = {
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

export type ModelKey = 'techdown' | 'dun' | 'mikro'

export type ColorVariant = {
  name: string
  hex: string
}

export type ProductConfig = {
  id: string
  title: string
  subtitle: string
  price: number
  image: string | { src: string; width: number; height: number }
  colors: ColorVariant[]
  sizes: string[]
  features: string[]
}

export type PurchaseClientViewProps = {
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

export type UsePurchaseLogicProps = {
  products: Record<string, ShopifyProduct | null | undefined>
}

export type MicrofiberColor = 'fjellbla' | 'vargnatt'

export type MicrofiberSize = 'medium' | 'large'

export type MicrofiberLogicProps = {
  color: MicrofiberColor
  setColor: (color: MicrofiberColor) => void
  size: MicrofiberSize
  setSize: (size: MicrofiberSize) => void
  activeImage: string | undefined
  handleAddToCart: () => void
  scrollToSizeGuide: () => void
  isPending: boolean
}
