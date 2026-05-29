// Path: src/app/produkter/[handle]/components/AccordionContentRenderer.tsx
'use client'

import { AccordionContent } from '@/components/ui/accordion'
import { renderMetafield } from '../utils/renderMetafield'

export function AccordionContentRenderer({ content }: { content: string }) {
  return (
    <AccordionContent className='prose relative z-10 max-w-none px-6 pb-6 text-base leading-relaxed text-havdyp/76'>
      {renderMetafield(content)}
    </AccordionContent>
  )
}
