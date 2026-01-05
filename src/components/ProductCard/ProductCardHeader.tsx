import { CardHeader, CardTitle } from '@/components/ui/card'
import type { ProductCardHeaderProps } from '@types'
import Link from 'next/link'
import { ProductVariantSelector } from './ProductVariantSelector'

export function ProductCardHeader({
  title,
  options,
  colorHexMap,
  selectedOptions,
  onOptionChange,
  productUrl
}: ProductCardHeaderProps) {
  return (
    <CardHeader className='flex-grow border-t border-neutral-800 p-6 pb-4'>
      <Link href={productUrl}>
        <CardTitle className='mb-3 text-balance text-xl font-semibold text-white line-clamp-2'>
          {title}
        </CardTitle>
      </Link>
      <ProductVariantSelector
        options={options}
        colorHexMap={colorHexMap}
        selectedOptions={selectedOptions}
        onOptionChange={onOptionChange}
      />
    </CardHeader>
  )
}
