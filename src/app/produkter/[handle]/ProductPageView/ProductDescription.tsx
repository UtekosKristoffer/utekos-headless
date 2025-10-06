// Path: src/app/produkter/[handle]/ProductPageView/components/ProductDescription.tsx
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import safeJsonParse from '@/lib/utils/safeJsonParse'
import { richTextToHtml } from '@/lib/utils/richTextToHtml'
import type { ProductDescriptionProps } from '@types'

export function ProductDescription({
  descriptionHtml: descriptionJson
}: ProductDescriptionProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState<boolean>(false)
  const [expandedContentHeightPx, setExpandedContentHeightPx] =
    useState<number>(0)

  const descriptionContentRef = useRef<HTMLDivElement>(null)

  const parsedRichTextObject = useMemo(
    () => safeJsonParse(descriptionJson, null) as unknown,
    [descriptionJson]
  )
  const descriptionHtmlString = useMemo(
    () => richTextToHtml(parsedRichTextObject),
    [parsedRichTextObject]
  )

  useEffect(() => {
    const updateMeasuredHeight = (): void => {
      const node = descriptionContentRef.current
      if (!node) return
      const previousMaxHeight = node.style.maxHeight
      node.style.maxHeight = 'none'
      const measured = node.scrollHeight
      node.style.maxHeight = previousMaxHeight
      setExpandedContentHeightPx(measured)
    }

    updateMeasuredHeight()
    window.addEventListener('resize', updateMeasuredHeight, { passive: true })
    return () => window.removeEventListener('resize', updateMeasuredHeight)
  }, [descriptionHtmlString])

  if (!descriptionHtmlString) {
    return null
  }

  const collapsedMaxHeightPx = 120

  return (
    <article aria-label='Produktbeskrivelse' className='mt-12'>
      <div
        aria-live='polite'
        aria-atomic='true'
        className='relative overflow-hidden'
      >
        <div
          ref={descriptionContentRef}
          // Overgang fra kollapset (120px) til målt høyde. Bruker bare transform/opacity-uavhengig egenskap (max-height) for smooth anim.
          style={{
            maxHeight:
              isDescriptionExpanded ?
                `${expandedContentHeightPx}px`
              : `${collapsedMaxHeightPx}px`
          }}
          className='transition-[max-height] duration-500 ease-in-out'
        >
          <div
            className='prose prose-invert max-w-none text-foreground-on-dark/80'
            // Innhold kommer fra butikkens CMS (allerede sanitisert/formattert i richTextToHtml)
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
