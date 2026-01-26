// Path: src/app/inspirasjon/isbading/sections/SocialProof.tsx

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
    src: '/comfyrobe/comfy-afterbath-1080.png', // Husk å legge inn riktige bildenavn
    alt: 'En isbader kommer opp av vannet med et stort smil, klar til å ta på seg Utekos-kåpen.',
    title: 'Det øyeblikkelige rushet',
    description:
      'Sekundet du kommer opp av vannet og kjenner varmen fra kåpen treffe huden. Det er da magien skjer.'
  },
  {
    src: '/comfyrobe/comfy-isbading-to-1080.png',
    alt: 'En vennegjeng står i snøen iført Utekos-kåper og drikker kaffe etter badet.',
    title: 'Varmen i fellesskapet',
    description:
      'Isbading er ofte best sammen med andre. Del opplevelsen, kaffen og varmen uten å fryse.'
  },
  {
    src: '/comfyrobe/comfy-isbading-1080-master.png',
    alt: 'Person sitter på et svaberg med rimfrost, pakket inn i Utekos og ser utover havet.',
    title: 'Ro i sjelen',
    description:
      'Finn stillheten ved havet. Med riktig utstyr kan du sitte lenge og la pulsen synke etter sjokket.'
  },
  {
    src: '/1080/comfy-open-1080.png',
    alt: 'Person på vei fra badstue til sjøen i en Utekos-poncho.',
    title: 'Fra sauna til sjø',
    description:
      'Den perfekte følgesvenn mellom den varme badstuen og den iskalde fjorden.'
  },
  {
    src: '/1080/comfy-design-1080.png',
    alt: 'Nærbilde av en person som smiler bredt mens de har på seg Utekos-kåpen etter isbading.',
    title: 'SherpaCore™',
    description:
      'Absorberende innside av syntetisk lammeull som starter tørke- og varmeprosessen umiddelbart.'
  }
]

export function SocialProof() {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-fluid-display mb-4 font-bold tracking-tight'>
            Ekte kulde, ekte varme
          </h2>
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
                  <AspectRatio
                    ratio={1 / 1}
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

          <CarouselPrevious className='left-2 md:left-[-50px] inline-flex z-10' />
          <CarouselNext className='right-2 md:right-[-50px] inline-flex z-10' />
        </Carousel>
      </div>
    </section>
  )
}
