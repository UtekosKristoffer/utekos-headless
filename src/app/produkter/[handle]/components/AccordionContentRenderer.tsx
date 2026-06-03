// Path: src/app/produkter/[handle]/components/AccordionContentRenderer.tsx
'use client'

import { AccordionContent } from '@/components/ui/accordion'
import { renderMetafield } from '../utils/renderMetafield'

export function AccordionContentRenderer({ content }: { content: string }) {
  return (
    <AccordionContent className='relative z-10 px-6 pb-6 sm:pl-20'>
      <div className='font-utekos-text max-w-prose text-base leading-[1.6] tracking-normal text-foreground/90 [&_strong]:font-semibold [&_strong]:text-foreground [&_p:not(:first-child)]:mt-4 [&_ul]:mt-2 [&_ul]:space-y-1.5 [&_ul]:pl-1 [&_ol]:mt-2 [&_ol]:space-y-1.5 [&_ol]:pl-1 [&_li]:leading-[1.55] [&_li]:marker:text-foreground/45'>
        {renderMetafield(content)}
      </div>
    </AccordionContent>
  )
}
