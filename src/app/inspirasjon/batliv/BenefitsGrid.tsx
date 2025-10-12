'use client'

import { Sparkles, Thermometer, Users, Wind } from 'lucide-react'
const benefitsData = [
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
    title: 'Kompakt og praktisk',
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

export function BenefitsGrid() {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='boat-benefits-header text-center mb-16'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            Skapt for livet på sjøen
          </h2>
          <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
            Vi vet at været kan snu fort. Derfor er Utekos designet for å gi deg
            øyeblikkelig og pålitelig varme.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {benefitsData.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className='boat-benefits-card text-center'
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sidebar-foreground border border-neutral-800'>
                  <Icon className={`h-8 w-8 ${benefit.color}`} />
                </div>
                <h3 className='text-lg font-semibold mb-2'>{benefit.title}</h3>
                <p className='text-sm text-muted-foreground'>
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
