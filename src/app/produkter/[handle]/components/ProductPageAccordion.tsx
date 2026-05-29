// Path: src/app/produkter/[handle]/ProductPageView/components/ProductPageAccordion.tsx
'use client'

import { Accordion } from '@/components/ui/accordion'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import type { ProductPageAccordionProps } from '@types'
import { Layers3, Mountain, Ruler, SlidersHorizontal, Sparkles, WashingMachine, Info } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Activity } from 'react'
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
      color: 'text-havdyp'
    },
    {
      id: 'funksjoner',
      title: 'Funksjoner',
      ...mapOptionalContent(variantProfile.functions?.value),
      Icon: SlidersHorizontal,
      color: 'text-mountain-view'
    },
    {
      id: 'egenskaper',
      title: 'Egenskaper',
      ...mapOptionalContent(variantProfile.properties?.value),
      Icon: Sparkles,
      color: 'text-dusted-peri'
    },
    {
      id: 'bruksomrader',
      title: 'Bruksområder',
      ...mapOptionalContent(variantProfile.usage?.value),
      Icon: Mountain,
      color: 'text-havdyp'
    },
    {
      id: 'passform',
      title: 'Passform',
      ...mapOptionalContent(variantProfile.sizeFit?.value),
      Icon: Ruler,
      color: 'text-chocolate-plum'
    },
    {
      id: 'vaskeanvisning',
      title: 'Vaskeanvisning',
      ...mapOptionalContent(variantProfile.storageAndMaintenance?.value),
      Icon: WashingMachine,
      color: 'text-mountain-view'
    }
  ]

  const sectionsWithContent = allSections.filter(
    (s): s is AccordionSectionData => typeof s.content === 'string' && s.content.trim() !== ''
  )

  if (sectionsWithContent.length === 0) {
    return null
  }

  return (
    <section
      className='relative mt-24 overflow-hidden rounded-[1.75rem] border border-cloud-dancer/70 bg-cloud-dancer/72 p-6 shadow-2xl shadow-havdyp/10 backdrop-blur-sm sm:p-8'
      aria-labelledby='product-details-heading'
    >
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-1/3 top-0 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ancient-water)_58%,transparent)_0%,transparent_72%)] blur-3xl' />
      </div>

      <div className='mx-auto'>
        <AnimatedBlock className='mb-6 will-animate-fade-in-scale' delay='0s' threshold={0.3}>
          <BrandBadge
            backgroundColor='var(--dusted-peri)'
            textColor='var(--maritime-darkest)'
            className='gap-2 shadow-[0_18px_44px_-28px_color-mix(in_oklab,var(--dusted-peri)_80%,transparent)]'
          >
            <Info className='h-5 w-5' aria-hidden='true' />
            <span>Produktdetaljer</span>
          </BrandBadge>
        </AnimatedBlock>
        <Activity>
          <AnimatedBlock className='will-animate-fade-in-up' delay='0.08s' threshold={0.3}></AnimatedBlock>
        </Activity>
        <Activity>
          <Accordion type='single' collapsible className='w-full'>
            {sectionsWithContent.map(section => (
              <ProductDetailsAccordionSection key={section.id} sectionData={section} />
            ))}
          </Accordion>
        </Activity>
      </div>
    </section>
  )
}
