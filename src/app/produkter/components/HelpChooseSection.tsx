import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { AnimatedBlock } from '@/components/AnimatedBlock'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { choices } from './choices'

const getGlowColor = (linkColor: string) => {
  const colorMap: Record<string, string> = {
    'text-blue-400': '#60a5fa',
    'text-cyan-400': '#22d3ee',
    'text-sky-400': '#38bdf8',
    'text-green-400': '#4ade80',
    'text-purple-400': '#c084fc',
    'text-pink-400': '#f472b6',
    'text-orange-400': '#fb923c'
  }
  return colorMap[linkColor] || '#60a5fa'
}

export function HelpChooseSection() {
  return (
    <section className='relative mb-24 w-full'>
      {/* Minimal ambient background */}
      <div className='absolute inset-0 -z-10 overflow-hidden opacity-40'>
        <div
          className='absolute left-1/4 top-0 h-[400px] w-[400px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute right-1/4 bottom-0 h-[400px] w-[400px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
          }}
        />
      </div>

      <Carousel
        opts={{
          align: 'start',
          loop: true
        }}
        className='relative w-full'
      >
        <CarouselContent className='-ml-6'>
          {choices.map((choice, index) => {
            const glowColor = getGlowColor(choice.linkColor)

            return (
              <CarouselItem
                key={choice.title}
                className='pl-6 md:basis-1/2 lg:basis-1/4'
              >
                <AnimatedBlock
                  className='will-animate-fade-in-up h-full'
                  delay={`${index * 0.1}s`}
                  threshold={0.5}
                >
                  <Link href={choice.href} className='group block h-full'>
                    <div className='relative flex h-full flex-col overflow-hidden rounded-lg border border-neutral-800 bg-sidebar-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700'>
                      {/* Subtle aurora effect on hover */}
                      <div
                        className='pointer-events-none absolute -inset-x-2 -top-20 h-40 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20'
                        style={{
                          background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${glowColor} 100%)`
                        }}
                      />

                      <div className='relative w-full overflow-hidden rounded-t-lg aspect-[2/3]'>
                        <Image
                          src={choice.imageUrl}
                          alt={choice.title}
                          fill
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          className='rounded-t-lg object-cover transition-transform duration-500 group-hover:scale-105'
                        />
                      </div>

                      <div className='relative flex flex-grow flex-col p-6'>
                        <h3 className='mb-3 text-xl font-semibold text-foreground'>
                          {choice.title}
                        </h3>
                        <p className='flex-grow text-sm leading-relaxed text-muted-foreground'>
                          {choice.description}
                        </p>

                        <div
                          className={`mt-4 flex items-center gap-2 text-sm font-semibold ${choice.linkColor} transition-all duration-300 group-hover:gap-3`}
                        >
                          <span>Se produkt</span>
                          <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                        </div>
                      </div>

                      {/* Subtle bottom accent line */}
                      <div
                        className='absolute bottom-0 left-0 right-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                        style={{ background: glowColor }}
                      />
                    </div>
                  </Link>
                </AnimatedBlock>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <div className='hidden lg:block'>
          <CarouselPrevious className='absolute top-1/2 -translate-y-1/2 left-2 lg:left-[-1.5rem]' />
          <CarouselNext className='absolute top-1/2 -translate-y-1/2 right-2 lg:right-[-1.5rem]' />
        </div>
      </Carousel>
    </section>
  )
}
