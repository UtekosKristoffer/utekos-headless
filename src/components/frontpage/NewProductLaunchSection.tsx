'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { ArrowRight, CloudRain, Feather, ShieldCheck } from 'lucide-react'
import { AspectRatio } from '@/components/ui/aspect-ratio'

const images = [
  {
    src: '/full-diagonal.webp',
    alt: 'Utekos Fiberdun fullfigur, sett forfra'
  },
  {
    src: '/back.webp',
    alt: 'Utekos Fiberdun fullfigur, sett bakfra'
  },
  {
    src: '/half-diagonal.webp',
    alt: 'Nærbilde av det slitesterke og vannavvisende stoffet på jakken'
  }
]

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

interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  glowColor: string
}

interface FeatureCardProps {
  feature: Feature
  delay: number
}

function FeatureCard({ feature, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.5 }}
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
      className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-sidebar-foreground p-4 transition-all duration-300'
    >
      {/* Aurora gradient effect */}
      <div
        className='absolute -inset-x-2 -inset-y-8 opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-30'
        style={{
          background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${feature.glowColor} 100%)`
        }}
      />

      <div className='relative z-10 flex items-start gap-4'>
        <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-neutral-700 bg-background transition-all duration-300 group-hover:scale-110 group-hover:border-neutral-600'>
          <feature.icon className='h-6 w-6 text-sky-800' />
        </div>
        <div className='flex-1'>
          <h4 className='mb-1 font-semibold text-foreground'>
            {feature.title}
          </h4>
          <p className='text-sm leading-relaxed text-muted-foreground'>
            {feature.description}
          </p>
        </div>
      </div>

      {/* Subtle border glow on hover */}
      <div className='absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <div
          className='absolute inset-0 rounded-lg blur-sm opacity-20'
          style={{ background: feature.glowColor }}
        />
      </div>
    </motion.div>
  )
}

export const NewProductLaunchSection = memo(function NewProductLaunchSection() {
  return (
    <section className='relative mx-auto mt-16 max-w-[95%] overflow-hidden rounded-xl border border-neutral-800 py-16 md:max-w-7xl'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div
          className='absolute left-1/4 top-1/4 h-[600px] w-[600px] opacity-15 blur-3xl'
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute right-1/4 bottom-1/4 h-[600px] w-[600px] opacity-15 blur-3xl'
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2'>
        {/* Image Column - 50% */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className='relative w-full'
        >
          <div className='relative overflow-hidden rounded-2xl'>
            <Carousel
              opts={{
                loop: true
              }}
            >
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <AspectRatio ratio={2 / 3}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className='object-cover transition-transform duration-500 hover:scale-105'
                        sizes='(max-width: 768px) 100vw, 50vw'
                        priority={index === 0}
                      />
                    </AspectRatio>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='left-4 hidden sm:inline-flex' />
              <CarouselNext className='right-4 hidden sm:inline-flex' />
            </Carousel>
          </div>
        </motion.div>

        {/* Content Column - 50% */}
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
