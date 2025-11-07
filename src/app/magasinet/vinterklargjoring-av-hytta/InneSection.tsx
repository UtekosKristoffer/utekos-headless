import { Sparkles } from 'lucide-react'
import Image from 'next/image'

// Importerer de nye bildene
import TettSprekkBilde from '@public/magasinet/tett-sprekk.png'
import KjoleskapBilde from '@public/magasinet/kjoleskap.png'
import PakkePleddBilde from '@public/magasinet/pakke-pledd.png'

export const InneSection = () => {
  return (
    <>
      <h2 className='text-3xl font-bold mt-16 mb-4 border-b border-neutral-800 pb-2'>
        Inne: Sikre verdiene og unngå overraskelser
      </h2>
      <p className='text-lg text-article-white/80 mb-8'>
        Når utsiden er sikret, er det på tide å vende blikket innover. Målet her
        er å sørge for at hytten er like frisk og innbydende når du kommer
        tilbake, og at du unngår ubehagelige overraskelser som skadedyr eller
        jordslag.
      </p>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Mus og skadedyr: Hold de ubudne gjestene ute
      </h3>
      <figure className='my-8'>
        <Image
          src={TettSprekkBilde}
          alt='Nærbilde av en hånd som tetter en sprekk i en hyttevegg med stålull for å hindre mus.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>
      <p className='text-lg text-article-white/80'>
        En tom og stille hytte er en drøm for mus og andre smågnagere. De er
        ikke bare til sjenanse; de kan gnage på ledninger, møbler og etterlate
        seg ekskrementer. Den viktigste jobben er å fjerne alt av mat. Tøm alle
        skap for tørrvarer, ta med deg alt av stearinlys (de er en delikatesse
        for mus) og til og med såpestykker. Gå en runde langs gulvlistene og se
        etter små sprekker eller åpninger, spesielt rundt rørgjennomføringer.
      </p>

      <blockquote className='not-prose my-8 p-6 bg-sidebar-foreground border-l-4 border-yellow-400 rounded-r-lg'>
        <h4 className='flex items-center gap-2 font-semibold text-xl mt-0'>
          <Sparkles className='h-5 w-5 text-yellow-400 flex-shrink-0' />{' '}
          Profftipset:
        </h4>
        <p className='text-article-white/80 !my-0 text-base'>
          Mus hater å gnage på stål. Kjøp en pakke med stålull og dytt små biter
          inn i alle sprekker og hull du finner. Det er en billig og ekstremt
          effektiv barriere.
        </p>
      </blockquote>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Kjøleskap og mat: Unngå ubehagelige overraskelser
      </h3>
      <figure className='my-8'>
        <Image
          src={KjoleskapBilde}
          alt='Et skinnende rent og tomt kjøleskap i en hytte, med døren på gløtt for vinterlagring.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>
      <p className='text-lg text-article-white/80'>
        Et avslått kjøleskap med lukket dør er en garantert oppskrift på en
        katastrofal ankomst til våren. Tøm kjøleskapet fullstendig – inkludert
        den "evigvarende" ketchupflasken og sennepen. Vask grundig over alle
        flater med eddikvann for å fjerne matrester og desinfisere. Det aller
        viktigste: <strong>La døren stå på gløtt!</strong> Plasser en stol eller
        en annen gjenstand foran, slik at døren ikke kan lukke seg. Dette sikrer
        luftsirkulasjon og forhindrer at det dannes mugg og en lukt som kan
        sette seg i hele hytten.
      </p>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Tekstiler og verdisaker: Beskytt mot fukt og tyveri
      </h3>
      <figure className='my-8'>
        <Image
          src={PakkePleddBilde}
          alt='En person som pent pakker et ullpledd ned i en gjennomsiktig plastkasse for trygg oppbevaring på hytten.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>
      <p className='text-lg text-article-white/80'>
        Fuktig og rå høstluft kan trenge inn overalt og skape jordslag i
        sengetøy, puter og håndklær. Den beste løsningen er å pakke alt av
        tekstiler i tette plastkasser eller, enda bedre, vakuumpakking-poser.
        Dette sparer ikke bare plass, men holder også alt helt tørt og friskt
        til neste sesong. Når det gjelder verdisaker som TV, dyr elektronikk
        eller kunst, er regelen enkel: Ikke la noe ligge igjen som du ikke har
        råd til å miste. Ta det med deg hjem.
      </p>
    </>
  )
}
