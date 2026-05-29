// Path: src/components/frontpage/PromiseSection.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { GridCross } from '@/components/legal/GridCross'
import { ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { ThermometerIcon } from 'lucide-react'
import ClassicGeminiCouple from '@public/webp/classic-couple-mobile-1080.webp'
import TechDownKateKikkert from '@public/webp/techdown-kate-kikkert-1080.webp'
import ClassicGeminiWoman from '@public/webp/kaffe-med-tilpasset-utekos-mikrofiber-vinter-terrasse-.webp'
import TechDownMonica from '@public/webp/techdown-monica-1080.webp'
import TechDownKristoffer from '@public/webp/techdown-kristoffer-1080.webp'

const images = [
  {
    src: ClassicGeminiCouple,
    alt: 'Bilde av ett par som bruker Utekos-plagg i på terrassen i snørike omgivelser.'
  },
  {
    src: TechDownKateKikkert,
    alt: 'En fornøyd kvinne som bruker Utekos-produktet på terrassen.'
  },
  {
    src: ClassicGeminiWoman,
    alt: 'En kvinne som bruker Utekos-produktet i snørike omgivelser.'
  },
  {
    src: TechDownMonica,
    alt: 'En fornøyd kvinne som bruker Utekos TechDown ved bålbannen.'
  },
  {
    src: TechDownKristoffer,
    alt: 'En fornøyd herre som bruker Utekos TechDown på terrassen.'
  }
]

export function PromiseSection() {
  const plugin = React.useRef(Autoplay({ delay: 3000 }))

  return (
    <section className='mx-auto max-w-[95%] my-32 md:max-w-7xl'>
      <div className='mx-auto'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16'>
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
                      <div className='relative aspect-square w-full'>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          quality={95}
                          className='object-cover'
                          sizes='(min-width: 1024px) 50vw, 100vw'
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className='relative overflow-hidden rounded-xl border border-cloud-dancer bg-havdyp p-8 lg:p-12'>
            <div
              className='absolute inset-0 z-0 opacity-20'
              style={{
                backgroundImage: `
              repeating-linear-gradient(to right, var(--color-border), var(--color-border) 1px, transparent 1px, transparent 40px),
              repeating-linear-gradient(to bottom, var(--color-border), var(--color-border) 1px, transparent 1px, transparent 40px)
            `,
                maskImage: 'linear-gradient(to bottom, white 50%, transparent 100%)'
              }}
            />

            <div className='relative z-10 flex h-full flex-col justify-center'>
              <GridCross className='absolute right-0 top-0 size-8 -translate-y-1/2 translate-x-1/2' />

              <h2 className='text-cloud-dancer'>Vårt løfte</h2>

              <div className='mt-6 space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400'>
                    <ThermometerIcon className='size-7' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-xl md:text-3xl'>Umiddelbar varme</h3>
                    <p className='mt-1 text-lg font-medium text-cloud-dancer/90'>
                      Nøye utvalgte materialer gir en umiddelbar følelse av varme og velvære.
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <div className='flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-bleached-mauve text-dry-rose'>
                    <ClockIcon className='size-7' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-xl md:text-3xl'>Forlengede øyeblikk</h3>
                    <p className='mt-1 text-lg font-medium text-cloud-dancer/90'>
                      Designet slik at du kan nyte de gode stundene lenger, uten å tenke på kulden.
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <div className='flex size-12  flex-shrink-0 items-center justify-center rounded-full bg-mountain-view text-fairest-jade'>
                    <ShieldCheckIcon className='size-7' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-xl md:text-3xl'>En varig investering</h3>
                    <p className='mt-1 text-lg font-medium text-cloud-dancer'>
                      Se på det som en slitesterk og varig investering i din egen hygge.
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
