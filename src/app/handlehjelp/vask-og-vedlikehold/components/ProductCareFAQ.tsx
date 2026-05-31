// Path: src/app/handlehjelp/vask-og-vedlikehold/sections/ProductCareFAQ.tsx

import { PRODUCT_CARE_FAQS } from '../constants'

export function ProductCareFaq() {
  return (
    <section aria-labelledby='faq-heading' className='mx-auto mt-20 max-w-3xl scroll-mt-24'>
      <div className='mb-8 text-center'>
        <h2 id='faq-heading' className='text-2xl font-bold   text-background sm:text-3xl'>
          Vanlige spørsmål
        </h2>
        <p className='mx-auto mt-3 max-w-2xl text-base text-background/76'>
          Svar på det kundene våre oftest lurer på om vask og vedlikehold.
        </p>
      </div>

      <div className='divide-y divide-background/10 rounded-2xl border border-background/10 bg-cloud-dancer/72 shadow-[0_20px_54px_-46px_color-mix(in_oklab,var(--background)_72%,transparent)]'>
        {PRODUCT_CARE_FAQS.map(({ question, answer }) => (
          <details
            key={question}
            className='group px-5 py-4 sm:px-6 sm:py-5 [&[open]>summary>span:last-child]:rotate-45'
          >
            <summary className='flex cursor-pointer list-none items-start justify-between gap-4'>
              <span className='text-base font-semibold   text-background sm:text-lg'>{question}</span>
              <span
                aria-hidden='true'
                className='mt-1 inline-block size-5 shrink-0 text-havdyp transition-transform duration-300 motion-reduce:transition-none'
              >
                <svg viewBox='0 0 20 20' fill='none' className='size-full'>
                  <path d='M10 4v12M4 10h12' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
                </svg>
              </span>
            </summary>
            <p className='mt-3 text-base leading-relaxed text-background/80'>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
