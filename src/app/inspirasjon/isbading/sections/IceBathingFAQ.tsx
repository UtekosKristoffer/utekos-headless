import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const iceBathingFaqItems = [
  {
    question: 'Hvordan er størrelsene?',
    answer:
      'Comfyrobe er designet med en oversized fit, slik at du enkelt kan trekke armene inn og skifte under den.'
  },
  {
    question: 'Blir den tung når den blir våt?',
    answer:
      'Ytterstoffet er vannavvisende, og innerfôret er laget av syntetisk lammeull som ikke trekker til seg vann på samme måte som bomull. Vekten vil øke, men varmen vil beholdes selv om du tar den rett på våt hud.'
  },
  {
    question: 'Kan den vaskes i maskin?',
    answer:
      'Ja, Comfyrobe kan vaskes i vaskemaskin. Vi anbefaler et skånsomt program med mildt vaskemiddel og 40°C. Vær bevisst på hvilket vaskemiddel du bruker.'
  },
  {
    question: 'Er den vindtett?',
    answer:
      'Ytterstoffet av HydroGuard™ har en vannsøyle på 80000 mm og pustende membran (~3000 g/m²/24 t) og tapede sømmer.'
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
              <AccordionContent className='leading-[1.5] tracking-normal text-havdyp'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
