import { Sparkles } from 'lucide-react'
import Image from 'next/image'

import DenUltimateHyggenBilde from '@public/magasinet/den-ultimate-hyggen.png'

export const VintercampLivetSection = () => {
  return (
    <div className='mt-8'>
      <figure className='my-8 max-w-5xl mx-auto'>
        <Image
          src={DenUltimateHyggenBilde}
          alt='Utsikt fra innsiden av en varm bobil, med en dampende kaffekopp i vinduskarmen og et snødekt landskap utenfor.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>

      <p className='text-lg text-article-white'>
        Når det er kaldt ute og varmt inne, er kondens uunngåelig. Vi puster og
        lager mat, noe som skaper fuktig luft. Hvis denne fukten ikke luftes ut,
        setter den seg i sengetøy og vegger og kan skape et dårlig inneklima.
        Løsningen er å "sjokklufte": Åpne opp flere vinduer og luker helt i 2-3
        minutter, et par ganger om dagen. Dette bytter ut all luften i bobilen
        raskt, uten å kjøle ned selve interiøret. Varmen kommer derfor fort
        tilbake.
      </p>

      <blockquote className='not-prose my-8 p-6 bg-sidebar-foreground border-l-4 border-yellow-400 rounded-r-lg'>
        <h4 className='flex items-center gap-2 font-semibold text-xl mt-0'>
          <Sparkles className='h-5 w-5 text-yellow-400 flex-shrink-0' />{' '}
          Livsnyter-tipset:
        </h4>
        <p className='text-article-white !my-0 text-base'>
          Bruk alltid kjøkkenviften når du koker vann eller lager mat, og tørk
          opp vannsøl på badet umiddelbart. Hver dråpe vann du fjerner, er en
          dråpe som ikke ender som is på innsiden av et vindu.
        </p>
      </blockquote>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Kom deg ut: Nyt det magiske vinterlyset
      </h3>
      <p className='text-lg text-article-white'>
        Selve poenget med vintercamping er å oppleve den unike naturen.
        Vinterdagene er korte, og lyset er ofte spektakulært. Ikke la deg fange
        inne i bobilen hele dagen. Kle deg godt og kom deg ut. En kort gåtur i
        den knirkende snøen, en runde på ski, eller bare det å sitte ute i
        solveggen med en kopp kaffe, gir energi og en dyp følelse av ro.
        Dessuten gjør det følelsen av å komme tilbake til den varme, lune
        bobilen enda bedre.
      </p>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Skap hygge: De små detaljene som teller
      </h3>
      <p className='text-lg text-article-white'>
        Når mørket senker seg, er det tid for å skape den gode stemningen inne.
        Dette er "hyttekos-formelen" i praksis. Demp hovedbelysningen og bruk
        flere små lyskilder som lysslynger og LED-stearinlys for å skape en lun
        atmosfære. Ha en termos med varm drikke klar, og pakk deg inn i et mykt
        ullpledd. Dette er øyeblikkene som definerer en vellykket vintertur.
      </p>

      <blockquote className='not-prose my-8 p-6 bg-sidebar-foreground border-l-4 border-yellow-400 rounded-r-lg'>
        <h4 className='flex items-center gap-2 font-semibold text-xl mt-0'>
          <Sparkles className='h-5 w-5 text-yellow-400 flex-shrink-0' />{' '}
          Livsnyter-tipset:
        </h4>
        <p className='text-article-white !my-0 text-base'>
          Pakk med et par gode brettspill eller en bok du har gledet deg til å
          lese. Vinterkveldene er lange, og å koble helt av med analog
          underholdning er en perfekt måte å finne roen og nyte nuet på.
        </p>
      </blockquote>
    </div>
  )
}
