// Path: src/app/inspirasjon/grillkvelden/GrillClientComponents.tsx

'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import {
  Calendar,
  Flame,
  HeartHandshake,
  Lightbulb,
  Moon,
  Music,
  Sparkles,
  Thermometer,
  Users,
  UtensilsCrossed
} from 'lucide-react'
import Link from 'next/link'

// Hero Section
export function GrillHeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='max-w-3xl'
    >
      <h1 className='text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'>
        Grillkvelden som <span className='text-primary'>aldri tar slutt</span>
      </h1>

      <p className='mt-6 text-xl text-muted-foreground max-w-2xl'>
        Bli verten for de uforglemmelige kveldene, der de gode samtalene og
        latteren fortsetter lenge etter at den siste pølsen er grillet.
      </p>

      <div className='mt-8 flex flex-wrap gap-4'>
        <Button asChild size='lg'>
          <Link href='/produkter'>
            Bli klar for kvelden
            <ArrowRightIcon className='ml-2 h-4 w-4' />
          </Link>
        </Button>
        <Button variant='outline' size='lg' asChild>
          <Link href='#bruksomrader'>Se øyeblikkene</Link>
        </Button>
      </div>

      <div className='mt-12 flex flex-wrap gap-8'>
        <div>
          <p className='text-3xl font-bold text-orange-400'>+2t</p>
          <p className='text-sm text-muted-foreground'>ekstra utekos</p>
        </div>
        <div>
          <p className='text-3xl font-bold text-emerald-400'>100%</p>
          <p className='text-sm text-muted-foreground'>fornøyde gjester</p>
        </div>
        <div>
          <p className='text-3xl font-bold text-rose-400'>5★</p>
          <p className='text-sm text-muted-foreground'>fra grillmestere</p>
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
                <p className='font-medium text-muted-foreground'>
                  {useCase.time}
                </p>
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

// Host Tips Grid
interface HostTip {
  name: string
  highlight: string
  icon: any
  color: string
}

export function HostTipsGrid({ tips }: { tips: HostTip[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {tips.map((tip, index) => (
        <motion.div
          key={tip.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className='border-neutral-800 bg-sidebar-foreground hover:bg-sidebar-foreground/80 transition-colors group'>
            <CardContent className='p-6'>
              <div className='flex items-start justify-between mb-3'>
                <h3 className='font-semibold text-lg'>{tip.name}</h3>
                <tip.icon
                  className={`h-5 w-5 ${tip.color} transition-colors group-hover:text-primary`}
                />
              </div>
              <p className='text-sm text-foreground/80'>{tip.highlight}</p>
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
        Klar for å bli nabolagets grillkonge?
      </h2>
      <p className='text-xl text-muted-foreground max-w-2xl mx-auto mb-8'>
        Sørg for at du har hemmeligheten til vellykket helårsgrilling i skapet.
        Dine gjester vil takke deg.
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

// Data exports
export const useCasesData: UseCase[] = [
  {
    icon: Flame,
    time: 'Før maten',
    title: 'Mens grillen blir varm',
    description:
      'Hold gjestene varme og komfortable mens de venter på den perfekte gløden.',
    color: 'from-orange-500/20',
    iconColor: 'text-orange-400'
  },
  {
    icon: Users,
    time: 'Etter maten',
    title: 'Rundt bordet',
    description:
      'Det er nå de gode samtalene starter. Ikke la kulden sette en stopper for hyggen.',
    color: 'from-rose-500/20',
    iconColor: 'text-rose-400'
  },
  {
    icon: Moon,
    time: 'Sent på kvelden',
    title: 'Når stjernene titter frem',
    description:
      'For de som blir igjen. Den ultimate komforten for de siste, rolige timene.',
    color: 'from-indigo-500/20',
    iconColor: 'text-indigo-400'
  }
]

export const benefitsData: Benefit[] = [
  {
    icon: HeartHandshake,
    title: 'Fornøyde gjester',
    description: 'Vis at du bryr deg om komforten til gjestene dine.',
    color: 'text-rose-500'
  },
  {
    icon: Thermometer,
    title: 'Mindre stress',
    description:
      'Du slipper å bekymre deg for pledd, varmeovner og frosne gjester.',
    color: 'text-orange-500'
  },
  {
    icon: Sparkles,
    title: 'Perfekt stemning',
    description: 'Skaper en avslappet og lun atmosfære som varer lenger.',
    color: 'text-yellow-400'
  },
  {
    icon: Calendar,
    title: 'Forlenger sesongen',
    description: 'Arranger vellykkede grillfester fra tidlig vår til sen høst.',
    color: 'text-emerald-500'
  }
]

export const hostTipsData: HostTip[] = [
  {
    name: 'Planlegg for komfort',
    highlight: 'Ha Utekos klar til gjestene',
    icon: Thermometer,
    color: 'text-orange-400'
  },
  {
    name: 'God belysning',
    highlight: 'Lysslynger skaper magi',
    icon: Lightbulb,
    color: 'text-yellow-400'
  },
  {
    name: 'Enkel servering',
    highlight: 'Fingermat og selvbetjening',
    icon: UtensilsCrossed,
    color: 'text-cyan-400'
  },
  {
    name: 'Riktig musikk',
    highlight: 'En rolig spilleliste setter tonen',
    icon: Music,
    color: 'text-rose-400'
  }
]
