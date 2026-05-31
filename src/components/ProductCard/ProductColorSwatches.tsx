import type { Dispatch, SetStateAction } from 'react'
import type { ShopifyProduct } from 'types/product'

interface ProductColorSwatchesProps {
  colorOption: ShopifyProduct['options'][number]
  colorHexMap: Map<string, string>
  selectedOptions: Record<string, string>
  onOptionChange: Dispatch<SetStateAction<Record<string, string>>>
}

export function ProductColorSwatches({
  colorOption,
  colorHexMap,
  selectedOptions,
  onOptionChange
}: ProductColorSwatchesProps) {
  return (
    <div
      className='flex max-w-[46%] shrink-0 flex-wrap items-center justify-end gap-2 pt-1'
      aria-label='Velg farge'
    >
      {colorOption.optionValues.map(value => {
        const colorCode = colorHexMap.get(value.name)
        if (!colorCode) return null

        const isSelected = selectedOptions[colorOption.name] === value.name

        return (
          <button
            key={value.name}
            type='button'
            onClick={event => {
              event.preventDefault()
              event.stopPropagation()
              onOptionChange(prev => ({
                ...prev,
                [colorOption.name]: value.name
              }))
            }}
            className={`btn-variant-swatch hover:scale-110 ${
              isSelected ?
                'border-border ring-1 ring-border'
              : 'border-cloud-dancer/20 hover:border-cloud-dancer/40 hover:ring-2 hover:ring-cloud-dancer/20'
            }`}
            style={{ backgroundColor: colorCode }}
            title={value.name}
            aria-label={`Velg farge ${value.name}`}
            aria-pressed={isSelected}
          />
        )
      })}
    </div>
  )
}
