import type {
  ShopifyImage,
  ShopifyProduct,
  ShopifyProductVariant
} from '@types'

export type ProductPageViewProps = {
  productData: ShopifyProduct
  selectedVariant: ShopifyProductVariant
  allVariants: ShopifyProductVariant[]
  variantImages: ShopifyImage[]
  onOptionChange: (_optionName: string, _value: string) => void
}
