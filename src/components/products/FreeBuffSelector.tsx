// Path: src/components/products/FreeBuffSelector.tsx
'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import type { ShopifyProduct } from '@types'
import Image from 'next/image'
import { cn } from '@/lib/utils/className'

const buffImages = {
  Fjellblå: '/buff_blue.webp',
  Vargnatt: '/black_buff_w.webp'
}

interface FreeBuffSelectorProps {
  buffProduct: ShopifyProduct | null
  includeBuff: boolean
  onIncludeBuffChange: (checked: boolean) => void
  selectedBuffColor: string
  onBuffColorChange: (color: string) => void
}

export function FreeBuffSelector({
  buffProduct,
  includeBuff,
  onIncludeBuffChange,
  selectedBuffColor,
  onBuffColorChange
}: FreeBuffSelectorProps) {
  if (!buffProduct) return null

  const colorOption = buffProduct.options.find(opt => opt.name === 'Farge')
  if (!colorOption) return null

  return (
    <div className='space-y-5'>
      {/* Checkbox for å inkludere buff */}
      <div className='flex items-start gap-3'>
        <Checkbox
          id='include-buff'
          checked={includeBuff}
          onCheckedChange={checked => onIncludeBuffChange(Boolean(checked))}
          className='h-5 w-5 mt-0.5'
        />
        <Label
          htmlFor='include-buff'
          className='cursor-pointer text-base font-medium leading-relaxed'
        >
          Ja takk, legg til gratis Utekos Buff™
          <span className='ml-2 text-sm text-foreground/60 line-through'>
            249,-
          </span>
        </Label>
      </div>

      {/* Fargevalg */}
      {includeBuff && (
        <div className='space-y-3 pl-8 animate-in fade-in slide-in-from-top-2 duration-300'>
          <h4 className='text-sm font-semibold text-foreground/80 uppercase tracking-wide'>
            Velg farge
          </h4>
          <div className='flex flex-wrap gap-3'>
            {colorOption.optionValues.map(({ name: color }) => {
              const isSelected = selectedBuffColor === color
              return (
                <button
                  key={color}
                  type='button'
                  onClick={() => onBuffColorChange(color)}
                  className={cn(
                    'group relative flex flex-1 min-w-[140px] items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all duration-200',
                    'hover:shadow-md active:scale-98',
                    isSelected ?
                      'border-emerald-600 bg-emerald-50/5 shadow-sm'
                    : 'border-neutral-700/50 hover:border-neutral-600'
                  )}
                  aria-label={`Velg ${color}`}
                >
                  {/* Checkmark for valgt farge */}
                  {isSelected && (
                    <div className='absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 shadow-sm'>
                      <svg
                        className='h-3 w-3 text-white'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={3}
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                    </div>
                  )}

                  {/* Fargebilde */}
                  <div
                    className={cn(
                      'relative h-10 w-10 overflow-hidden rounded-lg ring-2 transition-all',
                      isSelected ?
                        'ring-emerald-600/30'
                      : 'ring-neutral-700/20 group-hover:ring-neutral-600/40'
                    )}
                  >
                    <Image
                      src={buffImages[color as keyof typeof buffImages]}
                      alt={`Utekos Buff i fargen ${color}`}
                      fill
                      className='object-cover'
                    />
                  </div>

                  {/* Fargenavn */}
                  <span
                    className={cn(
                      'text-sm font-medium transition-colors',
                      isSelected ? 'text-foreground' : (
                        'text-foreground/70 group-hover:text-foreground'
                      )
                    )}
                  >
                    {color}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
