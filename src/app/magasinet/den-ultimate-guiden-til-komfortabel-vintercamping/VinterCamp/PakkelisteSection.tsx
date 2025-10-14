import { Sparkles } from 'lucide-react'
import Image from 'next/image'

import UtekosSaueskinnBilde from '@public/magasinet/utekos-saueskinn.png'

export const PakkelisteSection = () => {
  return (
    <div className='mt-8'>
      <figure className='my-8 max-w-5xl mx-auto'>
        <Image
          src={UtekosSaueskinnBilde}
          alt="En estetisk 'flat lay' av komfort-utstyr for vintercamping, med en Utekos, ulltøy og tøfler."
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Ull innerst: Din personlige termostat
      </h3>
      <p className='text-lg text-muted-foreground'>
        Dette er den viktigste regelen. Ullundertøy, spesielt i merinoull, er
        din desidert beste venn i kulden. I motsetning til bomull, som blir
        kaldt og farlig når det blir fuktig, har ull den unike egenskapen at det
        transporterer fukt bort fra huden og fortsetter å isolere selv om du
        blir svett. Tenk på det som din innerste, smarte termostat.
      </p>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Gode tøfler: Luksus for kalde gulv
      </h3>
      <p className='text-lg text-muted-foreground'>
        Selv med varmesystemet på fullt, er gulvet i en bobil ofte det kaldeste
        punktet. Kulden fra bakken trekker opp, og kalde føtter sprer seg raskt
        til resten av kroppen. Et par tykke, isolerte tøfler med en solid såle
        er en liten luksus som utgjør en enorm forskjell for den generelle
        komfortfølelsen.
      </p>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Vinterdyne og sovepose: Invester i god søvn
      </h3>
      <p className='text-lg text-muted-foreground'>
        En god natts søvn er avgjørende for å kunne nyte de korte, vakre
        vinterdagene. En vanlig sommerdyne er ikke nok når temperaturen kryper
        nedover. Invester i en skikkelig vinterdyne med godt fyll, eller en
        komfortabel sovepose som er klassifisert for minusgrader. Dette er ikke
        stedet å spare penger.
      </p>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Utekos-plagget: Ditt hemmelige våpen for komfort
      </h3>
      <p className='text-lg text-muted-foreground'>
        Dette er plagget som fyller alle de små "hullene" i komforten. Det er
        perfekt for de iskalde morgenene før varmesystemet har fått jobbet seg
        opp, for den raske turen ut for å sjekke været, eller for å kunne sitte
        ute og nyte en kopp kaffe i den skarpe vinterluften. Se på det som din
        personlige komfortsone – plagget du tar på deg for å umiddelbart
        forlenge de gode øyeblikkene, både inne i en kjølig bobil og ute i
        vinterlandskapet.
      </p>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Godt lys: Forleng de korte vinterdagene
      </h3>
      <p className='text-lg text-muted-foreground'>
        Vinterdagene er korte og mørket kommer fort. Å famle rundt på en mørk
        campingplass er unødvendig styr. En god hodelykt er essensielt, da den
        frigjør begge hendene dine til praktiske gjøremål som å koble til strøm
        eller fylle vann.
      </p>

      <blockquote className='not-prose my-8 p-6 bg-sidebar-foreground border-l-4 border-yellow-400 rounded-r-lg'>
        <h4 className='flex items-center gap-2 font-semibold text-xl mt-0'>
          <Sparkles className='h-5 w-5 text-yellow-400 flex-shrink-0' />{' '}
          Livsnyter-tipset:
        </h4>
        <p className='text-muted-foreground !my-0 text-base'>
          Ha en liten, dedikert lommelykt liggende fast ved sengen. Skulle du
          trenge å stå opp om natten, slipper du å lete i mørket eller vekke
          reisefølget med å slå på det sterke hovedlyset i bobilen.
        </p>
      </blockquote>
    </div>
  )
}
