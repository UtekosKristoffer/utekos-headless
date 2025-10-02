'use client'

import { cn } from '@/lib/utils/className'
import { motion } from 'framer-motion'
import { Anchor, Car, Home, type LucideIcon } from 'lucide-react'

// Datastruktur for de tre kortene
const moments = [
  {
    Icon: Home,
    title: 'På hytten',
    description:
      'Fra iskald ankomst til umiddelbar varme. Utekos er den perfekte hytteuniformen for de kjølige kveldene på terrassen og den ferske morgenkaffen ute.',
    gradientColor: 'from-blue-500'
  },
  {
    Icon: Car,
    title: 'I bobilen',
    description:
      'Lett å pakke, genial i bruk. Bytt ut store pledd og ekstra jakker med ett plagg som gjør hvert eneste stopp til en varm og komfortabel opplevelse.',
    gradientColor: 'from-pink-500'
  },
  {
    Icon: Anchor,
    title: 'I båten',
    description:
      'Nyt solnedgangen fra dekk uten å la den kalde sjøbrisen ødelegge øyeblikket. Den beskytter mot trekk og lar deg forlenge båtkvelden i ren komfort.',
    gradientColor: 'from-green-500'
  }
]

// Gjenbrukbar kort-komponent for hvert "øyeblikk"
function MomentCard({
  Icon,
  title,
  description,
  gradientColor,
  delay
}: {
  Icon: LucideIcon
  title: string
  description: string
  gradientColor: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true, amount: 0.5 }}
      className='relative h-full overflow-hidden rounded-xl border border-neutral-800 bg-sidebar-foreground p-8'
    >
      {/* Den animerte "nordlys"-effekten */}
      <div
        className={cn(
          'animate-aurora absolute -inset-x-2 -inset-y-16 opacity-30 blur-2xl',
          'bg-[radial-gradient(120%_120%_at_50%_0%,transparent_30%,_var(--tw-gradient-from)_100%)]',
          gradientColor
        )}
      />

      <div className='relative z-10 flex h-full flex-col'>
        <div className='flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-700 bg-background'>
          <Icon className='h-6 w-6 text-foreground' />
        </div>
        <h3 className='mt-6 text-xl font-semibold text-foreground'>{title}</h3>
        <p className='mt-2 text-muted-foreground'>{description}</p>
      </div>
    </motion.div>
  )
}

// Hovedkomponenten for hele seksjonen
export function MomentsSection() {
  return (
    <section className='py-16 mx-auto md:max-w-7xl max-w-[95%] sm:py-24'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Skapt for dine øyeblikk
          </h2>
          <p className='mx-auto mt-4 max-w-3xl text-lg text-muted-foreground'>
            Uansett hvor du finner roen, er Utekos designet for å gjøre
            øyeblikket bedre.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {moments.map((moment, i) => (
            <MomentCard key={moment.title} {...moment} delay={i * 0.2} />
          ))}
        </div>
      </div>
    </section>
  )
}
