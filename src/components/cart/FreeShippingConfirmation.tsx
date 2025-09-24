'use client'

import { motion } from 'framer-motion'
import { CheckCircleIcon } from 'lucide-react'

export function FreeShippingConfirmation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='p-6 text-sm'
    >
      <div className='flex items-center justify-center gap-3 rounded-lg border border-green-500/30 bg-green-900/20 px-4 py-3 text-green-400'>
        <CheckCircleIcon className='h-5 w-5' />
        <span className='font-semibold'>
          Gratulerer, du har fått fri frakt!
        </span>
      </div>
    </motion.div>
  )
}
