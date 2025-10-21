// Path: src/components/products/VariantSelectors.tsx
'use client'

import { Button } from '@/components/ui/button'
import type { ShopifyProduct, ShopifyProductVariant } from '@types'
import { cn } from '@/lib/utils/className'

interface VariantSelectorsProps {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant
  onUpdateVariant: (optionName: string, value: string) => void
}

export function VariantSelectors({
  product,
  selectedVariant,
  onUpdateVariant
}: VariantSelectorsProps) {
  return (
    <div className='space-y-6'>
      {product.options
        .filter(option => option.name !== 'Kjønn')
        .map(option => {
          const currentSelectedValue = selectedVariant.selectedOptions.find(
            selected => selected.name === option.name
          )?.value

          // Hvis det bare er ett valg, vis det uten knapper
          if (option.optionValues.length === 1) {
            return (
              <div key={option.name} className='space-y-2'>
                <h3 className='text-sm font-semibold text-foreground/80 uppercase tracking-wide'>
                  {option.name}
                </h3>
                <p className='text-base font-medium'>{currentSelectedValue}</p>
              </div>
            )
          }

          return (
            <div key={option.name} className='space-y-3'>
              <h3 className='text-sm font-semibold text-foreground/80 uppercase tracking-wide'>
                {option.name}
              </h3>

              <div className='flex flex-wrap gap-2'>
                {option.optionValues.map(({ name: value }) => {
                  const isActive = currentSelectedValue === value

                  return (
                    <Button
                      key={value}
                      variant={isActive ? 'control' : 'secondary'}
                      onClick={() => onUpdateVariant(option.name, value)}
                      className={cn(
                        'rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-200',
                        'hover:scale-105 active:scale-95',
                        isActive ? 'shadow-md' : 'hover:border-neutral-800'
                      )}
                      aria-pressed={isActive}
                      aria-label={`Velg ${option.name} ${value}`}
                    >
                      {value}
                    </Button>
                  )
                })}
              </div>
            </div>
          )
        })}
    </div>
  )
}
