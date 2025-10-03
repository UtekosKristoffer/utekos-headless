'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export function ProductsPageHeader() {
  return (
    <header className='relative text-center mb-16 overflow-hidden'>
      {/* Very subtle ambient glow */}
      <div className='absolute inset-0 -z-10 opacity-30'>
        <div
          className='absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 blur-3xl'
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='mb-4 inline-flex items-center gap-2 rounded-full border border-sky-800/30 bg-sky-900/10 px-4 py-2'
      >
        <Sparkles className='h-4 w-4 text-sky-800' />
        <span className='text-sm font-medium text-sky-800'>
          Utforsk kolleksjonen
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'
      >
        Kolleksjonen for kompromissløs komfort
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='mt-6 max-w-3xl mx-auto text-lg lg:text-xl text-muted-foreground leading-relaxed'
      >
        Hvert plagg er skapt for ett formål: å la deg forlenge de gode
        øyeblikkene ute. Utforsk vår kolleksjon og finn den perfekte
        følgesvennen for din utekos.
      </motion.p>
    </header>
  )
}
