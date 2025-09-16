/**
 * @fileoverview Renders product detail accordions with rich text content.
 * @module components/ProductPageAccordion
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import type { ProductPageAccordionProps } from '@types'
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
      content: variantProfile.materials?.value
    },
    {
      id: 'funksjoner',
      title: 'Funksjoner',
      content: variantProfile.functions?.value
    },
    {
      id: 'egenskaper',
      title: 'Egenskaper',
      content: variantProfile.properties?.value
    },
    {
      id: 'bruksomrader',
      title: 'Bruksområder',
      content: variantProfile.usage?.value
    },
    {
      id: 'passform',
      title: 'Passform',
      content: variantProfile.sizeFit?.value
    },
    {
      id: 'vaskeanvisning',
      title: 'Vaskeanvisning',
      content: variantProfile.storageAndMaintenance?.value
    }
  ]

  const sectionsWithContent = sections.filter(section => section.content)

  if (sectionsWithContent.length === 0) {
    return null
  }

  return (
    <section className='mt-16' aria-labelledby='product-details-heading'>
      <h2 id='product-details-heading' className='sr-only'>
        Detaljert produktinformasjon
      </h2>
      <div className='mx-auto w-full'>
        <Accordion type='single' collapsible className='w-full'>
          {sectionsWithContent.map(section => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger>{section.title}</AccordionTrigger>
              <AccordionContent>
                {renderMetafield(section.content)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
