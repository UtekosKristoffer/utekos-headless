import { AnimatedBlock } from '@/components/AnimatedBlock'
import { HeartHandshake, MapPinIcon, Sparkles, Thermometer } from 'lucide-react'
import type { Benefit } from '../types'

export const benefitsData: Benefit[] = [
  {
    icon: Thermometer,
    title: 'Øyeblikkelig varme',
    description: 'Fra kjølig ankomst til peiskos-følelse på sekunder.',
    color: 'text-dusted-peri'
  },
  {
    icon: Sparkles,
    title: 'Praktisk design',
    description: 'Tar minimalt med plass og er enkel å ta med seg.',
    color: 'text-primary-button'
  },
  {
    icon: HeartHandshake,
    title: 'Forlenger hyggen',
    description: 'Mer tid til de gode samtalene utendørs, uansett vær.',
    color: 'text-bleached-mauve'
  },
  {
    icon: MapPinIcon,
    title: 'En del av hytten',
    description: 'Blir like selvsagt å ta på seg som tøflene inne.',
    color: 'text-mountain-view'
  }
]

export function BenefitsGrid({ benefits }: { benefits: Benefit[] }) {
  return (
    <section className='bg-mountain-view py-24 text-cloud-dancer'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-fluid-display leading-[0.95] font-bold tracking-[-0.01em]'>
            Designet for hyttelivet
          </h2>
          <p className='mt-4 text-lg leading-[1.45] tracking-[-0.01em] text-cloud-dancer'>
            Komfort, kvalitet og smarte detaljer gjør det lett å bruke hytten
            mer.
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
              <div className='mx-auto mb-4 flex size-16 items-center justify-center rounded-full border border-cloud-dancer/18 bg-maritime-darkest/38'>
                <benefit.icon className={`size-8 ${benefit.color}`} />
              </div>
              <h3 className='mb-2 text-lg leading-[1] font-semibold tracking-[-0.01em]'>
                {benefit.title}
              </h3>
              <p className='text-sm leading-[1.45] tracking-[-0.01em] text-cloud-dancer'>
                {benefit.description}
              </p>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
