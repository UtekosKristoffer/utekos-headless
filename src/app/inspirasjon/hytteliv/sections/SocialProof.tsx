// Path: src/app/inspirasjon/bobil/sections/SocialProofSection.tsx

import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

const galleryImages = [
  {
    src: '/kate-erling-gress-vann.webp',
    alt: 'Person i Utekos-plagg nyter morgenkaffen utenfor bobilen med utsikt over en fjord.',
    title: 'Første rad til stillheten',
    description:
      'Den beste plassen er ikke alltid på en benk. Finn deres eget sted ved vannkanten og nyt utsikten sammen.'
  },
  {
    src: '/linn_bonfire.webp',
    alt: 'Et par sitter i campingstoler utenfor bobilen en kjølig kveld, begge kledd i Utekos.',
    title: 'Selve definisjonen på utekos',
    description:
      'Noen ganger er de enkleste aktivitetene de beste. Nyt forberedelsene og den knitrende lyden i full komfort.'
  },
  {
    src: '/caitlinn_smooth16-19.webp',
    alt: 'Person som har stoppet bobilen langs en nasjonal turistvei og nyter utsikten i et Utekos-plagg.',
    title: 'Gjør naturen til din sitteplass',
    description:
      'Med Utekos er den beste hvileplassen alltid den du finner selv. Varm og komfortabel, uansett underlag.'
  },
  {
    src: '/utekos-kaffe-jente.webp',
    alt: 'Person som slapper av med en bok i en campingstol, godt innpakket i Utekos.',
    title: 'Terrassekos, hele året',
    description:
      'Hvem har sagt at terrassen kun er for sommeren? Forleng sesongen og nyt favorittplassen din, uansett temperatur.'
  }
]

export function SocialProof() {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-fluid-display mb-4 font-bold tracking-tight'>
            Utekos i sitt rette element
          </h2>
          <p className='mb-12 max-w-2xl text-lg text-muted-foreground mx-auto'>
            Fra morgenkaffen på en duggfrisk trapp til sene kvelder rundt
            bålpannen. La deg inspirere av ekte øyeblikk fra hyttelivet.
          </p>
        </div>

        <Carousel
          opts={{
            loop: true,
            align: 'start'
          }}
          className='mx-auto w-full max-w-5xl'
        >
          <CarouselContent className='-ml-4'>
            {galleryImages.map((image, index) => (
              <CarouselItem
                key={index}
                className='pl-4 md:basis-1/2 lg:basis-1/3'
              >
                <div className='p-1 group'>
                  {/* ENDRING: Card er fjernet. Styling er flyttet hit. */}
                  <AspectRatio
                    ratio={4 / 5}
                    className='relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900'
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className='transition-transform duration-500 group-hover:scale-105'
                      style={{ objectFit: 'cover' }}
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                  </AspectRatio>
                  <div className='pt-4 text-left'>
                    <h4 className='font-semibold'>{image.title}</h4>
                    <p className='text-sm text-muted-foreground'>
                      {image.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='left-[-50px] hidden xl:inline-flex' />
          <CarouselNext className='right-[-50px] hidden xl:inline-flex' />
        </Carousel>
      </div>
    </section>
  )
}
