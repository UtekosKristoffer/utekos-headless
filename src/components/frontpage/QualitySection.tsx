import { cn } from '@/lib/utils/className'
import { Feather, ShieldCheckIcon } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'

export async function QualitySection() {
  'use cache'

  const cardClasses =
    'relative overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.2)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl'

  return (
    <section className='relative my-16 sm:my-24! overflow-hidden'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2'>
          <AnimatedBlock
            className='will-animate-fade-in-up lg:col-span-2 lg:row-span-2'
            delay='0.2s'
            threshold={0.3}
          >
            <div
              className={cn(
                cardClasses,
                'group flex h-full flex-col justify-center bg-linear-to-br from-havdyp/95 to-havdyp/80 p-8 sm:p-12 lg:p-16'
              )}
            >
              <div
                className='pointer-events-none absolute inset-0 z-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full'
                aria-hidden='true'
              />

              <div className='relative z-10'>
                <h2 className='font-utekos-text-medium text-foreground'>Kvalitet i hver fiber</h2>
                <p className='mt-5 sm:mt-6 max-w-xl font-utekos-text text-foreground'>
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

                'group flex h-full flex-col justify-start bg-linear-to-br from-chocolate-plum/95 to-chocolate-plum/80 p-6 sm:p-8'
              )}
            >
              <div className='mb-4 flex items-center gap-4'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-soft-warm/20 bg-linear-to-br from-white/10 to-transparent text-soft-warm shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] shadow-soft-warm/10 transition-transform duration-500 group-hover:scale-110'>
                  <Feather className='h-5 w-5 stroke-[1.5]' />
                </div>
                <h3 className='font-utekos-text-medium tracking-wide text-2xl leading-none text-foreground'>
                  Premium isolasjon
                </h3>
              </div>
              <p className='font-utekos-text text-lg text-foreground'>
                Kun sertifisert dun og høykvalitets syntetisk fyll for optimal varme-til-vekt.
              </p>
            </div>
          </AnimatedBlock>

          <AnimatedBlock className='will-animate-fade-in-up h-full' delay='0.6s' threshold={0.3}>
            <div
              className={cn(
                cardClasses,
                'group flex h-full flex-col justify-start bg-linear-to-br from-mountain-view/95 to-mountain-view/80 p-6 sm:p-8'
              )}
            >
              {/* Flex-container for å plassere ikon og tittel på samme horisontale linje */}
              <div className='mb-4 flex items-center gap-4'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ancient-water/20 bg-linear-to-br from-white/10 to-transparent text-ancient-water shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] shadow-ancient-water/10 transition-transform duration-500 group-hover:scale-110'>
                  <ShieldCheckIcon className='h-5 w-5 stroke-[1.5]' />
                </div>
                <h3 className='font-utekos-text-medium tracking-wide text-2xl leading-none text-foreground'>
                  Bygget for å vare
                </h3>
              </div>
              <p className='font-utekos-text text-lg text-foreground'>
                Slitesterke materialer og solide sømmer som tåler aktiv bruk i norske forhold.
              </p>
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}
