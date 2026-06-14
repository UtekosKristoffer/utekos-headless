// Path: src/app/produkter/[handle]/ProductPageView/components/ProductDescription.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { safeJsonParse } from '@/lib/utils/safeJsonParse'
import { richTextToHtml } from '@/lib/utils/richTextToHtml'
import type { ProductDescriptionProps } from '@types'

export function ProductDescription({ descriptionHtml: descriptionJson }: ProductDescriptionProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const parsedRichTextObject = safeJsonParse(descriptionJson, null) as unknown
  const descriptionHtmlString = richTextToHtml(parsedRichTextObject)

  if (!descriptionHtmlString) {
    return null
  }

  const collapsedMaxHeightPx = 120
  const expandedMaxHeightPx = 5000

  return (
    <article
      aria-label='Produktbeskrivelse'
      className='mt-12 rounded-[1.25rem] font-utekos-text border border-muted-foreground bg-background p-5 shadow-lg shadow-muted-foreground/5'
    >
      <div aria-live='polite' aria-atomic='true' className='relative overflow-hidden'>
        <div
          id='product-description-content'
          style={{
            maxHeight: isDescriptionExpanded ? `${expandedMaxHeightPx}px` : `${collapsedMaxHeightPx}px`
          }}
          className='transition-[max-height] utekos-font-text duration-500 ease-in-out'
        >
          <div
            className='font-utekos-text text-foreground max-w-none leading-[1.5] [&_p]:text-base [&_p]:leading-relaxed [&_p+p]:mt-3'
            dangerouslySetInnerHTML={{ __html: descriptionHtmlString }}
          />
        </div>

        {!isDescriptionExpanded && (
          <div
            aria-hidden='true'
            className='pointer-events-none text-foreground font-utekos-text inset-x-0 bottom-0 h-16 w-full bg-linear-to-t from-background /50to-transparent'
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
          className='p-0 text-lg text-foreground  hover:text-foreground'
        >
          {isDescriptionExpanded ? 'Vis mindre' : 'Les mer'}
        </Button>
      </div>
    </article>
  )
}
