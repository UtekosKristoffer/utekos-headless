'use client'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { BenefitCard } from './BenefitCard'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils/className'

const totalStock = 11
const remainingStock = 7

const benefits = [
  {
    label: '-53% rabatt',
    description: '– Nå kun 750,- (før 1490,-)',
    glowColor: '#f59e0b'
  },
  {
    label: 'Praktisk Utekos-bag',
    description: 'inkludert',
    glowColor: '#06b6d4'
  },
  {
    label: 'Kun tilgjengelig i størrelse L',
    description: '',
    glowColor: '#8b5cf6'
  }
]

export function SpecialOfferContentColumn() {
  const precisePercentage = (remainingStock / totalStock) * 100
  const displayPercentage = Math.round(precisePercentage)

  const [containerRef, containerInView] = useInView({ threshold: 0.5 })
  const [badgeRef, badgeInView] = useInView({ threshold: 1 })
  const [h2Ref, h2InView] = useInView({ threshold: 1 })
  const [pRef, pInView] = useInView({ threshold: 1 })
  const [stockRef, stockInView] = useInView({ threshold: 1 })
  const [progressBarRef, progressBarInView] = useInView({ threshold: 1 })
  const [ctaRef, ctaInView] = useInView({ threshold: 1 })

  return (
    <div
      ref={containerRef}
      className={cn('will-animate-fade-in-up', containerInView && 'is-in-view')}
      style={{ '--transition-delay': '0.1s' } as React.CSSProperties}
    >
      {/* Limited Badge */}
      <div
        ref={badgeRef}
        className={cn(
          'will-animate-fade-in-up mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-900/20 px-4 py-2',
          badgeInView && 'is-in-view'
        )}
        style={{ '--transition-delay': '0.3s' } as React.CSSProperties}
      >
        <Sparkles className='h-4 w-4 text-sky-400' />
        <span className='text-sm font-semibold text-sky-400'>
          Begrenset tilbud
        </span>
      </div>

      <h2
        ref={h2Ref}
        className={cn(
          'will-animate-fade-in-up text-balance text-3xl font-bold tracking-tight sm:text-4xl',
          h2InView && 'is-in-view'
        )}
        style={{ '--transition-delay': '0.4s' } as React.CSSProperties}
      >
        En sjelden mulighet
      </h2>

      <p
        ref={pRef}
        className={cn(
          'will-animate-fade-in-up mt-4 text-lg leading-relaxed text-neutral-400',
          pInView && 'is-in-view'
        )}
        style={{ '--transition-delay': '0.5s' } as React.CSSProperties}
      >
        Vår utgående Special Edition kommer aldri tilbake. Sikre deg en av de
        aller siste til en eksepsjonell pris.
      </p>

      {/* Stock indicator */}
      <div
        ref={stockRef}
        className={cn(
          'will-animate-fade-in-up mt-8',
          stockInView && 'is-in-view'
        )}
        style={{ '--transition-delay': '0.5.5s' } as React.CSSProperties}
      >
        <div className='mb-2 flex items-center justify-between'>
          <p className='flex items-center gap-2 text-sm font-medium text-neutral-300'>
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75'></span>
              <span className='relative inline-flex h-2 w-2 rounded-full bg-sky-500'></span>
            </span>
            Kun {remainingStock} igjen på lager!
          </p>
          <span className='text-xs text-neutral-500'>{displayPercentage}%</span>
        </div>
        <div className='h-2 w-full overflow-hidden rounded-full border border-neutral-700 bg-neutral-800'>
          <div
            ref={progressBarRef}
            className={cn(
              'will-animate-progress-bar h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400',
              progressBarInView && 'is-in-view'
            )}
            style={
              {
                '--progress-width': `${precisePercentage}%`,
                '--transition-delay': '0.6s'
              } as React.CSSProperties
            }
          />
        </div>
      </div>

      {/* Benefits list */}
      <ul className='mt-8 space-y-3'>
        {benefits.map((benefit, idx) => (
          <BenefitCard
            key={benefit.label}
            benefit={benefit}
            delay={0.6 + idx * 0.1}
          />
        ))}
      </ul>

      {/* CTA Button */}
      <div
        ref={ctaRef}
        className={cn('will-animate-fade-in-up', ctaInView && 'is-in-view')}
        style={{ '--transition-delay': '1.0s' } as React.CSSProperties}
      >
        <Link
          href='/produkter/utekos-special-edition'
          className={buttonVariants({
            size: 'lg',
            className:
              'group mt-8 w-full sm:w-auto bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-all duration-300'
          })}
        >
          Sikre deg din før det er for sent
          <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
        </Link>
      </div>
    </div>
  )
}
