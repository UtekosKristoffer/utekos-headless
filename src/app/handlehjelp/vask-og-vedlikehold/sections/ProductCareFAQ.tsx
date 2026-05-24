interface Faq {
  question: string
  answer: string
}

const faqs: Faq[] = [
  {
    question: 'Hvor ofte bør jeg vaske Utekos-plagget mitt?',
    answer:
      'Vask sjeldnere enn du tror. Lufting mellom hver bruk er som regel nok. Vask når plagget faktisk er skittent – hyppig vask sliter mer på fibrene enn vanlig bruk.'
  },
  {
    question: 'Kan jeg bruke vanlig vaskemiddel på Utekos Dun?',
    answer:
      'Bruk helst et mildt vaskemiddel uten optisk hvitt, eller et eget dun-vaskemiddel. Vanlige vaskemidler kan tørke ut dunets naturlige fettlag og redusere isolasjonsevnen over tid.'
  },
  {
    question: 'Hva gjør jeg hvis vann ikke lenger preller av ytterstoffet?',
    answer:
      'DWR-behandlingen kan friskes opp. Vask plagget rent, tørk det helt, og påfør en impregneringsspray jevnt over ytterstoffet. Varm aktivering i tørketrommel på lav varme låser behandlingen.'
  },
  {
    question: 'Kan dunet klumpe seg under vask?',
    answer:
      'Ja, hvis plagget ikke tørkes ordentlig. Bruk tørketrommel på lav varme med tørkeballer, og avbryt syklusen for å riste ut klumper underveis. Plagget skal være helt gjennomtørt før det legges bort.'
  },
  {
    question: 'Hvordan oppbevarer jeg plagget mellom sesonger?',
    answer:
      'Heng plagget på en stødig henger i et tørt og luftig skap. Unngå kompresjonsposer og plastomslag over lengre tid – dunet trenger luft for å bevare spensten.'
  }
]

export function ProductCareFaq() {
  return (
    <section
      aria-labelledby='faq-heading'
      className='mx-auto mt-20 max-w-3xl scroll-mt-24'
    >
      <div className='mb-8 text-center'>
        <h2
          id='faq-heading'
          className='text-2xl font-bold tracking-tight text-maritime-darkest sm:text-3xl'
        >
          Vanlige spørsmål
        </h2>
        <p className='mx-auto mt-3 max-w-2xl text-base text-maritime-darkest/76'>
          Svar på det kundene våre oftest lurer på om vask og vedlikehold.
        </p>
      </div>

      <div className='divide-y divide-maritime-darkest/10 rounded-2xl border border-maritime-darkest/10 bg-cloud-dancer/72 shadow-[0_20px_54px_-46px_color-mix(in_oklab,var(--maritime-darkest)_72%,transparent)]'>
        {faqs.map(({ question, answer }) => (
          <details
            key={question}
            className='group px-5 py-4 sm:px-6 sm:py-5 [&[open]>summary>span:last-child]:rotate-45'
          >
            <summary className='flex cursor-pointer list-none items-start justify-between gap-4'>
              <span className='text-base font-semibold tracking-tight text-maritime-darkest sm:text-lg'>
                {question}
              </span>
              <span
                aria-hidden='true'
                className='mt-1 inline-block size-5 shrink-0 text-maritime-blue transition-transform duration-300 motion-reduce:transition-none'
              >
                <svg viewBox='0 0 20 20' fill='none' className='size-full'>
                  <path
                    d='M10 4v12M4 10h12'
                    stroke='currentColor'
                    strokeWidth='1.6'
                    strokeLinecap='round'
                  />
                </svg>
              </span>
            </summary>
            <p className='mt-3 text-base leading-relaxed text-maritime-darkest/80'>
              {answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
