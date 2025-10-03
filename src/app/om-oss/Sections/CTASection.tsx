'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export function CTASection() {
  return (
    <section className='relative py-24 bg-sidebar-foreground sm:py-32 overflow-hidden'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 opacity-30'>
        <div
          className='absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 blur-3xl'
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='container mx-auto max-w-4xl px-4'>
        <div className='relative rounded-2xl border border-neutral-800 bg-neutral-900/50 p-12 md:p-16 text-center overflow-hidden shadow-2xl'>
          {/* Subtle gradient accents */}
          <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent' />
          <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent' />

          {/* Aurora effect */}
          <div
            className='absolute -inset-x-2 -inset-y-20 opacity-20 blur-3xl'
            style={{
              background:
                'radial-gradient(120% 120% at 50% 0%, transparent 30%, #0ea5e9 100%)'
            }}
          />

          <div className='relative z-10'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className='mb-6 inline-flex items-center gap-2 rounded-full border border-sky-800/30 bg-sky-900/20 px-4 py-2'
            >
              <Sparkles className='h-4 w-4 text-sky-800' />
              <span className='text-sm font-medium text-sky-800'>
                Oppdag kolleksjonen
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl'
            >
              Klar til å oppleve komforten?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className='mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground'
            >
              Se hvordan vår filosofi og våre materialvalg kommer til live i
              produktene som er designet for å forlenge dine beste øyeblikk.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className='mt-10'
            >
              <Link
                href='/produkter'
                className='group inline-flex items-center justify-center rounded-xl bg-sky-800 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:bg-sky-600 hover:shadow-sky-500/40 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900'
              >
                Se alle produkter
                <ArrowRight className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className='mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground'
            >
              <div className='flex items-center gap-2'>
                <svg
                  className='h-5 w-5 text-sky-800'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>Skapt for norske forhold</span>
              </div>
              <div className='flex items-center gap-2'>
                <svg
                  className='h-5 w-5 text-sky-800'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>Fri frakt over 999,-</span>
              </div>
              <div className='flex items-center gap-2'>
                <svg
                  className='h-5 w-5 text-sky-800'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>30 dagers åpent kjøp</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
