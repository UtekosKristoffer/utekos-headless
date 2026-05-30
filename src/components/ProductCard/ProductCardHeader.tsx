import { CardHeader, CardTitle } from '@/components/ui/card'
import type { ProductCardHeaderProps } from '@types'
import Link from 'next/link'
import { ProductColorSwatches } from './ProductColorSwatches'
import { ProductVariantSelector } from './ProductVariantSelector'

export function ProductCardHeader({
  title,
  options,
  colorHexMap,
  selectedOptions,
  onOptionChange,
  productUrl
}: ProductCardHeaderProps) {
  const colorOption = options.find(option => option.name.toLowerCase() === 'farge')
  const optionsWithoutColor = options.filter(option => option.name.toLowerCase() !== 'farge')

  return (
    <CardHeader className='flex-grow border-t border-cloud-dancer/10 p-6 pb-4'>
      <div className='mb-4 flex items-start justify-between gap-4'>
        <Link
          href={productUrl}
          className='min-w-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
        >
          <CardTitle className='line-clamp-2 text-balance text-xl font-semibold text-cloud-dancer'>
            {title}
          </CardTitle>
        </Link>

        {colorOption && (
          <ProductColorSwatches
            colorOption={colorOption}
            colorHexMap={colorHexMap}
            selectedOptions={selectedOptions}
            onOptionChange={onOptionChange}
          />
        )}
      </div>
      <ProductVariantSelector
        options={optionsWithoutColor}
        colorHexMap={colorHexMap}
        selectedOptions={selectedOptions}
        onOptionChange={onOptionChange}
      />
    </CardHeader>
  )
}
