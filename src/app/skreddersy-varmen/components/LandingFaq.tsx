// Path: src/app/skreddersy-varmen/components/LandingFaq.tsx
import Link from 'next/link'
import { cacheLife, cacheTag } from 'next/cache'
import { LANDING_FAQ_ENTRIES } from '../data/landingSeoContent'

export async function LandingFaq() {
  'use cache'
  cacheLife('weeks')
  cacheTag('skreddersy-varmen', 'skreddersy-varmen-faq')

  return (
    <section
      aria-labelledby='landing-faq-heading'
      className='w-full bg-background px-6 py-16 text-foreground md:px-12 md:py-24'
    >
      <div className='mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16'>
        <div>
          <p className='mb-3   text-sm font-medium leading-4   text-overcast'>Ofte spurt</p>
          <h2
            id='landing-faq-heading'
            className='max-w-[12ch] font-google-sans text-4xl font-bold leading-[0.95] tracking-normal text-foreground md:text-5xl'
          >
            FAQ
          </h2>
          <Link
            href='/handlehjelp/sammenlign-modeller'
            className='mt-6 inline-flex text-sm font-semibold text-foreground underline underline-offset-4 transition-colors hover:text-primary'
          >
            Sammenlign modellene
          </Link>
        </div>

        <div className='divide-y divide-cloud-dancer/14 border-y border-cloud-dancer/14'>
          {LANDING_FAQ_ENTRIES.map(entry => (
            <details key={entry.question} className='group py-5'>
              <summary className='cursor-pointer list-none font-google-sans text-lg font-semibold leading-[1.1] tracking-normal text-foreground outline-none transition-colors marker:hidden hover:text-primary focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:text-xl'>
                <span className='grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4'>
                  <span>{entry.question}</span>
                  <span
                    aria-hidden
                    className='text-2xl leading-none text-primary transition-transform group-open:rotate-45'
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className='mt-4 max-w-2xl   text-base leading-text-paragraph   text-foreground/82'>
                {entry.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
