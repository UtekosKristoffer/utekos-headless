// Path: src/app/inspirasjon/terrassen/sections/BenefitsGrid.tsx

import { Home, Sparkles, Thermometer, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'

type Benefit = {
  icon: LucideIcon
  title: string
  description: string
}

export const benefitsData: Benefit[] = [
  {
    icon: Thermometer,
    title: 'Øyeblikkelig komfort',
    description: 'Fra kjølig trekk til lun hygge på et øyeblikk.'
  },
  {
    icon: Home,
    title: 'Utvider hjemmet ditt',
    description: 'Gjør uteplassen til en funksjonell del av huset, oftere.'
  },
  {
    icon: Sparkles,
    title: 'Enkel i bruk',
    description: 'Lett å ta frem, lett å rydde vekk. Alltid klar for en kosestund.'
  },
  {
    icon: Users,
    title: 'Inviterer til samvær',
    description: 'Skap en innbydende atmosfære som gjestene dine vil elske.'
  }
]

export function BenefitsGrid({ benefits }: { benefits: Benefit[] }) {
  return (
    <section className='bg-marsala py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-3xl md:max-w-4xl text-center'>
          <h2 className='text-cloud-dancer'>En investering i hjemmet</h2>
          <p className='mt-4 utekos-section-lead text-foreground'>
            Få mer ut av uteplassen du allerede har. Utekos er designet for å maksimere komforten i hverdagen.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon

            return (
              <AnimatedBlock
                key={benefit.title}
                className='will-animate-fade-in-scale h-full'
                delay={`${index * 0.05}s`}
              >
                <article className='h-full rounded-[1.35rem] border border-brandied-apricot bg-brandied-apricot p-6 text-center shadow-[0_24px_60px_-46px_color-mix(in_oklch,var(--background)_90%,transparent)]'>
                  <div className='mx-auto mb-4 flex size-16 items-center justify-center rounded-full border border-background/16 bg-cloud-dancer text-background'>
                    <Icon className='size-8' aria-hidden='true' />
                  </div>
                  <h3 className='mb-2 text-lg font-semibold leading-[1.15] text-background'>
                    {benefit.title}
                  </h3>
                  <p className='text-sm leading-text-paragraph text-background'>{benefit.description}</p>
                </article>
              </AnimatedBlock>
            )
          })}
        </div>
      </div>
    </section>
  )
}
