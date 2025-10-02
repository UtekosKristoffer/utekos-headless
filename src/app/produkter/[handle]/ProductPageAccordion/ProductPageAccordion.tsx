/**
 * @fileoverview Renders product detail accordions with rich text content and icons.
 * @module components/ProductPageAccordion
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import type { ProductPageAccordionProps } from '@types'
import {
  Layers3,
  Mountain,
  Ruler,
  SlidersHorizontal,
  Sparkles,
  WashingMachine
} from 'lucide-react'
import { renderMetafield } from './helpers/renderMetafield'

export function ProductPageAccordion({
  variantProfile
}: ProductPageAccordionProps) {
  if (!variantProfile) {
    return null
  }

  const sections = [
    {
      id: 'materialer',
      title: 'Materialer',
      content: variantProfile.materials?.value,
      Icon: Layers3,
      color: 'text-lime-400'
    },
    {
      id: 'funksjoner',
      title: 'Funksjoner',
      content: variantProfile.functions?.value,
      Icon: SlidersHorizontal,
      color: 'text-cyan-400'
    },
    {
      id: 'egenskaper',
      title: 'Egenskaper',
      content: variantProfile.properties?.value,
      Icon: Sparkles,
      color: 'text-amber-400'
    },
    {
      id: 'bruksomrader',
      title: 'Bruksområder',
      content: variantProfile.usage?.value,
      Icon: Mountain,
      color: 'text-sky-400'
    },
    {
      id: 'passform',
      title: 'Passform',
      content: variantProfile.sizeFit?.value,
      Icon: Ruler,
      color: 'text-violet-400'
    },
    {
      id: 'vaskeanvisning',
      title: 'Vaskeanvisning',
      content: variantProfile.storageAndMaintenance?.value,
      Icon: WashingMachine,
      color: 'text-blue-400'
    }
  ]

  const sectionsWithContent = sections.filter(section => section.content)

  if (sectionsWithContent.length === 0) {
    return null
  }

  return (
    <section className='mt-24' aria-labelledby='product-details-heading'>
      <h2 id='product-details-heading' className='sr-only'>
        Detaljert produktinformasjon
      </h2>
      <div className='mx-auto'>
        <Accordion
          type='single'
          collapsible
          className='w-full p-4 bg-sidebar-foreground border border-neutral-700 rounded-lg'
        >
          {sectionsWithContent.map(({ id, title, content, Icon, color }) => (
            <AccordionItem key={id} value={id}>
              <AccordionTrigger className='text-foreground/70 transition-colors hover:text-foreground data-[state=open]:text-foreground'>
                <div className='flex items-center gap-4'>
                  <Icon
                    className={`size-6 shrink-0 transition-colors ${color}`}
                    aria-hidden='true'
                  />
                  <span className='text-lg font-medium'>{title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className='prose prose-invert max-w-none text-base text-foreground/80'>
                {renderMetafield(content)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
