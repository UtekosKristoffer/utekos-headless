//Path: src/components/ProductPageAccordion.tsx

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { RichTextRenderer, type RootNode } from '@/components/RichTextRenderer'
import { safeJsonParse } from '@/lib/utils'

import type { MetaobjectField, MetaobjectReference } from '@/types'
type Props = {
  variantProfile: MetaobjectReference | null | undefined
}

export function ProductPageAccordion({ variantProfile }: Props) {
  const renderMetafield = (field?: MetaobjectField) => {
    if (!field?.value) return null

    const parsed = safeJsonParse(field.value, null) as RootNode | null
    return parsed ? <RichTextRenderer content={parsed} /> : null
  }

  return (
    <section className='mt-16' aria-labelledby='product-details-heading'>
      <h2 id='product-details-heading' className='sr-only'>
        Detaljert produktinformasjon
      </h2>
      <div className='mx-auto w-full'>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='materialer'>
            <AccordionTrigger>Materialer</AccordionTrigger>
            <AccordionContent>{renderMetafield(variantProfile?.materials)}</AccordionContent>
          </AccordionItem>
          <AccordionItem value='funksjoner'>
            <AccordionTrigger>Funksjoner</AccordionTrigger>
            <AccordionContent>{renderMetafield(variantProfile?.functions)}</AccordionContent>
          </AccordionItem>
          <AccordionItem value='egenskaper'>
            <AccordionTrigger>Egenskaper</AccordionTrigger>
            <AccordionContent>{renderMetafield(variantProfile?.properties)}</AccordionContent>
          </AccordionItem>
          <AccordionItem value='bruksomrader'>
            <AccordionTrigger>Bruksområder</AccordionTrigger>
            <AccordionContent>{renderMetafield(variantProfile?.usage)}</AccordionContent>
          </AccordionItem>
          <AccordionItem value='passform'>
            <AccordionTrigger>Passform</AccordionTrigger>
            <AccordionContent>{renderMetafield(variantProfile?.sizeFit)}</AccordionContent>
          </AccordionItem>
          <AccordionItem value='vaskeanvisning'>
            <AccordionTrigger>Vaskeanvisning</AccordionTrigger>
            <AccordionContent>{renderMetafield(variantProfile?.storageAndMaintenance)}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}

export default ProductPageAccordion
