import { Sparkles } from 'lucide-react'
import Image from 'next/image'

// Importerer alle bildene for 'UTE'-seksjonen
import TakrenneBilde from '@public/magasinet/takrenne.png'
import UtekranBilde from '@public/magasinet/utekran.png'
import UtemoblerBilde from '@public/magasinet/utemobler.png'

export const UteSection = () => {
  return (
    <>
      <h2 className='text-3xl font-bold mt-16 mb-4 border-b border-neutral-800 pb-2'>
        Ute: Første forsvarslinje mot elementene
      </h2>
      <p className='text-lg text-article-white/80 mb-8'>
        Det første du gjør ute legger grunnlaget for en trygg vinter for hytten.
        Vær og vind er krefter man må ha respekt for, og en liten innsats her
        beskytter din investering i fritid og kos.
      </p>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Tak og takrenner: Hyttens viktigste skjold
      </h3>
      <figure className='my-8'>
        <Image
          src={TakrenneBilde}
          alt='En person med røde hansker som renser en takrenne full av vått høstløv.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>
      <p className='text-lg text-article-white/80'>
        Før vinteren setter inn, ta en grundig sjekk av hyttens tak. En liten
        innsats her kan spare deg for tusenvis av kroner i reparasjoner. Rensk
        takrenner for løv, barnåler og rusk. Tette takrenner kan føre til at
        vann demmes opp og fryser, noe som kan skape is-svuller som presser seg
        inn under taksteinen og kan forårsake kostbare lekkasjer. Ta en rask
        visuell inspeksjon av selve taket; se etter sprukne takstein eller
        skader i takpappen. En halvtimes jobb nå er den beste og billigste
        forsikringen du kan gi din.
      </p>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Vannkraner og slanger: Unngå vinterens dyreste overraskelse
      </h3>
      <figure className='my-8'>
        <Image
          src={UtekranBilde}
          alt='En utekran dekket av et tykt lag med is og rim, som illustrerer faren for frostsprengning.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>
      <p className='text-lg text-article-white/80'>
        Vann som fryser utvider seg med en enorm kraft. En gjenglemt hageslange
        eller en utekran som ikke er tømt, kan føre til frostsprengning som ikke
        bare ødelegger utstyret, men også kan føre til alvorlige vannskader inne
        i veggen når våren kommer. Slik gjør du det riktig:
      </p>
      <ul className='list-disc list-inside space-y-2 my-4 text-lg text-article-white/80'>
        <li>Koble fra alle hageslanger.</li>
        <li>
          Tøm slangene helt for vann og lagre dem innendørs eller i en bod.
        </li>
        <li>
          Finn og steng den <strong>indre</strong> stoppekranen til utekranen.
        </li>
        <li>
          Åpne selve utekranen for å tømme ut restvannet som er fanget i røret.
          La den stå åpen gjennom vinteren.
        </li>
      </ul>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Møbler og løsøre: Beskytt investeringene dine
      </h3>
      <figure className='my-8'>
        <Image
          src={UtemoblerBilde}
          alt='Kvalitets-utemøbler i tre som er pent dekket til for vinteren med et formsydd, mørkegrått trekk på en hytteterrasse i høstsol.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>
      <p className='text-lg text-article-white/80'>
        Høstvinden og vinterens fuktighet sliter hardt på alt som står ute. Ved
        å beskytte utemøblene forlenger du levetiden betraktelig og sikrer at de
        er like fine til neste sesong. Start med å ta inn alt av puter, pledd og
        parasoller. Selve møblene bør enten settes inn i en bod eller under tak.
        Hvis de må stå ute, bruk et formsydd, pustende møbeltrekk – ikke en tett
        presning som kan fange fukt og skape jordslag. Gå en siste runde rundt
        hytten og sikre alt vinden kan ta tak i: Griller, tomme blomsterpotter,
        leker og verktøy.
      </p>

      <blockquote className='not-prose my-8 p-6 bg-sidebar-foreground border-l-4 border-yellow-400 rounded-r-lg'>
        <h4 className='flex items-center gap-2 font-semibold text-xl mt-0'>
          <Sparkles className='h-5 w-5 text-yellow-400 flex-shrink-0' />{' '}
          Livsnyter-tipset:
        </h4>
        <p className='text-article-white/80 !my-0 text-base'>
          Samle alle putene i store plastsekker og legg en duftpose (f.eks.
          lavendel) i hver sekk. Da unngår du “kjellerlukt” og blir møtt av en
          frisk og herlig duft når du pakker dem ut til våren!
        </p>
      </blockquote>
    </>
  )
}
