// Path: src/components/frontpage/CustomerStory.tsx
'use client'

import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

function StoryConnector() {
  return (
    <svg
      width='100'
      height='100'
      viewBox='0 0 100 100'
      className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
      aria-hidden
    >
      <defs>
        <linearGradient id='line-gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
          <stop offset='0%' stopColor='#ef4444' /> {/* Rød */}
          <stop offset='100%' stopColor='#3b82f6' /> {/* Blå */}
        </linearGradient>
      </defs>
      <motion.path
        d='M 50 0 Q 80 20, 80 50 T 50 100'
        stroke='url(#line-gradient)'
        strokeWidth='2'
        fill='none'
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
        viewport={{ once: true, amount: 0.5 }}
      />
    </svg>
  )
}

export function CustomerStory() {
  return (
    <div className='relative flex h-full flex-col items-center justify-center gap-20 p-8'>
      <StoryConnector />
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true, amount: 0.8 }}
        className='w-full rounded-lg bg-sidebar-foreground p-4'
      >
        <div className='flex items-center gap-3 text-sm'>
          <Moon className='h-4 w-4 text-red-400' />
          <p className='font-semibold'>Før Utekos:</p>
          <p className='text-muted-foreground'>
            Kveldene ble alltid for korte.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        viewport={{ once: true, amount: 0.8 }}
        className='w-full rounded-lg bg-sidebar-foreground p-4'
      >
        <div className='flex items-center gap-3 text-sm'>
          <Sun className='h-4 w-4 text-blue-400' />
          <p className='font-semibold'>Etter Utekos:</p>
          <p className='text-muted-foreground'>
            Nå bestemmer vi når kvelden er over.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
