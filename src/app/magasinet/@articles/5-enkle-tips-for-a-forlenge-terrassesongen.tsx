// Path: src/app/magasinet/@articles/5-enkle-tips-for-a-forlenge-terrassesongen.tsx

import { TerrasseTipsSection } from '@/app/magasinet/5-enkle-tips-for-a-forlenge-terrassesongen/TerrasseTipsSection'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import TerrasseImage from '@public/og-image-terrassen.webp'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const TerrasseArticle = () => {
  return (
    <article className='prose prose-invert prose-lg max-w-7xl mx-auto'>
      <figure className='!my-12'>
        <Image
          src={TerrasseImage}
          alt='En vakkert opplyst terrasse klar for en kjølig høstkveld.'
          width={1500}
          height={1000}
          className='rounded-lg'
        />
        <figcaption className='text-center text-sm text-muted-foreground mt-2'>
          Din oase, klar for de kjølige, klare kveldene.
        </figcaption>
      </figure>

      <p>
        Med noen enkle, men effektive grep, kan du forvandle terrassen din fra
        en ren sommerdestinasjon til et favorittsted som kan brukes store deler
        av året. Her er fem nøkkelelementer visualisert for deg:
      </p>

      <div className='not-prose my-12'>
        <TerrasseTipsSection />
      </div>

      <p>
        Hvert av disse punktene spiller en viktig rolle. Tekstiler og le for
        vinden reduserer varmetap, belysning og varme drikker skaper den lune
        atmosfæren, men den virkelige game-changeren er personlig varme. I
        stedet for å prøve å varme opp all luften rundt deg med en
        terrassevarmer, er det langt mer effektivt og komfortabelt å holde seg
        selv varm.{' '}
      </p>

      <Card className='my-12 not-prose text-center bg-gradient-to-br from-primary/20 to-transparent border-neutral-800'>
        <CardContent className='p-8'>
          <h3 className='text-2xl font-bold mt-0'>
            Den viktigste investeringen
          </h3>
          <p className='text-muted-foreground mt-2 mb-6'>
            Av alle tipsene, er det å investere i personlig varme som gir den
            desidert største effekten. Et Utekos-plagg er designet for nettopp
            dette – å la deg nyte frisk luft uten å ofre komforten.
          </p>
          <Button asChild>
            <Link href='/produkter'>
              Oppdag din personlige varmekilde
              <ArrowRightIcon className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className='my-12 not-prose bg-sidebar-foreground border-neutral-800'>
        <CardContent className='p-8'>
          <h3 className='text-2xl font-bold flex items-center gap-3 mt-0'>
            <Sparkles className='h-6 w-6 text-yellow-400' />
            Konklusjon: Ta tilbake sesongene
          </h3>
          <p className='text-muted-foreground mt-4'>
            Ved å kombinere disse fem elementene tar du aktivt kontroll over din
            egen utendørssesong. Du er ikke lenger en passiv tilskuer til været,
            men en aktiv skaper av dine egne, komfortable øyeblikk. Nyt høsten,
            og ønsk våren velkommen tidligere enn noen gang før.
          </p>
        </CardContent>
      </Card>
    </article>
  )
}
