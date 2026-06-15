import { AnimatedBlock } from '@/components/AnimatedBlock'
import { HeartHandshake, Thermometer, Sparkles, Calendar } from 'lucide-react'
import type { Benefit } from '../types'
import { grillSectionSurfaces } from '../theme/sectionSurfaces'

const { dark } = grillSectionSurfaces

export const benefitsData: Benefit[] = [
  {
    icon: HeartHandshake,
    title: 'Fornøyde gjester',
    description: 'Vis at du bryr deg om komforten til gjestene dine.',
    iconBackground: 'bg-mountain-view'
  },
  {
    icon: Thermometer,
    title: 'Mindre stress',
    description: 'Slipp å tenke på pledd, varmeovner og kalde gjester.',
    iconBackground: 'bg-mountain-view'
  },
  {
    icon: Sparkles,
    title: 'Perfekt stemning',
    description: 'Skap en avslappet og lun atmosfære som varer lenger.',
    iconBackground: 'bg-mountain-view'
  },
  {
    icon: Calendar,
    title: 'Forlenger sesongen',
    description: 'Arranger vellykkede grillfester fra tidlig vår til sen høst.',
    iconBackground: 'bg-mountain-view'
  }
]

export function BenefitsGrid({ benefits }: { benefits: Benefit[] }) {
  return (
    <section className={dark.section}>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-3xl md:max-w-4xl text-center'>
          <h2 className={dark.heading}>Fordelene for vertskapet</h2>
          <p className={`mt-4 utekos-section-lead ${dark.lead}`}>
            Mindre stress for deg, mer komfort for gjestene — en vinn-vinn for kvelden.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {benefits.map((benefit, benefitIndex) => (
            <AnimatedBlock
              key={benefit.title}
              className='will-animate-fade-in-scale text-center'
              delay={`${benefitIndex * 0.05}s`}
              threshold={0.2}
            >
              <div
                className={`mx-auto mb-4 flex size-16 items-center justify-center rounded-full border border-cloud-dancer/18 ${benefit.iconBackground}`}
              >
                <benefit.icon className='size-8 text-fairest-jade' aria-hidden />
              </div>
              <h3 className='mb-2 text-lg font-semibold leading-[1.15] tracking-[-0.01em] text-foreground'>
                {benefit.title}
              </h3>
              <p className='text-sm leading-text-paragraph tracking-[-0.02em] text-foreground'>
                {benefit.description}
              </p>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
