/* eslint-disable react/no-unescaped-entities */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

export function IceBathingFAQ() {
  return (
    <section className='py-24 bg-sidebar-foreground border-t border-white/5'>
      <div className='container mx-auto px-4 max-w-3xl'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          Ofte stilte spørsmål
        </h2>

        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Hvordan er størrelsene?</AccordionTrigger>
            <AccordionContent>
              Comfyrobe er designet for å være romslig (oversized) slik at du
              enkelt kan trekke armene inn og skifte under den.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-2'>
            <AccordionTrigger>Blir den tung når den blir våt?</AccordionTrigger>
            <AccordionContent>
              Ytterstoffet er vannavvisende, og innerfôret er laget av syntetisk
              lammeull som ikke trekker til seg vann på samme måte som bomull.
              Vekten vil øke, men varmen vil beholdes selv om du tar den rett på
              våt hud.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-3'>
            <AccordionTrigger>Kan den vaskes i maskin?</AccordionTrigger>
            <AccordionContent>
              Ja! Se vaskeinstrukser for mer informasjon. Unngå tøymykner for å
              bevare de vannavvisende egenskapene i ytterstoffet. Den tørker
              raskt på snor.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-4'>
            <AccordionTrigger>Er den vindtett?</AccordionTrigger>
            <AccordionContent>
              Absolutt. Ytterstoffet av HydroGuard er tettvevd og vindtett, noe
              som er avgjørende for å stoppe både "wind chill" faktoren og
              eventuell nedbør etter et isbad.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
