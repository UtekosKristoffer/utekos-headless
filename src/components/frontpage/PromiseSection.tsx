// Path: src/components/frontpage/PromiseSection.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import TechDownKateKikkert from '@public/webp/techdown-kate-kikkert-1080.webp'
import ClassicGeminiWoman from '@public/webp/kaffe-med-tilpasset-utekos-mikrofiber-vinter-terrasse-.webp'
import TechDownMonica from '@public/webp/techdown-monica-1080.webp'
import TechDownKristoffer from '@public/webp/techdown-kristoffer-1080.webp'

const images = [
  {
    src: 'https://cdn.shopify.com/s/files/1/0634/2154/6744/files/JS-2400x2400.png?v=1781207729',
    alt: 'JUSTER, FORM OG NYT.'
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
        <div className='grid grid-cols-1 gap-12'>
          {/* Karusell: Vises kun på mobil (skjules fra md og oppover) */}
          <div className='flex md:hidden items-center justify-center rounded-xl border border-neutral-800 p-2'>
            <Carousel
              plugins={[plugin.current]}
              className='w-full'
              slideCount={images.length}
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
                          width={1080}
                          height={1080}
                          quality={95}
                          className='object-cover'
                          sizes='100vw'
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className='hidden md:block relative overflow-hidden rounded-xl border border-cloud-dancer'>
            <div className='overflow-hidden rounded-lg aspect-video'>
              <div className='relative w-full'>
                <Image
                  src='https://cdn.shopify.com/s/files/1/0634/2154/6744/files/JS-1980x1080.png?v=1781208615'
                  alt='JUSTER, FORM OG NYT.'
                  width={1980}
                  height={1080}
                  quality={100}
                  className='h-auto w-full object-cover'
                  sizes='100vw, 1980px'
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
