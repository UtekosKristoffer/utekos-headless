import { BadgeCheckIcon } from '@/components/animate-icons/icons/badge-check'
import { ClockIcon } from '@/components/animate-icons/icons/clock'
import { CompassIcon } from '@/components/animate-icons/icons/compass'
import { MoveRightIcon } from '@/components/animate-icons/icons/move-right'
import { Button } from '@/components/ui/button'
import heroImage from '@public/nbcc-master-video.png'
import heroImageMobile from '@public/nbcc-mobile-master-2.png'
import nbccLogo from '@public/NBCC_logo_RGB_lys_bg.png'
import Image from 'next/image'
import Link from 'next/link'

import { nbccHeroTracking } from '../data/nbccLandingPageContent'
import { NbccAiSummaryButton } from './NbccAiSummaryButton'

export function NbccHeroSection() {
  return (
    <section className='relative isolate min-h-[76svh] overflow-hidden bg-[#15120e]'>
      <Image
        src={heroImageMobile}
        alt='Historisk NBCC-bilde'
        fill
        priority
        sizes='100vw'
        data-nbcc-hero-media
        className='object-cover object-[center_65%] opacity-[0.72] md:hidden'
      />
      <Image
        src={heroImage}
        alt='Historisk NBCC-bilde'
        fill
        priority
        sizes='100vw'
        data-nbcc-hero-media
        className='hidden object-cover object-center opacity-[0.72] md:block'
      />
      <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(12,10,7,0.94)_0%,rgba(12,10,7,0.78)_38%,rgba(12,10,7,0.28)_72%,rgba(12,10,7,0.64)_100%)]' />
      <div className='absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent' />

      <div className='relative mx-auto flex min-h-[76svh] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8'>
        <div className='w-full max-w-[calc(100vw-2rem)] min-w-0 md:max-w-3xl'>
          <div
            data-nbcc-hero
            data-nbcc-animate
            className='mb-7 flex flex-wrap items-center gap-3'
          >
            <span className='inline-flex items-center gap-3 rounded-md border border-white/[0.18] bg-white/[0.92] px-3 py-2 shadow-sm'>
              <Image
                src={nbccLogo}
                alt='NBCC logo'
                width={150}
                height={60}
                className='h-9 w-auto object-contain'
              />
              <span className='h-8 w-px bg-neutral-300' aria-hidden />
              <span className='text-sm font-semibold text-neutral-950'>
                Medlemsfordel
              </span>
            </span>
          </div>

          <h1
            data-nbcc-hero
            data-nbcc-animate
            className='max-w-[calc(100vw-2rem)] text-balance text-5xl font-semibold leading-[0.96] tracking-normal text-white sm:max-w-2xl sm:text-6xl lg:text-7xl'
          >
            NBCC-medlemsfordel hos Utekos
          </h1>

          <p
            data-nbcc-hero
            data-nbcc-animate
            className='mt-6 max-w-[calc(100vw-2rem)] text-pretty text-lg leading-8 text-[#f5efe4]/[0.9] sm:max-w-2xl sm:text-xl'
          >
            {' '}
            Helt siden 1960 har Norsk Bobil og Caravan Club samlet folk rundt de
            gode opplevelsene og gleden av å treffe andre campingelskere. Vi i
            Utekos deler lidenskapen for sosiale, lune og komfortable
            utendørsøyeblikk. Som stolt samarbeidspartner gir vi deg derfor en
            medlemsrabatt, slik at du kan ta med deg enda mer varme og komfort
            ut i de sene kveldstimene.
          </p>

          <div
            data-nbcc-hero
            data-nbcc-animate
            className='mt-9 flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-start'
          >
            <Button
              asChild
              size='lg'
              className='h-12 w-full justify-center rounded-md bg-[#f0c36a] px-6 text-[15px] font-semibold text-[#19140d] hover:bg-[#ffd886] sm:w-auto'
            >
              <Link
                href='#produkter'
                data-track='NbccHeroProductsClick'
                data-track-data={JSON.stringify(nbccHeroTracking.primary)}
              >
                Finn din Utekos
                <MoveRightIcon size={18} animateOnHover='default' />
              </Link>
            </Button>

            <NbccAiSummaryButton
              intent='how-to-use'
              idleLabel='Forklar fordelen'
              completedLabel='Vis forklaring'
              trackingName='NbccHeroHowToAiClick'
              trackingData={nbccHeroTracking.secondary}
              containerClassName='w-full sm:w-auto'
              panelClassName='w-full sm:w-[32rem]'
              buttonClassName='h-12 w-full justify-center gap-2 rounded-md border-white/25 bg-white/[0.06] px-6 text-[15px] font-semibold text-white hover:bg-utekos-brown/60 sm:w-auto'
            />
          </div>

          <div
            data-nbcc-hero
            data-nbcc-animate
            className='mt-12 grid max-w-3xl gap-4 border-t border-white/[0.16] pt-6 text-sm text-[#f5efe4]/[0.82] sm:grid-cols-3'
          >
            <div className='flex items-start gap-3'>
              <BadgeCheckIcon
                size={22}
                animate='check'
                className='mt-0.5 shrink-0 text-[#f0c36a]'
                aria-hidden
              />
              <span>
                {' '}
                Et beskyttende ytre forent med en silkemyk og tilpasningsdyktig
                kjerne.
              </span>
            </div>
            <div className='flex items-start gap-3'>
              <CompassIcon
                size={22}
                animate='default-loop'
                loop
                loopDelay={2400}
                className='mt-0.5 shrink-0 text-[#c7e6c9]'
                aria-hidden
              />
              <span>
                Lar deg ta regien over egen komfort. Helt friksjonsfritt.
              </span>
            </div>
            <div className='flex items-start gap-3'>
              <ClockIcon
                size={22}
                animate='default'
                className='mt-0.5 shrink-0 text-[#d8e7ff]'
                aria-hidden
              />
              <span>
                Fra morgenkaffe til kveldsamling. Bare justér, form og nyt.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
