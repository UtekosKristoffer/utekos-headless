import { cn } from '@/lib/utils/className'
import { ArrowRightIcon, Feather, ShieldCheckIcon } from 'lucide-react'
import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'

export function QualitySection() {
  const cardClasses =
    'relative overflow-hidden rounded-xl border border-neutral-800 bg-sidebar-foreground p-8'

  return (
    <section className='py-16 sm:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 grid-rows-2 gap-4 lg:grid-cols-3'>
          {/* Hovedkort - Spenner over 2 kolonner */}
          <AnimatedBlock
            className='will-animate-fade-in-up lg:col-span-2 lg:row-span-2'
            delay='0.2s'
            threshold={0.5}
          >
            <div
              className={cn(
                cardClasses,
                'flex h-full flex-col justify-between'
              )}
            >
              <div>
                <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
                  Kvalitet i hver fiber
                </h2>
                <p className='mt-4 max-w-xl text-lg text-access/80'>
                  Fra den lette spensten i dunet til slitestyrken i hver søm –
                  vi er transparente om materialvalgene som definerer Utekos.
                  Dette er kvalitet du kan føle på, designet for å vare.
                </p>
              </div>
              <div className='mt-8'>
                <Link
                  href='/handlehjelp/teknologi-materialer'
                  className='inline-flex items-center justify-center rounded-md bg-button px-6 py-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-button/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                >
                  Utforsk teknologien
                  <ArrowRightIcon className='ml-2 h-4 w-4' />
                </Link>
              </div>
            </div>
          </AnimatedBlock>

          {/* Lite kort 1 */}
          <AnimatedBlock
            className='will-animate-fade-in-up h-full'
            delay='0.4s'
            threshold={0.5}
          >
            <div
              className={cn(cardClasses, 'flex h-full flex-col justify-center')}
            >
              <div className='flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-700 bg-background'>
                <Feather className='h-6 w-6 text-pink-400' />
              </div>
              <h3 className='mt-4 font-semibold text-foreground'>
                Premium Isolasjon
              </h3>
              <p className='mt-1 text-sm text-access/70'>
                Kun sertifisert dun og høykvalitets syntetisk fyll for optimal
                varme-til-vekt.
              </p>
            </div>
          </AnimatedBlock>

          {/* Lite kort 2 */}
          <AnimatedBlock
            className='will-animate-fade-in-up h-full'
            delay='0.6s'
            threshold={0.5}
          >
            <div
              className={cn(cardClasses, 'flex h-full flex-col justify-center')}
            >
              <div className='flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-700 bg-background'>
                <ShieldCheckIcon className='h-6 w-6 text-green-400' />
              </div>
              <h3 className='mt-4 font-semibold text-foreground'>
                Bygget for å vare
              </h3>
              <p className='mt-1 text-sm text-access/70'>
                Slitesterke materialer og solide sømmer som tåler aktiv bruk i
                norske forhold.
              </p>
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}
