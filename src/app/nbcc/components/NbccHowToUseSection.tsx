import { CheckIcon } from '@/components/animate-icons/icons/check'
import { MoveRightIcon } from '@/components/animate-icons/icons/move-right'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

import { nbccSteps } from '../data/nbccLandingPageContent'

export function NbccHowToUseSection() {
  return (
    <section
      id='slik-bruker-du-fordelen'
      className='bg-[#f5efe4] px-4 py-20 text-[#17130f] sm:px-6 lg:px-8'
    >
      <div className='mx-auto max-w-7xl'>
        <div className='grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start'>
          <div data-nbcc-reveal data-nbcc-animate>
            <p className='text-sm font-semibold uppercase tracking-[0.18em] text-[#6d4a20]'>
              NBCC MEDLEMSFORDEL
            </p>
            <h2 className='mt-4 max-w-xl text-balance text-3xl font-semibold tracking-normal sm:text-4xl'>
              Fra medlemskode til ekte Utekos.
            </h2>
            <p className='mt-5 max-w-xl text-base leading-8 text-[#51463a]'>
              Som medlem får du en hyggelig prisrabatt på hele vårt
              hovedsortiment. Følg de tre enkle stegene for å hente koden din,
              eller hopp rett til kassen om du allerede har den klar.
            </p>
            <Button
              asChild
              className='mt-8 h-12 rounded-md bg-[#17130f] px-6 text-white hover:bg-[#2a2119]'
            >
              <Link
                href='/produkter'
                data-track='NbccHowToProductsClick'
                data-track-data={JSON.stringify({
                  page: 'nbcc',
                  section: 'how-to-use',
                  target: 'products'
                })}
              >
                Velg produkter
                <MoveRightIcon size={18} animateOnHover='default' />
              </Link>
            </Button>
          </div>

          <div
            data-nbcc-reveal
            data-nbcc-animate
            className='rounded-lg border border-[#17130f]/10 bg-white/60 p-6 sm:p-8'
          >
            <ol className='grid gap-6'>
              {nbccSteps.map((step, index) => (
                <li
                  key={step.title}
                  className='grid gap-5 sm:grid-cols-[3rem_1fr]'
                >
                  <span className='flex size-12 items-center justify-center rounded-md bg-[#17130f] text-white'>
                    <CheckIcon
                      size={22}
                      animate='default'
                      className='text-[#f0c36a]'
                      aria-hidden
                    />
                  </span>
                  <div>
                    <p className='text-sm font-semibold text-[#6d4a20]'>
                      Steg {index + 1}
                    </p>
                    <h3 className='mt-1 text-xl font-semibold'>{step.title}</h3>
                    <p className='mt-2 text-sm leading-7 text-[#5a5046]'>
                      {step.description}
                    </p>
                  </div>
                  {index < nbccSteps.length - 1 && (
                    <Separator className='sm:col-start-2 bg-[#17130f]/10' />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
