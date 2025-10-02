// Path: src/components/frontpage/NewProductLaunchSection.tsx
'use client'

import { motion, type Variants } from 'framer-motion'
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
import type { Route } from 'next'
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
      'Holder deg garantert varm, selv i fuktig og uforutsigbart vær.'
  },
  {
    icon: Feather,
    title: 'Dunfølelse uten dun',
    description: 'Luksuriøs, lett og luftig komfort uten animalske materialer.'
  },
  {
    icon: ShieldCheck,
    title: 'Skapt for å brukes',
    description: 'Et robust og lettstelt plagg for ekte, hverdagslig utekos.'
  }
]

const productName = 'Utekos Fiberdun'
const productUrl = '/produkter/utekos-fiberdun' as Route

export function NewProductLaunchSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeInOut' }
    }
  }

  return (
    <section className='relative overflow-hidden border border-neutral-800 rounded-lg md:max-w-7xl max-w-[95%] mx-auto mt-16 py-16'>
      <div
        aria-hidden='true'
        className='absolute -left-1/2 -top-1/2 z-[-1] h-[200%] w-[200%] opacity-50 bg-[radial-gradient(circle_farthest-side,rgba(15,43,64,0.2)_0%,rgba(0,0,0,0)_100%)]'
      />

      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className='container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-5'
      >
        <motion.div
          variants={itemVariants}
          className='w-full md:col-span-1 lg:col-span-2'
        >
          <Carousel
            opts={{
              loop: true
            }}
            className='overflow-hidden rounded-2xl'
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <AspectRatio ratio={2 / 3}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className='object-cover mx-auto'
                      sizes='(max-width: 768px) 100vw, 50vw'
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='left-4 hidden sm:inline-flex' />
            <CarouselNext className='right-4 hidden sm:inline-flex' />
          </Carousel>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className='flex flex-col items-start md:col-span-1 lg:col-span-3'
        >
          <motion.p
            variants={itemVariants}
            className='mb-2 font-semibold text-secondary'
          >
            Nyhet
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className='text-fluid-headline mb-4 font-bold leading-tight'
          >
            Varmen du kan stole på
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className='mb-8 max-w-prose text-lg text-foreground/80'
          >
            Vi introduserer {productName} – et robust og bekymringsfritt plagg
            skapt for deg som nekter å la kjølige kvelder eller en regnskur
            avbryte kvalitetstiden utendørs.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className='mb-8 space-y-4 border-t border-border pt-6'
          >
            {features.map(feature => (
              <div key={feature.title} className='flex items-start gap-4'>
                <feature.icon className='mt-1 size-6 shrink-0 text-sky-800' />
                <div>
                  <h4 className='font-semibold'>{feature.title}</h4>
                  <p className='text-sm text-foreground/70'>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className='w-full'>
            <p className='mb-4 text-2xl font-bold'>1690,-</p>
            <Button asChild size='lg' className='w-full sm:w-auto'>
              <Link href={productUrl}>
                Oppdag {productName}
                <ArrowRight className='ml-2 size-5' />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
