// Path: src/app/handlehjelp/sammenlign-modeller/components/ConclusionSection.tsx
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import Link from 'next/link'
import { faqItems } from '../utils/comparisonData'

export function ConclusionSection() {
  return (
    <section className='bg-cloud-dancer py-20 text-background sm:py-28'>
      <div className='mx-auto max-w-7xl px-[6vw]'>
        <div className='grid gap-12 lg:grid-cols-[0.45fr_0.55fr] lg:items-start'>
          <div>
            <BrandBadge
              label='Klar for å velge'
              backgroundColor='var(--havdyp)'
              className='mb-6 px-6 text-cloud-dancer py-3 text-sm'
            />
            <h2 className='font-google-sans text-4xl leading-[0.95] font-bold tracking-[-0.01em] text-havdyp sm:text-6xl'>
              Et trygt valg på under ett minutt
            </h2>
            <p className='mt-6   text-lg leading-[1.45]   text-havdyp/82 sm:text-xl'>
              TechDown gir mest ro i skiftende vær. Dun gir mest varme per gram. Mikrofiber er lettest å pakke
              og vaske.
            </p>
            <div className='mt-9 flex flex-wrap gap-4'>
              <BrandBadge
                asChild
                backgroundColor='var(--primary)'
                className='px-7 py-4 text-base transition-transform duration-300 hover:scale-[1.02]'
              >
                <Link href='/produkter' data-track='SammenlignModellerConclusionAllProductsClick'>
                  Se hele kolleksjonen
                </Link>
              </BrandBadge>
              <BrandBadge
                asChild
                backgroundColor='var(--overcast)'
                className='px-7 py-4 text-base transition-transform duration-300 hover:scale-[1.02]'
              >
                <Link href='/kontaktskjema' data-track='SammenlignModellerConclusionContactClick'>
                  Få råd fra oss
                </Link>
              </BrandBadge>
            </div>
          </div>

          <div data-nosnippet className='divide-y divide-havdyp/14 border-y border-havdyp/14'>
            {faqItems.map(item => (
              <details key={item.question} className='group py-6'>
                <summary className='cursor-pointer list-none font-google-sans text-xl font-bold leading-[1.05] tracking-[-0.01em] text-havdyp marker:hidden'>
                  <span className='inline-flex w-full items-center justify-between gap-6'>
                    {item.question}
                    <span className='text-2xl leading-none text-havdyp/65 transition-transform duration-300 group-open:rotate-45'>
                      +
                    </span>
                  </span>
                </summary>
                <p data-nosnippet className='mt-4 max-w-2xl   text-base leading-[1.45]   text-havdyp/78'>
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
