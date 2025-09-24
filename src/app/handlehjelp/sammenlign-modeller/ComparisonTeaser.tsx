/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { ArrowRightIcon, Droplets, Feather } from 'lucide-react'
import Link from 'next/link'

export function ComparisonTeaser() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <Card className='border-neutral-800 bg-sidebar-foreground'>
        <CardContent className='p-8 md:p-12 text-center'>
          <h2 className='text-3xl font-bold tracking-tight'>
            Usikker på hvilken du skal velge?
          </h2>
          <p className='mt-4 max-w-2xl mx-auto text-muted-foreground'>
            Både Dun og Mikrofiber gir deg kompromissløs komfort, men de har
            unike styrker. Få en rask oversikt her, eller dykk ned i detaljene i
            vår komplette guide.
          </p>
          <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left'>
            {/* Kort for Dun */}
            <div className='rounded-lg bg-background p-6 border border-neutral-700'>
              <div className='flex items-center gap-3'>
                <Feather className='h-6 w-6 text-violet-400' />
                <h3 className='text-lg font-semibold'>Utekos Dun™</h3>
              </div>
              <p className='mt-2 text-sm text-muted-foreground'>
                Best for 'maksimal varme' i tørre, kalde omgivelser som på
                hytten.
              </p>
            </div>
            {/* Kort for Mikrofiber */}
            <div className='rounded-lg bg-background p-6 border border-neutral-700'>
              <div className='flex items-center gap-3'>
                <Droplets className='h-6 w-6 text-cyan-400' />
                <h3 className='text-lg font-semibold'>Utekos Mikrofiber™</h3>
              </div>
              <p className='mt-2 text-sm text-muted-foreground'>
                Best for **allsidig bruk** i fuktigere vær som i båt eller
                bobil.
              </p>
            </div>
          </div>
          <Button asChild size='lg' className='mt-10'>
            <Link href='/handlehjelp/sammenlign-modeller'>
              Se full sammenligning
              <ArrowRightIcon className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
