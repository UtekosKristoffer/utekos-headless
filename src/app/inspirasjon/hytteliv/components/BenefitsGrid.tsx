import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Settings2, HeartHandshake, MapPinIcon, Thermometer } from 'lucide-react'
import type { Benefit } from '../types'

export const benefitsData: Benefit[] = [
  {
    icon: Thermometer,
    title: 'Øyeblikkelig varme',
    description: 'Fra kjølig ankomst til peiskos-følelse på sekunder.',
    benefitColor: 'bg-bleached-mauve',
    iconColor: 'text-background'
  },
  {
    icon: Settings2,
    title: 'Praktisk design',
    description: 'Tar minimalt med plass og er enkel å ta med seg.',
    benefitColor: 'bg-ancient-water',
    iconColor: 'text-background'
  },
  {
    icon: HeartHandshake,
    title: 'Forlenger hyggen',
    description: 'Mer tid til de gode samtalene utendørs, uansett vær.',
    benefitColor: 'bg-dusted-peri',
    iconColor: 'text-foreground'
  },
  {
    icon: MapPinIcon,
    title: 'En del av hytten',
    description: 'Blir like selvsagt å ta på seg som tøflene inne.',
    benefitColor: 'bg-overcast',
    iconColor: 'text-background'
  }
]

export function BenefitsGrid({ benefits }: { benefits: Benefit[] }) {
  return (
    <section className='bg-havdyp py-24 text-foreground'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-3xl lg:max-w-4xl text-center'>
          <h2 className='text-foreground '>Designet for hyttelivet</h2>
          <p className='mt-4 utekos-section-lead text-foreground'>
            Komfort, kvalitet og smarte detaljer gjør det lett å bruke hytten mer.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {benefits.map((benefit, benefitIndex) => (
            <AnimatedBlock
              key={benefit.title}
              className='text-center will-animate-fade-in-scale'
              delay={`${benefitIndex * 0.05}s`}
              threshold={0.2}
            >
              <div
                className={`mx-auto mb-4 flex size-16 items-center justify-center rounded-full border border-cloud-dancer/18 ${benefit.benefitColor}`}
              >
                <benefit.icon className={`size-8 ${benefit.iconColor}`} aria-hidden />
              </div>
              <h3 className='mb-2 text-lg leading-nonefont-semibold tracking-[-0.01em]'>{benefit.title}</h3>
              <p className='text-sm leading-text-paragraph tracking-[-0.01em] text-foreground'>
                {benefit.description}
              </p>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
