// Path: src/app/inspirasjon/batliv/PersonaGrid.tsx

import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface Persona {
  title: string
  description: string
  href: Route
  imageUrl: string
}

export const personas: Persona[] = [
  {
    title: 'Til Hytteeieren',
    description:
      'For de som verdsetter peiskos, men drømmer om å ta med varmen ut på terrassen for å se stjernene.',
    href: '/produkter/utekos-dun' as Route,
    imageUrl: '/automn_walking_2048.webp'
  },
  {
    title: 'Til Bobilisten',
    description:
      'Den perfekte følgesvennen for kjølige morgener på en ny, spennende destinasjon. Utvider campingsesongen.',
    href: '/produkter/utekos-mikrofiber' as Route,
    imageUrl: '/ykk.webp'
  },
  {
    title: 'Til Båteieren',
    description:
      'For de sene kveldene for anker, eller når en uventet bris gjør seg gjeldende på dekk. En favoritt i gjestehavna.',
    href: '/produkter/utekos-dun' as Route,
    imageUrl: '/utekos-black.webp'
  },
  {
    title: 'Til den som har alt',
    description:
      'Gi en gave de garantert ikke har, men som de umiddelbart vil elske. Gaven av ren, kompromissløs komfort.',
    href: '/produkter' as Route,
    imageUrl: '/coffe_utekos.webp'
  }
]

export function PersonaGrid() {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='mb-16 text-center'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            Finn gaven som passer perfekt
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
            Vi har gjort det enkelt for deg. Velg livsstilen som passer best til
            den du vil glede.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          {personas.map((persona, personaIndex) => (
            <AnimatedBlock
              key={persona.title}
              className='will-animate-fade-in-up'
              delay={`${personaIndex * 0.1}s`}
              threshold={0.2}
            >
              <Link href={persona.href} className='group block h-full'>
                <Card className='group relative h-full overflow-hidden border-neutral-800 bg-sidebar-foreground transition-all hover:border-neutral-700 hover:shadow-2xl hover:shadow-primary/20'>
                  <Image
                    src={persona.imageUrl}
                    alt={persona.title}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover opacity-40 transition-opacity group-hover:opacity-30'
                    priority={false}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent' />
                  <CardContent className='relative flex min-h-[300px] h-full flex-col justify-end p-8'>
                    <h3 className='mb-2 text-2xl font-bold'>{persona.title}</h3>
                    <p className='mb-4 text-muted-foreground'>
                      {persona.description}
                    </p>
                    <div className='flex items-center gap-2 font-semibold text-primary-foreground'>
                      Se gavetips
                      <ArrowRightIcon className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
