// Path: src/app/produkter/[handle]/ProductPageView/components/ProductDescription.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { safeJsonParse } from '@/lib/utils/safeJsonParse'
import { richTextToHtml } from '@/lib/utils/richTextToHtml'
import type { ProductDescriptionProps } from '@types'

export function ProductDescription({
  descriptionHtml: descriptionJson
}: ProductDescriptionProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const parsedRichTextObject = safeJsonParse(descriptionJson, null) as unknown
  const descriptionHtmlString = richTextToHtml(parsedRichTextObject)

  if (!descriptionHtmlString) {
    return null
  }

  const collapsedMaxHeightPx = 120
  const expandedMaxHeightPx = 5000

  return (
    <article aria-label='Produktbeskrivelse' className='mt-12'>
      <div
        aria-live='polite'
        aria-atomic='true'
        className='relative overflow-hidden'
      >
        <div
          id='product-description-content'
          style={{
            maxHeight:
              isDescriptionExpanded ?
                `${expandedMaxHeightPx}px`
              : `${collapsedMaxHeightPx}px`
          }}
          className='transition-[max-height] duration-500 ease-in-out'
        >
          <div
            className='prose prose-invert max-w-none text-foreground-on-dark/80'
            dangerouslySetInnerHTML={{ __html: descriptionHtmlString }}
          />
        </div>

        {!isDescriptionExpanded && (
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full bg-gradient-to-t from-background to-transparent'
          />
        )}
      </div>

      <div className='mt-4'>
        <Button
          type='button'
          variant='link'
          aria-expanded={isDescriptionExpanded}
          aria-controls='product-description-content'
          onClick={() => setIsDescriptionExpanded(prev => !prev)}
          className='p-0 text-base text-link hover:text-link/80'
        >
          {isDescriptionExpanded ? 'Vis mindre' : 'Les mer'}
        </Button>
      </div>
    </article>
  )
}
