// Path: src/app/inspirasjon/terrassen/sections/BenefitsGrid.tsx

import { Thermometer, Home, Sparkles, Users } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { cn } from '@/lib/utils/className'

const iconMap = {
  thermometer: Thermometer,
  home: Home,
  sparkles: Sparkles,
  users: Users
}

const benefitSurfaces = {
  comfort: {
    borderColor: 'color-mix(in oklch, var(--dusted-peri) 30%, transparent)',
    background:
      'linear-gradient(145deg, color-mix(in oklch, var(--havdyp) 78%, var(--dusted-peri) 22%) 0%, color-mix(in oklch, var(--maritime-darkest) 78%, var(--havdyp) 22%) 100%)',
    iconBackground: 'color-mix(in oklch, var(--dusted-peri) 18%, var(--maritime-darkest) 82%)',
    iconBorder: 'color-mix(in oklch, var(--dusted-peri) 34%, transparent)'
  },
  home: {
    borderColor: 'color-mix(in oklch, var(--ancient-water) 32%, transparent)',
    background:
      'linear-gradient(145deg, color-mix(in oklch, var(--havdyp) 76%, var(--ancient-water) 24%) 0%, color-mix(in oklch, var(--maritime-darkest) 78%, var(--havdyp) 22%) 100%)',
    iconBackground: 'color-mix(in oklch, var(--ancient-water) 16%, var(--maritime-darkest) 84%)',
    iconBorder: 'color-mix(in oklch, var(--ancient-water) 34%, transparent)'
  },
  simple: {
    borderColor: 'color-mix(in oklch, var(--primary) 30%, transparent)',
    background:
      'linear-gradient(145deg, color-mix(in oklch, var(--havdyp) 76%, var(--primary) 24%) 0%, color-mix(in oklch, var(--maritime-darkest) 80%, var(--havdyp) 20%) 100%)',
    iconBackground: 'color-mix(in oklch, var(--primary) 18%, var(--maritime-darkest) 82%)',
    iconBorder: 'color-mix(in oklch, var(--primary) 34%, transparent)'
  },
  together: {
    borderColor: 'color-mix(in oklch, var(--bleached-mauve) 34%, transparent)',
    background:
      'linear-gradient(145deg, color-mix(in oklch, var(--havdyp) 78%, var(--bleached-mauve) 22%) 0%, color-mix(in oklch, var(--mountain-view) 26%, var(--maritime-darkest) 74%) 100%)',
    iconBackground: 'color-mix(in oklch, var(--bleached-mauve) 18%, var(--maritime-darkest) 82%)',
    iconBorder: 'color-mix(in oklch, var(--bleached-mauve) 36%, transparent)'
  }
} as const

type IconName = keyof typeof iconMap
type BenefitSurface = keyof typeof benefitSurfaces

function IconRenderer({ name, className }: { name: IconName; className?: string }) {
  const Icon = iconMap[name]

  return Icon ? <Icon className={cn('size-8', className)} /> : null
}

type Benefit = {
  icon: IconName
  title: string
  description: string
  color: string
  surface: BenefitSurface
}

export const benefitsData: Benefit[] = [
  {
    icon: 'thermometer',
    title: 'Øyeblikkelig komfort',
    description: 'Fra kjølig trekk til lun hygge på et øyeblikk.',
    color: 'text-dusted-peri',
    surface: 'comfort'
  },
  {
    icon: 'home',
    title: 'Utvider hjemmet ditt',
    description: 'Gjør uteplassen til en funksjonell del av huset, oftere.',
    color: 'text-ancient-water',
    surface: 'home'
  },
  {
    icon: 'sparkles',
    title: 'Enkel i bruk',
    description: 'Lett å ta frem, lett å rydde vekk. Alltid klar for en kosestund.',
    color: 'text-primary',
    surface: 'simple'
  },
  {
    icon: 'users',
    title: 'Inviterer til samvær',
    description: 'Skap en innbydende atmosfære som gjestene dine vil elske.',
    color: 'text-bleached-mauve',
    surface: 'together'
  }
]

export function BenefitsGrid({ benefits }: { benefits: Benefit[] }) {
  return (
    <section className='bg-maritime-darkest py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-3xl md:max-w-4xl text-center'>
          <h2 className='text-cloud-dancer'>En investering i hjemmet</h2>
          <p className='mt-4 utekos-section-lead text-cloud-dancer/88'>
            Få mer ut av uteplassen du allerede har. Utekos er designet for å maksimere komforten i hverdagen.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {benefits.map((benefit, index) => {
            const surface = benefitSurfaces[benefit.surface]

            return (
              <AnimatedBlock
                key={benefit.title}
                className='will-animate-fade-in-scale h-full'
                delay={`${index * 0.05}s`}
              >
                <article
                  className='h-full rounded-[1.35rem] border p-6 text-center shadow-[0_24px_60px_-46px_color-mix(in_oklch,var(--maritime-darkest)_90%,transparent)]'
                  style={{
                    borderColor: surface.borderColor,
                    background: surface.background
                  }}
                >
                  <div
                    className='mx-auto mb-4 flex size-16 items-center justify-center rounded-full border'
                    style={{
                      borderColor: surface.iconBorder,
                      background: surface.iconBackground
                    }}
                  >
                    <IconRenderer name={benefit.icon} className={benefit.color} />
                  </div>
                  <h3 className='mb-2 text-lg font-semibold leading-[1.15]   text-cloud-dancer'>
                    {benefit.title}
                  </h3>
                  <p className='text-sm leading-[1.45]   text-cloud-dancer/88'>{benefit.description}</p>
                </article>
              </AnimatedBlock>
            )
          })}
        </div>
      </div>
    </section>
  )
}
