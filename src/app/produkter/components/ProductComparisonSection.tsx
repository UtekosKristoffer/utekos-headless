// Path: src/app/produkter/components/ProductComparisonSection.tsx
'use client'

import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Droplets, Layers3, Sparkles, Weight } from 'lucide-react'
import type { Route } from 'next'
import { AspectRatio } from '@/components/ui/aspect-ratio'

const products = [
  {
    name: 'Utekos Fiberdun',
    handle: 'utekos-fiberdun',
    image: '/full-diagonal.webp',
    tagline: 'For bekymringsfri varme',
    features: [
      {
        icon: Droplets,
        text: 'Tåler fukt og ruskevær'
      },
      {
        icon: Sparkles,
        text: 'Lett og myk med dunfølelse'
      }
    ],
    perfectFor: 'Helårsbruk, båtliv og fuktig kystklima.'
  },
  {
    name: 'Utekos Dun',
    handle: 'utekos-dun',
    image: '/utekos-dun-image.webp', // Erstatt med faktisk bilde
    tagline: 'For maksimal varme og allsidighet',
    features: [
      {
        icon: Layers3,
        text: 'Unikt 3-i-1 design'
      },
      {
        icon: Weight,
        text: 'Overlegen varme til vekt'
      }
    ],
    perfectFor: 'Kalde, tørre dager, leirliv og når lav vekt er prioritet.'
  }
]

export function ProductComparisonSection() {
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
    <section className='mb-16 mt-8 sm:mb-24 sm:mt-12'>
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className='container mx-auto max-w-7xl px-4'
      >
        <motion.div variants={itemVariants} className='text-center'>
          <h2 className='text-3xl font-bold sm:text-4xl'>
            Hvilken Utekos er riktig for deg?
          </h2>
          <p className='mt-4 max-w-2xl mx-auto text-lg text-foreground/80'>
            Våre mest populære plagg har unike styrker. Her ser du hvilket som
            passer best til ditt bruk.
          </p>
        </motion.div>

        <div className='mt-12 grid grid-cols-1 gap-8 md:grid-cols-2'>
          {products.map(product => (
            <motion.div
              key={product.name}
              variants={itemVariants}
              className='flex flex-col rounded-lg border border-neutral-800 bg-sidebar-foreground p-6 text-center'
            >
              <h3 className='text-2xl font-bold'>{product.name}</h3>
              <p className='mt-1 text-primary'>{product.tagline}</p>

              <div className='my-6'>
                <AspectRatio ratio={3 / 4}>
                  <Image
                    src={product.image}
                    alt={`Produktbilde av ${product.name}`}
                    fill
                    className='rounded-md object-cover'
                    sizes='(max-width: 768px) 90vw, 40vw'
                  />
                </AspectRatio>
              </div>

              <div className='flex-grow space-y-3 text-left'>
                {product.features.map(feature => (
                  <div key={feature.text} className='flex items-center gap-3'>
                    <feature.icon className='size-5 shrink-0 text-sky-400' />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className='mt-6 text-left'>
                <p className='font-semibold'>Passer perfekt for:</p>
                <p className='text-foreground/80'>{product.perfectFor}</p>
              </div>

              <Button asChild className='mt-6 w-full'>
                <Link href={`/produkter/${product.handle}` as Route}>
                  Utforsk {product.name}
                  <ArrowRight className='ml-2 size-4' />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
