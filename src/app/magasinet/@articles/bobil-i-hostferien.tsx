import { SectionMagasinetBobilHostferien } from '@/app/magasinet/bobil-i-hostferien/SectionMagasinetBobilHostferien'
import { RouteDetailsGrid } from '@/app/magasinet/bobil-i-hostferien/RouteDetailsGrid'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import BobilHost from '@public/og-image-bobil-host.webp'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const routeDetailsData = [
  {
    icon: 'mountainSnow' as const,
    title: 'Rute 1: Fjell & Fjord-ruten',
    description:
      'Denne klassiske reisen tar deg over mektige fjelloverganger og ned til de verdenskjente fjordene, nå kledd i høstens varme farger. Perfekt for deg som elsker dramatiske kontraster.',
    color: 'from-cyan-500/20',
    iconColor: 'text-cyan-400'
  },
  {
    icon: 'trees' as const,
    title: 'Rute 2: Villmark & Kultur-ruten',
    description:
      'For deg som søker roen og de dype skogene, er denne ruten gjennom Øst-Norge en innertier. Her finner du endeløse veier gjennom fargesprakende skoger, nasjonalparker og historisk kultur.',
    color: 'from-emerald-500/20',
    iconColor: 'text-emerald-400'
  }
]

export const BobilHostruterArticle = () => {
  return (
    <article className='prose prose-invert prose-lg max-w-5xl mx-auto'>
      <figure className='!my-12'>
        <Image
          src={BobilHost}
          alt='En bobil parkert i et landskap med spektakulære høstfarger.'
          width={1920}
          height={1080}
          className='rounded-lg'
        />
        <figcaption className='text-center text-sm text-muted-foreground mt-2'>
          Friheten til å følge de gylne veiene.
        </figcaption>
      </figure>

      <p>
        Høsten er kanskje den aller beste tiden å oppleve Norge fra en bobil.
        Turistmengdene har avtatt, luften er skarp og klar, og naturen setter på
        seg sin mest fargerike drakt. Friheten til å stoppe der du vil, koke
        kaffe med utsikt over et blikkstille fjellvann, og våkne til nye, gylne
        landskap hver dag, er uslåelig.
      </p>
      <p>
        Men hvor skal man dra? For å hjelpe deg i gang har vi laget to forslag
        til uforglemmelige ruter som er som skapt for høstferien.
      </p>

      <div className='not-prose my-12'>
        <SectionMagasinetBobilHostferien />
      </div>

      {/* KORRIGERT: Erstatter den gamle teksten med den nye, visuelle grid-komponenten */}
      <div className='not-prose my-16'>
        <RouteDetailsGrid elements={routeDetailsData} />
      </div>

      <Card className='my-12 not-prose text-center bg-gradient-to-br from-primary/20 to-transparent border-neutral-800'>
        <CardContent className='p-8'>
          <h3 className='text-2xl font-bold mt-0'>
            Komfort for de kjølige kveldene
          </h3>
          <p className='text-muted-foreground mt-2 mb-6'>
            Den beste delen av turen er ofte å parkere for kvelden, finne frem
            stolene og bare nyte utsikten. Med Utekos kan du sitte ute i den
            skarpe høstluften i timevis, fullstendig komfortabel og varm.
          </p>
          <Button asChild>
            <Link href='/produkter'>
              Gjør bobilen høstklar
              <ArrowRightIcon className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className='my-12 not-prose bg-sidebar-foreground border-neutral-800'>
        <CardContent className='p-8'>
          <h3 className='text-2xl font-bold flex items-center gap-3 mt-0'>
            <Sparkles className='h-6 w-6 text-yellow-400' />
            Konklusjon: Grip muligheten
          </h3>
          <p className='text-muted-foreground mt-4'>
            Høstferien er en gyllen mulighet til å oppleve Norge på en ny måte.
            Med en varm og komfortabel base i bobilen, er det bare å fylle
            dieseltanken og la fargene vise vei. God tur!
          </p>
        </CardContent>
      </Card>
    </article>
  )
}
