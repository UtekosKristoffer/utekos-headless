// Path: src/components/products/FreeBuffSelector.tsx
'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import type { ShopifyProduct } from 'types/product'
import Image from 'next/image'
import { cn } from '@/lib/utils/className'
const VARGNATT_IMAGE = '/black_buff_w.webp'

interface FreeBuffSelectorProps {
  buffProduct: ShopifyProduct | null
  includeBuff: boolean
  onIncludeBuffChange: (checked: boolean) => void
}

export function FreeBuffSelector({
  buffProduct,
  includeBuff,
  onIncludeBuffChange
}: FreeBuffSelectorProps) {
  if (!buffProduct) return null

  return (
    <div className='space-y-5'>
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

      {includeBuff && (
        <div className='space-y-3 pl-8 animate-in fade-in slide-in-from-top-2 duration-300'>
          <h4 className='text-sm font-semibold text-foreground/80 tracking-wide'>
            Farge
          </h4>
          <div className='flex gap-3'>
            <div
              className={cn(
                'group relative flex min-w-[140px] items-center gap-3 rounded-xl border-2 px-4 py-3',
                'border-emerald-600 bg-emerald-50/5 shadow-sm'
              )}
            >
              <div className='relative h-10 w-10 overflow-hidden rounded-lg ring-2 ring-emerald-600/30'>
                <Image
                  src={VARGNATT_IMAGE}
                  alt='Utekos Buff i fargen Vargnatt'
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, (max-width: 400px) 50vw, 33vw'
                />
              </div>
              <span className='text-sm font-medium text-foreground'>
                Vargnatt
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
