import BobilPrepFlow from '@/app/magasinet/den-ultimate-guiden-til-komfortabel-vintercamping/BobilPrepFlow'
import { VintercampFlow } from '@/app/magasinet/den-ultimate-guiden-til-komfortabel-vintercamping/VinterCampFlow'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline'
import siteImage from '@public/og-image-bobil.webp'
import { Coffee, Snowflake, Sparkles, Thermometer } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const VintercampingArticle = () => {
  // Hjelpekomponenten for sjekklisten kan bo inne i artikkel-komponenten
  const ChecklistItem = ({ children }: { children: React.ReactNode }) => {
    return (
      <li className='flex items-start gap-3'>
        <CheckIcon className='h-6 w-6 text-emerald-500 mt-1 flex-shrink-0' />
        <span>{children}</span>
      </li>
    )
  }

  return (
    <article className='prose prose-invert prose-lg max-w-4xl mx-auto'>
      <figure className='!my-12'>
        <Image
          src={siteImage}
          alt='Bobil i et vakkert, snødekt landskap ved solnedgang.'
          width={1500}
          height={1000}
          className='rounded-lg'
        />
        <figcaption className='text-center text-sm text-muted-foreground mt-2'>
          Stillheten. Lyset. Opplevelsene. Vintercamping er unikt.
        </figcaption>
      </figure>

      {/* Intro Text */}
      <p>
        Å våkne opp til et landskap dekket av nyfalt snø, med den skarpe, klare
        vinterluften som venter utenfor døren, er en opplevelse få ting kan måle
        seg med. Men for mange bobilentusiaster er tanken på vintercamping
        forbundet med ett stort spørsmål: Hvordan holder man varmen og
        komforten?
      </p>
      <p>
        Frykt ikke. Vi har samlet alt du trenger å vite – fra de tekniske
        forberedelsene til de små triksene som forvandler en kald tur til en
        uforglemmelig, koselig opplevelse.
      </p>

      {/* Section 1: Forberedelser */}
      <h2 className='flex items-center gap-3'>
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

      {/* Quote Block */}
      <Card className='bg-sidebar-foreground border-neutral-800 my-12'>
        <CardContent className='p-8'>
          <blockquote className='text-xl italic text-foreground/90 not-prose m-0'>
            &quot;Den største feilen folk gjør er å undervurdere hvor fort
            kulden kommer snikende. En godt forberedt bobil er halve jobben for
            en vellykket tur.&quot;
          </blockquote>
        </CardContent>
      </Card>

      {/* Section 2: Din personlige komfort */}
      <h2 className='flex items-center gap-3'>
        <Thermometer className='text-orange-400' />
        Fase 2: Pakkelisten for personlig komfort
      </h2>
      <p>
        Når bobilen er klar, er det på tide å tenke på deg selv. Hemmeligheten
        ligger i lag-på-lag-prinsippet og å ha det rette
        &quot;kose-utstyret&quot; tilgjengelig.
      </p>

      <Card className='bg-sidebar-foreground border-neutral-800 my-12 not-prose'>
        <CardContent className='p-8'>
          <h3 className='text-2xl font-bold flex items-center gap-3 mt-0'>
            <Sparkles className='text-yellow-400' />
            Sjekkliste for varme og hygge:
          </h3>
          <ul className='mt-4 space-y-3'>
            <ChecklistItem>
              <strong>Ull innerst:</strong> Ullundertøy er din beste venn. Det
              isolerer selv om det blir fuktig.
            </ChecklistItem>
            <ChecklistItem>
              <strong>Gode tøfler:</strong> Et kaldt gulv stjeler fort varmen.
              Et par varme, isolerte tøfler er et must.
            </ChecklistItem>
            <ChecklistItem>
              <strong>Vinterdyne eller sovepose:</strong> Ikke spar på
              kvaliteten her. En god natts søvn er avgjørende.
            </ChecklistItem>
            <ChecklistItem>
              <strong>Utekos-plagget:</strong> Dette er ditt hemmelige våpen.
              Perfekt for de kjølige morgenene før varmen har satt seg, for en
              rask tur ut for å sjekke været, eller for å nyte en kopp kaffe
              utendørs. Den er designet for nettopp disse øyeblikkene.
            </ChecklistItem>
            <ChecklistItem>
              <strong>Lommelykt/hodelykt:</strong> Vinterdagene er korte. Godt
              lys er viktig.
            </ChecklistItem>
          </ul>
        </CardContent>
      </Card>

      {/* Section 3: Livet i leiren */}
      <h2 className='flex items-center gap-3'>
        <Coffee className='text-amber-400' />
        Fase 3: Livet på vintercampingen
      </h2>
      <Card className='bg-sidebar-foreground border-neutral-800 my-8 not-prose'>
        <CardContent className='p-6'>
          <p className='text-muted-foreground mt-0'>
            Du er fremme, bobilen er parkert, og landskapet er fantastisk. Slik
            får du mest ut av oppholdet:
          </p>
          <div className='mt-6'>
            <VintercampFlow />
          </div>
        </CardContent>
      </Card>

      {/* CTA within article */}
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
            <Link href='/produkter/utekos-original'>
              Oppdag Utekos Original
              <ArrowRightIcon className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Conclusion Section */}
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
