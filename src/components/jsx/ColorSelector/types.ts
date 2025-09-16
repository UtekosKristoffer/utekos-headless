import type { ShopifyProductVariant } from '@types'

export type ColorSelectorProps = {
  optionName: string
  values: string[]
  variants: ShopifyProductVariant[]
  selectedVariant: ShopifyProductVariant
  onSelect: (optionName: string, value: string) => void
}
