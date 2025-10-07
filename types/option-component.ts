import type { ProductPageViewProps, ShopifyProduct } from '@types'
export type RenderOptionComponentProps = Pick<
  ProductPageViewProps,
  'allVariants' | 'selectedVariant' | 'onOptionChange' | 'colorHexMap'
> & {
  option: ShopifyProduct['options'][number]
  productHandle: string
}
