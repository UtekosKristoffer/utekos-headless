'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
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
export function ImageColumn() {
  return (
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
                    fetchPriority='high'
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
  )
}
