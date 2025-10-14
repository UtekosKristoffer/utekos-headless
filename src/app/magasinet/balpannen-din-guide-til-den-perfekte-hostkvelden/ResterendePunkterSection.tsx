import { Sparkles } from 'lucide-react'
import Image from 'next/image'

// Importerer bildene
import MarshmallowsBilde from '@public/magasinet/marshmellows-3.png'
import UtekosRyggBilde from '@public/magasinet/utekos-balpanne.png'
import PrikkenOverIEnBilde from '@public/magasinet/prikken-over-ien.png'

export const ResterendePunkterSection = () => {
  return (
    <>
      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        3. Proviantering: Planlegg for smak og hygge
      </h3>
      <figure className='my-8'>
        <Image
          src={MarshmallowsBilde}
          alt='Nærbilde av en marshmallow som grilles til perfeksjon over glørne i en bålpanne.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>
      <p className='text-lg text-muted-foreground'>
        God mat og drikke er selve hjertet i en vellykket bålkos. Hemmeligheten
        ligger i forberedelsene. Målet er å kunne nyte kvelden, ikke å stresse
        med matlaging i mørket. Klassikere som pølser på spyd, pinnebrød og
        grillede marshmallows er alltid en suksess. Forbered alt på forhånd:
        kutt grønnsaker, lag ferdig pinnebrøddeig, og ha pølsene klare. En
        termos med ferdigblandet, varm kakao eller solbærtoddy er en garantert
        stemningsskaper når temperaturen synker.
      </p>

      <blockquote className='not-prose my-8 p-6 bg-sidebar-foreground border-l-4 border-yellow-400 rounded-r-lg'>
        <h4 className='flex items-center gap-2 font-semibold text-xl mt-0'>
          <Sparkles className='h-5 w-5 text-yellow-400 flex-shrink-0' />{' '}
          Livsnyter-tipset:
        </h4>
        <p className='text-muted-foreground !my-0 text-base'>
          Lag pinnebrøddeigen klar på forhånd og oppbevar den på et Norgesglass
          i en kjølebag. Da holder den seg perfekt, og du slipper alt sølet med
          mel og deig rundt bålpannen.
        </p>
      </blockquote>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        4. Personlig komfort: Den avgjørende detaljen
      </h3>
      <figure className='my-8'>
        <Image
          src={UtekosRyggBilde}
          alt='Sett bakfra, en person i en Utekos som sitter komfortabelt og varmt mens de ser mot en bålpanne.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>
      <p className='text-lg text-muted-foreground'>
        Du kan ha perfekt ved og verdens beste pølser, men hvis gjestene
        begynner å fryse på ryggen etter en time, dør kvelden ut. Et
        sitteunderlag isolerer nedenfra, men det hjelper lite mot den kalde
        trekken som alltid kommer snikende bakfra. Her er Utekos den manglende
        brikken. Den gir deg 360-graders, personlig varme – en "varm sone" du
        sitter inne i. Du kan nyte flammene foran deg og fullstendig glemme den
        kjølige luften på ryggen. Det er forskjellen på en kveld som varer i én
        time, og en kveld som skaper minner som varer livet ut.
      </p>

      <h3 className='text-2xl font-semibold mt-8 mb-3'>
        5. Prikken over i-en: Skap den rette magien
      </h3>
      <figure className='my-8'>
        <Image
          src={PrikkenOverIEnBilde}
          alt='En magisk kveldsstemning rundt en bålpanne, innrammet av en lysslynge i et tre.'
          className='rounded-lg'
          placeholder='blur'
        />
      </figure>
      <p className='text-lg text-muted-foreground'>
        Når tryggheten, varmen og maten er på plass, gjenstår bare de små
        detaljene som løfter stemningen fra hyggelig til magisk. En enkel
        lysslynge hengt opp i et nærliggende tre gir et mykt og innbydende lys,
        uten å ødelegge bål-følelsen slik en sterk utelampe kan gjøre. Lag en
        rolig, stemningsfull spilleliste med akustisk musikk som kan spilles på
        lavt volum i bakgrunnen. Og viktigst av alt: inviter gode venner.
        Bålpannen er rammen, men det er samværet og de gode samtalene som er
        selve kunstverket. Den siste magien skaper dere selv.
      </p>
    </>
  )
}
