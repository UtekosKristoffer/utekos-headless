import BobilPrepFlow from '@/app/magasinet/den-ultimate-guiden-til-komfortabel-vintercamping/Bobil/BobilPrepFlow'
import { VintercampFlow } from '@/app/magasinet/den-ultimate-guiden-til-komfortabel-vintercamping/VinterCamp/VinterCampFlow'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline'
import siteImage from '@public/magasinet/vintercamp.png'
import { Coffee, Snowflake, Sparkles, Thermometer } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BobilKlargjoringSection } from '../den-ultimate-guiden-til-komfortabel-vintercamping/Bobil/BobilKlargjoringSection'
import { PakkelisteSection } from '../den-ultimate-guiden-til-komfortabel-vintercamping/VinterCamp/PakkelisteSection'
import { VintercampLivetSection } from '../den-ultimate-guiden-til-komfortabel-vintercamping/VinterCamp/VintercampLivetSection'
export const VintercampingArticle = () => {
  return (
    <article className='prose prose-invert prose-lg md:max-w-5xl mx-auto'>
      <figure className='!my-12'>
        <Image
          src={siteImage}
          alt='Bobil i et vakkert, snødekt landskap ved solnedgang, med varme lys på innsiden.'
          width={1500}
          height={1000}
          className='rounded-lg'
          priority
        />
        <figcaption className='text-center text-sm text-muted-foreground mt-2'>
          Stillheten. Lyset. Opplevelsene. Vintercamping er unikt.
        </figcaption>
      </figure>

      <p className='text-lg text-muted-foreground'>
        Å våkne opp til et landskap dekket av nyfalt snø, med den skarpe, klare
        vinterluften som venter utenfor døren, er en opplevelse få ting kan måle
        seg med. Men for mange bobilentusiaster er tanken på vintercamping
        forbundet med ett stort spørsmål: Hvordan holder man varmen og
        komforten?
      </p>
      <p className='text-lg text-muted-foreground'>
        Frykt ikke. Vi har samlet alt du trenger å vite – fra de tekniske
        forberedelsene til de små triksene som forvandler en kald tur til en
        uforglemmelig, koselig opplevelse.
      </p>

      {/* --- Seksjon 1 --- */}
      <h2 className='flex items-center gap-3 mt-12'>
        <Snowflake className='text-cyan-400' />
        Fase 1: Bobilen må være klar
      </h2>
      <Card className='bg-sidebar-foreground border-neutral-800 my-8 not-prose'>
        <CardContent className='p-6'>
          <p className='text-muted-foreground mt-0'>
            God komfort starter med en godt forberedt bobil. Før du legger ut på
            tur i minusgrader, er det noen systemer som er helt essensielt å ha
            kontroll på:
          </p>
          <div className='mt-6'>
            <BobilPrepFlow />
          </div>
        </CardContent>
      </Card>
      <BobilKlargjoringSection />

      {/* --- Seksjon 2 --- */}
      <h2 className='flex items-center gap-3 mt-16'>
        <Thermometer className='text-orange-400' />
        Fase 2: Pakkelisten for personlig komfort
      </h2>
      <p className='mt-4 text-lg text-muted-foreground'>
        Når bobilen er klar, er det på tide å tenke på deg selv. Hemmeligheten
        ligger i lag-på-lag-prinsippet og å ha det rette
        &quot;kose-utstyret&quot; tilgjengelig.
      </p>
      <PakkelisteSection />

      {/* --- Seksjon 3 --- */}
      <h2 className='flex items-center gap-3 mt-16'>
        <Coffee className='text-amber-400' />
        Fase 3: Livet på vintercampingen
      </h2>
      <p className='mt-4 text-lg text-muted-foreground'>
        Du er fremme, bobilen er parkert, og landskapet er fantastisk. Slik får
        du mest ut av oppholdet:
      </p>
      <div className='mt-6'>
        <VintercampFlow />
      </div>
      <VintercampLivetSection />

      {/* --- CTA --- */}
      <Card className='my-12 not-prose text-center bg-gradient-to-br from-primary/20 to-transparent border-neutral-800'>
        <CardContent className='p-8'>
          <h3 className='text-2xl font-bold mt-0'>
            Klar for ditt Utekos-øyeblikk?
          </h3>
          <p className='text-muted-foreground mt-2 mb-6'>
            Utekos er plagget som fyller gapet mellom inne og ute, og forvandler
            en kjølig morgen til en magisk start på dagen.
          </p>
          <Button asChild>
            <Link href='/produkter'>
              Oppdag Utekos-serien
              <ArrowRightIcon className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* --- Konklusjon --- */}
      <Card className='my-12 not-prose bg-sidebar-foreground border-neutral-800'>
        <CardContent className='p-8'>
          <h3 className='text-2xl font-bold flex items-center gap-3 mt-0'>
            <Sparkles className='h-6 w-6 text-yellow-400' />
            Konklusjon: Omfavn vinteren
          </h3>
          <p className='text-muted-foreground mt-4'>
            Vintercamping handler ikke om å &quot;overleve&quot; kulden. Det
            handler om å omfavne den, forberedt med riktig utstyr og
            innstilling. Ved å ta disse forholdsreglene, kan du flytte grensene
            for din egen campingsesong og skape minner som varer livet ut.
          </p>
          <p className='text-muted-foreground mt-4'>
            Så fyll opp gassflaskene, pakk ullundertøyet og din Utekos, og sett
            kursen mot stillheten, stjernehimmelen og de snødekte viddene.
            Eventyret venter.
          </p>
        </CardContent>
      </Card>
    </article>
  )
}
