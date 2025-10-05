// Path: src/components/features/MicrofiberComparisonSection.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  CloudDrizzle,
  Feather,
  Sparkles,
  ThermometerSun,
  Mountain,
  WashingMachine,
  Award
} from 'lucide-react'

const microfiberAdvantages = [
  {
    icon: CloudDrizzle,
    title: 'Overlegen i fuktig Vær',
    description: 'Beholder isolasjonsevnen og varmen selv når den blir våt.',
    color: 'text-sky-800'
  },
  {
    icon: WashingMachine,
    title: 'Enkelt vedlikehold',
    description:
      'Tørker raskt og er enkel å vaske uten å bekymre seg for klumping.',
    color: 'text-slate-200'
  },
  {
    icon: Feather,
    title: 'Allergivennlig og vegansk',
    description: 'Et 100 % dunfritt alternativ som er trygt for alle.',
    color: 'text-teal-400'
  }
]

const downAdvantages = [
  {
    icon: ThermometerSun,
    title: 'Uslåelig varme-til-vekt',
    description: 'Gir maksimal varme med minimal vekt og pakkvolum.',
    color: 'text-orange-400'
  },
  {
    icon: Mountain,
    title: 'Ekstrem komprimerbarhet',
    description:
      'Kan pakkes ned til en utrolig liten størrelse i tørre forhold.',
    color: 'text-slate-300'
  },
  {
    icon: Award,
    title: 'Luksuriøs følelse',
    description: 'Den lette, luftige og naturlige følelsen av premium dun.',
    color: 'text-purple-300'
  }
]

const fadeIn = (delay: number, x: number = 0) => ({
  initial: { opacity: 0, x, y: 20 },
  whileInView: { opacity: 1, x: 0, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true, amount: 0.5 }
})

export function MicrofiberFeatureSection() {
  return (
    <section className='bg-sidebar-foreground mx-auto border border-neutral-800 rounded-lg md:mb-24 py-20 sm:py-32'>
      <div className='container mx-auto max-w-7xl px-4 text-center'>
        <motion.h2
          {...fadeIn(0)}
          className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl'
        >
          Mikrofiber eller Dun?
        </motion.h2>
        <motion.p
          {...fadeIn(0.1)}
          className='mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground'
        >
          Velg riktig varme for ditt eventyr. Mens dun er uslåelig på vekt, er
          Utekos Mikrofiber™ den robuste og bekymringsfrie partneren for det
          ustabile norske klimaet.
        </motion.p>

        <div className='mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-3 lg:gap-8'>
          {/* Mikrofiber Fordeler */}
          <div className='flex flex-col gap-8'>
            {microfiberAdvantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                {...fadeIn(0.3 + index * 0.1, -20)}
                className='flex items-start gap-4 text-left'
              >
                <advantage.icon
                  className={`h-8 w-8 flex-shrink-0 ${advantage.color}`}
                  aria-hidden='true'
                />
                <div>
                  <h3 className='font-semibold text-foreground'>
                    {advantage.title}
                  </h3>
                  <p className='mt-1 text-sm text-muted-foreground'>
                    {advantage.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bilde */}
          <motion.div {...fadeIn(0.2)} className='w-full'>
            <AspectRatio ratio={2 / 3}>
              <Image
                src='/black_back_without95.webp'
                alt='Utekos Mikrofiber klar for alle værforhold'
                fill
                className='rounded-2xl object-cover shadow-2xl'
                sizes='(max-width: 1024px) 80vw, 30vw'
              />
            </AspectRatio>
          </motion.div>

          {/* Dun Fordeler */}
          <div className='flex flex-col gap-8'>
            {downAdvantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                {...fadeIn(0.3 + index * 0.1, 20)}
                className='flex items-start gap-4 text-left lg:flex-row-reverse lg:text-right'
              >
                <advantage.icon
                  className={`h-8 w-8 flex-shrink-0 ${advantage.color}`}
                  aria-hidden='true'
                />
                <div>
                  <h3 className='font-semibold text-foreground'>
                    {advantage.title}
                  </h3>
                  <p className='mt-1 text-sm text-muted-foreground'>
                    {advantage.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          {...fadeIn(0.6)}
          className='mt-16 flex flex-col items-center gap-6'
        >
          <p className='text-4xl font-bold text-foreground'>1 290,00 kr</p>
          <Button asChild size='lg' className='group w-full sm:w-auto'>
            <Link href='/produkter/utekos-mikrofiber'>
              Velg bekymringsfri varme
              <Sparkles className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:scale-125' />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
