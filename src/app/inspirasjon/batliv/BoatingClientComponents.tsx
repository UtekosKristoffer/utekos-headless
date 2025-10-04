// Path: src/app/inspirasjon/båtliv/BoatingClientComponents.tsx

'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import {
  MapPinIcon,
  Moon,
  Sparkles,
  Sunrise,
  Thermometer,
  Users,
  Wind
} from 'lucide-react'
import Link from 'next/link'

export function BoatingHeroSection() {
  return (
    <section className='relative min-h-[70vh] flex items-center'>
      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50' />
      <div className='container relative mx-auto px-4 py-16'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='max-w-3xl'
        >
          <div className='mb-6 flex items-center gap-2 text-sm text-muted-foreground'>
            <Link
              href='/inspirasjon'
              className='hover:text-foreground transition-colors'
            >
              Inspirasjon
            </Link>
            <span>/</span>
            <span>Båtliv</span>
          </div>

          <h1 className='text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'>
            Båtliv uten <span className='text-primary'>å fryse</span>
          </h1>

          <p className='mt-6 text-xl text-muted-foreground max-w-2xl'>
            Fra den første kaffen i soloppgang til ankerdrammen under stjernene.
            Opplev en lengre og mer komfortabel båtsesong med varme som varer.
          </p>

          <div className='mt-8 flex flex-wrap gap-4'>
            <Button asChild size='lg'>
              <Link href='/produkter'>
                Se produkter for båtfolket
                <ArrowRightIcon className='ml-2 h-4 w-4' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <Link href='#bruksomrader'>Utforsk mulighetene</Link>
            </Button>
          </div>

          <div className='mt-12 flex flex-wrap gap-8'>
            <div>
              <p className='text-3xl font-bold text-sky-400'>+6 uker</p>
              <p className='text-sm text-muted-foreground'>lengre båtsesong</p>
            </div>
            <div>
              <p className='text-3xl font-bold text-green-400'>95%</p>
              <p className='text-sm text-muted-foreground'>
                mer komfort om kvelden
              </p>
            </div>
            <div>
              <p className='text-3xl font-bold text-orange-400'>5★</p>
              <p className='text-sm text-muted-foreground'>fra kystskippere</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface UseCase {
  icon: any
  time: string
  title: string
  description: string
  temperature: string
  color: string
  iconColor: string
}
export function UseCasesGrid({ useCases }: { useCases: UseCase[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
      {useCases.map((useCase, index) => (
        <motion.div
          key={useCase.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className='relative overflow-hidden border-neutral-800 bg-background h-full group'>
            <div
              className={`absolute inset-0 bg-gradient-to-br ${useCase.color} to-transparent opacity-20 transition-opacity group-hover:opacity-30`}
            />
            <CardContent className='relative p-8'>
              <div className='flex items-center gap-4 mb-6'>
                <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-sidebar-foreground border border-neutral-700'>
                  <useCase.icon className={`h-6 w-6 ${useCase.iconColor}`} />
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    {useCase.time}
                  </p>
                  <p className='text-sm font-medium text-primary'>
                    {useCase.temperature}
                  </p>
                </div>
              </div>
              <h3 className='text-xl font-semibold mb-2'>{useCase.title}</h3>
              <p className='text-muted-foreground'>{useCase.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

// Benefits Grid
interface Benefit {
  icon: any
  title: string
  description: string
  color: string
}

export function BenefitsGrid({ benefits }: { benefits: Benefit[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
      {benefits.map((benefit, index) => (
        <motion.div
          key={benefit.title}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          viewport={{ once: true }}
          className='text-center'
        >
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sidebar-foreground border border-neutral-800'>
            <benefit.icon className={`h-8 w-8 ${benefit.color}`} />
          </div>
          <h3 className='text-lg font-semibold mb-2'>{benefit.title}</h3>
          <p className='text-sm text-muted-foreground'>{benefit.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

// Popular Destinations Grid
interface Destination {
  name: string
  season: string
  highlight: string
  color: string
}

export function PopularDestinationsGrid({
  destinations
}: {
  destinations: Destination[]
}) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {destinations.map((dest, index) => (
        <motion.div
          key={dest.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className='border-neutral-800 bg-sidebar-foreground hover:bg-sidebar-foreground/80 transition-colors'>
            <CardContent className='p-6'>
              <div className='flex items-start justify-between mb-3'>
                <h3 className='font-semibold text-lg'>{dest.name}</h3>
                <MapPinIcon className={`h-5 w-5 ${dest.color}`} />
              </div>
              <p className='text-sm text-muted-foreground mb-2'>
                {dest.season}
              </p>
              <p className='text-sm text-foreground/80'>{dest.highlight}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

// CTA Section
export function CTASection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-6'>
        Klar for å kaste loss?
      </h2>
      <p className='text-xl text-muted-foreground max-w-2xl mx-auto mb-8'>
        Bli en av de mange båteierne som har oppdaget hemmeligheten bak en
        varmere og lengre sesong på sjøen.
      </p>
      <div className='flex flex-wrap gap-4 justify-center'>
        <Button asChild size='lg' className='gap-2'>
          <Link href='/produkter'>
            Se alle produkter
            <ArrowRightIcon className='h-4 w-4' />
          </Link>
        </Button>
        <Button variant='outline' size='lg' asChild>
          <Link href='/handlehjelp/storrelsesguide'>Finn din størrelse</Link>
        </Button>
      </div>
    </motion.div>
  )
}

export const useCasesData: UseCase[] = [
  {
    icon: Sunrise,
    time: 'Morgen',
    title: 'Kaffe i havgapet',
    description:
      'Nyt en stille morgen for anker med kaffekoppen, uansett hvor frisk brisen er.',
    temperature: '8-15°C',
    color: 'from-amber-500/20',
    iconColor: 'text-amber-400'
  },
  {
    icon: Moon,
    time: 'Kveld',
    title: 'Bryggekos som varer',
    description:
      'Bli samlingspunktet i gjestehavna. Forleng de sosiale kveldene uten å fryse.',
    temperature: '10-18°C',
    color: 'from-indigo-500/20',
    iconColor: 'text-indigo-400'
  },
  {
    icon: Wind,
    time: 'Underveis',
    title: 'Når vinden biter',
    description:
      'Perfekt for å holde varmen i cockpiten når du seiler eller på flybridgen i motvind.',
    temperature: 'Alle temperaturer',
    color: 'from-cyan-500/20',
    iconColor: 'text-cyan-400'
  }
]

export const benefitsData: Benefit[] = [
  {
    icon: Thermometer,
    title: 'Øyeblikkelig varme',
    description: 'Effektiv beskyttelse når temperaturen plutselig synker.',
    color: 'text-orange-500'
  },
  {
    icon: Wind,
    title: 'Vindtett komfort',
    description: 'Designet for å stenge den kjølige sjøbrisen og trekken ute.',
    color: 'text-cyan-400'
  },
  {
    icon: Sparkles,
    title: 'Kompakt & Praktisk',
    description: 'Tar minimalt med plass og er enkel å stue vekk om bord.',
    color: 'text-yellow-400'
  },
  {
    icon: Users,
    title: 'Sosial magnet',
    description: 'Gjør din båt til det naturlige samlingspunktet i havna.',
    color: 'text-rose-500'
  }
]

export const popularDestinationsData: Destination[] = [
  {
    name: 'Sørlandskysten',
    season: 'Sommer',
    highlight: 'For sene kvelder i uthavn',
    color: 'text-amber-400'
  },
  {
    name: 'Vestlandskysten',
    season: 'Vår/Sommer',
    highlight: 'Perfekt i uforutsigbart vær',
    color: 'text-emerald-500'
  },
  {
    name: 'Oslofjorden',
    season: 'Vår/Høst',
    highlight: 'Forleng pendlersesongen',
    color: 'text-blue-500'
  },
  {
    name: 'Helgelandskysten',
    season: 'Sommer',
    highlight: 'For lyse, men kjølige netter',
    color: 'text-cyan-400'
  }
]
