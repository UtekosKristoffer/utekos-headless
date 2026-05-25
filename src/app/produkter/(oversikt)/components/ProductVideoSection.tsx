import Link from 'next/link'
import { ArrowRight, Sun, Layers } from 'lucide-react'
import type { Route } from 'next'
import { VIDEO_URL, VIDEO_POSTER_URL } from '@/api/constants'
import { ProductVideoPlayer } from './ProductVideoPlayer'

export function ProductVideoSection() {
  return (
    <section className='relative overflow-hidden py-20 sm:py-32'>
      <div className='absolute inset-0 bg-[color-mix(in_oklab,var(--maritime-blue)_85%,#050508)] pointer-events-none -z-10' />
      <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-60' />

      <div className='container mx-auto px-4 max-w-7xl'>
        <div className='grid grid-cols-1 items-center gap-x-16 gap-y-16 lg:grid-cols-2'>
          <div className='relative mx-auto max-w-sm w-full'>
            <div className='absolute -inset-4 bg-gradient-to-tr from-ancient-water/10 to-maritime-blue/30 blur-3xl -z-10 rounded-[2.5rem]' />

            <div className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-maritime-blue/50 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl'>
              <div className='absolute inset-0 z-10 pointer-events-none rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]' />
              <ProductVideoPlayer src={VIDEO_URL} poster={VIDEO_POSTER_URL} />
            </div>
          </div>

          <div className='text-center lg:text-left'>
            <h2 className='text-[2.5rem] sm:text-[3.5rem] font-medium leading-[0.9] tracking-[-0.01em] text-cloud-dancer'>
              <span className='inline-block'>Slutt</span>{' '}
              <span className='inline-block'>å</span>{' '}
              <span className='relative z-[1] inline-flex items-center justify-center px-2 ml-1 whitespace-nowrap'>
                <span className='absolute inset-0 -z-10 -skew-x-6 rounded-md bg-gradient-to-r from-overcast via-maritime-blue to-overcast opacity-50 blur-[2px]' />

                <span className='absolute inset-0 -z-10 -rotate-1 rounded-lg border border-overcast bg-gradient-to-br from-overcast/80 via-overcast to-overcast/80 opacity-40' />
                <span className='relative z-10 text-cloud-dancer'>fryse.</span>
              </span>
              <br />
              <span className='inline-block mt-2'>Begynn</span>{' '}
              <span className='inline-block'>å</span>{' '}
              <span className='relative z-[1] inline-flex items-center justify-center px-2 ml-1 whitespace-nowrap'>
                <span className='absolute inset-0 -z-10 -skew-x-6 rounded-md bg-gradient-to-r from-soft-warm via-chocolate-plum to-soft-warm opacity-50 blur-[2px]' />
                <span className='absolute inset-0 -z-10 -rotate-1 rounded-lg border border-soft-warm/50 bg-gradient-to-br from-soft-warm via-chocolate-plum to-soft-warm opacity-40' />
                <span className='relative z-10 text-soft-warm'>nyte.</span>
              </span>
            </h2>

            <p className='mt-8 text-[1.125rem] font-normal leading-[1.45] tracking-brand-medium text-cloud-dancer max-w-xl mx-auto lg:mx-0'>
              Er du lei av å la kulden ødelegge de gode øyeblikkene ute? Enten
              du er på fjellet, i hagen, på hytten eller i båten, er Utekos
              løsningen som holder deg varm og komfortabel.
            </p>

            <div className='mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start'>
              <div className='group flex items-center gap-4 rounded-[1rem] border border-white/10 bg-mountain-view p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5'>
                <div className='flex size-12 shrink-0 items-center justify-center rounded-xl border border-soft-warm/20 bg-gradient-to-br from-white/10 to-transparent text-soft-warm shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-transform duration-500 group-hover:scale-110'>
                  <Sun className='h-5 stroke-[1.5]' />
                </div>
                <div className='text-left'>
                  <p className='text-[1rem] font-medium leading-[1.1] tracking-[-0.01em]  text-cloud-dancer'>
                    Garantert varm
                  </p>
                  <p className='mt-1 text-[0.875rem] font-normal text-cloud-dancer tracking-[-0.01em]'>
                    Regisser din egen komfort
                  </p>
                </div>
              </div>

              <div className='group flex items-center gap-4 rounded-[1rem] border border-maritime-blue/20 bg-overcast p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5'>
                <div className='flex size-12 shrink-0 items-center justify-center rounded-xl border border-maritime-blue/20 bg-gradient-to-br from-white/50 to-transparent text-maritime-blue shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] transition-transform duration-500 group-hover:scale-110'>
                  <Layers className='size-5 text-maritime-blue stroke-[1.5]' />
                </div>
                <div className='text-left'>
                  <p className='text-[1rem] font-medium leading-[1.1] tracking-[-0.01em] text-maritime-blue'>
                    3-i-1 funksjonalitet
                  </p>
                  <p className='mt-1 text-[0.875rem] font-normal text-maritime-blue tracking-[-0.01em]'>
                    Veksle enkelt mellom ulike moduser
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-12'>
              <Link
                href={'/produkter/utekos-mikrofiber' as Route}
                data-track='ProductVideoSectionShopNowClick'
                className='group/btn inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-[var(--primary-button)] px-8 py-4 text-[1rem] font-medium text-maritime-blue transition-all duration-300 hover:bg-white hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(255,255,255,0.2)] focus:outline-none focus:ring-2 focus:ring-dusted-peri focus:ring-offset-2 focus:ring-offset-maritime-blue'
              >
                Opplev Utekos selv
                <ArrowRight className='ml-2 h-5 transition-transform duration-300 group-hover/btn:translate-x-1' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
