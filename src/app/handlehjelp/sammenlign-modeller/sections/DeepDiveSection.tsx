'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Package, ThermometerSun, WashingMachine } from 'lucide-react'

export function DeepDiveSection() {
  return (
    <section className='py-24 bg-background'>
      <div className='container mx-auto max-w-4xl px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className='text-center mb-12'
        >
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            Hva betyr dette i praksis?
          </h2>
          <p className='mt-4 max-w-2xl mx-auto text-muted-foreground'>
            Hver Utekos-modell er designet med en unik styrke. Her dykker vi ned
            i de viktigste forskjellene, slik at du kan finne den perfekte
            matchen for ditt bruk.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className='space-y-8'
        >
          {/* Kort 1: Varme & Værforhold */}
          <Card className='relative overflow-hidden border-neutral-800 bg-sidebar-foreground'>
            <div className='absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-orange-400 to-cyan-400' />
            <CardContent className='p-8'>
              <div className='mb-4 flex items-center gap-4'>
                <ThermometerSun className='h-8 w-8 text-cyan-400' />
                <h3 className='text-xl font-semibold'>
                  Varme & Værforhold: Velg etter klima
                </h3>
              </div>
              <p className='mt-2 text-muted-foreground'>
                <strong>Utekos Dun™</strong> gir den absolutt høyeste varmen i
                forhold til vekt, og er uovertruffen i tørt, kaldt vær.
                <br />
                <strong>Utekos Fiberdun™</strong> er spesialisten for
                uforutsigbare forhold; den isolerer overlegent selv om den blir
                fuktig, og er det tryggeste valget nær kysten eller i båt.
                <br />
                <strong>Utekos Mikrofiber™</strong> er en ypperlig allrounder
                for de tre andre årstidene, og som et lettere lag når kulden
                ikke er ekstrem.
              </p>
            </CardContent>
          </Card>

          {/* Kort 2: Vekt & Pakkbarhet */}
          <Card className='relative overflow-hidden border-neutral-800 bg-sidebar-foreground'>
            <div className='absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-violet-400 to-pink-400' />
            <CardContent className='p-8'>
              <div className='mb-4 flex items-center gap-4'>
                <Package className='h-8 w-8 text-violet-400' />
                <h3 className='text-xl font-semibold'>
                  Vekt & Pakkbarhet: For deg som teller gram
                </h3>
              </div>
              <p className='mt-2 text-muted-foreground'>
                <strong>Utekos Dun™</strong> er mest komprimerbar og gir mest
                varme for vekten, ideelt for tursekken.
                <br />
                <strong>Utekos Mikrofiber™</strong> er totalt sett vårt
                letteste plagg, perfekt for daglig bruk hvor lav vekt er en
                fordel.
                <br />
                <strong>Utekos Fiberdun™</strong> er vårt mest robuste plagg.
                Det du ofrer i pakkbarhet, vinner du i bekymringsfrihet og
                ytelse i all slags vær.
              </p>
            </CardContent>
          </Card>

          {/* Kort 3: Vask og vedlikehold */}
          <Card className='relative overflow-hidden border-neutral-800 bg-sidebar-foreground'>
            <div className='absolute left-0 top-0 h-2 w-full bg-emerald-400' />
            <CardContent className='p-8'>
              <div className='mb-4 flex items-center gap-4'>
                <WashingMachine className='h-8 w-8 text-emerald-400' />
                <h3 className='text-xl font-semibold'>
                  Vedlikehold: Fra arbeidshest til finstas
                </h3>
              </div>
              <p className='mt-2 text-muted-foreground'>
                Både <strong>Utekos Fiberdun™</strong> og{' '}
                <strong>Mikrofiber™</strong> er robuste arbeidshester som tåler
                røff bruk, kan vaskes enkelt i maskin og tørker raskt.
                <br />
                <strong>Utekos Dun™</strong> krever en mer skånsom vaskeprosess
                for å bevare dunets unike spenst og varmeevne over tid.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
