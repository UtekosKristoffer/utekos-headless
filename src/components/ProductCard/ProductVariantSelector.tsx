'use client'

import { SizeLabel } from '@/components/ProductCard/SizeLabel'
import type { ShopifyProduct } from '@types'
import type React from 'react'

interface ProductVariantSelectorProps {
  options: ShopifyProduct['options']
  selectedOptions: Record<string, string>
  onOptionChange: React.Dispatch<React.SetStateAction<Record<string, string>>>
  colorHexMap: Map<string, string>
}
export function ProductVariantSelector({
  options,
  selectedOptions,
  onOptionChange,
  colorHexMap
}: ProductVariantSelectorProps) {
  return (
    <div className='flex flex-col gap-4'>
      {options
        .filter(option => option.name.toLowerCase() !== 'kjønn')
        .map(option => (
          <div key={option.name}>
            {option.name.toLowerCase() === 'størrelse' ?
              <SizeLabel />
            : <span className='mb-2 text-sm font-medium uppercase tracking-wide text-white'>
                {option.name}
              </span>
            }
            <div className='mt-2 flex flex-wrap items-center gap-2'>
              {option.name.toLowerCase() === 'farge' ?
                option.optionValues.map(value => {
                  const colorCode = colorHexMap.get(value.name)
                  if (!colorCode) return null

                  return (
                    <button
                      key={value.name}
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        onOptionChange(prev => ({
                          ...prev,
                          [option.name]: value.name
                        }))
                      }}
                      className={`btn-variant-swatch hover:scale-110 ${
                        selectedOptions[option.name] === value.name ?
                          // Selected
                          'border-border ring-1 ring-border'
                          // Unselected
                        : 'border-primary hover:border-primary/50 hover:ring-2 hover:ring-border'
                      }`}
                      style={{ backgroundColor: colorCode ?? undefined }}
                      title={value.name}
                    />
                  )
                })
              : option.optionValues.map(value => (
                  <button
                    key={value.name}
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()
                      onOptionChange(prev => ({
                        ...prev,
                        [option.name]: value.name
                      }))
                    }}
                    className={`btn-variant-option hover:border-white ${
                      selectedOptions[option.name] === value.name ?
                        'border-border font-medium text-white'
                      : 'border-primary text-white hover:border-primary/50'
                    }`}
                  >
                    {value.name}
                  </button>
                ))
              }
            </div>
          </div>
        ))}
    </div>
  )
}
