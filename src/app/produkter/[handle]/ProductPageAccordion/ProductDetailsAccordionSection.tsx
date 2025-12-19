// Path: src/app/produkter/[handle]/ProductPageAccordion/ProductDetailsAccordionSection.tsx
'use client'

import { sendGAEvent } from '@next/third-parties/google'
import { AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type {
  AccordionSectionData,
  MetaUserData,
  MetaEventPayload
} from '@types'
import { colorHexByTextClass } from './colorHexByTextClass'
import { AccordionContentRenderer } from './AccordionContentRenderer'
import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { track } from '@vercel/analytics/react'

export function ProductDetailsAccordionSection({
  sectionData,
  currentVariantId
}: {
  sectionData: AccordionSectionData
  currentVariantId?: string
}) {
  const { id, title, content, Icon, color } = sectionData
  const glowHexColor = colorHexByTextClass[color] ?? '#60a5fa'
  const borderGlowStyle = {
    boxShadow: `0 0 20px -5px ${glowHexColor}`
  }

  const handleInteraction = () => {
    const rawId = currentVariantId ? cleanShopifyId(currentVariantId) : id
    const contentId = rawId || ''
    const contentIds = contentId ? [contentId] : []
    const eventID = generateEventID().replace('evt_', 'acc_')
    const timestamp = Math.floor(Date.now() / 1000)
    const sourceUrl = window.location.href
    const pixelEventData = {
      content_name: title,
      content_ids: contentIds,
      content_type: 'product',
      accordion_section: id
    }
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'InteractWithAccordion', pixelEventData, {
        eventID
      })
    }

    const capiEventData = {
      content_name: title,
      content_ids: contentIds,
      content_type: 'product' as const
    }

    const fbc = getCookie('_fbc')
    const fbp = getCookie('_fbp')
    const externalId = getCookie('ute_ext_id')
    const emailHash = getCookie('ute_user_hash')
    const userData: MetaUserData = {
      external_id: externalId || undefined,
      fbc: fbc || undefined,
      fbp: fbp || undefined,
      email_hash: emailHash || undefined,
      client_user_agent: navigator.userAgent
    }

    const capiPayload: MetaEventPayload = {
      eventName: 'InteractWithAccordion',
      eventId: eventID,
      eventSourceUrl: sourceUrl,
      eventTime: timestamp,
      actionSource: 'website',
      userData,
      eventData: capiEventData
    }

    fetch('/api/meta-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(capiPayload),
      keepalive: true
    }).catch(console.error)
  }

  return (
    <AccordionItem
      value={id}
      className='group relative mb-3 overflow-hidden rounded-lg border border-neutral-800 transition-all duration-200 hover:border-neutral-700'
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
          track('ProductPageAccordionInteraction', {
            section: title,
            sectionId: id
          })

          sendGAEvent('event', 'buttonClicked', { value: title }) // Oppdaterte value til title her også for konsistens
        }}
        className='relative z-10 px-6 py-4 text-access/70 transition-colors duration-200 hover:text-access data-[state=open]:text-foreground hover:no-underline'
      >
        <div className='flex items-center gap-4'>
          <div
            className='flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700 bg-background transition-transform duration-200 group-hover:scale-105'
            style={{ transform: 'translateZ(0)' }}
          >
            <Icon
              className={`h-5 w-5 shrink-0 transition-colors duration-200 ${color}`}
              aria-hidden='true'
            />
          </div>
          <span className='text-lg font-semibold'>{title}</span>
        </div>
      </AccordionTrigger>

      {typeof content === 'string' && content && (
        <AccordionContentRenderer content={content} />
      )}

      <div
        className='pointer-events-none absolute inset-0 z-10 rounded-lg opacity-0 transition-opacity duration-200 group-hover:opacity-60 group-data-[state=open]:opacity-60'
        style={borderGlowStyle}
      />
    </AccordionItem>
  )
}
