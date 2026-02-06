'use client'

import { Button } from '@/components/ui/button'
import { Check, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import SherpaCoreImg from '@public/1080/comfy-design-1080.png'

const features = [
  'SherpaCore™ fôr som tørker deg umiddelbart',
  'Vindtett og vannavvisende ytterstoff',
  'Store lommer med fleecefôr til kalde hender',
  'Romslig passform for enkel skifting under',
  'Toveis glidelås for maksimal fleksibilitet'
]

export function ProductSpotlight() {
  return (
    <section
      id='product-spotlight'
      className='py-24 bg-neutral-900 text-white overflow-hidden'
    >
      <div className='container mx-auto px-4'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <AnimatedBlock className='relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden border border-white/10 shadow-2xl'>
            <Image
              src={SherpaCoreImg}
              alt='Utekos Comfyrobe detaljer'
              fill
              className='object-cover'
            />
            <div className='absolute top-4 right-4 bg-emerald-500 text-black font-bold px-4 py-2 rounded-full text-sm'>
              Bestselger
            </div>
          </AnimatedBlock>
          <div className='space-y-8'>
            <AnimatedBlock delay='0.2s'>
              <h2 className='text-4xl md:text-5xl font-bold tracking-tight mb-4'>
                Comfyrobe™
              </h2>
              <p className='text-xl text-neutral-400'>
                Ikke bare en kåpe, men ditt viktigste sikkerhetsutstyr etter
                kuldesjokket.
              </p>
            </AnimatedBlock>

            <ul className='space-y-4'>
              {features.map((feature, i) => (
                <AnimatedBlock
                  key={i}
                  delay={`${0.3 + i * 0.1}s`}
                  className='flex items-center gap-3'
                >
                  <div className='flex-shrink-0 size-6 rounded-full bg-cyan-900/50 flex items-center justify-center border border-cyan-500/30'>
                    <Check className='size-4 text-cyan-400' />
                  </div>
                  <span className='text-lg'>{feature}</span>
                </AnimatedBlock>
              ))}
            </ul>

            <AnimatedBlock
              delay='0.8s'
              className='pt-4 flex flex-col sm:flex-row gap-4'
            >
              <Button
                size='lg'
                className='bg-white text-black hover:bg-neutral-200 h-14 px-8 text-lg w-full sm:w-auto'
                asChild
              >
                <Link href='/kampanje/comfyrobe' prefetch={false}>
                  Kjøp nå
                  <ArrowRight className='ml-2 size-5' />
                </Link>
              </Button>
            </AnimatedBlock>
          </div>
        </div>
      </div>
    </section>
  )
}
