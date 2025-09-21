import { cn } from '@/lib/utils/className'
import { Lock, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import UtekosLogo from '../../../public/icon.png'

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
      {' '}
      {/* Lagt til z-20 for sikkerhets skyld */}
      {colors.map((color, i) => (
        <div key={i} className={cn('h-2 w-2 rounded-full', color)} />
      ))}
    </div>
  )
}

export function InfoCardStack() {
  const cardBaseClasses =
    'absolute w-full max-w-sm rounded-lg border border-neutral-800 p-6 shadow-xl h-48'

  return (
    <div className='relative h-80 w-full'>
      {/* Kort 1: Bakgrunnskortet ("En trygg handel") - Korrekt struktur */}
      <div className={cn(cardBaseClasses, 'top-0 left-0 bg-neutral-900')}>
        <TrafficLights variant='default' />
        <div className='mt-6 flex items-start gap-3'>
          <ShoppingBag className='h-5 w-5 flex-shrink-0 text-muted-foreground' />
          <div>
            <h3 className='font-semibold text-foreground'>En trygg handel</h3>
            <p className='mt-1 text-sm text-muted-foreground'>
              Sikre betalingsløsninger og 14 dagers angrerett.
            </p>
          </div>
        </div>
      </div>

      {/* Kort 2: Forgrunnskortet ("Ditt personvern") */}
      <div
        className={cn(
          cardBaseClasses,
          'top-32 left-1/4 bg-neutral-900 overflow-hidden'
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

        {/* ENDRING: TrafficLights er nå flyttet UT av div-en under, og er en direkte child av kortet */}
        <TrafficLights variant='colored' />

        <div className='relative z-10 flex h-full flex-col'>
          {/* TrafficLights er fjernet herfra */}
          <div className='mt-6 flex items-start gap-3'>
            <Lock className='h-5 w-5 flex-shrink-0 text-muted-foreground' />
            <div>
              <h3 className='font-semibold text-foreground'>Ditt personvern</h3>
              <p className='mt-1 text-sm text-muted-foreground'>
                Vi tar personvern på alvor. Se hvordan vi behandler dine data.
              </p>
            </div>
          </div>

          <div className='mt-auto flex justify-center pb-1 pt-2'>
            <Image
              src={UtekosLogo}
              alt='Utekos logo ikon'
              className='h-8 w-8 opacity-50'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
