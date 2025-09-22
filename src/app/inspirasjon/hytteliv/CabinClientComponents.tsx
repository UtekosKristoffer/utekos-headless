// Path: src/app/inspirasjon/hytteliv/CabinClientComponents.tsx

'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import {
  Coffee,
  HeartHandshake,
  MapPinIcon,
  Moon,
  Sparkles,
  Thermometer
} from 'lucide-react'
import Link from 'next/link'

export function CabinHeroSection() {
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
        <span>Hytteliv</span>
      </div>

      <h1 className='text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'>
        Hyttekos, <span className='text-primary'>perfeksjonert</span>
      </h1>

      <p className='mt-6 text-xl text-muted-foreground max-w-2xl'>
        Fra den krystallklare morgenluften på terrassen, til de magiske kveldene
        under stjernene. Gjør hytten til et fristed for komfort, uansett årstid.
      </p>

      <div className='mt-8 flex flex-wrap gap-4'>
        <Button asChild size='lg'>
          <Link href='/produkter'>
            Finn din Utekos
            <ArrowRightIcon className='ml-2 h-4 w-4' />
          </Link>
        </Button>
        <Button variant='outline' size='lg' asChild>
          <Link href='#bruksomrader'>Se bruksområdene</Link>
        </Button>
      </div>

      <div className='mt-12 flex flex-wrap gap-8'>
        <div>
          <p className='text-3xl font-bold text-cyan-400'>9/10</p>
          <p className='text-sm text-muted-foreground'>forlenger utekosen</p>
        </div>
        <div>
          <p className='text-3xl font-bold text-lime-400'>+3 mnd</p>
          <p className='text-sm text-muted-foreground'>lengre terrassesesong</p>
        </div>
        <div>
          <p className='text-3xl font-bold text-violet-400'>5★</p>
          <p className='text-sm text-muted-foreground'>fra hytteentusiaster</p>
        </div>
      </div>
    </motion.div>
  )
}

// Use Cases Grid
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
            {/* Bruker nå den dynamiske fargen fra data-objektet */}
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

export function PopularCabinAreasGrid({
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
                {/* Bruker nå den dynamiske fargen for ikonet */}
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
        Klar for din ultimate hytteopplevelse?
      </h2>
      <p className='text-xl text-muted-foreground max-w-2xl mx-auto mb-8'>
        Bli en del av de som vet hvordan man skaper ekte hyttekos – uansett hvor
        kaldt det er utenfor.
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
    icon: Coffee,
    time: 'Morgen',
    title: 'Kaffe på en kald terrasse',
    description:
      'Nyt soloppgangen og den første kaffekoppen utendørs, varm og komfortabel.',
    temperature: '2-10°C',
    color: 'from-amber-500/20',
    iconColor: 'text-amber-400'
  },
  {
    icon: Moon,
    time: 'Kveld',
    title: 'Stjernekikking uten å fryse',
    description:
      'Forleng de sosiale kveldene rundt bålpannen eller under en klar stjernehimmel.',
    temperature: '4-12°C',
    color: 'from-indigo-500/20',
    iconColor: 'text-indigo-400'
  },
  {
    icon: HeartHandshake,
    time: 'Ankomst',
    title: 'Velkommen til varmen',
    description:
      'Perfekt ved ankomst til en kald hytte. Få varmen umiddelbart mens du fyrer i peisen.',
    temperature: 'Alle temperaturer',
    color: 'from-rose-500/20',
    iconColor: 'text-rose-500'
  }
]
export const benefitsData: Benefit[] = [
  {
    icon: Thermometer,
    title: 'Øyeblikkelig varme',
    description: 'Fra kjølig ankomst til peiskos-følelse på sekunder.',
    color: 'text-orange-500'
  },
  {
    icon: Sparkles,
    title: 'Praktisk design',
    description: 'Tar minimalt med plass og er enkel å ta med seg.',
    color: 'text-yellow-400'
  },
  {
    icon: HeartHandshake,
    title: 'Forlenger hyggen',
    description: 'Mer tid til de gode samtalene utendørs, uansett vær.',
    color: 'text-rose-500'
  },
  {
    icon: MapPinIcon,
    title: 'En del av hytten',
    description: 'Blir like selvsagt å ta på seg som tøflene inne.',
    color: 'text-emerald-500'
  }
]

export const popularAreasData: Destination[] = [
  {
    name: 'Trysil & Hemsedal',
    season: 'Vinter/Vår',
    highlight: 'Perfekt etter skituren',
    color: 'text-cyan-400'
  },
  {
    name: 'Sørlandskysten',
    season: 'Sommer',
    highlight: 'For kjølige sommerkvelder',
    color: 'text-amber-400'
  },
  {
    name: 'Hafjell & Geilo',
    season: 'Hele året',
    highlight: 'Allsidig komfort i fjellet',
    color: 'text-green-500'
  },
  {
    name: 'Hardanger',
    season: 'Vår/Høst',
    highlight: 'Nyt fjordutsikten lenger',
    color: 'text-orange-500'
  }
]
