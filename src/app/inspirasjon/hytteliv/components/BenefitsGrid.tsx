import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Settings2, HeartHandshake, MapPinIcon, Thermometer } from 'lucide-react'
import type { Benefit } from '../types'

// Dataene oppdatert med Utekos Premium fargepalett
export const benefitsData: Benefit[] = [
  {
    icon: Thermometer,
    title: 'Øyeblikkelig varme',
    description: 'Fra kjølig ankomst til peiskos-følelse på sekunder.',
    benefitColor: 'bg-iced-apricot',
    iconColor: 'text-maritime-darkest'
  },
  {
    icon: Settings2,
    title: 'Praktisk design',
    description: 'Tar minimalt med plass og er enkel å ta med seg.',
    benefitColor: 'bg-very-peri',
    iconColor: 'text-cloud-dancer'
  },
  {
    icon: HeartHandshake,
    title: 'Forlenger hyggen',
    description: 'Mer tid til de gode samtalene utendørs, uansett vær.',
    benefitColor: 'bg-chai-tea',
    iconColor: 'text-maritime-darkest'
  },
  {
    icon: MapPinIcon,
    title: 'En del av hytten',
    description: 'Blir like selvsagt å ta på seg som tøflene inne.',
    benefitColor: 'bg-cloud-dancer',
    iconColor: 'text-maritime-darkest'
  }
]

export function BenefitsGrid({ benefits }: { benefits: Benefit[] }) {
  return (
    // Havdyp gir en fantastisk kontrast til seksjonen over. Vi legger på en tynn linje på toppen.
    <section className='border-t border-cloud-dancer/5 bg-havdyp py-24 text-cloud-dancer'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-20 max-w-3xl text-center lg:max-w-4xl'>
          <h2 className='font-google-sans text-5xl md:6xl font-bold tracking-tight text-cloud-dancer md:text-5xl'>
            Designet for hyttelivet
          </h2>
          <p className='mt-5 text-lg leading-relaxed text-cloud-dancer/80'>
            Komfort, kvalitet og smarte detaljer gjør det lett å bruke hytten mer.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-12 md:gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {benefits.map((benefit, benefitIndex) => (
            <AnimatedBlock
              key={benefit.title}
              // Legger til 'group' her for å kunne trigge hover-effekter på under-elementer
              className='group text-center will-animate-fade-in-scale'
              delay={`${benefitIndex * 0.05}s`}
              threshold={0.2}
            >
              <div
                className={`mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl shadow-lg transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110 ${benefit.benefitColor}`}
              >
                <benefit.icon className={`size-7 ${benefit.iconColor}`} aria-hidden />
              </div>
              <h3 className='mb-3 font-google-sans text-xl font-bold tracking-[-0.01em] text-cloud-dancer'>
                {benefit.title}
              </h3>
              <p className='mx-auto max-w-65 text-base leading-relaxed text-cloud-dancer/75'>
                {benefit.description}
              </p>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
