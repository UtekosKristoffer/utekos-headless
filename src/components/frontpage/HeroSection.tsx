'use client'

import heroImage from '@public/frontpage-kate-linn.webp'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Award, ChevronDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section className='relative container mx-auto px-4 pt-12 pb-2 overflow-hidden'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div
          className='absolute left-1/3 top-0 h-[800px] w-[800px] opacity-10 blur-3xl'
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute right-1/3 top-1/4 h-[600px] w-[600px] opacity-10 blur-3xl'
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='mb-8 text-center'>
        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='mb-6 inline-flex items-center gap-2 rounded-full border border-sky-800/30 bg-sky-900/10 px-4 py-2'
        >
          <Award className='h-4 w-4 text-sky-800' />
          <span className='text-sm font-medium text-sky-800'>
            Optimalisert tiden ute siden 2020
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl mt-6'
        >
          <span className='block'>Utekos™</span>
          <span className='block mt-2 bg-gradient-to-r from-sky-800 via-cyan-700 to-sky-800 bg-clip-text text-transparent'>
            Forleng de gode stundene ute.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className='mx-auto mt-6 mb-12 max-w-2xl md:max-w-4xl text-lg lg:text-2xl text-foreground/80 leading-relaxed'
        >
          Kompromissløs komfort, designet for å holde på varmen når øyeblikkene
          teller.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className='hidden md:flex justify-center mb-8'
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className='flex flex-col items-center gap-2 text-muted-foreground'
          >
            <span className='text-xs uppercase tracking-wider'>Se mer</span>
            <ChevronDown className='h-5 w-5' />
          </motion.div>
        </motion.div>
      </div>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className='group relative mb-8 rounded-2xl md:max-w-7xl border mx-auto border-neutral-800 shadow-2xl overflow-hidden'
      >
        {/* Subtle gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none' />

        {/* Ambient glow around image */}
        <div
          className='absolute -inset-1 opacity-30 blur-xl transition-opacity duration-500 group-hover:opacity-40'
          style={{
            background:
              'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #0891b2 100%)'
          }}
        />

        <div className='relative'>
          <Image
            src={heroImage}
            alt='To personer i Utekos-plagg sitter på en stein i skogen og deler et hyggelig øyeblikk, fullt påkledd for varme og komfort.'
            width={2048}
            height={1363}
            className='rounded-xl mx-auto w-full h-[60vh] xl:h-[80vh] object-cover object-bottom transition-transform duration-700 group-hover:scale-[1.02]'
            priority
          />
        </div>
      </motion.div>
    </section>
  )
}
