import { forwardRef } from 'react'
import { Lock, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import UtekosLogo from '@public/icon.png'
import { cn } from '@/lib/utils/className'

interface InfoCardStackViewProps {
  card1Ref: React.RefObject<HTMLDivElement | null>
  card2Ref: React.RefObject<HTMLDivElement | null>
}

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
    <div className='absolute left-3 top-3 z-20 flex gap-1.5'>
      {colors.map((color, i) => (
        <div key={i} className={cn('h-2 w-2 rounded-full', color)} />
      ))}
    </div>
  )
}

export const InfoCardStackView = forwardRef<
  HTMLDivElement,
  InfoCardStackViewProps
>(({ card1Ref, card2Ref }, ref) => {
  // ref her er containeren for hele stacken om nødvendig, men vi animerer kortene direkte

  const cardBaseClasses =
    'absolute w-full rounded-lg border border-neutral-800 shadow-xl will-change-transform opacity-0' // Start opacity 0 for GSAP

  return (
    <div className='relative h-72 w-full overflow-visible sm:h-80'>
      {/* KORT 1: En trygg handel */}
      <div
        ref={card1Ref}
        className={cn(
          cardBaseClasses,
          'left-0 top-0 bg-neutral-900',
          'h-40 max-w-[280px] p-4 sm:h-48 sm:max-w-sm sm:p-6'
        )}
      >
        <TrafficLights variant='default' />
        <div className='mt-6 flex items-start gap-3'>
          <ShoppingBag className='h-4 w-4 flex-shrink-0 text-muted-foreground sm:h-5 sm:w-5' />
          <div>
            <h3 className='text-sm font-semibold text-foreground sm:text-base'>
              En trygg handel
            </h3>
            <p className='mt-1 text-xs text-muted-foreground sm:text-sm'>
              Sikre betalingsløsninger og 14 dagers angrerett.
            </p>
          </div>
        </div>
      </div>

      {/* KORT 2: Ditt personvern */}
      <div
        ref={card2Ref}
        className={cn(
          cardBaseClasses,
          'left-12 top-28 overflow-hidden bg-neutral-900 sm:left-1/4 sm:top-32',
          'h-40 max-w-[280px] p-4 sm:h-48 sm:max-w-sm sm:p-6'
        )}
      >
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
            <Lock className='h-4 w-4 flex-shrink-0 text-access/70 sm:h-5 sm:w-5' />
            <div>
              <h3 className='text-sm font-semibold text-foreground sm:text-base'>
                Ditt personvern
              </h3>
              <p className='mt-1 text-xs text-access/70 sm:text-sm'>
                Vi tar personvern på alvor. Se hvordan vi behandler dine data.
              </p>
            </div>
          </div>

          <div className='mt-auto flex justify-center pb-1 pt-2'>
            <Image
              src={UtekosLogo}
              alt='Utekos logo ikon'
              className='h-6 w-6 opacity-50 sm:h-8 sm:w-8'
            />
          </div>
        </div>
      </div>
    </div>
  )
})

InfoCardStackView.displayName = 'InfoCardStackView'
