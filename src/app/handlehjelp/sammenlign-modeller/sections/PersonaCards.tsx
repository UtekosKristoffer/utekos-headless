// Path: src/app/produkter/components/PersonaCards.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function PersonaCards() {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
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
                  src='/coffe_utekos.webp'
                  alt='Hyttekos i tørt, kaldt vær med Utekos Dun'
                  fill
                  className='object-cover'
                />
              </div>
              <CardContent className='p-8 flex-grow flex flex-col'>
                <h3 className='text-2xl font-bold'>
                  For den kompromissløse livsnyteren
                </h3>
                <p className='mt-2 text-muted-foreground flex-grow'>
                  Du verdsetter den uovertrufne følelsen av premium dun, og
                  bruker din Utekos primært i tørre, kalde omgivelser som på
                  hytten.
                </p>
                <Button asChild className='mt-6 w-full'>
                  <Link href='/produkter/utekos-dun'>Velg Utekos Dun™</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Kort for Utekos Fiberdun */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <Card className='flex flex-col h-full border-neutral-800 bg-sidebar-foreground'>
              <div className='relative h-64 w-full overflow-hidden rounded-t-lg'>
                <Image
                  src='/half-diagonal.webp'
                  alt='Utekos Fiberdun i uforutsigbart vær'
                  fill
                  className='object-cover aspect-[2/3]'
                />
              </div>
              <CardContent className='p-8 flex-grow flex flex-col'>
                <h3 className='text-2xl font-bold'>
                  For den praktiske allrounderen
                </h3>
                <p className='mt-2 text-muted-foreground flex-grow'>
                  Du trenger en robust arbeidshest som presterer i all slags vær
                  – fra fuktige kvelder i båten til uforutsigbare dager med
                  bobilen.
                </p>
                <Button asChild className='mt-6 w-full'>
                  <Link href='/produkter/utekos-fiberdun'>
                    Velg Utekos Fiberdun™
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Kort for Utekos Mikrofiber */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <Card className='flex flex-col h-full border-neutral-800 bg-sidebar-foreground'>
              <div className='relative h-64 w-full overflow-hidden rounded-t-lg'>
                <Image
                  src='/frontpage-kate-linn.webp'
                  alt='Allsidig, daglig bruk av Utekos Mikrofiber'
                  fill
                  className='object-cover'
                />
              </div>
              <CardContent className='p-8 flex-grow flex flex-col'>
                <h3 className='text-2xl font-bold'>For den enkle komforten</h3>
                <p className='mt-2 text-muted-foreground flex-grow'>
                  Du ser etter et lett og funksjonelt plagg for de daglige
                  turene, og som et enkelt, varmende lag på terrassen eller i
                  hverdagen.
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
      </div>
    </section>
  )
}
