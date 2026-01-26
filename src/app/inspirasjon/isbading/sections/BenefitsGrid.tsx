// Path: src/app/inspirasjon/isbading/sections/BenefitsGrid.tsx

import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Shield, Shirt, Thermometer, Wind } from 'lucide-react'
import type { Benefit } from '../types'

export const benefitsData: Benefit[] = [
  {
    icon: Thermometer,
    title: 'Gjenopprett varmen',
    description: 'Absorberende fôr tørker huden og får opp kroppstemperaturen umiddelbart.',
    color: 'text-orange-500'
  },
  {
    icon: Shirt,
    title: 'Ditt mobile skifterom',
    description: 'Romslig nok til at du enkelt trekker armene inn og skifter diskret på stranden.',
    color: 'text-blue-500'
  },
  {
    icon: Wind,
    title: '100% Vindtett',
    description: 'Blokkerer den iskalde trekken som ellers stjeler varmen din etter badet.',
    color: 'text-cyan-400'
  },
  {
    icon: Shield,
    title: 'Robust beskyttelse',
    description: 'Tåler røft vær, snø og sludd mens du nyter endorfinrusen.',
    color: 'text-slate-400'
  }
]

export function BenefitsGrid({ benefits }: { benefits: Benefit[] }) {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-fluid-display font-bold tracking-tight'>
            Spesiallaget for det ekstreme
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Isbading krever utstyr du kan stole på. Vi har fjernet barrierene
            slik at du kan fokusere på opplevelsen.
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
              <div className='mx-auto mb-4 flex size-16 items-center justify-center rounded-full border border-neutral-800 bg-sidebar-foreground'>
                <benefit.icon className={`size-8 ${benefit.color}`} />
              </div>
              <h3 className='mb-2 text-lg font-semibold'>{benefit.title}</h3>
              <p className='text-sm text-muted-foreground'>
                {benefit.description}
              </p>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}