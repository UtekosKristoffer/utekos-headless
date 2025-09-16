// Path  src/utils/optionMap.ts

import { ColorSelector } from '@/components/jsx/ColorSelector/ColorSelector'
import { SizeSelector } from '@/components/jsx/SizeSelector/SizeSelector'
import { OPTION_NAMES } from '@/constants/optionNames'
import { getSortedOptions } from '@/lib/helpers/async/getSortedOptions'
import { useEffect, useState } from 'react'

import type {
  ShopifyProduct,
  ShopifyProductVariant,
  ShopifySelectedOption
} from '@types'

type RenderOptionProps = {
  option: ShopifyProduct['options'][number]
  allVariants: ShopifyProductVariant[]
  selectedVariant: ShopifyProductVariant
  onOptionChange: (optionName: string, value: string) => void
}

type Props = {
  productData: ShopifyProduct
  selectedVariant: ShopifyProductVariant // Endret fra liste til enkelt objekt
  allVariants: ShopifyProductVariant[] // Endret fra enkelt objekt til liste
  onOptionChange: ShopifySelectedOption
}
export const optionComponentMap = {
  [OPTION_NAMES.SIZE]: SizeSelector,
  [OPTION_NAMES.COLOR]: ColorSelector
}
function RenderOption({
  option,
  allVariants,
  selectedVariant,
  onOptionChange
}: RenderOptionProps) {
  const Component =
    optionComponentMap[option.name as keyof typeof optionComponentMap]
  if (!Component) {
    return null
  }
  const uniqueValues = [
    ...new Set(
      allVariants
        .map(variant => {
          const relevantOption = variant.selectedOptions.find(
            opt => opt.name === option.name
          )
          return relevantOption ? relevantOption.value : null
        })
        .filter(Boolean) // Fjerner null-verdier
    )
  ] as string[]

  const props = {
    onSelect: onOptionChange,
    optionName: option.name,
    selectedVariant,
    values: uniqueValues, // Bruker den nye listen med unike verdier
    variants: allVariants
  }

  return <Component {...props} />
}

export function ProductOptions({
  productData,
  selectedVariant,
  allVariants,
  onOptionChange
}: Props) {
  const [sortedOptions, setSortedOptions] = useState<ShopifyProduct['options']>(
    []
  )

  useEffect(() => {
    const OPTION_ORDER = [OPTION_NAMES.COLOR, OPTION_NAMES.SIZE]
    const sortAndSetOptions = async () => {
      const options = getSortedOptions(productData.options, OPTION_ORDER)
      setSortedOptions(options)
    }
    sortAndSetOptions()
  }, [productData.options])

  return (
    <div>
      {/* LØSNING 2: Kaller RenderOption som en JSX-komponent */}
      {sortedOptions.map(option => (
        <RenderOption
          key={option.name} // 'key' er nå på riktig sted
          option={option}
          allVariants={allVariants}
          selectedVariant={selectedVariant}
          onOptionChange={onOptionChange}
        />
      ))}
    </div>
  )
}
