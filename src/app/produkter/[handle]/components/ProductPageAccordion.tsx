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
      color: 'text-foreground'
    },
    {
      id: 'funksjoner',
      title: 'Funksjoner',
      ...mapOptionalContent(variantProfile.functions?.value),
      Icon: Activity,
      color: 'text-foreground'
    },
    {
      id: 'egenskaper',
      title: 'Egenskaper',
      ...mapOptionalContent(variantProfile.properties?.value),
      Icon: TableProperties,
      color: 'text-foreground'
    },
    {
      id: 'bruksomrader',
      title: 'Bruksområder',
      ...mapOptionalContent(variantProfile.usage?.value),
      Icon: Waypoints,
      color: 'text-foreground'
    },
    {
      id: 'passform',
      title: 'Passform',
      ...mapOptionalContent(variantProfile.sizeFit?.value),
      Icon: Ruler,
      color: 'text-foreground'
    },
    {
      id: 'vaskeanvisning',
      title: 'Vaskeanvisning',
      ...mapOptionalContent(variantProfile.storageAndMaintenance?.value),
      Icon: WashingMachine,
      color: 'text-foreground'
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
      <div className='mx-auto text-left'>
        <AnimatedBlock className='mb-6 will-animate-fade-in-scale' delay='0s' threshold={0.3}>
          <BrandBadge
            backgroundColor='var(--havdyp)'
            textColor='var(--foreground)'
            className='gap-2 text-left'
          >
            <Info className='size-5' aria-hidden='true' />
            <h2 id='product-details-heading' className='text-lg leading-[1.2] tracking-[-0.01em]'>
              Produktdetaljer
            </h2>
          </BrandBadge>
        </AnimatedBlock>

        <Accordion className='w-full'>
          {sectionsWithContent.map(section => (
            <ProductDetailsAccordionSection key={section.id} sectionData={section} />
          ))}
        </Accordion>
      </div>
    </article>
  )
}
