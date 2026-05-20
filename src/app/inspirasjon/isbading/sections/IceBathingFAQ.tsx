/* eslint-disable react/no-unescaped-entities */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

export const iceBathingFaqItems = [
  {
    question: 'Hvordan er størrelsene?',
    answer:
      'Comfyrobe er designet for å være romslig (oversized) slik at du enkelt kan trekke armene inn og skifte under den.'
  },
  {
    question: 'Blir den tung når den blir våt?',
    answer:
      'Ytterstoffet er vannavvisende, og innerfôret er laget av syntetisk lammeull som ikke trekker til seg vann på samme måte som bomull. Vekten vil øke, men varmen vil beholdes selv om du tar den rett på våt hud.'
  },
  {
    question: 'Kan den vaskes i maskin?',
    answer:
      'Ja. Se vaskeinstrukser for mer informasjon. Unngå tøymykner for å bevare de vannavvisende egenskapene i ytterstoffet. Den tørker raskt på snor.'
  },
  {
    question: 'Er den vindtett?',
    answer:
      'Absolutt. Ytterstoffet av HydroGuard er tettvevd og vindtett, noe som er avgjørende for å stoppe både wind chill-faktoren og eventuell nedbør etter et isbad.'
  }
] as const

export function IceBathingFAQ() {
  return (
    <section className='border-t border-cloud-dancer/12 bg-overcast py-24'>
      <div className='container mx-auto max-w-3xl px-4'>
        <h2 className='mb-12 text-center text-3xl font-bold leading-[1.05] tracking-normal text-maritime-darkest'>
          Ofte stilte spørsmål
        </h2>

        <Accordion type='single' collapsible className='w-full'>
          {iceBathingFaqItems.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`item-${index + 1}`}
              className='border-maritime-darkest/16'
            >
              <AccordionTrigger className='text-left text-maritime-darkest leading-[1.35] tracking-normal'>
                {item.question}
              </AccordionTrigger>
              <AccordionContent className='leading-[1.5] tracking-normal text-maritime-blue'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
