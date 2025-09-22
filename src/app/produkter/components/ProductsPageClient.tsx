'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// --- Komponent 1: "Hjelp meg å velge" ---

interface ProductChoice {
  title: string
  description: string
  href: Route
  imageUrl: string
  linkColor: string
}

// KORRIGERT: Lagt til farge for hver link
const choices: ProductChoice[] = [
  {
    title: 'For den ultimate varmen',
    description:
      'Vårt varmeste alternativ, perfekt for de kaldeste dagene på hytta eller i fjellet.',
    href: '/produkter/utekos-dun' as Route,
    imageUrl: '/og-image-hytte-host.webp',
    linkColor: 'text-rose-400'
  },
  {
    title: 'For allsidig, daglig bruk',
    description:
      'Lett, praktisk og perfekt for bobillivet, båten og de kjølige sommerkveldene.',
    href: '/produkter/utekos-mikrofiber' as Route,
    imageUrl: '/og-image-bobil-host.webp',
    linkColor: 'text-cyan-400'
  },
  {
    title: 'Tilbehøret som fullfører kosen',
    description:
      'Små detaljer, stor forskjell. Hold varmen fra topp til tå med våre luer og buffer.',
    href: '/produkter' as Route,
    imageUrl: '/og-image-tilbehor.webp',
    linkColor: 'text-emerald-400'
  }
]

export function HelpChooseSection() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
      {choices.map((choice, index) => (
        <motion.div
          key={choice.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <Link href={choice.href} className='group block h-full'>
            <Card className='flex flex-col h-full border-neutral-800 bg-sidebar-foreground transition-all hover:border-neutral-700'>
              <div className='relative h-48 w-full overflow-hidden rounded-t-lg'>
                <Image
                  src={choice.imageUrl}
                  alt={choice.title}
                  fill
                  className='object-cover transition-transform group-hover:scale-105'
                />
              </div>
              <CardContent className='p-6 flex-grow flex flex-col'>
                <h3 className='text-lg font-semibold'>{choice.title}</h3>
                <p className='mt-2 text-sm text-muted-foreground flex-grow'>
                  {choice.description}
                </p>
                {/* KORRIGERT: Bruker nå dynamisk farge fra data-objektet */}
                <div
                  className={`flex items-center gap-1 mt-4 font-semibold text-sm ${choice.linkColor}`}
                >
                  Se produkt
                  <ArrowRightIcon className='h-3 w-3 transition-transform group-hover:translate-x-1' />
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

// --- Komponent 2: Kundesitat ---

export function ProductTestimonial() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <Card className='border-neutral-800 bg-sidebar-foreground'>
        <CardContent className='p-12 text-center'>
          <blockquote className='text-xl italic text-foreground/90'>
            &quot;Utekos har totalt forandret hvordan vi bruker hytta om høsten.
            Kvaliteten er helt fantastisk. Anbefales på det varmeste!&quot;
          </blockquote>
          <p className='mt-6 font-semibold'>- Anne, Hytteeier</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
