'use client'

import { memo } from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import specialEditionImage from '@public/special_turkis_doll_widthout.webp'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '../components/ui/button'

const totalStock = 11
const remainingStock = 11

const benefits = [
  {
    label: '-53% rabatt',
    description: '– Nå kun 750,- (før 1490,-)',
    glowColor: '#f59e0b'
  },
  {
    label: 'Praktisk Utekos-bag',
    description: 'inkludert',
    glowColor: '#06b6d4'
  },
  {
    label: 'Kun tilgjengelig i størrelse L',
    description: '',
    glowColor: '#8b5cf6'
  }
]

interface Benefit {
  label: string
  description: string
  glowColor: string
}

interface BenefitCardProps {
  benefit: Benefit
  delay: number
}

function BenefitCard({ benefit, delay }: BenefitCardProps) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, amount: 0.5 }}
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
      className='group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-300'
    >
      {/* Aurora gradient effect */}
      <div
        className='absolute -inset-x-2 -inset-y-8 opacity-15 blur-2xl transition-opacity duration-300 group-hover:opacity-25'
        style={{
          background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${benefit.glowColor} 100%)`
        }}
      />

      <div className='relative z-10 flex items-center gap-3'>
        <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-neutral-700 bg-neutral-900 transition-all duration-300 group-hover:scale-110 group-hover:border-sky-500/50'>
          <Check className='h-5 w-5 text-sky-400' />
        </div>
        <div className='flex-1 text-sm'>
          <span className='font-semibold text-white'>{benefit.label}</span>
          {benefit.description && (
            <span className='text-neutral-300'> {benefit.description}</span>
          )}
        </div>
      </div>

      {/* Subtle border glow on hover */}
      <div className='absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <div
          className='absolute inset-0 rounded-lg blur-sm opacity-20'
          style={{ background: benefit.glowColor }}
        />
      </div>
    </motion.li>
  )
}

export const SpecialOfferSection = memo(function SpecialOfferSection() {
  const stockPercentage = (remainingStock / totalStock) * 100

  return (
    <section className='mx-auto max-w-[95%] py-20 sm:py-24 md:max-w-7xl'>
      <div className='container mx-auto'>
        <div className='relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 md:p-12'>
          {/* Ambient background glow */}
          <div className='absolute inset-0 -z-10 overflow-hidden'>
            <div
              className='absolute left-1/4 top-1/4 h-[600px] w-[600px] opacity-20 blur-3xl'
              style={{
                background:
                  'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
              }}
            />
            <div
              className='absolute right-1/4 bottom-1/4 h-[600px] w-[600px] opacity-15 blur-3xl'
              style={{
                background:
                  'radial-gradient(circle, #8b5cf6 0%, transparent 70%)'
              }}
            />
          </div>

          <div className='grid grid-cols-1 relative items-center gap-12 lg:grid-cols-2'>
            {/* Image Column - 50% */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className='relative flex h-auto items-center justify-center'
            >
              <Carousel className='w-full overflow-hidden rounded-2xl'>
                <CarouselContent>
                  <CarouselItem>
                    <div className='w-full'>
                      <AspectRatio
                        ratio={2 / 3}
                        className='rounded-md bg-transparent'
                      >
                        <Image
                          src={specialEditionImage}
                          alt='Utekos Special Edition'
                          fill
                          className='rounded-md object-contain p-4 transition-transform duration-500 hover:scale-105'
                          sizes='(max-width: 1024px) 80vw, 40vw'
                          priority
                        />
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className='p-1'>
                      <AspectRatio ratio={2 / 3} className='rounded-md'>
                        <Image
                          src='/special_bag.webp'
                          alt='Inkludert Utekos-bag'
                          fill
                          className='rounded-md object-contain p-4 transition-transform duration-500 hover:scale-105'
                          sizes='(max-width: 1024px) 80vw, 40vw'
                        />
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className='left-4 hidden sm:inline-flex' />
                <CarouselNext className='right-4 hidden sm:inline-flex' />
              </Carousel>
            </motion.div>

            {/* Content Column - 50% */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.5 }}
            >
              {/* Limited Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className='mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-900/20 px-4 py-2'
              >
                <Sparkles className='h-4 w-4 text-sky-400' />
                <span className='text-sm font-semibold text-sky-400'>
                  Begrenset Tilbud
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className='text-balance text-3xl font-bold tracking-tight sm:text-4xl'
              >
                En sjelden mulighet
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className='mt-4 text-lg leading-relaxed text-neutral-400'
              >
                Vår utgående Special Edition kommer aldri tilbake. Sikre deg en
                av de aller siste til en eksepsjonell pris.
              </motion.p>

              {/* Stock indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className='mt-8'
              >
                <div className='flex items-center justify-between mb-2'>
                  <p className='flex items-center gap-2 text-sm font-medium text-neutral-300'>
                    <span className='relative flex h-2 w-2'>
                      <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75'></span>
                      <span className='relative inline-flex h-2 w-2 rounded-full bg-sky-500'></span>
                    </span>
                    Kun {remainingStock} igjen på lager!
                  </p>
                  <span className='text-xs text-neutral-500'>
                    {stockPercentage}%
                  </span>
                </div>
                <div className='h-2 w-full overflow-hidden rounded-full bg-neutral-800 border border-neutral-700'>
                  <motion.div
                    className='h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400'
                    initial={{ width: '100%' }}
                    whileInView={{ width: `${stockPercentage}%` }}
                    transition={{ duration: 1.5, delay: 0.7, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>

              {/* Benefits list */}
              <ul className='mt-8 space-y-3'>
                {benefits.map((benefit, idx) => (
                  <BenefitCard
                    key={benefit.label}
                    benefit={benefit}
                    delay={0.7 + idx * 0.1}
                  />
                ))}
              </ul>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <Link
                  href='/produkter/utekos-special-edition'
                  className={buttonVariants({
                    size: 'lg',
                    className:
                      'group mt-8 w-full sm:w-auto bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-all duration-300'
                  })}
                >
                  Sikre deg din før det er for sent
                  <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
})
