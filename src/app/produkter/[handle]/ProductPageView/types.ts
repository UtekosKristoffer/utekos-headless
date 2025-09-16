import type { Image, ShopifyProduct, ShopifyProductVariant } from '@types'

export type ProductPageViewProps = {
  productData: ShopifyProduct
  selectedVariant: ShopifyProductVariant
  allVariants: ShopifyProductVariant[]
  variantImages: Image[]
  onOptionChange: (_optionName: string, _value: string) => void
}
