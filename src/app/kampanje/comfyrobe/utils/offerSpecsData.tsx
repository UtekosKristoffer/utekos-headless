import React from 'react'
import {
  Layers,
  Wind,
  Thermometer,
  Info,
  Maximize,
  Droplets
} from 'lucide-react'

export interface AccordionItem {
  id: string
  title: string
  icon: React.ReactNode
  content: React.ReactNode
}

export const ACCORDION_DATA: AccordionItem[] = [
  {
    id: 'materials',
    title: 'Materialer',
    icon: <Layers className='w-4 h-4' />,
    content: (
      <div className='grid gap-6 sm:grid-cols-2 text-sm text-slate-300'>
        <div className='space-y-2'>
          <h4 className='font-bold text-white uppercase tracking-wide text-xs border-b border-slate-700 pb-1 mb-2'>
            Fôrstoff
          </h4>
          <p className='font-medium text-sky-400'>
            SherpaCore™ Thermal Lining
          </p>
          <ul className='space-y-1 list-disc list-inside text-slate-400'>
            <li>Mykt og luftig</li>
            <li>100% polyester</li>
            <li>250 GSM</li>
            <li>Antipeeling behandlet</li>
            <li>Slitesterk og rivebestandig hamp i kragen</li>
          </ul>
        </div>
        <div className='space-y-2'>
          <h4 className='font-bold text-white uppercase tracking-wide text-xs border-b border-slate-700 pb-1 mb-2'>
            Ytterstoff
          </h4>
          <p className='font-medium text-sky-400'>HydroGuard™ Shell</p>
          <ul className='space-y-1 list-disc list-inside text-slate-400'>
            <li>100% Polyester</li>
            <li>8000mm vannsøyle</li>
            <li>130 GSM</li>
            <li>Pustende PU-belegg</li>
            <li>
              Glidelåser: <span className='text-white'>YKK®</span>
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'features',
    title: 'Funksjoner',
    icon: <Wind className='w-4 h-4' />,
    content: (
      <div className='space-y-4 text-sm text-slate-300'>
        <div>
          <h4 className='font-bold text-white mb-1'>Vanntett og vindtett</h4>
          <p className='leading-relaxed text-slate-400'>
            Med en vannsøyle på minimum 8000 mm, pustende membran (~3000 g/m²/24
            t) og tapede sømmer, holder Comfyrobe™ deg tørr i regn og skjermer
            deg effektivt mot vind - uten klamhet.
          </p>
        </div>
        <div>
          <h4 className='font-bold text-white mb-1'>Varm og hurtigtørkende</h4>
          <p className='leading-relaxed text-slate-400'>
            Innvendig fôr i SherpaCore™ plysj gir umiddelbar varmeisolering.
            Materialet er utviklet for å absorbere restfuktighet, noe som gjør
            den ideell rett etter isbad eller vannsport.
          </p>
        </div>
        <div>
          <h4 className='font-bold text-white mb-1'>Gjennomtenkt design</h4>
          <ul className='space-y-1 list-disc list-inside text-slate-400'>
            <li>
              Stor, romslig og justerbar hette for ekstra beskyttelse og
              fleksibilitet.
            </li>
            <li>
              Toveis YKK®-glidelås for enkel av- og påkledning – både innenfra
              og utenfra.
            </li>
            <li>Splitt bak og i sidene gir økt bevegelighet og komfort.</li>
            <li>Unisex-snitt på baksiden.</li>
            <li>Refleksdetaljer diskret integrert for synlighet i mørket.</li>
            <li>
              Praktiske lommer: To varme, fôrede sidelommer og en innerlomme for
              oppbevaring av personlige eiendeler.
            </li>
          </ul>
        </div>
        <div>
          <h4 className='font-bold text-white mb-1'>Justerbar ermekant</h4>
          <p className='leading-relaxed text-slate-400'>
            Plagget har en forhøyet stropp med borrelås ved ermekanten. Dette
            gjør det enkelt å stramme eller løsne ermet etter behov – perfekt
            for å holde vind og vær ute, eller for å tilpasse passformen over
            hansker.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'properties',
    title: 'Egenskaper',
    icon: <Thermometer className='w-4 h-4' />,
    content: (
      <div className='space-y-4 text-sm text-slate-300'>
        <div>
          <h4 className='font-bold text-white mb-1'>
            Bredt bruksområde i all slags vær
          </h4>
          <p className='leading-relaxed text-slate-400 mb-2'>
            Egnet som varmeplagg rett etter et isbad, et varmende og beskyttende
            lag når du nyter kvelden på terrassen eller som skalljakke i
            hverdagen.
          </p>
          <p className='leading-relaxed text-slate-400 mb-2'>
            Perfekt for campingturer, bobilferier, som en varmende kåpe på kalde
            tribuner, eller bare for å alltid ha en trygt valg i garderoben.
          </p>
          <p className='leading-relaxed text-slate-400'>
            Med sitt ryddige og stilfulle utseende sørger Comfyrobe for at du er
            helgradert både komfort- og motemessig for dine aller fleste
            fremtidige ærend.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'usage',
    title: 'Bruksområder',
    icon: <Info className='w-4 h-4' />,
    content: (
      <div className='grid gap-4 sm:grid-cols-2 text-sm text-slate-300'>
        <div>
          <h4 className='font-bold text-white border-b border-slate-700 pb-1 mb-2'>
            Fritidsbruk
          </h4>
          <ul className='space-y-1 list-disc list-inside text-slate-400'>
            <li>Til hverdagsbruk</li>
            <li>For tilskuere på kalde idrettsarrangement og tribuner</li>
            <li>Når du lufter hunden eller henter posten på sure dager</li>
          </ul>
        </div>
        <div>
          <h4 className='font-bold text-white border-b border-slate-700 pb-1 mb-2'>
            Leir og hytteliv
          </h4>
          <ul className='space-y-1 list-disc list-inside text-slate-400'>
            <li>Som morgen- og kveldsplagg på hytten eller terrassen</li>
            <li>I og rundt bobilen eller campingvognen</li>
            <li>Kveldskos rundt bålpannen</li>
          </ul>
        </div>
        <div className='sm:col-span-2'>
          <h4 className='font-bold text-white border-b border-slate-700 pb-1 mb-2'>
            På tur og i friluft
          </h4>
          <ul className='space-y-1 list-disc list-inside text-slate-400 sm:grid sm:grid-cols-2 sm:gap-x-4'>
            <li>Som et vann- og vindtett ytterplagg på turer i ruskevær</li>
            <li>På post under jakt, fiske og naturopplevelser</li>
            <li>Før og etter utendørs trening</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'fit',
    title: 'Passform',
    icon: <Maximize className='w-4 h-4' />,
    content: (
      <div className='space-y-3 text-sm text-slate-300'>
        <p className='text-slate-400'>
          Comfyrobe™ har en <strong className='text-white'>romslig</strong>,{' '}
          <strong className='text-white'>unisex</strong> og{' '}
          <strong className='text-white'>avslappet</strong> passform.
        </p>
        <p className='text-slate-400'>
          Den er bevisst designet slik at den enkelt kan trekkes over våte klær
          og tykke gensere. Splittene i sidene og bak sikrer at du fortsatt har
          god bevegelsesfrihet, selv med den store størrelsen. Oppleves
          komfortabel, omsluttende og robust.
        </p>
        <div className='bg-sky-900/20 border border-sky-800/50 rounded-lg p-3 mt-2'>
          <h5 className='font-bold text-sky-400 mb-1 flex items-center gap-2'>
            Finn din perfekte match!
          </h5>
          <p className='text-xs text-sky-200/80'>
            Bruk linken ved størrelsevelgeren og i menyen over for å se de
            nøyaktige målene.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'wash',
    title: 'Vaskeanvisning',
    icon: <Droplets className='w-4 h-4' />,
    content: (
      <div className='space-y-4 text-sm text-slate-300'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <h4 className='font-bold text-white mb-1'>Maskinvask</h4>
            <p className='text-slate-400'>Maks 40°C. Skånsomt program.</p>
          </div>
          <div>
            <h4 className='font-bold text-white mb-1'>Vaskemiddel</h4>
            <p className='text-slate-400'>
              Bruk mildt vaskemiddel. Ikke benytt blekemiddel.
            </p>
          </div>
        </div>

        <div>
          <h4 className='font-bold text-white mb-1'>Tørking</h4>
          <p className='text-slate-400 mb-2'>
            <span className='text-amber-400 font-medium'>
              Unngå tørketrommelen
            </span>{' '}
            som hovedregel for å bevare vanntettheten lengst mulig.
          </p>
          <ul className='list-disc list-inside text-slate-400 space-y-1'>
            <li>
              Om nødvendig kan den tromles på lav temperatur i kort periode for
              å &quot;fluffe&quot; opp fôret.
            </li>
            <li>Pass på at ytterstoffet ikke utsettes for høy varme.</li>
            <li>
              Ideelt tørkes plagget hengende – det indre fleece-laget vil slippe
              det meste av vannet ganske raskt, og resten kan drypptørke.
            </li>
          </ul>
        </div>

        <div>
          <h4 className='font-bold text-white mb-1'>Vedlikehold</h4>
          <p className='text-slate-400'>
            Etter vask kan det være lurt å etterbehandle det vannavvisende laget
            med egnet spray eller impregnering i ny og ne, spesielt om du merker
            at vann ikke lenger perler seg på overflaten. Heng gjerne til
            lufting etter bruk.
          </p>
        </div>
      </div>
    )
  }
]
