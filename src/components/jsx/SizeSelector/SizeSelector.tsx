'use client'
import Link from 'next/link'
import { useState } from 'react'

import { OptionButton } from '@/components/jsx/OptionButton'
import { safeJsonParse } from '@/lib/utils/safeJsonParse'

import type { Dimension, SizeSelectorProps } from '@types'

export function SizeSelector({
  optionName,
  values,
  variants,
  selectedVariant,
  onSelect,
  productHandle
}: SizeSelectorProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handlesToHideGuide = ['utekos-buff', 'utekos-stapper']

  return (
    <div className='space-y-3'>
      {values.map(sizeValue => {
        const representativeVariant = variants.find(v =>
          v.selectedOptions.some(
            opt => opt.name === optionName && opt.value === sizeValue
          )
        )

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

      {/* STEG 2: Bruker nå propen til å sjekke betingelsen */}
      {!handlesToHideGuide.includes(productHandle) && (
        <div className='flex w-full flex-col rounded-lg border border-white/20 bg-sidebar-foreground bg-surface-raised/40 p-4 text-left transition-colors'>
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
              className={`transform rounded-full ring-1 ring-button text-button transition-transform duration-200 hover:scale-105 hover:ring-2 ${isDetailsOpen ? 'rotate-45' : ''}`}
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
                href='/handlehjelp/storrelsesguide'
                className='underline text-button hover:text-foreground-on-dark'
              >
                her
              </Link>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
