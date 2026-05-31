import Link from 'next/link'
import { useState } from 'react'

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
      <div className='grid grid-cols-3 gap-2 md:flex md:flex-col md:gap-3'>
        {values.map(sizeValue => {
          const representativeVariant = variants.find(v =>
            v.selectedOptions.some(opt => opt.name === optionName && opt.value === sizeValue)
          )

          const variantProfileRef = representativeVariant?.variantProfile?.reference
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
            <button
              key={sizeValue}
              type='button'
              onClick={() => onSelect(optionName, sizeValue)}
              role='radio'
              aria-checked={isSelected}
              data-selected={isSelected}
              className='flex min-h-12 items-center justify-center rounded-[1rem] border bg-cloud-dancer/72 px-3 py-3 text-center text-sm text-muted transition-all duration-200 ease-in-out data-[selected=true]:border-havdyp data-[selected=true]:ring-1 data-[selected=true]:ring-havdyp data-[selected=false]:border-havdyp/14 data-[selected=false]:hover:border-dusted-peri/50 md:w-full md:justify-between md:p-4 md:text-left md:text-base'
            >
              <span className='font-semibold'>{sizeValue}</span>
              <div className='hidden text-right text-xs text-havdyp/62 md:block'>
                {length && <div>Lengde til hals: {`${length.value} cm`}</div>}
                {centerToWrist && <div>Senter til ermetupp: {`${centerToWrist.value} cm`}</div>}
                {flatWidth && <div>Flatmål bunn: {`${flatWidth.value} cm`}</div>}
              </div>
            </button>
          )
        })}
      </div>

      {!handlesToHideGuide.includes(productHandle) && (
        <div className='flex w-full flex-col rounded-[1rem] border border-havdyp/14 bg-cloud-dancer/72 p-4 text-left transition-colors'>
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className='flex w-full justify-between bg-transparent p-0 font-semibold text-background transition-colors hover:text-havdyp'
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
              className={`transform rounded-full text-havdyp ring-1 ring-havdyp transition-transform duration-200 hover:scale-105 hover:ring-2 ${isDetailsOpen ? 'rotate-45' : ''}`}
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
            <p className='text-xs text-havdyp'>
              Se dimensjonene på Utekos-modellene{' '}
              <Link
                href='/handlehjelp/storrelsesguide'
                className='text-havdyp underline hover:text-havdyp/76'
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
