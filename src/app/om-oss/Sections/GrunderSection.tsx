'use client'

import Image from 'next/image'
import UtekosFounder from '@public/blue_bag1.webp'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export function GrunderSection() {
  return (
    <section className='relative py-24 sm:py-32 overflow-hidden'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 opacity-30'>
        <div
          className='absolute right-1/3 top-1/4 h-[500px] w-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start'>
          {/* Founder Image - Smaller, more intimate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.5 }}
            className='lg:col-span-4 flex flex-col items-center lg:items-start'
          >
            <div className='relative group'>
              {/* Glow effect behind image */}
              <div
                className='absolute -inset-2 opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-30'
                style={{
                  background:
                    'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)'
                }}
              />

              <div className='relative w-64 h-80 rounded-2xl overflow-hidden border-2 border-neutral-800 shadow-2xl'>
                <Image
                  src={UtekosFounder}
                  alt='Portrett av gründeren av Utekos'
                  fill
                  className='object-cover object-top transition-transform duration-500 group-hover:scale-105'
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className='mt-6 text-center lg:text-left'
            >
              <p className='text-lg font-semibold text-foreground'>
                Erling Holthe
              </p>
              <p className='text-sm text-muted-foreground mt-1'>Utekos™</p>
            </motion.div>
          </motion.div>

          {/* Content - Takes up more space */}
          <div className='lg:col-span-8 flex flex-col justify-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className='mb-4 inline-flex items-center gap-2 rounded-full border border-sky-800/30 bg-sky-900/10 px-4 py-2 w-fit'
            >
              <span className='text-sm font-medium text-sky-800'>
                Vår historie
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-8'
            >
              Fra idé til virkelighet
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className='space-y-6'
            >
              <p className='text-lg leading-relaxed text-muted-foreground'>
                Utekos ble født ut av et enkelt, gjenkjennelig problem: de
                utallige gangene en perfekt kveld på terrassen, i båten eller
                utenfor bobilen ble kuttet kort av kulden. Jeg var lei av stive
                pledd og upraktiske lag med klær.
              </p>

              <p className='text-lg leading-relaxed text-muted-foreground'>
                Tanken var å skape ett enkelt, kompromissløst plagg. Et verktøy
                for komfort som var så behagelig at du glemte du hadde det på,
                men så funksjonelt at det lot deg eie øyeblikket, uansett
                temperatur.
              </p>

              <p className='text-lg leading-relaxed text-muted-foreground'>
                Etter måneder med design, testing og perfeksjonering av
                materialer her i Norge, ble Utekos en realitet.
              </p>
            </motion.div>

            {/* Quote callout */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className='relative mt-8 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 overflow-hidden'
            >
              {/* Aurora effect */}
              <div
                className='absolute -inset-x-2 -inset-y-8 opacity-15 blur-2xl'
                style={{
                  background:
                    'radial-gradient(120% 120% at 50% 0%, transparent 30%, #0ea5e9 100%)'
                }}
              />

              <div className='relative flex gap-4'>
                <Quote className='h-8 w-8 text-sky-800 flex-shrink-0' />
                <p className='text-xl font-semibold text-foreground leading-relaxed'>
                  En hyllest til de små, verdifulle øyeblikkene i en travel
                  hverdag.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
