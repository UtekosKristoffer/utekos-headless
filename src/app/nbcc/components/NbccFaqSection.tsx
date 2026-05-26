import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import { nbccFaqItems } from '../utils/nbccLandingPageContent'

export function NbccFaqSection() {
  return (
    <section className='bg-background px-4 py-20 sm:px-6 lg:px-8'>
      <div className='mx-auto grid w-full max-w-4xl gap-10'>
        <div data-nbcc-reveal data-nbcc-animate>
          <p className='text-sm mx-auto md:text-2xl font-semibold uppercase tracking-[0.18em] text-cloud-dancer'>
            Spørsmål og svar
          </p>
        </div>

        <Accordion
          data-nbcc-reveal
          data-nbcc-animate
          type='single'
          collapsible
          className='rounded-lg border border-white/50 bg-maritime-darkest px-5'
        >
          {nbccFaqItems.map(item => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className='py-5 text-base text-white hover:text-[#f0c36a] hover:no-underline'>
                {item.question}
              </AccordionTrigger>
              <AccordionContent className='pb-6 text-sm leading-7 text-neutral-300'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
