// Path: src/app/inspirasjon/terrassen/TerraceClientComponents.tsx

'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Building2,
  Coffee,
  Home,
  Moon,
  Sofa,
  Sparkles,
  Thermometer,
  Users
} from 'lucide-react'
import Link from 'next/link'

// Hero Section (uten brødsmulesti)
export function TerraceHeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='max-w-3xl'
    >
      <h1 className='text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'>
        Din terrasse, <span className='text-primary'>hele året</span>
      </h1>

      <p className='mt-6 text-xl text-muted-foreground max-w-2xl'>
        Gjør uteplassen til husets beste rom. Fra den første kaffen i vårsola
        til de sene sommerkveldene – nyt øyeblikkene lenger.
      </p>

      <div className='mt-8 flex flex-wrap gap-4'>
        <Button asChild size='lg'>
          <Link href='/produkter'>
            Oppdag din Utekos
            <ArrowRightIcon className='ml-2 h-4 w-4' />
          </Link>
        </Button>
        <Button variant='outline' size='lg' asChild>
          <Link href='#bruksomrader'>Se bruksområdene</Link>
        </Button>
      </div>

      <div className='mt-12 flex flex-wrap gap-8'>
        <div>
          <p className='text-3xl font-bold text-emerald-400'>2x</p>
          <p className='text-sm text-muted-foreground'>
            mer bruk av uteplassen
          </p>
        </div>
        <div>
          <p className='text-3xl font-bold text-amber-400'>+100</p>
          <p className='text-sm text-muted-foreground'>
            dager med utekos i året
          </p>
        </div>
        <div>
          <p className='text-3xl font-bold text-rose-400'>5★</p>
          <p className='text-sm text-muted-foreground'>fra huseiere</p>
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

// Terrace Ideas Grid
interface TerraceIdea {
  name: string
  highlight: string
  icon: any
  color: string
}

export function TerraceIdeasGrid({ ideas }: { ideas: TerraceIdea[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {ideas.map((idea, index) => (
        <motion.div
          key={idea.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className='border-neutral-800 bg-sidebar-foreground hover:bg-sidebar-foreground/80 transition-colors group'>
            <CardContent className='p-6'>
              <div className='flex items-start justify-between mb-3'>
                <h3 className='font-semibold text-lg'>{idea.name}</h3>
                <idea.icon
                  className={`h-5 w-5 ${idea.color} transition-colors group-hover:text-primary`}
                />
              </div>
              <p className='text-sm text-foreground/80'>{idea.highlight}</p>
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
        Klar for å oppgradere uteplassen?
      </h2>
      <p className='text-xl text-muted-foreground max-w-2xl mx-auto mb-8'>
        Invester i komforten som gjør at du kan nyte ditt eget hjem enda mer,
        uansett årstid.
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
    icon: Coffee,
    time: 'Morgen',
    title: 'Den første vårkaffen',
    description:
      'Start dagen i frisk luft uten å fryse. Nyt roen før resten av verden våkner.',
    color: 'from-amber-500/20',
    iconColor: 'text-amber-400'
  },
  {
    icon: Moon,
    time: 'Kveld',
    title: 'Sene sommerkvelder',
    description:
      'Ikke la duggfallet jage deg inn. Forleng de gode samtalene under stjernene.',
    color: 'from-indigo-500/20',
    iconColor: 'text-indigo-400'
  },
  {
    icon: BookOpen,
    time: 'Ettermiddag',
    title: 'En rolig lesestund',
    description:
      'Finn roen med en god bok og en kopp te på en kjølig høstdag, pakket inn i varme.',
    color: 'from-emerald-500/20',
    iconColor: 'text-emerald-500'
  }
]

export const benefitsData: Benefit[] = [
  {
    icon: Thermometer,
    title: 'Øyeblikkelig komfort',
    description: 'Fra kjølig trekk til lun hygge på et øyeblikk.',
    color: 'text-orange-500'
  },
  {
    icon: Home,
    title: 'Utvider hjemmet ditt',
    description: 'Gjør uteplassen til en funksjonell del av huset, oftere.',
    color: 'text-emerald-500'
  },
  {
    icon: Sparkles,
    title: 'Enkel i bruk',
    description:
      'Lett å ta frem, lett å rydde vekk. Alltid klar for en kosestund.',
    color: 'text-yellow-400'
  },
  {
    icon: Users,
    title: 'Inviterer til samvær',
    description: 'Skap en innbydende atmosfære som gjestene dine vil elske.',
    color: 'text-rose-500'
  }
]

export const terraceIdeasData: TerraceIdea[] = [
  {
    name: 'Morgenkaffe-kroken',
    highlight: 'En lun start på dagen',
    icon: Coffee,
    color: 'text-amber-400'
  },
  {
    name: 'Lounge-området',
    highlight: 'For sosiale kvelder',
    icon: Sofa,
    color: 'text-rose-500'
  },
  {
    name: 'Balkong-oasen',
    highlight: 'Maksimal komfort, minimal plass',
    icon: Building2,
    color: 'text-cyan-400'
  },
  {
    name: 'Lesekroken',
    highlight: 'Fordyp deg i en annen verden',
    icon: BookOpen,
    color: 'text-emerald-500'
  }
]
