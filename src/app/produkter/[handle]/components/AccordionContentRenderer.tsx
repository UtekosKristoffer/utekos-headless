// Path: src/app/produkter/[handle]/components/AccordionContentRenderer.tsx
'use client'

import { AccordionContent } from '@/components/ui/accordion'
import { renderMetafield } from '../utils/renderMetafield'

export function AccordionContentRenderer({ content }: { content: string }) {
  return (
    <AccordionContent className='prose prose-invert relative z-10 max-w-none px-6 pb-6 text-base leading-relaxed text-foreground/80'>
      {renderMetafield(content)}
    </AccordionContent>
  )
}
