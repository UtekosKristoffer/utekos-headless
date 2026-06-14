'use client'

import { dispatchMetaTrackingEvent } from '@/lib/tracking/meta/dispatchMetaTrackingEvent'
import { sendGAEvent } from '@next/third-parties/google'
import { AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { colorHexByTextClass } from '../utils/colorHexByTextClass'
import { AccordionContentRenderer } from './AccordionContentRenderer'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { track } from '@vercel/analytics/react'
import { generateEventID } from '@/components/analytics/Meta/generateEventID'
import { hasServiceConsent } from '@/lib/tracking/consent/hasServiceConsent'
import { USERCENTRICS_VERCEL_ANALYTICS_SERVICE_NAME } from '@/components/cookie-consent/usercentricsConfig'
import type { AccordionSectionData } from '@types'

export function ProductDetailsAccordionSection({
  sectionData,
  currentVariantId
}: {
  sectionData: AccordionSectionData
  currentVariantId?: string
}) {
  const { id, title, content, Icon, color } = sectionData
  const glowHexColor = colorHexByTextClass[color] ?? 'oklch(0.2884 0.0366 279.42)'
  const borderGlowStyle = {
    boxShadow: `0 0 20px -5px ${glowHexColor}`
  }

  const handleInteraction = () => {
    const rawId = currentVariantId ? cleanShopifyId(currentVariantId) : id
    const contentId = rawId || ''
    const contentIds = contentId ? [contentId] : []
    const eventID = generateEventID().replace('evt_', 'acc_')
    const pixelEventData = {
      content_name: title,
      content_ids: contentIds,
      content_type: 'product',
      accordion_section: id
    }

    void dispatchMetaTrackingEvent({
      eventName: 'InteractWithAccordion',
      eventId: eventID,
      eventData: pixelEventData
    })
  }

  return (
    <AccordionItem
      value={id}
      className='group relative overflow-hidden border-b border-havdyp bg-background transition-all duration-200'
      style={{
        contain: 'layout style paint'
      }}
    >
      <div
        className='pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-200 group-hover:opacity-10 group-data-[state=open]:opacity-10'
        style={{
          background: `linear-gradient(135deg, transparent 60%, ${glowHexColor}22 100%)`
        }}
      />

      <AccordionTrigger
        onClick={() => {
          handleInteraction()
          if (hasServiceConsent(USERCENTRICS_VERCEL_ANALYTICS_SERVICE_NAME)) {
            track('ProductPageAccordionInteraction', {
              section: title,
              sectionId: id
            })
          }

          sendGAEvent('event', 'buttonClicked', { value: title }) // Oppdaterte value til title her også for konsistens
        }}
        className='relative z-10 items-center px-6 py-4 text-foreground transition-colors duration-200 hover:text-foreground data-[state=open]:text-foreground hover:no-underline [&>svg]:text-foreground/70'
      >
        <div className='flex items-center gap-4'>
          <div
            className='flex size-10 items-center justify-center rounded-full border border-cloud-dancer/20 bg-cloud-dancer/8 transition-transform duration-200 group-hover:scale-105'
            style={{ transform: 'translateZ(0)' }}
          >
            <Icon className={`size-5 shrink-0 transition-colors duration-200 ${color}`} aria-hidden='true' />
          </div>
          <span className='text-md font-semibold leading-[1.2] tracking-[-0.01em]'>{title}</span>
        </div>
      </AccordionTrigger>

      {typeof content === 'string' && content && <AccordionContentRenderer content={content} />}

      <div
        className='pointer-events-none absolute inset-0 z-10 rounded-lg opacity-0 transition-opacity duration-200 group-hover:opacity-60 group-data-[state=open]:opacity-60'
        style={borderGlowStyle}
      />
    </AccordionItem>
  )
}
