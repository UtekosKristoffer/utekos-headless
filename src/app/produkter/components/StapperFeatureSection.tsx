// Path: src/components/features/StapperFeatureSection.tsx
'use client'
import StapperImage from '@public/kompresjonsbag.webp'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Minimize2,
  Feather,
  ShieldCheck,
  Settings2,
  PackageCheck
} from 'lucide-react'

const features = [
  {
    icon: Minimize2,
    title: 'Maksimal plassbesparelse',
    description:
      'Reduserer volumet på klær og soveposer med over 50 %, og frigjør verdifull plass i bagasjen.',
    colorClasses: 'text-sky-400 border-sky-400/20 bg-sky-900/20'
  },
  {
    icon: Feather,
    title: 'Ultralett design',
    description:
      'Veier kun ca. 100 gram. Du reduserer volum uten å legge til merkbart med vekt i oppakningen.',
    colorClasses: 'text-slate-300 border-slate-300/20 bg-slate-700/20'
  },
  {
    icon: ShieldCheck,
    title: 'Slitesterkt materiale',
    description:
      'Laget for å tåle røff behandling på tur. Stram hardt og pakk tett, år etter år.',
    colorClasses: 'text-teal-400 border-teal-400/20 bg-teal-900/20'
  },
  {
    icon: Settings2,
    title: 'Enkel og jevn kompresjon',
    description:
      'Fire justerbare strammestropper lar deg enkelt komprimere innholdet jevnt og effektivt.',
    colorClasses: 'text-amber-400 border-amber-400/20 bg-amber-900/20'
  }
]

const fadeInStagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true, amount: 0.5 }
}

export function StapperFeatureSection() {
  return (
    <section className='relative overflow-hidden bg-sidebar-foreground rounded-lg border border-neutral-800 md:mb-24 py-20 sm:py-32'>
      {/* Bakgrunns-glød for å skape dybde */}
      <div
        aria-hidden='true'
        className='absolute inset-0 -z-10'
        style={{
          background:
            'radial-gradient(circle at 50% 30%, hsla(215, 40%, 20%, 0.3), transparent 70%)'
        }}
      />

      <motion.div
        initial='initial'
        whileInView='whileInView'
        viewport={{ once: true, amount: 0.1 }}
        transition={{ staggerChildren: 0.15 }}
        className='container mx-auto max-w-4xl px-4 text-center'
      >
        <motion.h2
          variants={fadeInStagger}
          className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl'
        >
          Mer plass. Mindre stress.
        </motion.h2>

        <motion.p
          variants={fadeInStagger}
          className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground'
        >
          Forvandle voluminøse jakker og soveposer til kompakte pakker. Utekos
          Stapper™ er den smarte løsningen for deg som verdsetter en effektiv
          og organisert bagasje på hytta, i bobilen eller i tursekken.
        </motion.p>

        <motion.div
          variants={{
            initial: { opacity: 0, scale: 0.9 },
            whileInView: { opacity: 1, scale: 1 }
          }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          className='relative mx-auto mt-12 h-96 w-64'
        >
          {/* Glød-effekt bak bildet */}
          <div className='absolute inset-0 rounded-full bg-primary/10 blur-3xl' />
          <Image
            src={StapperImage}
            alt='Utekos Stapper kompresjonsbag'
            fill
            className='object-contain'
            sizes='256px'
          />
        </motion.div>

        <div className='mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-10 text-left md:grid-cols-2 lg:gap-y-16'>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeInStagger}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='relative flex items-start gap-4'
            >
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border ${feature.colorClasses}`}
              >
                <feature.icon className='h-6 w-6' aria-hidden='true' />
              </div>
              <div>
                <h3 className='text-base font-semibold leading-7 text-foreground'>
                  {feature.title}
                </h3>
                <p className='mt-1 text-sm leading-6 text-muted-foreground'>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInStagger} className='mt-16'>
          <Button asChild size='lg' className='group'>
            <Link href='/produkter/utekos-stapper'>
              Oppdag Stapper™
              <PackageCheck className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12' />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
