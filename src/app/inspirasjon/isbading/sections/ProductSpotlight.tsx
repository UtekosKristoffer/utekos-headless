'use client'

import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
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
    <section id='product-spotlight' className='overflow-hidden bg-maritime-darkest py-24 text-cloud-dancer'>
      <div className='container mx-auto px-4'>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          <AnimatedBlock className='relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-cloud-dancer/12 shadow-2xl lg:max-w-none'>
            <Image src={SherpaCoreImg} alt='Utekos Comfyrobe detaljer' fill className='object-cover' />
            <div className='absolute top-4 right-4 bg-mountain-view text-cloud-dancer font-bold px-4 py-2 rounded-full text-sm'>
              Følgesvenn
            </div>
          </AnimatedBlock>
          <div className='space-y-8'>
            <AnimatedBlock delay='0.2s'>
              <h2 className='mb-4 text-4xl font-bold leading-[0.95] tracking-normal md:text-5xl'>
                Comfyrobe™
              </h2>
              <p className='text-xl leading-[1.45] tracking-normal text-overcast'>
                Ikke bare en kåpe, men ditt viktigste sikkerhetsutstyr etter kuldesjokket.
              </p>
            </AnimatedBlock>

            <ul className='space-y-4'>
              {features.map((feature, i) => (
                <AnimatedBlock key={i} delay={`${0.3 + i * 0.1}s`} className='flex items-center gap-3'>
                  <div className='flex size-6 flex-shrink-0 items-center justify-center rounded-full border border-cloud-dancer/16 bg-mountain-view'>
                    <Check className='size-4 text-cloud-dancer' />
                  </div>
                  <span className='text-lg leading-[1.45] tracking-normal'>{feature}</span>
                </AnimatedBlock>
              ))}
            </ul>

            <AnimatedBlock delay='0.8s' className='flex flex-col gap-4 pt-4 sm:flex-row'>
              <BrandBadge
                asChild
                backgroundColor='var(--primary)'
                textColor='var(--maritime-darkest)'
                data-track='comfyrobe-icebath-campaign-buy-now'
                className='min-h-14 w-full px-8 py-4 text-lg leading-[1.35] font-bold tracking-normal shadow-xl transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105 sm:w-auto'
              >
                <Link
                  href='/kampanje/comfyrobe'
                  prefetch={false}
                  data-track='comfyrobe-icebath-campaign-buy-now'
                >
                  Kjøp nå
                  <ArrowRight className='ml-2 size-5' />
                </Link>
              </BrandBadge>
            </AnimatedBlock>
          </div>
        </div>
      </div>
    </section>
  )
}
