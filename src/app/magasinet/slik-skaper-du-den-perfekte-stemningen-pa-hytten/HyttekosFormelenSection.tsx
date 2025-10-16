import { Sparkles } from 'lucide-react'
import Image from 'next/image'

// Importerer de nye bildene
import LagdeltLysBilde from '@public/magasinet/lagdelt-lys.png'
import PeisbalHjerterytmeBilde from '@public/magasinet/peisbal-hjerterytme.png'
import FysiskKomfortBilde from '@public/magasinet/fysisk-komfort.png'
import UtekosTerrasseBilde from '@public/coffe_utekos.webp'

export const HyttekosFormelenSection = () => {
  return (
    <section aria-label='Formelen for hyttekos' className='mt-16'>
      <h3 className='text-2xl font-semibold mt-8 mb-3'>Kunsten å belyse</h3>
      <figure className='my-8 max-w-5xl mx-auto'>
        <Image
          src={LagdeltLysBilde}
          alt='Stemningsbilde av flere tente stearinlys som skaper et varmt og mykt lys.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>
      <p className='text-lg text-muted-foreground'>
        God belysning på hytten handler om å fjerne mørket, ikke å eliminere
        det. Glem det sterke, kalde taklyset. Målet er å skape lune soner og et
        mykt, innbydende lys. Tenk i lag: en leselampe ved godstolen, noen
        grupper med stearinlys på bordet, og en dimbar lysslynge drapert over en
        bjelke. Ved å bruke flere, små lyskilder i ulike høyder, skaper du et
        dynamisk og levende rom som inviterer til ro og samtale.
      </p>
      <blockquote className='not-prose my-8 p-6 bg-sidebar-foreground border-l-4 border-yellow-400 rounded-r-lg'>
        <h4 className='flex items-center gap-2 font-semibold text-xl mt-0'>
          <Sparkles className='h-5 w-5 text-yellow-400 flex-shrink-0' />{' '}
          Livsnyter-tipset:
        </h4>
        <p className='text-muted-foreground !my-0 text-base'>
          Bruk stearinlys med en diskret duft av skog eller tjære for å
          engasjere enda en sans og forsterke den lune stemningen.
        </p>
      </blockquote>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Lyden av stillhet (og litt til)
      </h3>
      <figure className='my-8 max-w-5xl mx-auto'>
        <Image
          src={PeisbalHjerterytmeBilde}
          alt='Nærbilde av rolig brennende vedkubber og glødende kull i en peis.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>
      <p className='text-lg text-muted-foreground'>
        Den dype, altoppslukende stillheten på fjellet eller ved sjøen er en
        luksus i seg selv. Men den perfekte lydkulissen kan også være den
        knitrende lyden fra peisen. Dette er hyttens hjerterytme. Unngå å
        konkurrere med den. Hvis du vil ha musikk, lag en spilleliste med rolig,
        instrumental eller akustisk musikk som kan spilles på et lavt volum i
        bakgrunnen. Lyden skal ikke kreve oppmerksomhet, den skal bare berike
        stillheten.
      </p>
      <blockquote className='not-prose my-8 p-6 bg-sidebar-foreground border-l-4 border-yellow-400 rounded-r-lg'>
        <h4 className='flex items-center gap-2 font-semibold text-xl mt-0'>
          <Sparkles className='h-5 w-5 text-yellow-400 flex-shrink-0' />{' '}
          Livsnyter-tipset:
        </h4>
        <p className='text-muted-foreground !my-0 text-base'>
          Invester i en liten, bærbar bluetooth-høyttaler med god lydkvalitet.
          Plasser den diskret i et hjørne for å fylle rommet med lav,
          stemningsfull musikk.
        </p>
      </blockquote>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        Tekstur du kan føle på
      </h3>
      <figure className='my-8 max-w-5xl mx-auto'>
        <Image
          src={FysiskKomfortBilde}
          alt='Detaljbilde av et mykt ullpledd og et saueskinn som ligger i en sofa.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>
      <p className='text-lg text-muted-foreground'>
        Hyttekos er en taktil opplevelse. Det handler om kontrastene sansene
        dine møter. Den grove treveggen mot et mykt saueskinn i sofaen. Et tykt,
        tungt ullpledd over et glatt laken. Den varme, rustikke keramikkoppen i
        hendene dine. Ved å bevisst blande ulike materialer og teksturer, skaper
        du et visuelt rikere og mer fysisk komfortabelt rom.
      </p>
      <blockquote className='not-prose my-8 p-6 bg-sidebar-foreground border-l-4 border-yellow-400 rounded-r-lg'>
        <h4 className='flex items-center gap-2 font-semibold text-xl mt-0'>
          <Sparkles className='h-5 w-5 text-yellow-400 flex-shrink-0' />{' '}
          Livsnyter-tipset:
        </h4>
        <p className='text-muted-foreground !my-0 text-base'>
          Ha en stor, flettet kurv stående ved peisen, fylt med et utvalg av
          pledd og tykke ullsokker. Det er en innbydende gest som inviterer alle
          til å finne roen og varmen.
        </p>
      </blockquote>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>Varme, inne og ute</h3>
      <figure className='my-8 max-w-5xl mx-auto'>
        <Image
          src={UtekosTerrasseBilde}
          alt='Person i en Utekos som sitter komfortabelt på en hytte-terrasse om kvelden.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>
      <p className='text-lg text-muted-foreground'>
        Peisvarmen er det udiskutable hjertet i enhver hytte. Men den virkelige
        luksusen oppstår når du kan ta med deg den komfortable varmen videre.
        Enten du skal ut på terrassen for å se på stjernene, eller bare vil
        sitte i en kjøligere del av hytten, er personlig varme nøkkelen. En
        Utekos fungerer som din bærbare peisvarme, og lar deg forlenge de
        magiske øyeblikkene i frisk luft, selv når temperaturen synker.
      </p>
      <blockquote className='not-prose my-8 p-6 bg-sidebar-foreground border-l-4 border-yellow-400 rounded-r-lg'>
        <h4 className='flex items-center gap-2 font-semibold text-xl mt-0'>
          <Sparkles className='h-5 w-5 text-yellow-400 flex-shrink-0' />{' '}
          Livsnyter-tipset:
        </h4>
        <p className='text-muted-foreground !my-0 text-base'>
          La en Utekos henge klar i gangen. Når du kommer frem til en kald
          hytte, er den det første du tar på deg. Slik starter du kosen
          umiddelbart.
        </p>
      </blockquote>
    </section>
  )
}
