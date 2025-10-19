import BalpanneFlow from '@/app/magasinet/balpannen-din-guide-til-den-perfekte-hostkvelden/BalpanneFlow'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Balpanne from '@public/magasinet/bal2.png'
import { FolderCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PlasseringOgPreparasjonerSection } from '@/app/magasinet/balpannen-din-guide-til-den-perfekte-hostkvelden/PlasseringOgPreparasjonerSection'
import { ResterendePunkterSection } from '@/app/magasinet/balpannen-din-guide-til-den-perfekte-hostkvelden/ResterendePunkterSection'
export const BalpanneArticle = () => {
  return (
    <article className='md:max-w-4xl mx-auto'>
      <figure className='!my-12'>
        <Image
          src={Balpanne}
          alt='Nærbilde av en glødende bålpanne med venner i bakgrunnen.'
          width={1024}
          height={683}
          className='rounded-lg mx-auto'
          priority
        />
        <figcaption className='text-center text-sm text-access/80 mt-2'>
          Bålpannen er høstens naturlige samlingspunkt.
        </figcaption>
      </figure>

      <p className='text-lg text-access/80'>
        Men en virkelig vellykket kveld rundt bålpannen handler om mer enn bare
        å tenne et bål. Det handler om å skape en ramme av trygghet, hygge og
        ikke minst, varig komfort. Med litt planlegging får dere jevn varme, god
        flyt og færre avbrytelser gjennom kvelden. For å hjelpe deg på veien har
        vi laget en enkel huskeliste: &quot;De 5 P-ene for perfekt bålkos&quot;
        – en rask sjekk som sikrer riktig plassering, riktig utstyr og riktig
        stemning fra start til slutt.
      </p>

      <div className='my-12'>
        <BalpanneFlow />
      </div>

      <PlasseringOgPreparasjonerSection />
      <ResterendePunkterSection />

      <Card className='my-12 text-center bg-gradient-to-br from-primary/20 to-transparent border-neutral-800'>
        <CardContent className='p-8'>
          <h3 className='text-2xl font-bold mt-0'>Varm foran, varm bak</h3>
          <p className='text-access/80 mt-2 mb-6'>
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

      <Card className='my-12 bg-sidebar-foreground border-neutral-800'>
        <CardContent className='p-8'>
          <h3 className='text-2xl font-bold flex items-center gap-3 mt-0'>
            <FolderCheck className='h-6 w-6 text-yellow-400' />
            Konklusjon: Skap minner, ikke bare flammer
          </h3>
          <p className='text-access/80 mt-4'>
            En bålpanne er en investering i samvær og minner. Ved å planlegge
            for komfort, sikrer du at de gode øyeblikkene ikke blir avbrutt av
            kulde, men kan få utfolde seg fritt under den vide høsthimmelen.
          </p>
        </CardContent>
      </Card>
    </article>
  )
}
