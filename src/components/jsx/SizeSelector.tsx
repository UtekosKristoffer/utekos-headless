'use client'

import { useState } from 'react'

import { safeJsonParse } from '@/lib/utils/'
import Link from 'next/link'
import { OptionButton } from '@/components/jsx/OptionButton'
import type { ShopifyProductVariant } from '@/types'
type Dimension = {
  value: number
  unit: string
} | null

type SizeSelectorProps = {
  optionName: string
  values: string[]
  variants: ShopifyProductVariant[]
  selectedVariant: ShopifyProductVariant
  onSelect: (optionName: string, value: string) => void
}

// Funksjonen getField er fjernet, den er ikke lenger nødvendig.

export function SizeSelector({
  optionName,
  values,
  variants,
  selectedVariant,
  onSelect
}: SizeSelectorProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  return (
    <div className='space-y-3'>
      {values.map(sizeValue => {
        const representativeVariant = variants.find(v =>
          v.selectedOptions.some(
            opt => opt.name === optionName && opt.value === sizeValue
          )
        )

        // Hent data direkte fra den nye, forutsigbare strukturen
        const variantProfileRef =
          representativeVariant?.variantProfile?.reference

        const lengthJson = variantProfileRef?.length?.value
        const centerToWristJson = variantProfileRef?.centerToWrist?.value
        const flatWidthJson = variantProfileRef?.flatWidth?.value

        const length = safeJsonParse<Dimension>(lengthJson, null)
        const centerToWrist = safeJsonParse<Dimension>(centerToWristJson, null)
        const flatWidth = safeJsonParse<Dimension>(flatWidthJson, null)

        const isSelected = selectedVariant.selectedOptions.some(
          opt => opt.name === optionName && opt.value === sizeValue
        )

        return (
          <OptionButton
            key={sizeValue}
            isSelected={isSelected}
            onClick={() => onSelect(optionName, sizeValue)}
          >
            <span className='font-semibold'>{sizeValue}</span>
            <div className='text-right text-xs text-foreground-on-dark/60'>
              {length && <div>Lengde til hals: {`${length.value} cm`}</div>}
              {centerToWrist && (
                <div>Senter til ermetupp: {`${centerToWrist.value} cm`}</div>
              )}
              {flatWidth && <div>Flatmål bunn: {`${flatWidth.value} cm`}</div>}
            </div>
          </OptionButton>
        )
      })}

      <div className='flex w-full flex-col rounded-lg border border-white/20 bg-surface-raised/40 p-4 text-left transition-colors'>
        <button
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          className='flex w-full justify-between bg-transparent p-0 font-semibold text-foreground-on-dark/80 transition-colors hover:text-foreground-on-dark'
          aria-expanded={isDetailsOpen}
          aria-controls='size-details'
        >
          <span className='font-semibold'>Usikker på størrelsen?</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className={`transform transition-transform duration-200 ${isDetailsOpen ? 'rotate-45' : ''}`}
            aria-hidden='true'
          >
            <path d='M5 12h14' />
            <path d='M12 5v14' />
          </svg>
        </button>
        <div
          id='size-details'
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isDetailsOpen ? 'max-h-40 pt-3 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <p className='text-xs text-foreground-on-dark/80'>
            Se dimensjonene på Utekos-modellene{' '}
            <Link
              href='/størrelsesguide'
              className='underline hover:text-foreground-on-dark'
            >
              her
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
