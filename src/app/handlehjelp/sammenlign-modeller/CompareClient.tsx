'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import {
  Check,
  Droplets,
  Feather,
  Minus,
  Thermometer,
  WashingMachine
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function PersonaCards() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      {/* Kort for Utekos Dun */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Card className='flex flex-col h-full border-neutral-800 bg-sidebar-foreground'>
          <div className='relative h-64 w-full overflow-hidden rounded-t-lg'>
            <Image
              src='/og-image-hytte-host.webp'
              alt='Hyttekos i tørt, kaldt vær'
              fill
              className='object-cover'
            />
          </div>
          <CardContent className='p-8 flex-grow flex flex-col'>
            <h3 className='text-2xl font-bold'>
              For den kompromissløse livsnyteren
            </h3>
            <p className='mt-2 text-muted-foreground flex-grow'>
              Du verdsetter den uovertrufne følelsen av premium dun, og bruker
              din Utekos primært i tørre, kalde omgivelser som på hytten eller på
              fjellet.
            </p>
            <Button asChild className='mt-6 w-full'>
              <Link href='/produkter/utekos-dun'>Velg Utekos Dun™</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Kort for Utekos Mikrofiber */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Card className='flex flex-col h-full border-neutral-800 bg-sidebar-foreground'>
          <div className='relative h-64 w-full overflow-hidden rounded-t-lg'>
            <Image
              src='/og-image-batliv.webp'
              alt='Utekos i fuktig vær ved sjøen'
              fill
              className='object-cover'
            />
          </div>
          <CardContent className='p-8 flex-grow flex flex-col'>
            <h3 className='text-2xl font-bold'>
              For den allsidige eventyreren
            </h3>
            <p className='mt-2 text-muted-foreground flex-grow'>
              Du trenger en robust arbeidshest som presterer i all slags vær –
              fra fuktige kvelder i båten til uforutsigbare dager med bobilen.
            </p>
            <Button asChild className='mt-6 w-full'>
              <Link href='/produkter/utekos-mikrofiber'>
                Velg Utekos Mikrofiber™
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

// --- Komponent 2: Den detaljerte sammenligningstabellen ---

const comparisonData = [
  {
    feature: 'Varme (tørt vær)',
    icon: Thermometer,
    dun: 'Uovertruffen',
    mikrofiber: 'Meget god',
    iconColor: 'text-orange-400'
  },
  {
    feature: 'Varme (fuktig vær)',
    icon: Droplets,
    dun: 'God',
    mikrofiber: 'Overlegen',
    iconColor: 'text-cyan-400'
  },
  {
    feature: 'Vekt',
    icon: Feather,
    dun: 'Ekstra lett (~1000g)',
    mikrofiber: 'Ultralett (~800g)',
    iconColor: 'text-violet-400'
  },
  {
    feature: 'Vedlikehold',
    icon: WashingMachine,
    dun: 'Krever skånsom vask',
    mikrofiber: 'Svært enkel (Maskinvask)',
    iconColor: 'text-emerald-400'
  },
  {
    feature: 'Isolert hette',
    icon: Check,
    dun: true,
    mikrofiber: false,
    iconColor: 'text-muted-foreground'
  },
  {
    feature: 'Fleece-lommer',
    icon: Check,
    dun: true,
    mikrofiber: false,
    iconColor: 'text-muted-foreground'
  }
]

export function ComparisonTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
      className='w-full overflow-x-auto'
    >
      <table className='w-full min-w-[600px] border-collapse text-left'>
        <thead>
          <tr>
            <th className='p-4 border-b border-neutral-800 font-semibold w-2/5'>
              Egenskap
            </th>
            <th className='p-4 border-b border-neutral-800 font-semibold text-center'>
              Utekos Dun™
            </th>
            <th className='p-4 border-b border-neutral-800 font-semibold text-center'>
              Utekos Mikrofiber™
            </th>
          </tr>
        </thead>
        <tbody>
          {/* KORRIGERT: Bruker nå den dynamiske fargen for ikonene */}
          {comparisonData.map(
            ({ feature, icon: Icon, dun, mikrofiber, iconColor }) => (
              <tr key={feature}>
                <td className='p-4 border-b border-neutral-800 flex items-center gap-3'>
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                  <span>{feature}</span>
                </td>
                <td className='p-4 border-b border-neutral-800 text-center text-foreground/90'>
                  {typeof dun === 'boolean' ?
                    dun ?
                      <Check className='mx-auto h-5 w-5 text-green-500' />
                    : <Minus className='mx-auto h-5 w-5 text-neutral-600' />
                  : dun}
                </td>
                <td className='p-4 border-b border-neutral-800 text-center font-medium'>
                  <span
                    className={
                      (
                        mikrofiber === 'Overlegen'
                        || mikrofiber === 'Svært enkel'
                        || mikrofiber === 'Ultralett'
                      ) ?
                        'text-primary'
                      : 'text-foreground/90'
                    }
                  >
                    {typeof mikrofiber === 'boolean' ?
                      mikrofiber ?
                        <Check className='mx-auto h-5 w-5 text-green-500' />
                      : <Minus className='mx-auto h-5 w-5 text-neutral-600' />
                    : mikrofiber}
                  </span>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </motion.div>
  )
}
