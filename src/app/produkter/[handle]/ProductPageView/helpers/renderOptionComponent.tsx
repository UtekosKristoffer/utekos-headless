/**
 * @module ProductPageView/helpers
 */

import { ColorSelector, SizeSelector } from '@/components/jsx'
import type { JSX } from 'react'

import type { ProductPageViewProps, ShopifyProduct } from '@types'

// STEG 1: Legg til 'productHandle' i typen
type RenderOptionComponentProps = Pick<
  ProductPageViewProps,
  'allVariants' | 'selectedVariant' | 'onOptionChange' | 'colorHexMap'
> & {
  option: ShopifyProduct['options'][number]
  productHandle: string
}

export function renderOptionComponent(
  props: RenderOptionComponentProps
): JSX.Element | null {
  // STEG 2: Hent ut 'productHandle' fra props
  const {
    allVariants,
    onOptionChange,
    option,
    selectedVariant,
    colorHexMap,
    productHandle
  } = props

  const optionName = option.name.toLowerCase()

  // STEG 3: Legg til 'productHandle' i felles props
  const componentProps = {
    onSelect: onOptionChange,
    optionName: option.name,
    selectedVariant,
    values: option.optionValues.map(v => v.name),
    variants: allVariants,
    colorHexMap,
    productHandle
  }

  if (optionName === 'størrelse') {
    // 'productHandle' blir nå automatisk sendt videre til SizeSelector
    return <SizeSelector key={option.name} {...componentProps} />
  }
  if (optionName === 'farge') {
    return <ColorSelector key={option.name} {...componentProps} />
  }
  return null
}
