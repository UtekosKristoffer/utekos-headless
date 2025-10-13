import VinterklargjoringFlow from '@/app/magasinet/vinterklargjoring-av-hytta/VinterklargjoringFlow'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import AutomnCabin from '@public/og-image-hytte-host.webp'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { UteSection } from '@/app/magasinet/vinterklargjoring-av-hytta/UteSection'
import { InneSection } from '@/app/magasinet/vinterklargjoring-av-hytta/InneSection'
import { SystemerSection } from '@/app/magasinet/vinterklargjoring-av-hytta/SystemerSection'
export const VinterklargjoringArticle = () => {
  return (
    // Fjern prose-klassene, siden vi nå styler manuelt
    <article className='md:max-w-5xl mx-auto'>
      <figure className='!my-12'>
        <Image
          src={AutomnCabin}
          alt='En idyllisk hytte omgitt av høstfarger.'
          width={1920}
          height={1080}
          className='rounded-lg'
          priority
        />
        <figcaption className='text-center text-sm text-muted-foreground mt-2'>
          En velstelt hytte er en trygg hytte.
        </figcaption>
      </figure>

      <p className='text-lg text-muted-foreground'>
        For en livsnyter handler vinterklargjøring om mer enn bare vedlikehold –
        det handler om forberedelse til fremtidig kos. En grundig jobb nå betyr
        en problemfri og umiddelbart hyggelig ankomst når skisesongen starter.
        Vi har brutt ned prosessen i tre oversiktlige hovedområder:
      </p>

      <div className='my-12'>
        <VinterklargjoringFlow />
      </div>

      <UteSection />
      <InneSection />
          <SystemerSection />
      <p className='text-lg text-muted-foreground mt-8'>
        Ved å systematisk gå gjennom disse punktene, kan du forlate hytten med
        senkede skuldre, vel vitende om at du har gjort alt du kan for å
        beskytte din investering i fritid og livskvalitet. Den viktigste delen
        av sjekklisten er kanskje den siste: å planlegge for din egen komfort
        ved neste ankomst. En kald hytte kan ta timer å varme opp, og det er da
        øyeblikkelig personlig varme blir den ultimate luksusen.
      </p>

      <Card className='my-12 text-center bg-gradient-to-br from-primary/20 to-transparent border-neutral-800'>
        <CardContent className='p-8'>
          <h3 className='text-2xl font-bold mt-0'>
            Gjør ankomsten til en glede
          </h3>
          <p className='text-muted-foreground mt-2 mb-6'>
            Legg igjen en Utekos på hytten. Det er din garanti for øyeblikkelig
            komfort og varme, lenge før peisen har rukket å gjøre jobben sin.
            Start hyttekosen i det du går inn døren.
          </p>
          <Button asChild>
            <Link href='/produkter'>
              Sikre neste hyttetur
              <ArrowRightIcon className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className='my-12 bg-sidebar-foreground border-neutral-800'>
        <CardContent className='p-8'>
          <h3 className='text-2xl font-bold flex items-center gap-3 mt-0'>
            <Sparkles className='h-6 w-6 text-yellow-400' />
            Konklusjon: En jobb for fremtiden
          </h3>
          <p className='text-muted-foreground mt-4'>
            En time eller to med innsats om høsten gir uvurderlig trygghet
            gjennom vinteren og en langt mer behagelig start på neste sesong.
            Det er en investering i fremtidige, bekymringsløse stunder – selve
            essensen av hyttelivet.
          </p>
        </CardContent>
      </Card>
    </article>
  )
}
