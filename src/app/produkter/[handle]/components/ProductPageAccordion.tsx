// Path: src/app/produkter/[handle]/ProductPageView/components/ProductPageAccordion.tsx
'use client'

import { Accordion } from '@/components/ui/accordion'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import type { ProductPageAccordionProps } from '@types'
import { Layers3, Activity, Ruler, Waypoints, TableProperties, WashingMachine, Info } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { AccordionSectionData } from '@types'
import { mapOptionalContent } from '../utils/mapOptionalContent'
import { ProductDetailsAccordionSection } from './ProductDetailsAccordionSection'
export function ProductPageAccordion({ variantProfile }: ProductPageAccordionProps) {
  if (!variantProfile) {
    return null
  }

  const allSections: AccordionSectionData[] = [
    {
      id: 'materialer',
      title: 'Materialer',
      ...mapOptionalContent(variantProfile.materials?.value),
      Icon: Layers3,
      color: 'text-maritime-darkest'
    },
    {
      id: 'funksjoner',
      title: 'Funksjoner',
      ...mapOptionalContent(variantProfile.functions?.value),
      Icon: Activity,
      color: 'text-maritime-darkest'
    },
    {
      id: 'egenskaper',
      title: 'Egenskaper',
      ...mapOptionalContent(variantProfile.properties?.value),
      Icon: TableProperties,
      color: 'text-maritime-darkest'
    },
    {
      id: 'bruksomrader',
      title: 'Bruksområder',
      ...mapOptionalContent(variantProfile.usage?.value),
      Icon: Waypoints,
      color: 'text-maritime-darkest'
    },
    {
      id: 'passform',
      title: 'Passform',
      ...mapOptionalContent(variantProfile.sizeFit?.value),
      Icon: Ruler,
      color: 'text-maritime-darkest'
    },
    {
      id: 'vaskeanvisning',
      title: 'Vaskeanvisning',
      ...mapOptionalContent(variantProfile.storageAndMaintenance?.value),
      Icon: WashingMachine,
      color: 'text-maritime-darkest'
    }
  ]

  const sectionsWithContent = allSections.filter(
    (s): s is AccordionSectionData => typeof s.content === 'string' && s.content.trim() !== ''
  )

  if (sectionsWithContent.length === 0) {
    return null
  }

  return (
    <article
      className='relative overflow-hidden rounded-[1.75rem] py-6'
      aria-labelledby='product-details-heading'
    >
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-1/3 top-0 h-[24rem] w-[24rem] rounded-full' />
      </div>

      <div className='mx-auto text-left'>
        <AnimatedBlock className='mb-6 will-animate-fade-in-scale' delay='0s' threshold={0.3}>
          <BrandBadge
            backgroundColor='var(--dusted-peri)'
            textColor='var(--maritime-darkest)'
            className='gap-2 text-left shadow-[0_18px_44px_-28px_color-mix(in_oklab,var(--dusted-peri)_80%,transparent)]'
          >
            <Info className='size-5 text-left' aria-hidden='true' />
            <h2 className='text-left text-lg'>Produktdetaljer</h2>
          </BrandBadge>
        </AnimatedBlock>

        <AnimatedBlock className='will-animate-fade-in-up' delay='0.08s' threshold={0.3}></AnimatedBlock>
        <Accordion type='single' collapsible className='w-full'>
          {sectionsWithContent.map(section => (
            <ProductDetailsAccordionSection key={section.id} sectionData={section} />
          ))}
        </Accordion>
      </div>
    </article>
  )
}
