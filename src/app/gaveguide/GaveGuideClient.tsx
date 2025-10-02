'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { personas } from './config/personas'

interface Persona {
  title: string
  description: string
  href: Route
  imageUrl: string
}

export function PersonaGrid() {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            Finn gaven som passer perfekt
          </h2>
          <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
            Vi har gjort det enkelt for deg. Velg livsstilen som passer best til
            den du vil glede.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {personas.map((persona, index) => (
            <motion.div
              key={persona.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={persona.href} className='group block h-full'>
                <Card className='relative overflow-hidden border-neutral-800 bg-sidebar-foreground h-full transition-all hover:border-neutral-700 hover:shadow-2xl hover:shadow-primary/20'>
                  <Image
                    src={persona.imageUrl}
                    alt={persona.title}
                    fill
                    className='object-cover opacity-20 transition-opacity group-hover:opacity-30'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent' />
                  <CardContent className='relative p-8 flex flex-col justify-end h-full min-h-[300px]'>
                    <h3 className='text-2xl font-bold mb-2'>{persona.title}</h3>
                    <p className='text-muted-foreground mb-4'>
                      {persona.description}
                    </p>
                    <div className='flex items-center gap-2 font-semibold text-primary'>
                      Se gavetips
                      <ArrowRightIcon className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
