import { Sparkles } from 'lucide-react'
import Image from 'next/image'

// Importerer bildene
import BalpanneSteinhelleBilde from '@public/magasinet/balpanne-steinheller.png'
import StillebenBilde from '@public/magasinet/stilleben.png'

export const PlasseringOgPreparasjonerSection = () => {
  return (
    <>
      <h2 className='text-3xl font-bold mt-16 mb-4 border-b border-neutral-800 pb-2'>
        De 5 P-ene: Fra planlegging til perfeksjon
      </h2>
      <p className='text-lg text-access/70 mb-8'>
        Ved å tenke gjennom disse fem punktene på forhånd, fjerner du all
        logistikk og stress, og lar kvelden handle om det den skal: hygge,
        samvær og gode samtaler.
      </p>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        1. Plassering: Fundamentet for en trygg og hyggelig kveld
      </h3>
      <figure className='my-8'>
        <Image
          src={BalpanneSteinhelleBilde}
          alt='En bålpanne som er trygt plassert på steinheller i en hage, med en varmt opplyst hytte i bakgrunnen.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>
      <p className='text-lg text-access/70'>
        Å velge riktig sted for bålpannen er det viktigste du gjør for
        sikkerheten og komforten. Underlaget må være stabilt og ikke-brennbart –
        steinheller, grus eller sand er ideelt. Unngå å plassere den direkte på
        en tørr plen eller en treterrasse uten en beskyttende gnistfanger-plate
        under. Hold god avstand til bygninger, trær og annet brennbart
        materiale; en god tommelfingerregel er minst 3 meter. Ta også en rask
        sjekk av vindretningen før du plasserer stolene. Det er lite hyggelig
        for gjestene (eller naboen) å sitte i en konstant strøm av røyk.
      </p>

      <blockquote className='not-prose my-8 p-6 bg-sidebar-foreground border-l-4 border-yellow-400 rounded-r-lg'>
        <h4 className='flex items-center gap-2 font-semibold text-xl mt-0'>
          <Sparkles className='h-5 w-5 text-yellow-400 flex-shrink-0' />{' '}
          Livsnyter-tipset:
        </h4>
        <p className='text-access/70 !my-0 text-base'>
          Legg en dedikert metallplate eller noen steinheller under bålpannen,
          selv om den står på grus. Det forhindrer permanent misfarging av
          underlaget og gjør oppryddingen etterpå mye enklere.
        </p>
      </blockquote>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        2. Preparasjoner: Nøkkelen til en uanstrengt kveld
      </h3>
      <figure className='my-8'>
        <Image
          src={StillebenBilde}
          alt='Et organisert stilleben ved siden av en bålpanne, med en stabel bjørkeved og opptenningsutstyr klart til bruk.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>
      <p className='text-lg text-access/70'>
        En vellykket bålkveld kjennetegnes av god flyt. Ingenting bryter
        stemningen mer enn å måtte lete etter tørr ved eller en lighter i
        mørket. Ha alt klart <em>før</em> gjestene kommer. Sørg for at du har en
        god beholdning med <strong>tørr ved</strong>, rikelig med{' '}
        <strong>opptenningsved</strong> eller briketter, og en pålitelig{' '}
        <strong>lighter</strong> eller fyrstikker. Det aller viktigste, og ofte
        glemte, er <strong>slukkeutstyr</strong>. Ha en bøtte med vann eller
        sand stående lett tilgjengelig. Da kan du forlate bålpannen med senkede
        skuldre når kvelden er over.
      </p>
    </>
  )
}
