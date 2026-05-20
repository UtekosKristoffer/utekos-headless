import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Card, CardContent } from '@/components/ui/card'
import { HeartHandshake, Thermometer, Sparkles, Calendar } from 'lucide-react'
import type { Benefit } from '../types'

export const benefitsData: Benefit[] = [
  {
    icon: HeartHandshake,
    title: 'Fornøyde gjester',
    description: 'Vis at du bryr deg om komforten til gjestene dine.',
    color: 'text-rose-500'
  },
  {
    icon: Thermometer,
    title: 'Mindre stress',
    description:
      'Du slipper å bekymre deg for pledd, varmeovner og frosne gjester.',
    color: 'text-dusted-peri'
  },
  {
    icon: Sparkles,
    title: 'Perfekt stemning',
    description: 'Skaper en avslappet og lun atmosfære som varer lenger.',
    color: 'text-primary-button'
  },
  {
    icon: Calendar,
    title: 'Forlenger sesongen',
    description: 'Arranger vellykkede grillfester fra tidlig vår til sen høst.',
    color: 'text-emerald-500'
  }
]

export function BenefitsGrid({ benefits }: { benefits: Benefit[] }) {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-fluid-display font-bold tracking-normal'>
            Fordelene for vertskapet
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-overcast'>
            Mindre stress for deg, mer komfort for gjestene. En vinn-vinn for en
            vellykket kveld.
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
              <div className='mx-auto mb-4 flex size-16 items-center justify-center rounded-full border border-cloud-dancer/12 bg-maritime-blue/24'>
                <benefit.icon className={`size-8 ${benefit.color}`} />
              </div>
              <h3 className='mb-2 text-lg font-semibold'>{benefit.title}</h3>
              <p className='text-sm text-overcast'>
                {benefit.description}
              </p>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
