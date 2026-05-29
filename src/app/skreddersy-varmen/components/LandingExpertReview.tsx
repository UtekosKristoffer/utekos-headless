// Path: src/app/skreddersy-varmen/components/LandingExpertReview.tsx
import Link from 'next/link'
import { cacheLife, cacheTag } from 'next/cache'
import {
  LANDING_AUTHOR_NAME,
  LANDING_EVIDENCE_ENTRIES,
  LANDING_LAST_UPDATED
} from '../data/landingSeoContent'

export async function LandingExpertReview() {
  'use cache'
  cacheLife('weeks')
  cacheTag('skreddersy-varmen', 'skreddersy-varmen-expert-review')

  return (
    <section
      aria-labelledby='expert-review-heading'
      className='w-full bg-cloud-dancer px-6 py-16 text-maritime-darkest md:px-12 md:py-24'
    >
      <div className='mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16'>
        <div>
          <p className='mb-3 font-utekos-text text-sm font-medium leading-[1.4] tracking-tight text-demitasse'>
            Faglig vurdert av {LANDING_AUTHOR_NAME}
          </p>
          <h2
            id='expert-review-heading'
            className='max-w-[12ch] font-google-sans text-4xl font-bold leading-[0.95] tracking-normal text-maritime-darkest md:text-5xl'
          >
            Derfor holder Utekos deg ute lenger
          </h2>
          <p className='mt-5 max-w-xl font-utekos-text text-base leading-[1.45] tracking-tight text-maritime-darkest/82 md:text-lg'>
            Sist oppdatert {LANDING_LAST_UPDATED}. Denne siden bygger på produktdata, kundeerfaringer,
            materialinformasjon og Utekos sine egne kjøpsguider.
          </p>
        </div>

        <div className='grid gap-4 sm:grid-cols-2'>
          {LANDING_EVIDENCE_ENTRIES.map(entry => (
            <article
              key={entry.title}
              className='rounded-sm border border-maritime-darkest/12 bg-overcast p-5 shadow-sm'
            >
              <h3 className='font-google-sans text-xl font-bold leading-[0.98] tracking-normal text-maritime-darkest'>
                {entry.title}
              </h3>
              <p className='mt-3 font-utekos-text text-sm leading-[1.45] tracking-tight text-maritime-darkest/82'>
                {entry.answer}
              </p>
              <Link
                href={entry.href}
                className='mt-4 inline-flex text-sm font-semibold text-maritime-darkest underline underline-offset-4 transition-colors hover:text-havdyp'
              >
                {entry.linkLabel}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
