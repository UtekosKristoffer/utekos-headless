'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { ImageColumnSkeleton } from './ImageColumnSkeleton'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { ArrowRight, CloudRain, Feather, ShieldCheck } from 'lucide-react'
import { FeatureCardSkeleton } from '../../Skeletons/FeatureCardSkeleton'
import { AmbientBackgroundGlow } from './AmbientBackgroundGlow'
const FeatureCard = dynamic(
  () =>
    import('@/components/frontpage/components/FeatureCard').then(
      mod => mod.FeatureCard
    ),
  {
    loading: () => <FeatureCardSkeleton />,
    ssr: false
  }
)

const ImageColumn = dynamic(
  () => import('./ImageColumn').then(mod => mod.ImageColumn),
  {
    loading: () => <ImageColumnSkeleton />,
    ssr: false
  }
)

const features = [
  {
    icon: CloudRain,
    title: 'Allværsisolasjon',
    description:
      'Holder deg garantert varm, selv i fuktig og uforutsigbart vær.',
    glowColor: '#0ea5e9'
  },
  {
    icon: Feather,
    title: 'Dunfølelse uten dun',
    description: 'Luksuriøs, lett og luftig komfort uten animalske materialer.',
    glowColor: '#06b6d4'
  },
  {
    icon: ShieldCheck,
    title: 'Skapt for å brukes',
    description: 'Et robust og lettstelt plagg for ekte, hverdagslig utekos.',
    glowColor: '#0891b2'
  }
]

const productName = 'Utekos Fiberdun'
const productUrl = '/produkter/utekos-fiberdun'

export const NewProductLaunchSection = memo(function NewProductLaunchSection() {
  return (
    <section
      id='featured-product'
      className='relative mx-auto mt-16 max-w-[95%] overflow-hidden rounded-xl border border-neutral-800 py-16 md:max-w-7xl'
    >
      <AmbientBackgroundGlow />

      <div className='container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2'>
        <ImageColumn />
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className='flex flex-col items-start'
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className='mb-3 inline-flex items-center gap-2 rounded-full border border-sky-800/30 bg-sky-900/10 px-4 py-1.5'
          >
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75'></span>
              <span className='relative inline-flex h-2 w-2 rounded-full bg-sky-500'></span>
            </span>
            <span className='text-sm font-semibold text-sky-800'>Nyhet</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className='mb-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl'
          >
            Varmen du kan stole på
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className='mb-8 max-w-prose text-lg leading-relaxed text-muted-foreground'
          >
            Vi introduserer {productName} – et robust og bekymringsfritt plagg
            skapt for deg som nekter å la kjølige kvelder eller en regnskur
            avbryte kvalitetstiden utendørs.
          </motion.p>

          <div className='mb-8 w-full space-y-3'>
            {features.map((feature, idx) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                delay={0.6 + idx * 0.1}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            viewport={{ once: true }}
            className='flex w-full flex-col gap-4 sm:flex-row sm:items-center'
          >
            <div className='flex items-baseline gap-2'>
              <p className='text-4xl font-bold text-foreground'>1690,-</p>
              <span className='text-sm text-muted-foreground'>inkl. mva</span>
            </div>
            <Button asChild size='lg' className='group w-full sm:w-auto'>
              <Link href={productUrl}>
                Oppdag {productName}
                <ArrowRight className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
})
