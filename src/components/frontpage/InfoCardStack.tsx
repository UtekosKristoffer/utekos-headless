import { cn } from '@/lib/utils/className'
import { Lock, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import UtekosLogo from '@public/icon.png'

const TrafficLights = ({
  variant = 'default'
}: {
  variant?: 'default' | 'colored'
}) => {
  const colors =
    variant === 'colored' ?
      ['bg-red-500/80', 'bg-blue-500/80', 'bg-green-500/80']
    : [
        'bg-sidebar-foreground',
        'bg-sidebar-foreground',
        'bg-sidebar-foreground'
      ]

  return (
    <div className='absolute top-3 left-3 z-20 flex gap-1.5'>
      {colors.map((color, i) => (
        <div key={i} className={cn('h-2 w-2 rounded-full', color)} />
      ))}
    </div>
  )
}

export function InfoCardStack() {
  const cardBaseClasses =
    'absolute w-full rounded-lg border border-neutral-800 shadow-xl transition-all duration-300'

  return (
    <div className='relative h-72 sm:h-80 w-full overflow-visible'>
      {/* Kort 1: Bakgrunnskortet ("En trygg handel") */}
      <div
        className={cn(
          cardBaseClasses,
          'top-0 left-0 bg-neutral-900',
          'h-40 sm:h-48 max-w-[280px] sm:max-w-sm',
          'p-4 sm:p-6'
        )}
      >
        <TrafficLights variant='default' />
        <div className='mt-6 flex items-start gap-3'>
          <ShoppingBag className='h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-muted-foreground' />
          <div>
            <h3 className='text-sm sm:text-base font-semibold text-foreground'>
              En trygg handel
            </h3>
            <p className='mt-1 text-xs sm:text-sm text-muted-foreground'>
              Sikre betalingsløsninger og 14 dagers angrerett.
            </p>
          </div>
        </div>
      </div>

      {/* Kort 2: Forgrunnskortet ("Ditt personvern") */}
      <div
        className={cn(
          cardBaseClasses,
          'bg-neutral-900 overflow-hidden',
          'h-40 sm:h-48 max-w-[280px] sm:max-w-sm',
          'p-4 sm:p-6',
          // Responsiv posisjonering - mindre offset på mobil
          'top-28 left-12 sm:top-32 sm:left-1/4'
        )}
      >
        {/* Rutenett-mønster */}
        <div
          className='absolute inset-0 z-0 opacity-20'
          style={{
            backgroundImage: `
              repeating-linear-gradient(to right, var(--color-border), var(--color-border) 1px, transparent 1px, transparent 40px),
              repeating-linear-gradient(to bottom, var(--color-border), var(--color-border) 1px, transparent 1px, transparent 40px)
            `,
            maskImage:
              'linear-gradient(to bottom, white 0%, white 70%, transparent 100%)'
          }}
        />

        <TrafficLights variant='colored' />

        <div className='relative z-10 flex h-full flex-col'>
          <div className='mt-6 flex items-start gap-3'>
            <Lock className='h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-muted-foreground' />
            <div>
              <h3 className='text-sm sm:text-base font-semibold text-foreground'>
                Ditt personvern
              </h3>
              <p className='mt-1 text-xs sm:text-sm text-muted-foreground'>
                Vi tar personvern på alvor. Se hvordan vi behandler dine data.
              </p>
            </div>
          </div>

          <div className='mt-auto flex justify-center pb-1 pt-2'>
            <Image
              src={UtekosLogo}
              alt='Utekos logo ikon'
              className='h-6 w-6 sm:h-8 sm:w-8 opacity-50'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
