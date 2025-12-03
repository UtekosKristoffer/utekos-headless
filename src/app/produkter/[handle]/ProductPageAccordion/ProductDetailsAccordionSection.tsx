// Path: src/app/produkter/[handle]/ProductPageAccordion/ProductDetailsAccordionSection.tsx
'use client'

import { AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { AccordionSectionData, MetaUserData, CustomData } from '@types'
import { colorHexByTextClass } from './colorHexByTextClass'
import { AccordionContentRenderer } from './AccordionContentRenderer'
import { generateEventID } from '@/components/jsx/CheckoutButton/generateEventID'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import { sendJSON } from '@/components/jsx/CheckoutButton/sendJSON'
export function ProductDetailsAccordionSection({
  sectionData
}: {
  sectionData: AccordionSectionData
}) {
  const { id, title, content, Icon, color } = sectionData
  const glowHexColor = colorHexByTextClass[color] ?? '#60a5fa'
  const borderGlowStyle = {
    boxShadow: `0 0 20px -5px ${glowHexColor}`
  }

  const handleInteraction = () => {
    const eventID = generateEventID().replace('evt_', 'acc_')
    const externalId = getCookie('ute_ext_id')
    const fbc = getCookie('_fbc')
    const fbp = getCookie('_fbp')
    const sourceUrl = window.location.href
    const customData: CustomData = {
      content_name: title,
      content_ids: [id],
      content_type: 'product'
    }

    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'InteractWithAccordion', customData, {
        eventID
      })
    }

    const userData: MetaUserData = {}
    if (externalId) userData.external_id = externalId
    if (fbc) userData.fbc = fbc
    if (fbp) userData.fbp = fbp

    const capiPayload = {
      eventName: 'InteractWithAccordion',
      eventId: eventID,
      eventSourceUrl: sourceUrl,
      eventData: customData,
      userData: userData
    }

    sendJSON('/api/meta-events', capiPayload)
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
        onClick={handleInteraction}
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

      {typeof content === 'string' && (
        <AccordionContentRenderer content={content} />
      )}

      <div
        className='pointer-events-none absolute inset-0 z-10 rounded-lg opacity-0 transition-opacity duration-200 group-hover:opacity-60 group-data-[state=open]:opacity-60'
        style={borderGlowStyle}
      />
    </AccordionItem>
  )
}
