import { AnimatedBlock } from '@/components/AnimatedBlock'
import { HeartHandshake, Thermometer, Sparkles, Calendar } from 'lucide-react'
import type { Benefit } from '../types'

export const benefitsData: Benefit[] = [
  {
    icon: HeartHandshake,
    title: 'Fornøyde gjester',
    description: 'Vis at du bryr deg om komforten til gjestene dine.',
    iconBackground: '--color-cloud-dancer'
  },
  {
    icon: Thermometer,
    title: 'Mindre stress',
    description: 'Slipp å tenke på pledd, varmeovner og kalde gjester.',
    iconBackground: '--overcast'
  },
  {
    icon: Sparkles,
    title: 'Perfekt stemning',
    description: 'Skap en avslappet og lun atmosfære som varer lenger.',
    iconBackground: '--ancient-water-light'
  },
  {
    icon: Calendar,
    title: 'Forlenger sesongen',
    description: 'Arranger vellykkede grillfester fra tidlig vår til sen høst.',
    iconBackground: '--color-bleached-mauve-light'
  }
]

export function BenefitsGrid({ benefits }: { benefits: Benefit[] }) {
  return (
    <section className='bg-mountain-view py-24 text-foreground'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-3xl md:max-w-4xl text-center'>
          <h2 className='text-foreground'>Fordelene for vertskapet</h2>
          <p className='mt-4 utekos-section-lead text-foreground/88'>
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
                className='mx-auto mb-4 flex size-16 items-center justify-center rounded-full border border-cloud-dancer/18'
                style={{ backgroundColor: `var(${benefit.iconBackground})` }}
              >
                <benefit.icon className='size-8 text-background' aria-hidden />
              </div>
              <h3 className='mb-2 text-lg font-semibold leading-[1.15] tracking-[-0.01em] text-foreground'>
                {benefit.title}
              </h3>
              <p className='  text-sm leading-text-paragraph tracking-[-0.02em] text-foreground/82'>
                {benefit.description}
              </p>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
