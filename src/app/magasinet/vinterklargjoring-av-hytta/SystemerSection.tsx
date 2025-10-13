import Image from 'next/image'

// Importerer de nye bildene
import HovedstoppekranBilde from '@public/magasinet/hovedstoppe-kran.png'
import StikkontaktBilde from '@public/magasinet/stikkontakt.png'
import UtekosOpphengtBilde from '@public/full-diagonal.webp'

export const SystemerSection = () => {
  return (
    <>
      <h2 className='text-3xl font-bold mt-16 mb-4 border-b border-neutral-800 pb-2'>
        Systemer: Den kritiske nedstengningen
      </h2>
      <p className='text-lg text-muted-foreground mb-8'>
        Dette er den tekniske, men absolutt viktigste delen av
        vinterklargjøringen. Feil her kan føre til de dyreste skadene, så ta deg
        god tid og vær systematisk.
      </p>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Vann og avløp: Vinterens viktigste operasjon
      </h3>
      <figure className='my-8'>
        <Image
          src={HovedstoppekranBilde}
          alt='Nærbilde av en hånd som stenger en rød hovedstoppekran for vann på en hytte.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>
      <p className='text-lg text-muted-foreground'>
        Frostsprengte rør er enhver hytteeiers mareritt. For å unngå dette, må
        alt vann ut av systemet.
      </p>
      <ul className='list-disc list-inside space-y-2 my-4 text-lg text-muted-primary-foreground'>
        <li>
          <strong>Steng hovedkranen:</strong> Finn hovedstoppekranen for vann
          inn til hytten og steng den helt.
        </li>
        <li>
          <strong>Åpne alt:</strong> Åpne alle vannkraner i hytten (kjøkken,
          bad, dusj) på fullt for å slippe luft inn i systemet.
        </li>
        <li>
          <strong>Tøm varmtvannsberederen:</strong> Denne har en egen
          avtappingsventil. Koble til en slange og led vannet ut.
        </li>
        <li>
          <strong>Husk toalettet:</strong> Skyll ned til sisternen er tom. Bruk
          en svamp for å fjerne det siste vannet i selve toalettskålen.
        </li>
        <li>
          <strong>Hell frostvæske</strong> (den miljøvennlige typen for
          sanitæranlegg) i alle sluk (gulv, vask, dusj) og en skvett i
          toalettskålen for å beskytte vannlåsene.
        </li>
      </ul>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Strøm og oppvarming: Trygghet og økonomi
      </h3>
      <figure className='my-8'>
        <Image
          src={StikkontaktBilde}
          alt='En hånd som drar ut stikkontakten til en lampe i en koselig hyttestue.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>
      <p className='text-lg text-muted-foreground'>
        Reduser brannfare og strømregning med noen enkle grep. Dra ut
        stikkontakten på alle apparater som ikke må ha strøm: TV, kaffetrakter,
        lamper og ladere. Hvis du har mulighet, sett på en lav vedlikeholdsvarme
        (5-10 °C) i hovedrommet. Dette er den beste måten å bekjempe fukt og
        råte på, og det gjør oppvarmingen ved neste ankomst mye raskere.
      </p>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Personlig komfort: Forberedelsen for en perfekt ankomst
      </h3>
      <figure className='my-8'>
        <Image
          src={UtekosOpphengtBilde}
          alt='En Utekos henger klar på en knagg i en rustikk hyttegang, klar for neste ankomst.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>
      <p className='text-lg text-muted-foreground'>
        Dette er "livsnyterens" siste, og kanskje viktigste, punkt. Etter at alt
        det praktiske er gjort, handler det om å legge til rette for fremtidig
        kos. Tenk på følelsen av å ankomme en iskald hytte midtvinters. I stedet
        for å bruke den første timen på å fryse, kan du tre rett inn i din
        personlige kokong av varme med en Utekos som henger klar. Slik starter
        du hyttekosen i det sekundet du går over dørstokken.
      </p>
    </>
  )
}
