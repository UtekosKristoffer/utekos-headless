'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowRightIcon,
  CalendarIcon,
  MapPinIcon,
  MoonIcon,
  SparklesIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { Sunrise, ThermometerIcon, Wind } from 'lucide-react'
import Link from 'next/link'

export function BobilHeroSection() {
  return (
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
        <span>Bobilliv</span>
      </div>

      <h1 className='text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'>
        Bobilliv uten <span className='text-primary'>kompromisser</span>
      </h1>

      <p className='mt-6 text-xl text-muted-foreground max-w-2xl'>
        Fra den første morgenkaffen til de sene kveldene rundt bordet. Oppdag
        hvordan Utekos forvandler hver stopp til en destinasjon verdt å huske.
      </p>

      <div className='mt-8 flex flex-wrap gap-4'>
        <Button asChild size='lg'>
          <Link href='/produkter'>
            Se produktene
            <ArrowRightIcon className='ml-2 h-4 w-4' />
          </Link>
        </Button>
        <Button variant='outline' size='lg' asChild>
          <Link href='#bruksomrader'>Utforsk mulighetene</Link>
        </Button>
      </div>

      <div className='mt-12 flex flex-wrap gap-8'>
        <div>
          <p className='text-3xl font-bold text-teal-400'>87%</p>
          <p className='text-sm text-muted-foreground'>bruker bobilen oftere</p>
        </div>
        <div>
          <p className='text-3xl font-bold text-yellow-400'>+2 mnd</p>
          <p className='text-sm text-muted-foreground'>lengre sesong</p>
        </div>
        <div>
          <p className='text-3xl font-bold text-fuchsia-400'>5★</p>
          <p className='text-sm text-muted-foreground'>fra bobilentusiaster</p>
        </div>
      </div>
    </motion.div>
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

interface Destination {
  name: string
  season: string
  highlight: string
  color: string
}
export function DestinationsGrid({
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

// CTA Section with animations
export function CTASection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-6'>
        Klar for ditt neste bobil-eventyr?
      </h2>
      <p className='text-xl text-muted-foreground max-w-2xl mx-auto mb-8'>
        Bli med tusenvis av bobilister som har oppdaget hemmeligheten til
        komfortable turer hele året.
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

export const useCasesData = [
  {
    icon: Sunrise,
    time: 'Morgen',
    title: 'Den kjølige morgenkaffen',
    description:
      'Start dagen med kaffe utenfor bobilen, innhyllet i varme mens naturen våkner.',
    temperature: '5-12°C',
    color: 'from-amber-500/20',
    iconColor: 'text-amber-400'
  },
  {
    icon: MoonIcon,
    time: 'Kveld',
    title: 'Sosiale kvelder under stjernene',
    description:
      'Forleng kvelden med venner og familie uten å la kulden drive dere inn.',
    temperature: '8-15°C',
    color: 'from-blue-500/20',
    iconColor: 'text-blue-400'
  },
  {
    icon: Wind,
    time: 'Overgang',
    title: 'Vår og høst-camping',
    description: 'Utvid sesongen og opplev Norge når det er på sitt vakreste.',
    temperature: '3-10°C',
    color: 'from-emerald-500/20',
    iconColor: 'text-emerald-500'
  }
]

export const benefitsData = [
  {
    icon: ThermometerIcon,
    title: 'Øyeblikkelig varme',
    description: 'Fra kald morgen til koselig stund på sekunder',
    color: 'text-orange-500'
  },
  {
    icon: SparklesIcon,
    title: 'Kompakt og praktisk',
    description: 'Tar minimal plass i bobilen, maksimal komfort på turen',
    color: 'text-yellow-400'
  },
  {
    icon: CalendarIcon,
    title: 'Forleng sesongen',
    description: 'Bruk bobilen fra tidlig vår til sen høst i komfort',
    color: 'text-emerald-500'
  },
  {
    icon: UsersIcon,
    title: 'Sosial magnet',
    description: 'Bli samlingspunktet på campingplassen',
    color: 'text-rose-500'
  }
]

export const destinationsData = [
  {
    name: 'Lofoten',
    season: 'Sommer/Høst',
    highlight: 'Midnattssol og nordlys',
    color: 'text-emerald-400'
  },
  {
    name: 'Geirangerfjorden',
    season: 'Vår/Sommer',
    highlight: 'Spektakulære fjorder',
    color: 'text-blue-500'
  },
  {
    name: 'Hardangervidda',
    season: 'Hele året',
    highlight: 'Viddelandskap og stillhet',
    color: 'text-orange-500'
  },
  {
    name: 'Atlanterhavsveien',
    season: 'Sommer/Høst',
    highlight: 'Dramatisk kystlinje',
    color: 'text-cyan-400'
  }
]
