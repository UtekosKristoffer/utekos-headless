// Path: '@/app/produkter/[handle]/ProductPageView/helpers/renderOptionComponent'

/**
 * @module ProductPageView/helpers
 */

import { ColorSelector, SizeSelector } from '@/components/jsx'
import type { JSX } from 'react'

import type { ProductPageViewProps, ShopifyProduct } from '@types'
type RenderOptionComponentProps = Pick<
  ProductPageViewProps,
  'allVariants' | 'selectedVariant' | 'onOptionChange'
> & {
  option: ShopifyProduct['options'][number]
}

export async function renderOptionComponent(
  props: RenderOptionComponentProps
): Promise<JSX.Element | null> {
  const { allVariants, onOptionChange, option, selectedVariant } = props

  const optionName = option.name.toLowerCase()
  const componentProps = {
    onSelect: onOptionChange,
    optionName: option.name,
    selectedVariant,
    values: option.optionValues.map(v => v.name),
    variants: allVariants
  }

  if (optionName === 'størrelse') {
    return <SizeSelector key={option.name} {...componentProps} />
  }
  if (optionName === 'farge') {
    return <ColorSelector key={option.name} {...componentProps} />
  }
  return null
}
