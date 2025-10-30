// Path: src/app/magasinet/beredskap-egenomsorg/HeroBeredskap.tsx

import Image from 'next/image'
import UtekosBeredskap from '@public/utekos-beredskap.png'
export function HeroBeredskap() {
  return (
    <section className='mx-auto pt-6 pb-12'>
      {/* Bildet med subtile forbedringer */}
      <div className='mb-10 relative group'>
        <div className='absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500'></div>
        <div className='relative'>
          <Image
            src={UtekosBeredskap}
            alt='Utekos i en beredskapssituasjon, illustrerer varme og komfort'
            width={1536}
            height={1024}
            layout='responsive'
            objectFit='cover'
            className='rounded-xl shadow-2xl'
          />
        </div>
      </div>
      {/* Intro text med bedre typografi */}

      {/*
          FORSLAG 1: Artikkeltittel
          - Byttet h3 -> h2 for korrekt semantisk hierarki (dette er hovedtittelen for denne seksjonen/artikkelen).
          - Endret 'text-lg md:text-4xl' til 'text-3xl md:text-4xl' for en jevnere, mer profesjonell responsiv overgang.
          - Byttet 'font-medium' -> 'font-bold' for å gi tittelen den tyngden den skal ha.
        */}
      <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance'>
        Felles egenberedskap – beredskapsvenn er årets tema.
      </h2>

      {/*
          FORSLAG 2: Ingress (Subtitle)
          - Byttet h4 -> p. En ingress er semantisk sett et avsnitt, ikke en underoverskrift.
          - La til 'mt-4' for å skape riktig avstand fra tittelen over.
          - Byttet 'text-article-white' til 'text-muted-foreground' for å skape et visuelt skille mellom ingress og brødtekst.
        */}
      <p className='mt-4 text-lg md:text-xl text-muted-foreground text-balance'>
        Vi ser på hvorfor funksjonell varme er den glemte nøkkelen til å faktisk
        kunne hjelpe hverandre.
      </p>

      {/*
          FORSLAG 3: Brødtekst
          - La til 'mt-8' for å skape god visuell separasjon fra ingressen.
          - Fjernet 'px-2 max-w-[98%] md:w-full md:px-0'. Slik "micro-managing" av padding/bredde bør håndteres av side-layouten (den overordnede containeren), ikke av denne div-en.
          - Fikset 'text-md' (ugyldig klasse) til 'text-base' (Tailwinds standard).
          - Fjernet 'l'' (syntaksfeil) fra det første <p>-elementet.
        */}
      <div className='mt-8 space-y-6'>
        <p className='text-base md:text-lg text-article-white leading-relaxed text-balance'>
          Myndighetene anbefaler oss å ha vann, ullpledd og soveposer klare,
          slik at vi kan håndtere et strømbrudd som varer opptil én uke. I en
          krisesituasjon vil ikke samfunnet kunne hjelpe alle samtidig. Derfor
          er det avgjørende at de av oss som har mulighet, tar ansvar for egen
          beredskap.
        </p>
        <p className='text-base md:text-lg text-article-white leading-relaxed text-balance'>
          Utekos er i hovedsak designet for å forlenge de gode stundene ute.
          Kjernen i konseptet er de innovative og praktiske 3-i-1-
          justeringsløsningene, som gjør plagget unikt allsidig.
        </p>
        <p className='text-base md:text-lg text-article-white leading-relaxed text-balance'>
          Det er imidlertid nettopp denne allsidigheten som gjør Utekos til mer
          enn bare et koseprodukt.
        </p>
        <p className='text-base md:text-lg text-article-white leading-relaxed text-balance'>
          Det er et funksjonelt beredskapselement som svarer på et av våre mest
          grunnleggende behov: varme og trygghet når det uforutsette skjer.
          Kombinasjonen av praktisk funksjon, lav vekt og kompromissløs komfort
          er en reell og verdifull oppgradering av din personlige egenberedskap.
        </p>
      </div>
    </section>
  )
}
