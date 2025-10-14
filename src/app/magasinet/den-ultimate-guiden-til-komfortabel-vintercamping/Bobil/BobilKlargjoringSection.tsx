import { Sparkles } from 'lucide-react'

import Image from 'next/image'

import BobilStoppekranBilde from '@public/magasinet/bobil-stoppekran.png'

export const BobilKlargjoringSection = () => {
  return (
    <div className='mt-8'>
      <figure className='my-8 max-w-5xl mx-auto'>
        <Image
          src={BobilStoppekranBilde}
          alt='Nærbilde av en hånd som stenger hovedstoppekranen i en bobil, et viktig steg i vinterklargjøringen.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Isolasjon: Hold den dyrebare varmen inne
      </h3>
      <p className='text-lg text-muted-foreground'>
        Varmetap er din største fiende om vinteren. De største synderne er
        nesten alltid de store vindusflatene i førerhuset. Gå over alle
        tetningslister i dører og vinduer for å sjekke for sprekker og skader.
        Den viktigste investeringen du kan gjøre for komforten, er et sett med
        formsydde isolasjonsmatter for front- og sidevinduene foran. De
        reflekterer varmen tilbake inn i bodelen og reduserer kondens
        betraktelig.
      </p>

      <blockquote className='not-prose my-8 p-6 bg-sidebar-foreground border-l-4 border-yellow-400 rounded-r-lg'>
        <h4 className='flex items-center gap-2 font-semibold text-xl mt-0'>
          <Sparkles className='h-5 w-5 text-yellow-400 flex-shrink-0' />{' '}
          Livsnyter-tipset:
        </h4>
        <p className='text-muted-foreground !my-0 text-base'>
          Legg et tykt teppe eller en egnet matte på gulvet i førerhuset. Gulvet
          her er ofte dårligere isolert, og en matte stopper effektivt kulden
          fra å trekke opp nedenfra.
        </p>
      </blockquote>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Varmesystem: Bobilens bankende hjerte
      </h3>
      <p className='text-lg text-muted-foreground'>
        Et velfungerende varmesystem (som Alde eller Truma) er selve livsnerven
        i en vinterbobil. Før du drar, kjør en full test av systemet hjemme. La
        det gå på høy effekt i minst en time for å bekrefte at det fungerer
        stabilt. Sjekk at det kommer varm luft ut av <em>alle</em> luftdysene.
        Sørg for at ingen av dysene er blokkert av bagasje eller sko, da god
        luftsirkulasjon er avgjørende. Og viktigst av alt: sjekk at du har nok
        gass, og ta alltid med en full reserveflaske.
      </p>

      <blockquote className='not-prose my-8 p-6 bg-sidebar-foreground border-l-4 border-yellow-400 rounded-r-lg'>
        <h4 className='flex items-center gap-2 font-semibold text-xl mt-0'>
          <Sparkles className='h-5 w-5 text-yellow-400 flex-shrink-0' />{' '}
          Profftipset:
        </h4>
        <p className='text-muted-foreground !my-0 text-base'>
          Bruk ren propan, ikke en butan-blanding, på gassflaskene om vinteren.
          Propan fordamper og fungerer helt ned til -42°C, mens butan slutter å
          fungere rundt frysepunktet.
        </p>
      </blockquote>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Vannsystem: Unngå frostsprengte rør og dyre reparasjoner
      </h3>
      <p className='text-lg text-muted-foreground'>
        For å kunne bruke vann på vintertur, må systemet holdes frostfritt. De
        fleste moderne bobiler bygget for nordiske forhold har oppvarmede og
        isolerte tanker. Finn ut om din har det. Sørg for at varmen i bodelen
        alltid står på, selv om du er ute på tur, for å holde rørene frostfrie.
        Et godt tips er å helle litt frostvæske (den typen som er beregnet for
        drikkevannssystemer) i gråvannstanken. Dette forhindrer at
        avløpsventilen fryser fast – en vanlig og irriterende feil.
      </p>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Dekk og kjetting: Din livsforsikring på veien
      </h3>
      <p className='text-lg text-muted-foreground'>
        Dette punktet er ikke-diskutabelt. Gode, nordiske vinterdekk med riktig
        mønsterdybde er et lovpålagt krav og din viktigste sikkerhet. Men dekk
        alene er ikke alltid nok på norske fjellveier. Ha alltid med et sett med
        kjettinger som er tilpasset dine dekk.
      </p>

      <blockquote className='not-prose my-8 p-6 bg-sidebar-foreground border-l-4 border-yellow-400 rounded-r-lg'>
        <h4 className='flex items-center gap-2 font-semibold text-xl mt-0'>
          <Sparkles className='h-5 w-5 text-yellow-400 flex-shrink-0' />{' '}
          Profftipset:
        </h4>
        <p className='text-muted-foreground !my-0 text-base'>
          Ikke la første gang du monterer kjettinger være i en snøstorm på en
          mørk fjellovergang. Øv deg hjemme! Legg dem på og ta dem av i
          oppkjørselen en gang, slik at du vet nøyaktig hvordan de fungerer. Det
          er en ferdighet som gir uvurderlig trygghet.
        </p>
      </blockquote>
    </div>
  )
}
