// Path: src/app/frakt-og-retur/components/ShippingReturnsInfo.tsx
'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
// STEG 1: Importer 'Variants'-typen
import { motion, type Variants } from 'framer-motion'
import {
  PackageCheck,
  Clock,
  Mail,
  Send,
  ShieldCheck,
  Truck,
  Undo2
} from 'lucide-react'

// STEG 2: Legg til den eksplisitte typen
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

// STEG 3: Legg til typen og endre 'ease'
const fadeInUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } }
}

export function ShippingReturnsInfo() {
  return (
    <motion.div
      variants={staggerContainer}
      initial='hidden'
      animate='show'
      className='lg:col-span-8'
    >
      <div className='grid gap-8 md:grid-cols-2'>
        <motion.div variants={fadeInUp}>
          <Card className='h-full border-neutral-700 bg-sidebar-foreground'>
            <CardHeader>
              <CardTitle className='flex items-center gap-3'>
                <Truck className='size-7 text-button' />
                Frakt og Levering
              </CardTitle>
              <CardDescription>
                Vi sender til hele Norge, så du kan starte din utekos så raskt
                som mulig.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className='space-y-4 text-foreground/80'>
                <li className='flex items-start gap-3'>
                  <Clock className='mt-1 size-5 shrink-0 text-yellow-400' />
                  <span>
                    <strong>Leveringstid</strong> er normalt 2-5 virkedager.
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <Mail className='mt-1 size-5 shrink-0 text-pink-400' />
                  <span>
                    <strong>Sporing</strong> sendes på e-post så snart pakken er
                    på vei.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className='h-full border-neutral-700 bg-sidebar-foreground'>
            <CardHeader>
              <CardTitle className='flex items-center gap-3'>
                <Undo2 className='size-7 text-amber-400' />
                Retur og Angrerett
              </CardTitle>
              <CardDescription>
                Du har 14 dagers angrerett fra dagen du mottar varen.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className='space-y-4 text-foreground/80'>
                <li className='flex items-start gap-3'>
                  <ShieldCheck className='mt-1 size-5 shrink-0 text-green-500' />
                  <span>
                    <strong>Full trygghet</strong> for å kjenne på kvaliteten
                    hjemme hos deg selv.
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <PackageCheck className='mt-1 size-5 shrink-0 text-sky-400' />
                  <span>
                    Varen må være <strong>ubrukt</strong>, uten lukt og med alle
                    merkelapper intakt for full refusjon.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={fadeInUp} className='mt-12'>
        <h2 className='mb-4 text-2xl font-semibold tracking-tight text-foreground'>
          Slik fungerer returprosessen
        </h2>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Steg 1: Gi oss beskjed</AccordionTrigger>
            <AccordionContent className='prose prose-invert max-w-none text-foreground/80'>
              <p>
                Send en e-post til{' '}
                <a href='mailto:info@utekos.no'>info@utekos.no</a>. For at vi
                skal kunne hjelpe deg raskt, ber vi deg inkludere fullt navn,
                adresse, ordrenummer og hvilke produkter returen gjelder.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger>Steg 2: Pakk varen trygt</AccordionTrigger>
            <AccordionContent className='prose prose-invert max-w-none text-foreground/80'>
              <p>
                Du er ansvarlig for varen til den når oss. Sørg for at
                produktene er pakket godt, helst i originalemballasjen. Varen må
                være i samme stand som da du mottok den.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger>Steg 3: Send pakken</AccordionTrigger>
            <AccordionContent className='prose prose-invert max-w-none text-foreground/80'>
              <p>
                Du dekker selv kostnaden for returfrakt. Vi anbefaler å bruke en
                sendingsmetode med sporing for din egen sikkerhet.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-4'>
            <AccordionTrigger>Unntak fra angreretten</AccordionTrigger>
            <AccordionContent className='prose prose-invert max-w-none text-foreground/80'>
              <p>
                Angreretten gjelder ikke for produkter som er forseglet av
                hygieniske årsaker dersom forseglingen er brutt etter mottak.
                For våre produkter vil dette i praksis si at plagget må være
                ubrukt, uten lukt og med alle merkelapper intakt.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </motion.div>
  )
}
