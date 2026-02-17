// Path: types/product/PageProps.ts

import type { Image } from 'types/media'
import type { ShopifyProduct } from './ShopifyProduct'
import type { ShopifyProductVariant } from './ShopifyProductVariant'
import type { ColorVariant, ModelKey, ProductConfig } from './ProductTypes'
export type ProductPageViewProps = {
  productData: ShopifyProduct
  selectedVariant: ShopifyProductVariant
  allVariants: ShopifyProductVariant[]
  variantImages: Image[]
  relatedProducts: ShopifyProduct[]
  colorHexMap: Map<string, string>
  onOptionChange: (_optionName: string, _value: string) => void
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

export type ProductViewProps = {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant
}
