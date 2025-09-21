'use client'

import { cn } from '@/lib/utils/className'
import { motion } from 'framer-motion'
import { Check, Feather, Heart, Moon } from 'lucide-react'
import Image from 'next/image'
import UtekosLogo from '../../../public/icon.png'

const benefits = [
  {
    icon: Moon,
    text: 'Forlenget kveldene',
    color: 'text-blue-400',
    position: 'top-0 left-0' // Posisjon for øvre venstre hjørne
  },
  {
    icon: Feather,
    text: 'Overraskende lett',
    color: 'text-pink-400',
    position: 'top-0 right-0' // Posisjon for øvre høyre hjørne
  },
  {
    icon: Heart,
    text: 'Gjennomført kvalitet',
    color: 'text-green-400',
    position: 'bottom-0 left-0' // Posisjon for nedre venstre hjørne
  },
  {
    icon: Check,
    text: 'Verdt hver krone',
    color: 'text-orange-400',
    position: 'bottom-0 right-0' // Posisjon for nedre høyre hjørne
  }
]

export function CustomerNetwork() {
  return (
    <div className='relative flex h-full min-h-[450px] w-full items-center justify-center p-8'>
      {/* Sentral kjerne */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true, amount: 0.8 }}
        className='relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-sidebar-foreground'
      >
        <Image src={UtekosLogo} alt='Utekos Logo' className='h-12 w-12' />
      </motion.div>

      {/* Animerte linjer og fordeler */}
      <div className='absolute inset-0'>
        <svg
          width='100%'
          height='100%'
          viewBox='0 0 400 400'
          preserveAspectRatio='none'
        >
          {/* Definerer linjene med motion.path for animasjon */}
          <motion.path
            d='M 200 200 Q 100 150, 50 50'
            strokeWidth='1.5'
            className='stroke-blue-400'
            fill='none'
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeInOut' }}
            viewport={{ once: true, amount: 0.8 }}
          />
          <motion.path
            d='M 200 200 Q 300 150, 350 50'
            strokeWidth='1.5'
            className='stroke-pink-400'
            fill='none'
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeInOut' }}
            viewport={{ once: true, amount: 0.8 }}
          />
          <motion.path
            d='M 200 200 Q 100 250, 50 350'
            strokeWidth='1.5'
            className='stroke-green-400'
            fill='none'
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: 'easeInOut' }}
            viewport={{ once: true, amount: 0.8 }}
          />
          <motion.path
            d='M 200 200 Q 300 250, 350 350'
            strokeWidth='1.5'
            className='stroke-orange-400'
            fill='none'
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeInOut' }}
            viewport={{ once: true, amount: 0.8 }}
          />
        </svg>

        {/* Plassering av fordels-boksene */}
        {benefits.map((benefit, i) => (
          <motion.div
            key={benefit.text}
            className={cn(
              'absolute rounded-md bg-sidebar-foreground p-2 text-xs flex items-center gap-2',
              benefit.color,
              benefit.position // Her hentes posisjonen fra arrayet
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <benefit.icon className='h-4 w-4' />
            <span>{benefit.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
