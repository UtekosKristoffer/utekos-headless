'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { choices } from './choices'

// Map link colors to glow colors
const getGlowColor = (linkColor: string) => {
  const colorMap: Record<string, string> = {
    'text-blue-400': '#60a5fa',
    'text-cyan-400': '#22d3ee',
    'text-sky-400': '#38bdf8',
    'text-green-400': '#4ade80',
    'text-purple-400': '#c084fc',
    'text-pink-400': '#f472b6',
    'text-orange-400': '#fb923c'
  }
  return colorMap[linkColor] || '#60a5fa'
}

export function HelpChooseSection() {
  return (
    <section className='relative mb-24 w-full'>
      {/* Minimal ambient background */}
      <div className='absolute inset-0 -z-10 overflow-hidden opacity-40'>
        <div
          className='absolute left-1/4 top-0 h-[400px] w-[400px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute right-1/4 bottom-0 h-[400px] w-[400px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
        {choices.map((choice, index) => {
          const glowColor = getGlowColor(choice.linkColor)

          return (
            <motion.div
              key={choice.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Link href={choice.href} className='group block h-full'>
                <Card className='relative flex flex-col h-full border-neutral-800 bg-sidebar-foreground transition-all duration-300 hover:border-neutral-700 hover:-translate-y-1 overflow-hidden'>
                  {/* Subtle aurora effect on hover */}
                  <div
                    className='absolute -inset-x-2 -top-20 h-40 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20 pointer-events-none'
                    style={{
                      background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${glowColor} 100%)`
                    }}
                  />

                  <AspectRatio
                    ratio={2 / 3}
                    className='w-full overflow-hidden rounded-t-lg'
                  >
                    <Image
                      src={choice.imageUrl}
                      alt={choice.title}
                      fill
                      className='object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-lg'
                    />
                  </AspectRatio>

                  <CardContent className='relative p-6 flex-grow flex flex-col'>
                    <h3 className='text-xl font-semibold text-foreground mb-3'>
                      {choice.title}
                    </h3>
                    <p className='text-sm text-muted-foreground leading-relaxed flex-grow'>
                      {choice.description}
                    </p>

                    <div
                      className={`flex items-center gap-2 mt-4 font-semibold text-sm ${choice.linkColor} transition-all duration-300 group-hover:gap-3`}
                    >
                      <span>Se produkt</span>
                      <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                    </div>
                  </CardContent>

                  {/* Subtle bottom accent line */}
                  <div
                    className='absolute bottom-0 left-0 right-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                    style={{ background: glowColor }}
                  />
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
