'use cache'

import { cn } from '@/lib/utils/className'
import { ArrowRightIcon, Feather, ShieldCheckIcon } from 'lucide-react'
import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'

export async function QualitySection() {
  const cardClasses =
    'relative overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.2)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl'

  return (
    <section className='relative my-16 sm:my-24! overflow-hidden'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2'>
          {/* HOVEDKORT: Maritime Blue */}
          <AnimatedBlock
            className='will-animate-fade-in-up lg:col-span-2 lg:row-span-2'
            delay='0.2s'
            threshold={0.3}
          >
            <div
              className={cn(
                cardClasses,
                // Endret fra justify-between til justify-center for å unngå det store tomrommet
                'group flex h-full flex-col justify-center bg-gradient-to-br from-havdyp/95 to-havdyp/80 p-8 sm:p-12 lg:p-16'
              )}
            >
              {/* Premium shine overlay on hover */}
              <div
                className='pointer-events-none absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full'
                aria-hidden='true'
              />

              <div className='relative z-10'>
                <h2 className='text-cloud-dancer'>Kvalitet i hver fiber</h2>
                <p className='mt-5 sm:mt-6 max-w-xl text-lg text-cloud-dancer/80'>
                  Fra den lette spensten i dunet til slitestyrken i hver søm – vi er transparente om
                  materialvalgene som definerer Utekos. Dette er kvalitet du kan føle på, designet for å vare.
                </p>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up h-full' delay='0.4s' threshold={0.3}>
            <div
              className={cn(
                cardClasses,
                // Endret justify-center til justify-start for å fjerne tomrom på topp
                'group flex h-full flex-col justify-start bg-gradient-to-br from-chocolate-plum/95 to-chocolate-plum/80 p-6 sm:p-8'
              )}
            >
              {/* Flex-container for å plassere ikon og tittel på samme horisontale linje */}
              <div className='mb-4 flex items-center gap-4'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-soft-warm/20 bg-gradient-to-br from-white/10 to-transparent text-soft-warm shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] shadow-soft-warm/10 transition-transform duration-500 group-hover:scale-110'>
                  <Feather className='h-5 w-5 stroke-[1.5]' />
                </div>
                <h3 className='text-[1.125rem] sm:text-[1.25rem] font-medium leading-[1.1] tracking-[-0.01em] text-cloud-dancer'>
                  Premium Isolasjon
                </h3>
              </div>
              <p className='text-[1rem] font-base leading-[1.45]     text-cloud-dancer/70'>
                Kun sertifisert dun og høykvalitets syntetisk fyll for optimal varme-til-vekt.
              </p>
            </div>
          </AnimatedBlock>

          {/* KORT 2: Mountain View (Bygget for å vare) */}
          <AnimatedBlock className='will-animate-fade-in-up h-full' delay='0.6s' threshold={0.3}>
            <div
              className={cn(
                cardClasses,
                // Endret justify-center til justify-start
                'group flex h-full flex-col justify-start bg-gradient-to-br from-mountain-view/95 to-mountain-view/80 p-6 sm:p-8'
              )}
            >
              {/* Flex-container for å plassere ikon og tittel på samme horisontale linje */}
              <div className='mb-4 flex items-center gap-4'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ancient-water/20 bg-gradient-to-br from-white/10 to-transparent text-ancient-water shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] shadow-ancient-water/10 transition-transform duration-500 group-hover:scale-110'>
                  <ShieldCheckIcon className='h-5 w-5 stroke-[1.5]' />
                </div>
                <h3 className='text-[1.125rem] sm:text-[1.25rem] font-medium leading-[1.1] tracking-[-0.01em] text-cloud-dancer'>
                  Bygget for å vare
                </h3>
              </div>
              <p className='text-[1rem] font-normal leading-[1.45] tracking-[-0.02em] text-cloud-dancer/70'>
                Slitesterke materialer og solide sømmer som tåler aktiv bruk i norske forhold.
              </p>
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}
