import { Thermometer, Home, Sparkles, Users } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { cn } from '@/lib/utils/className'

// --- Typer og hjelpere ---
const iconMap = {
  thermometer: Thermometer,
  home: Home,
  sparkles: Sparkles,
  users: Users
}
type IconName = keyof typeof iconMap

function IconRenderer({
  name,
  className
}: {
  name: IconName
  className?: string
}) {
  const Icon = iconMap[name]
  return Icon ? <Icon className={cn('size-8', className)} /> : null
}

type Benefit = {
  icon: IconName
  title: string
  description: string
  color: string
}

export const benefitsData: Benefit[] = [
  {
    icon: 'thermometer',
    title: 'Øyeblikkelig komfort',
    description: 'Fra kjølig trekk til lun hygge på et øyeblikk.',
    color: 'text-orange-500'
  },
  {
    icon: 'home',
    title: 'Utvider hjemmet ditt',
    description: 'Gjør uteplassen til en funksjonell del av huset, oftere.',
    color: 'text-emerald-500'
  },
  {
    icon: 'sparkles',
    title: 'Enkel i bruk',
    description:
      'Lett å ta frem, lett å rydde vekk. Alltid klar for en kosestund.',
    color: 'text-yellow-400'
  },
  {
    icon: 'users',
    title: 'Inviterer til samvær',
    description: 'Skap en innbydende atmosfære som gjestene dine vil elske.',
    color: 'text-rose-500'
  }
]

export function BenefitsGrid({ benefits }: { benefits: Benefit[] }) {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-fluid-display font-bold tracking-tight'>
            En investering i hjemmet
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Få mer ut av uteplassen du allerede har. Utekos er designet for å
            maksimere komforten i hverdagen.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {benefits.map((benefit, index) => (
            <AnimatedBlock
              key={benefit.title}
              className='will-animate-fade-in-scale text-center'
              delay={`${index * 0.05}s`}
            >
              <div className='mx-auto mb-4 flex size-16 items-center justify-center rounded-full border border-neutral-800 bg-sidebar-foreground'>
                <IconRenderer name={benefit.icon} className={benefit.color} />
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
