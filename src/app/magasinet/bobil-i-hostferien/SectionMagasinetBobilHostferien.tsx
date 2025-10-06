import { RouteColumn } from './RouteColumn'
import type { IconName } from './RouteStop'
import { AnimatedBlock } from '@/components/AnimatedBlock'

export type RouteStopType = {
  icon: IconName
  label: string
  description: string
  iconColor: string
  glowColor: string
}

export type RouteType = {
  title: string
  start: {
    label: string
  }
  stops: RouteStopType[]
}

// Dataen er nå oppdatert til å bruke strenger for ikoner
const routes: RouteType[] = [
  {
    title: 'Fjell & Fjord',
    start: {
      label: 'Start: Sør-Norge'
    },
    stops: [
      {
        icon: 'mountain-snow',
        label: 'Høsten på Hardangervidda',
        description:
          'Kjør over Norges tak og se det ikoniske viddelandskapet i gylne høstfarger. En spektakulær start.',
        iconColor: 'text-amber-400',
        glowColor: '#facc15'
      },
      {
        icon: 'trees',
        label: 'Fruktbygdene i Hardanger',
        description:
          'Følg fjorden og opplev kontrasten mellom snøkledde topper og frodige lier med eplehøsting og lokal sider.',
        iconColor: 'text-red-400',
        glowColor: '#f87171'
      }
    ]
  },
  {
    title: 'Villmark & Kultur',
    start: {
      label: 'Start: Øst-Norge'
    },
    stops: [
      {
        icon: 'fish',
        label: 'Rondane & Femundsmarka',
        description:
          'Utforsk nasjonalparker, fiske og villmarksliv i Norges eldste fjellområder. Perfekt for eventyrlystne familier.',
        iconColor: 'text-emerald-400',
        glowColor: '#34d399'
      },
      {
        icon: 'milestone',
        label: 'Bergstaden Røros',
        description:
          'Avslutt turen i den historiske trehusbebyggelsen. En unik kulturopplevelse med lokal mat og håndverk.',
        iconColor: 'text-cyan-400',
        glowColor: '#22d3ee'
      }
    ]
  }
]

export function SectionMagasinetBobilHostferien() {
  return (
    <section className='relative mx-auto max-w-[95%] overflow-hidden py-16 sm:py-24 md:max-w-7xl'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div
          className='absolute left-1/4 top-0 h-[500px] w-[500px] opacity-20 blur-3xl'
          style={{
            background: 'radial-gradient(circle, #facc15 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute right-1/4 bottom-0 h-[500px] w-[500px] opacity-20 blur-3xl'
          style={{
            background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <AnimatedBlock
          className='will-animate-fade-in-up mb-16 text-center'
          threshold={1}
        >
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Bobil i høstferien: To ikoniske ruter
          </h2>
          <p className='mx-auto mt-4 max-w-3xl text-lg text-muted-foreground'>
            Oppdag Norges vakreste høstlandskap på egenhånd – to uforglemmelige
            bobilruter.
          </p>
        </AnimatedBlock>

        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
          {routes.map((route, idx) => (
            <RouteColumn key={route.title} route={route} delay={idx * 0.2} />
          ))}
        </div>
      </div>
    </section>
  )
}
