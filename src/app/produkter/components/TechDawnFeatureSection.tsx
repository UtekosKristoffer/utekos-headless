'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight, Cloud, Shield, Shapes } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import AutoHeight from 'embla-carousel-auto-height'

import TechDawnImageFront from '@public/fiberdun/rett.png'
import TechDawnImagePatch from '@public/fiberdun/patch.jpg'
import { AnimatedBlock } from '@/components/AnimatedBlock'

const features = [
  {
    icon: Shield,
    text: 'Eksklusivt Luméa™-ytterstoff som er mykt, slitesterkt og vannavvisende.'
  },
  {
    icon: Cloud,
    text: 'Innovativ CloudWeave™-isolasjon som gir lettheten fra dun og ytelsen til tekniske fibre.'
  },
  {
    icon: Shapes,
    text: 'Oppgradert design med forbedret passform og moderne detaljer for maksimal komfort og stil.'
  }
]
const images = [
  { src: TechDawnImageFront, alt: 'Utekos TechDawn komfortplagg sett forfra.' },
  {
    src: TechDawnImagePatch,
    alt: 'Nærbilde av det slitesterke Luméa-stoffet på Utekos TechDawn.'
  }
]

export const TechDawnFeatureSection = () => {
  const autoHeight = React.useRef(AutoHeight())

  return (
    <section className='relative my-24 overflow-hidden rounded-xl border border-neutral-800 bg-sidebar-foreground py-16 md:my-32'>
      <div
        className='absolute -inset-x-2 -inset-y-8 opacity-15 blur-2xl'
        style={{
          background:
            'radial-gradient(circle at 50% 50%, #0ea5e9 0%, transparent 40%)'
        }}
      />
      <div className='container mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
        <AnimatedBlock
          className='will-animate-fade-in-left w-full'
          threshold={0.3}
        >
          <Carousel
            plugins={[autoHeight.current]}
            className='w-full max-w-md mx-auto'
            opts={{
              loop: true
            }}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className='flex items-center justify-center'
                >
                  <Card className='border-none bg-transparent'>
                    <CardContent className='p-0'>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        className='rounded-lg object-contain w-full h-auto'
                        placeholder='blur'
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='left-2' />
            <CarouselNext className='right-2' />
          </Carousel>
        </AnimatedBlock>

        {/* ENDRINGEN ER HER: lagt til 'px-4' for horisontal padding */}
        <AnimatedBlock
          className='will-animate-fade-in-right flex flex-col items-start px-4'
          delay='0.2s'
          threshold={0.3}
        >
          <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-sky-800/30 bg-sky-900/20 px-4 py-1.5'>
            <span className='relative flex h-2.5 w-2.5'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75'></span>
              <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-500'></span>
            </span>
            <span className='text-sm font-semibold text-sky-400'>
              Ny lansering
            </span>
          </div>

          <h2 className='mb-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl'>
            Møt Utekos TechDawn™
          </h2>

          <p className='mb-8 max-w-prose text-lg leading-relaxed text-muted-foreground'>
            Vi har ikke bare kombinert det beste fra dunens letthet og
            mikrofiberens slitestyrke – vi har utviklet en helt ny kategori av
            personlig komfort. Utekos TechDawn™ er vår mest tekniske og
            allsidige modell noensinne, skapt for å forlenge de gode stundene
            ute.
          </p>

          <ul className='mb-8 space-y-4'>
            {features.map((feature, index) => (
              <li key={index} className='flex items-start gap-3'>
                <feature.icon className='h-5 w-5 mt-1 flex-shrink-0 text-sky-400' />
                <span className='text-muted-foreground'>{feature.text}</span>
              </li>
            ))}
          </ul>

          <Button asChild size='lg' className='group'>
            <Link href='/produkter/utekos-techdawn'>
              Utforsk TechDawn™
              <ArrowRight className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
            </Link>
          </Button>
        </AnimatedBlock>
      </div>
    </section>
  )
}
