import HyttekosFlow from '@/app/magasinet/slik-skaper-du-den-perfekte-stemningen-pa-hytten/HyttekosFlow'
import { HyttekosFormelenSection } from '@/app/magasinet/slik-skaper-du-den-perfekte-stemningen-pa-hytten/HyttekosFormelenSection'
import { HyttekosElementsGrid } from '@/app/magasinet/slik-skaper-du-den-perfekte-stemningen-pa-hytten/HyttekosElementsGrid'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import HyttePeis from '@public/og-image-hytte.webp'
import { Sparkles, Compass } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Dataen for grid-komponenten er fjernet herfra.
// Den vil bli sendt som en "prop" fra den dynamiske siden.
const hyttekosElementsData = [
  {
    icon: 'lightbulb' as const,
    title: '1. Kunsten å belyse',
    description:
      'Unngå sterke taklys. Fokuser på flere, små lyskilder i ulike høyder som stearinlys og lysslynger for å skape et mykt og innbydende lys.',
    color: 'from-amber-500/20',
    iconColor: 'text-amber-400'
  },
  {
    icon: 'music' as const,
    title: '2. Lyden av stillhet (og litt til)',
    description:
      'Lyden av knitrende ved, en rolig spilleliste, eller den dype stillheten fra naturen er luksus. Omfavn roen.',
    color: 'from-violet-500/20',
    iconColor: 'text-violet-400'
  },
  {
    icon: 'layers' as const,
    title: '3. Tekstur du kan føle på',
    description:
      'Introduser taktile elementer som myke saueskinn, grove ullpledd og robust treverk for å skape en følelse av varme og trygghet.',
    color: 'from-orange-500/20',
    iconColor: 'text-orange-400'
  },
  {
    icon: 'thermometer' as const,
    title: '4. Varme, inne og ute',
    description:
      'Peisvarmen er hjertet i hytten. Forleng denne følelsen ut på terrassen med Utekos for å nyte de magiske øyeblikkene i frisk luft.',
    color: 'from-rose-500/20',
    iconColor: 'text-rose-400'
  }
]

export const HyttekosArticle = () => {
  return (
    <article className='md:max-w-4xl mx-auto'>
      <figure className='!my-12'>
        <Image
          src={HyttePeis}
          alt='Stemningsbilde av et koselig hytteinteriør om kvelden.'
          width={1500}
          height={1000}
          className='rounded-lg'
          priority
        />
        <figcaption className='text-center text-sm text-muted-foreground mt-2'>
          Den etterlengtede roen senker seg på hytten.
        </figcaption>
      </figure>

      <p className='text-lg text-muted-foreground'>
        Ordet &quot;hyttekos&quot; er nesten hellig for oss nordmenn. Det
        fremkaller bilder av snødekte landskap, knitrende peisbål og en dyp
        følelse av ro. Men hva er det egentlig som skaper denne magiske
        stemningen? Det er en nøye balansert formel av fire elementer som jobber
        sammen for å påvirke sansene våre.
      </p>

      <h2 className='flex items-center mt-12 mb-4 gap-3 text-3xl font-bold'>
        <Compass className='text-amber-800' />
        Hyttekos-formelen
      </h2>
      <Card className='bg-sidebar-foreground border-neutral-800 my-8'>
        <CardContent className='p-6'>
          <p className='text-muted-foreground mt-0'>
            Den perfekte hyttestemningen er en sum av fire deler. Når du bevisst
            jobber med alle fire, løfter du opplevelsen til et nytt nivå:
          </p>
          <div className='mt-6'>
            <HyttekosFlow />
          </div>
        </CardContent>
      </Card>

      <div className='my-16'>
        <HyttekosElementsGrid elements={hyttekosElementsData} />
      </div>
      <HyttekosFormelenSection />

      <Card className='my-12 text-center bg-gradient-to-br from-primary/20 to-transparent border-neutral-800'>
        <CardContent className='p-8'>
          <h3 className='text-2xl font-bold mt-0'>Forleng peisvarmen</h3>
          <p className='text-muted-foreground mt-2 mb-6'>
            Utekos er designet for å være din personlige komfortsone, slik at du
            kan nyte de magiske øyeblikkene på hytten – både inne og ute.
          </p>
          <Button asChild>
            <Link href='/produkter'>
              Utforsk kolleksjonen
              <ArrowRightIcon className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className='relative overflow-hidden my-12 bg-sidebar-foreground border-neutral-800'>
        <div
          className='absolute inset-0 opacity-5'
          style={{
            background:
              'linear-gradient(135deg, #facc1520 0%, transparent 100%)'
          }}
        />

        <div
          className='absolute inset-0 rounded-lg blur-xl opacity-20'
          style={{ background: '#facc15' }}
        />

        <CardContent className='relative z-10 p-8'>
          <h3 className='text-2xl font-bold flex items-center gap-3 mt-0'>
            <Sparkles className='h-6 w-6 text-yellow-400' />
            Konklusjon: Mestring av kunsten
          </h3>
          <p className='text-muted-foreground mt-4'>
            Ved å bevisst tenke på samspillet mellom lys, lyd, tekstur og varme,
            går du fra å bare være på hytten, til å aktivt skape den dype,
            meningsfulle roen som er ekte hyttekos. Det er en kunst, men en
            kunst alle kan mestre.
          </p>
        </CardContent>
      </Card>
    </article>
  )
}
