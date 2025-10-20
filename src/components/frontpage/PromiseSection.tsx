// Path: src/components/frontpage/PromiseSection.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { GridCross } from '@/components/legal/GridCross'
import { ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { ThermometerIcon } from 'lucide-react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import KvamskogenPic from '@public/kvamskogen_1.webp'
import Mormor from '@public/mormor3.webp'

const images = [
  {
    src: KvamskogenPic,
    alt: 'Bilde av en gjeng som bruker Utekos-plagg i snørike omgivelser på Kvamskogen.'
  },
  {
    src: Mormor,
    alt: 'En fornøyd dame som bruker Utekos-produktet i hagen.'
  }
]

export function PromiseSection() {
  const plugin = React.useRef(Autoplay({ delay: 3000 }))

  return (
    <section className='mx-auto max-w-[95%] py-16 sm:py-24 md:max-w-7xl'>
      <div className='mx-auto'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16'>
          {/* Venstre kolonne: Karusell */}
          <div className='flex items-center justify-center rounded-xl border border-neutral-800 p-2'>
            <Carousel
              plugins={[plugin.current]}
              className='w-full'
              opts={{
                loop: true
              }}
            >
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className='overflow-hidden rounded-lg'>
                      <AspectRatio ratio={1 / 1} className='relative'>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className='object-cover'
                          sizes='(min-width: 1024px) 50vw, 100vw'
                          priority={index === 0}
                        />
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Høyre kolonne: Tekst */}
          <div className='relative overflow-hidden rounded-xl border border-neutral-800 bg-sidebar-foreground p-8 lg:p-12'>
            <div
              className='absolute inset-0 z-0 opacity-20'
              style={{
                backgroundImage: `
              repeating-linear-gradient(to right, var(--color-border), var(--color-border) 1px, transparent 1px, transparent 40px),
              repeating-linear-gradient(to bottom, var(--color-border), var(--color-border) 1px, transparent 1px, transparent 40px)
            `,
                maskImage:
                  'linear-gradient(to bottom, white 50%, transparent 100%)'
              }}
            />

            <div className='relative z-10 flex h-full flex-col justify-center'>
              <GridCross className='absolute right-0 top-0 h-8 w-8 -translate-y-1/2 translate-x-1/2' />

              <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
                Vårt løfte
              </h2>

              <div className='mt-6 space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400'>
                    <ThermometerIcon className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='font-semibold md:text-[20px]'>
                      Umiddelbar varme
                    </h3>
                    <p className='mt-1 text-access/70'>
                      Nøye utvalgte materialer gir en umiddelbar følelse av
                      varme og velvære.
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pink-500/10 text-pink-400'>
                    <ClockIcon className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='font-semibold md:text-[20px]'>
                      Forlengede øyeblikk
                    </h3>
                    <p className='mt-1 text-access/70'>
                      Designet slik at du kan nyte de gode stundene lenger, uten
                      å tenke på kulden.
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-400'>
                    <ShieldCheckIcon className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='font-semibold md:text-[20px]'>
                      En varig investering
                    </h3>
                    <p className='mt-1 text-access/70'>
                      Se på det som en slitesterk og varig investering i din
                      egen hygge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
