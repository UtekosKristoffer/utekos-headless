import type { ShopifyProductVariant } from '@types'

export type SizeSelectorProps = {
  optionName: string
  values: string[]
  variants: ShopifyProductVariant[]
  selectedVariant: ShopifyProductVariant
  onSelect: (_optionName: string, _value: string) => void
}

export type Dimension = {
  value: number
  unit: string
} | null
