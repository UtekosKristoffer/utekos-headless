'use client'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { MapPinIcon } from '@heroicons/react/24/outline'
import type { Destination } from '../types'

export function DestinationsGrid({
  destinations
}: {
  destinations: Destination[]
}) {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-fluid-display font-bold tracking-tight'>
            Populære destinasjoner med Utekos
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Norges vakreste bobildestinasjoner venter - nyt dem i komfort hele
            sesongen
          </p>
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className='border-neutral-800 bg-sidebar-foreground transition-colors hover:bg-sidebar-foreground/80'>
                <CardContent className='p-6'>
                  <div className='mb-3 flex items-start justify-between'>
                    <h3 className='text-lg font-semibold'>{dest.name}</h3>
                    <MapPinIcon className={`size-5 ${dest.color}`} />
                  </div>
                  <p className='mb-2 text-sm text-muted-foreground'>
                    {dest.season}
                  </p>
                  <p className='text-sm text-foreground/80'>{dest.highlight}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
