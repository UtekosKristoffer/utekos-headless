'use client'

import { MapPin, MountainSnow, Trees, Fish, Milestone } from 'lucide-react'
import { motion } from 'framer-motion'

type RouteStopType = {
  icon: React.ComponentType<{ className?: string }>
  label: string
  description: string
  iconColor: string
  glowColor: string
}

type RouteType = {
  title: string
  start: {
    label: string
  }
  stops: RouteStopType[]
}

const routes: RouteType[] = [
  {
    title: 'Fjell & Fjord',
    start: {
      label: 'Start: Sør-Norge'
    },
    stops: [
      {
        icon: MountainSnow,
        label: 'Høsten på Hardangervidda',
        description:
          'Kjør over Norges tak og se det ikoniske viddelandskapet i gylne høstfarger. En spektakulær start.',
        iconColor: 'text-amber-400',
        glowColor: '#facc15'
      },
      {
        icon: Trees,
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
        icon: Fish,
        label: 'Rondane & Femundsmarka',
        description:
          'Utforsk nasjonalparker, fiske og villmarksliv i Norges eldste fjellområder. Perfekt for eventyrlystne familier.',
        iconColor: 'text-emerald-400',
        glowColor: '#34d399'
      },
      {
        icon: Milestone,
        label: 'Bergstaden Røros',
        description:
          'Avslutt turen i den historiske trehusbebyggelsen. En unik kulturopplevelse med lokal mat og håndverk.',
        iconColor: 'text-cyan-400',
        glowColor: '#22d3ee'
      }
    ]
  }
]

function RouteStop({
  stop,
  isLast,
  delay
}: {
  stop: RouteStopType
  isLast: boolean
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.5 }}
      className='relative'
    >
      <div className='group relative flex items-start gap-4 rounded-xl border border-neutral-800 bg-sidebar-foreground p-6 transition-all duration-300 hover:border-neutral-700'>
        {/* Aurora gradient effect */}
        <div
          className='animate-aurora absolute -inset-x-2 -inset-y-16 opacity-30 blur-2xl transition-opacity duration-300 group-hover:opacity-40'
          style={{
            background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${stop.glowColor} 100%)`
          }}
        />

        <div className='relative z-10 flex items-start gap-4 w-full'>
          <div className='flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border border-neutral-700 bg-background transition-all duration-300 group-hover:scale-110 group-hover:border-neutral-600'>
            <stop.icon className={`h-7 w-7 ${stop.iconColor}`} />
          </div>
          <div className='flex-1'>
            <h4 className='text-lg font-semibold text-foreground mb-2'>
              {stop.label}
            </h4>
            <p className='text-muted-foreground leading-relaxed'>
              {stop.description}
            </p>
          </div>
        </div>
        <div className='absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          <div
            className='absolute inset-0 rounded-xl blur-sm opacity-20'
            style={{ background: stop.glowColor }}
          />
        </div>
      </div>

      {/* Connector line */}
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
          viewport={{ once: true }}
          className='absolute left-[42px] top-[calc(100%+0.5rem)] h-8 w-1 rounded-full bg-gradient-to-b from-neutral-700 to-transparent'
          style={{ transformOrigin: 'top' }}
        />
      )}
    </motion.div>
  )
}

function RouteColumn({ route, delay }: { route: RouteType; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true, amount: 0.2 }}
      className='flex flex-col'
    >
      {/* Start badge */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.1 }}
        viewport={{ once: true }}
        className='mb-8 flex justify-center'
      >
        <div className='relative inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-sidebar-foreground px-6 py-3 shadow-lg'>
          <MapPin className='h-5 w-5 text-foreground' />
          <span className='text-lg font-semibold text-foreground'>
            {route.start.label}
          </span>
        </div>
      </motion.div>

      {/* Stops */}
      <div className='flex flex-col gap-6'>
        {route.stops.map((stop, idx) => (
          <RouteStop
            key={stop.label}
            stop={stop}
            isLast={idx === route.stops.length - 1}
            delay={delay + 0.2 + idx * 0.15}
          />
        ))}
      </div>
    </motion.div>
  )
}

export function SectionMagasinetBobilHostferien() {
  return (
    <section className='relative py-16 mx-auto md:max-w-7xl max-w-[95%] sm:py-24 overflow-hidden'>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='mb-16 text-center'
        >
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Bobil i høstferien: To ikoniske ruter
          </h2>
          <p className='mx-auto mt-4 max-w-3xl text-lg text-muted-foreground'>
            Oppdag Norges vakreste høstlandskap på egenhånd – to uforglemmelige
            bobilruter.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
          {routes.map((route, idx) => (
            <RouteColumn key={route.title} route={route} delay={idx * 0.2} />
          ))}
        </div>
      </div>
    </section>
  )
}
