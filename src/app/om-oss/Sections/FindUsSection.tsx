'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { motion } from 'framer-motion'
import { MapPinIcon } from 'lucide-react'
import Image from 'next/image'

const upcomingFairs = [
  {
    name: 'Caravanmessen',
    location: 'Lillestrøm',
    date: '12. - 15. september 2026',
    color: 'text-primary' // Blå
  },
  {
    name: 'Bobil & Caravan',
    location: 'Bergen',
    date: '4. - 6. oktober 2026',
    color: 'text-fuchsia-400' // Magenta/Lilla
  },
  {
    name: 'Hyttemessen',
    location: 'Hellerudsletta',
    date: '18. - 20. april 2027',
    color: 'text-emerald-400' // Grønn
  }
]

const fairImages = ['/messe-1.webp', '/messe-2.webp', '/messe-3.webp']

export function FindUsSection() {
  return (
    <section className='py-24 sm:py-32'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-16 lg:grid-cols-2'>
          {/* Venstre kolonne: Tekst og invitasjon */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
              Møt oss der du er
            </h2>
            <p className='mt-6 text-lg leading-8 text-muted-foreground'>
              Den beste praten tar vi ansikt til ansikt. Derfor reiser vi land
              og strand rundt på caravan- og boligmesser for å møte andre
              livsnytere. Her deler vi historier, får uvurderlige
              tilbakemeldinger og viser frem komforten du kan føle på.
            </p>
            <div className='mt-10 space-y-6'>
              {upcomingFairs.map(fair => (
                <div key={fair.name} className='flex gap-4'>
                  <div className='flex h-10 w-10 ...'>
                    <MapPinIcon className={`h-5 w-5 ${fair.color}`} />{' '}
                  </div>
                  <div>
                    <h3 className='font-semibold text-foreground'>
                      {fair.name}
                    </h3>
                    <p className='text-muted-foreground'>
                      {fair.location} – {fair.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Høyre kolonne: Bildekarusell */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Carousel className='rounded-xl border border-neutral-800'>
              <CarouselContent>
                {fairImages.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className='relative aspect-[4/3]'>
                      <Image
                        src={src}
                        alt={`Bilde fra messe ${index + 1}`}
                        fill
                        className='object-cover rounded-xl'
                        sizes='(max-width: 1024px) 90vw, 45vw'
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='left-4' />
              <CarouselNext className='right-4' />
            </Carousel>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
