// Path: src/components/ProductCard/ProductVariantSelector.tsx
'use client'
import { SizeLabel } from '@/components/ProductCard/SizeLabel'
import type { ShopifyProduct } from '@types'
import type React from 'react'

interface ProductVariantSelectorProps {
  options: ShopifyProduct['options']
  colorMap: Record<string, { name: string; code: string }>
  selectedOptions: Record<string, string>
  onOptionChange: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

export function ProductVariantSelector({
  options,
  colorMap,
  selectedOptions,
  onOptionChange
}: ProductVariantSelectorProps) {
  return (
    <div className='flex flex-col gap-4'>
      {options
        .filter(option => option.name.toLowerCase() !== 'kjønn')
        .map(option => (
          <div key={option.name}>
            {option.name.toLowerCase() === 'størrelse' ?
              <SizeLabel />
            : <span className='text-sm text-white mb-2 uppercase tracking-wide font-medium'>
                {option.name}
              </span>
            }
            <div className='flex items-center gap-2 mt-2 flex-wrap'>
              {option.name.toLowerCase() === 'farge' ?
                option.optionValues.map(value => {
                  const colorData = colorMap[value.name]
                  if (!colorData) return null

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
                      className={`w-6 h-6 rounded-full border-2 transition-all duration-200 hover:scale-110 cursor-pointer ${
                        selectedOptions[option.name] === value.name ?
                          'border-border ring-2 ring-primary/30'
                        : 'border-primary hover:border-primary/50'
                      }`}
                      style={{ backgroundColor: colorData.code }}
                      title={colorData.name}
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
                    className={`px-3 py-1 text-sm border rounded transition-all duration-200 hover:border-white cursor-pointer ${
                      selectedOptions[option.name] === value.name ?
                        'border-border bg-primary/10 text-white font-medium'
                      : 'border-primary text-white'
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
