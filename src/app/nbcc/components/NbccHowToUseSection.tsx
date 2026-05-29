import { CheckIcon } from '@/components/animate-icons/icons/check'
import { MoveRightIcon } from '@/components/animate-icons/icons/move-right'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

import { nbccSteps } from '../utils/nbccLandingPageContent'

export function NbccHowToUseSection() {
  return (
    <section id='slik-bruker-du-fordelen' className='bg-overcast px-4 py-20 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <div className='grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start'>
          <div data-nbcc-reveal data-nbcc-animate>
            <p className='text-sm font-semibold uppercase tracking-[0.18em] text-maritime-darkest'>
              NBCC MEDLEMSFORDEL
            </p>
            <h2 className='mt-4 max-w-xl text-balance text-3xl text-maritime-darkest font-semibold tracking-normal sm:text-4xl'>
              Fra medlemskode til ekte Utekos.
            </h2>
            <p className='mt-5 max-w-xl text-base text-maritime-darkest font-utekos-text'>
              Som medlem får du en hyggelig prisrabatt på hele vårt hovedsortiment. Følg de tre enkle stegene
              for å hente koden din, eller hopp rett til kassen om du allerede har den klar.
            </p>
            <Button
              asChild
              className='mt-8 h-12 rounded-md bg-maritime-darkest px-6 text-cloud-dancer hover:bg-overcast'
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
                <li key={step.title} className='grid gap-5 sm:grid-cols-[3rem_1fr]'>
                  <span className='flex size-12 items-center justify-center rounded-md bg-havdyp text-white'>
                    <CheckIcon size={22} animate='default' className='text-primary-button' aria-hidden />
                  </span>
                  <div>
                    <p className='text-sm font-semibold font-utekos-text text-maritime-darkest'>
                      Steg {index + 1}
                    </p>
                    <h3 className='mt-1 text-xl font-utekos-text font-semibold text-maritime-darkest'>
                      {step.title}
                    </h3>
                    <p className='mt-2 text-sm leading-7 font-utekos-text text-maritime-darkest'>
                      {step.description}
                    </p>
                  </div>
                  {index < nbccSteps.length - 1 && (
                    <Separator className='sm:col-start-2 bg-maritime-darkest/50' />
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
