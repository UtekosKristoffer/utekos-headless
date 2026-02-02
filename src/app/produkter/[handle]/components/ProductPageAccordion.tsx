// Path: src/app/produkter/[handle]/ProductPageView/components/ProductPageAccordion.tsx
'use client'

import { Accordion } from '@/components/ui/accordion'
import type { ProductPageAccordionProps } from '@types'
import {
  Layers3,
  Mountain,
  Ruler,
  SlidersHorizontal,
  Sparkles,
  WashingMachine,
  Info,
  type LucideIcon
} from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Activity } from 'react'
import type { AccordionSectionData } from '@types'
import { mapOptionalContent } from '../utils/mapOptionalContent'
import { ProductDetailsAccordionSection } from './ProductDetailsAccordionSection'
export function ProductPageAccordion({
  variantProfile
}: ProductPageAccordionProps) {
  if (!variantProfile) {
    return null
  }

  const allSections: AccordionSectionData[] = [
    {
      id: 'materialer',
      title: 'Materialer',
      ...mapOptionalContent(variantProfile.materials?.value),
      Icon: Layers3,
      color: 'text-rose-500'
    },
    {
      id: 'funksjoner',
      title: 'Funksjoner',
      ...mapOptionalContent(variantProfile.functions?.value),
      Icon: SlidersHorizontal,
      color: 'text-cyan-400'
    },
    {
      id: 'egenskaper',
      title: 'Egenskaper',
      ...mapOptionalContent(variantProfile.properties?.value),
      Icon: Sparkles,
      color: 'text-amber-400'
    },
    {
      id: 'bruksomrader',
      title: 'Bruksområder',
      ...mapOptionalContent(variantProfile.usage?.value),
      Icon: Mountain,
      color: 'text-sky-400'
    },
    {
      id: 'passform',
      title: 'Passform',
      ...mapOptionalContent(variantProfile.sizeFit?.value),
      Icon: Ruler,
      color: 'text-violet-400'
    },
    {
      id: 'vaskeanvisning',
      title: 'Vaskeanvisning',
      ...mapOptionalContent(variantProfile.storageAndMaintenance?.value),
      Icon: WashingMachine,
      color: 'text-blue-400'
    }
  ]

  const sectionsWithContent = allSections.filter(
    (s): s is AccordionSectionData =>
      typeof s.content === 'string' && s.content.trim() !== ''
  )

  if (sectionsWithContent.length === 0) {
    return null
  }

  return (
    <section
      className='relative mt-24 overflow-hidden'
      aria-labelledby='product-details-heading'
    >
      <div className='absolute inset-0 -z-10 opacity-20'>
        <div
          className='absolute left-1/3 top-0 h-[400px] w-[400px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='mx-auto'>
        <AnimatedBlock
          className='mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-button bg-button/10 px-4 py-2 will-animate-fade-in-scale'
          delay='0s'
          threshold={0.3}
        >
          <Info className='h-4 w-4 text-button' />
          <span className='text-sm font-medium text-button'>
            Produktdetaljer
          </span>
        </AnimatedBlock>
        <Activity>
          <AnimatedBlock
            className='will-animate-fade-in-up'
            delay='0.08s'
            threshold={0.3}
          >
            <h2
              id='product-details-heading'
              className='mb-8 text-2xl font-bold tracking-tight text-foreground sm:text-3xl'
            >
              Alt du trenger å vite
            </h2>
          </AnimatedBlock>
        </Activity>
        <Activity>
          <Accordion type='single' collapsible className='w-full'>
            {sectionsWithContent.map(section => (
              <ProductDetailsAccordionSection
                key={section.id}
                sectionData={section}
              />
            ))}
          </Accordion>
        </Activity>
      </div>
    </section>
  )
}
