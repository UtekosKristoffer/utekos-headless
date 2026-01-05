'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils/className'

const images = [
  {
    src: '/1080/techdown.png',
    alt: 'Utekos TechDown fullfigur, sett forfra'
  },
  {
    src: '/1080/utekos-techdown.png',
    alt: 'Utekos TechDown fullfigur, sett bakfra'
  },
  {
    src: '/1080/tech-halv-1080.png',
    alt: 'Nærbilde av det slitesterke og vannavvisende stoffet på jakken'
  }
]
export function ImageColumn() {
  const columnRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    const currentRef = columnRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <div
      ref={columnRef}
      className={cn(
        'will-animate-fade-in-left relative w-full',
        isInView && 'is-in-view'
      )}
      style={{ '--transition-delay': '0s' } as React.CSSProperties}
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
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    quality={95}
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
    </div>
  )
}
