import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import { nbccFaqItems } from '../data/nbccLandingPageContent'

export function NbccFaqSection() {
  return (
    <section className='bg-background px-4 py-20 sm:px-6 lg:px-8'>
      <div className='mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1fr]'>
        <div data-nbcc-reveal data-nbcc-animate>
          <p className='text-sm font-semibold uppercase tracking-[0.18em] text-[#f0c36a]'>
            Spørsmål og svar
          </p>
          <h2 className='mt-4 max-w-lg text-balance text-3xl font-semibold tracking-normal text-white sm:text-4xl'>
            Det viktigste før NBCC-medlemmer klikker videre.
          </h2>
        </div>

        <Accordion
          data-nbcc-reveal
          data-nbcc-animate
          type='single'
          collapsible
          className='rounded-lg border border-white/[0.10] bg-[#1a1713] px-5'
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
