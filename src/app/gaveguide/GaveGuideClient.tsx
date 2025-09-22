'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface Persona {
  title: string
  description: string
  href: Route
  imageUrl: string
}

const personas: Persona[] = [
  {
    title: 'Til Hytteeieren',
    description:
      'For de som verdsetter peiskos, men drømmer om å ta med varmen ut på terrassen for å se stjernene.',
    href: '/produkter/utekos-dun' as Route, // <--- Her er endringen
    imageUrl: '/og-image-hytte-host.webp'
  },
  {
    title: 'Til Bobilisten',
    description:
      'Den perfekte følgesvennen for kjølige morgener på en ny, spennende destinasjon. Utvider campingsesongen.',
    href: '/produkter/utekos-mikrofiber' as Route, // <--- Her er endringen
    imageUrl: '/og-image-bobil-host.webp'
  },
  {
    title: 'Til Båteieren',
    description:
      'For de sene kveldene for anker, eller når en uventet bris gjør seg gjeldende på dekk. En favoritt i gjestehavna.',
    href: '/produkter/utekos-dun' as Route, // <--- Her er endringen
    imageUrl: '/og-image-batliv.webp'
  },
  {
    title: 'Til den som har alt',
    description:
      'Gi en gave de garantert ikke har, men som de umiddelbart vil elske. Gaven av ren, kompromissløs komfort.',
    href: '/produkter' as Route, // <--- Her er endringen
    imageUrl: '/og-image-terrassen.webp'
  }
]

export function PersonaGrid() {
  return (
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
  )
}
