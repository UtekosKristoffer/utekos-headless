'use client'

import { AnimatedBlockTwo } from './AnimatedBlockTwo'
import Image from 'next/image'
import bat from '@public/magasinet/bat.png'

export const HeroArticleIntroduction = () => {
  return (
    <>
      <style>
        {`
          .fade-in-up {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                        transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            transition-delay: var(--transition-delay, 0s);
          }
          .fade-in-up.is-in-view {
            opacity: 1;
            transform: translateY(0);
          }
          .gradient-text {
            background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}
      </style>

      <section className='relative bg-background'>
        <div className='absolute inset-0 bg-gradient-to-b from-muted/20 to-transparent' />

        <div className='container !mt-12 relative mx-auto max-w-4xl px-6 py-20 md:py-16 mb-12'>
          <AnimatedBlockTwo className='fade-in-up mb-8' delay='0ms'>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <time dateTime='2025-10-17'>17. oktober 2025</time>
              <span className='h-1 w-1 rounded-full bg-muted-foreground' />
              <span>3 min lesetid</span>
            </div>
          </AnimatedBlockTwo>

          <div className='grid gap-12 lg:grid-cols-5 lg:gap-16'>
            <div className='lg:col-span-3'>
              <AnimatedBlockTwo className='fade-in-up' delay='100ms'>
                <h1 className='text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
                  Mer enn et plagg.
                  <span className='mt-2 block gradient-text'>
                    En investering i øyeblikket.
                  </span>
                </h1>
              </AnimatedBlockTwo>

              <AnimatedBlockTwo className='fade-in-up' delay='250ms'>
                <p className='mt-8 text-xl leading-relaxed text-foreground/80 sm:text-2xl'>
                  Solnedgangen farger himmelen oransje. Samtalen flyter fritt,
                  uforstyrret av hverdagens mas.
                </p>
              </AnimatedBlockTwo>

              <AnimatedBlockTwo className='fade-in-up' delay='400ms'>
                <p className='mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl'>
                  Men så kommer den. Den velkjente, kjølige trekken som hvisker
                  at kvelden snart er over. Den som sender oss inn når vi helst
                  vil bli ute litt til.
                </p>
                <p className='mt-4 text-lg font-medium text-foreground sm:text-xl'>
                  Hva om du kunne eie disse øyeblikkene – helt på dine
                  premisser?
                </p>
              </AnimatedBlockTwo>

              <AnimatedBlockTwo className='fade-in-up mt-12' delay='550ms'>
                <button
                  type='button'
                  aria-controls='erling'
                  onClick={() => {
                    const el = document.getElementById('erling')
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      // Oppdater hash uten sidehopp
                      if (history.replaceState) {
                        history.replaceState(null, '', '#erling')
                      }
                    } else {
                      window.location.hash = 'erling'
                    }
                  }}
                  className='group flex items-center gap-2 text-primary-foreground transition-all hover:gap-3'
                >
                  <span className='text-base font-medium'>Les historien</span>
                  <svg
                    className='h-4 w-4 animate-bounce'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 14l-7 7m0 0l-7-7m7 7V3'
                    />
                  </svg>
                </button>
              </AnimatedBlockTwo>
            </div>

            <div className='relative lg:col-span-2'>
              <AnimatedBlockTwo className='fade-in-up' delay='300ms'>
                <div className='aspect-[3/4] overflow-hidden rounded-2xl bg-muted lg:aspect-[4/5]'>
                  <Image
                    src={bat}
                    alt='Utekos i bruk ved solnedgang'
                    className='h-full w-full object-cover'
                    placeholder='blur'
                    sizes='(max-width: 1024px) 100vw, 40vw'
                  />
                </div>
              </AnimatedBlockTwo>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
