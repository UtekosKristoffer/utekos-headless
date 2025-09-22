import BalpanneFlow from '@/app/magasinet/balpannen-din-guide-til-den-perfekte-hostkvelden/BalpanneFlow'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Balpanne from '@public/og-image-balpanne.webp'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const BalpanneArticle = () => {
  return (
    <article className='prose prose-invert prose-lg max-w-5xl mx-auto'>
      <figure className='!my-12'>
        <Image
          src={Balpanne}
          alt='Nærbilde av en glødende bålpanne med venner i bakgrunnen.'
          width={1024}
          height={683}
          className='rounded-lg'
        />
        <figcaption className='text-center text-sm text-muted-foreground mt-2'>
          Bålpannen er høstens naturlige samlingspunkt.
        </figcaption>
      </figure>

      <p>
        Men en virkelig vellykket kveld rundt bålpannen handler om mer enn bare
        å tenne et bål. Det handler om å skape en ramme av trygghet, hygge og
        ikke minst, varig komfort. For å hjelpe deg på veien har vi laget en
        enkel huskeliste: &quot;De 5 P-ene for Perfekt Bålkos&quot;.
      </p>

      <div className='not-prose my-12'>
        <BalpanneFlow />
      </div>

      <p>
        Når du har kontroll på disse fem punktene, legger du til rette for en
        kveld der logistikken er usynlig og hyggen kan ta fullt fokus. Det
        viktigste er å fjerne alt som kan bryte den gode stemningen – enten det
        er en usikker plassering, mangel på ved, eller gjester som begynner å
        fryse.
      </p>

      <p>
        Spesielt punktet om **personlig komfort** er lett å overse, men er ofte
        det som avgjør hvor lenge kvelden varer. Et sitteunderlag hjelper, men
        den kalde luften på ryggen vinner som regel til slutt. En personlig
        varmekilde som Utekos løser dette elegant, og lar alle bli sittende i
        timevis.
      </p>

      <Card className='my-12 not-prose text-center bg-gradient-to-br from-primary/20 to-transparent border-neutral-800'>
        <CardContent className='p-8'>
          <h3 className='text-2xl font-bold mt-0'>Varm foran, varm bak</h3>
          <p className='text-muted-foreground mt-2 mb-6'>
            Utekos er den manglende brikken for perfekt bålkos. Den gir deg
            360-graders komfort, slik at du kan nyte flammene foran deg uten å
            tenke på den kjølige luften bak.
          </p>
          <Button asChild>
            <Link href='/produkter'>
              Oppgrader din bålkos
              <ArrowRightIcon className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className='my-12 not-prose bg-sidebar-foreground border-neutral-800'>
        <CardContent className='p-8'>
          <h3 className='text-2xl font-bold flex items-center gap-3 mt-0'>
            <Sparkles className='h-6 w-6 text-yellow-400' />
            Konklusjon: Skap minner, ikke bare flammer
          </h3>
          <p className='text-muted-foreground mt-4'>
            En bålpanne er en investering i samvær og minner. Ved å planlegge
            for komfort, sikrer du at de gode øyeblikkene ikke blir avbrutt av
            kulde, men kan få utfolde seg fritt under den vide høsthimmelen.
          </p>
        </CardContent>
      </Card>
    </article>
  )
}
