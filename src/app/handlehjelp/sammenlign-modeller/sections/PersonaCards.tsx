import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import type { Route } from 'next'

export function PersonaCards() {
  const personas = [
    {
      href: '/produkter/utekos-dun',
      imageSrc: '/coffe_utekos.webp',
      imageAlt: 'Hyttekos i tørt, kaldt vær med Utekos Dun',
      title: 'For den kompromissløse livsnyteren',
      description:
        'Du verdsetter den uovertrufne følelsen av premium dun, og bruker din Utekos primært i tørre, kalde omgivelser som på hytten.',
      buttonText: 'Velg Utekos Dun™'
    },
    {
      href: '/produkter/utekos-fiberdun',
      imageSrc: '/half-diagonal.webp',
      imageAlt: 'Utekos Fiberdun i uforutsigbart vær',
      title: 'For den praktiske allrounderen',
      description:
        'Du trenger en robust arbeidshest som presterer i all slags vær – fra fuktige kvelder i båten til uforutsigbare dager med bobilen.',
      buttonText: 'Velg Utekos Fiberdun™'
    },
    {
      href: '/produkter/utekos-mikrofiber',
      imageSrc: '/frontpage-kate-linn.webp',
      imageAlt: 'Allsidig, daglig bruk av Utekos Mikrofiber',
      title: 'For den enkle komforten',
      description:
        'Du ser etter et lett og funksjonelt plagg for de daglige turene, og som et enkelt, varmende lag på terrassen eller i hverdagen.',
      buttonText: 'Velg Utekos Mikrofiber™'
    }
  ]

  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {personas.map((persona, index) => (
            <AnimatedBlock
              key={persona.title}
              className='will-animate-fade-in-up h-full'
              delay={`${0.1 + index * 0.1}s`}
              threshold={0.5}
            >
              <Card className='flex h-full flex-col border-neutral-800 bg-sidebar-foreground transition-transform duration-300 hover:-translate-y-1 hover:border-neutral-700'>
                <div className='relative h-64 w-full overflow-hidden rounded-t-lg'>
                  <Image
                    src={persona.imageSrc}
                    alt={persona.imageAlt}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover'
                  />
                </div>
                <CardContent className='flex flex-grow flex-col p-8'>
                  <h3 className='text-2xl font-bold'>{persona.title}</h3>
                  <p className='mt-2 flex-grow text-muted-foreground'>
                    {persona.description}
                  </p>
                  <Button asChild className='mt-6 w-full'>
                    <Link href={persona.href as Route}>
                      {persona.buttonText}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
