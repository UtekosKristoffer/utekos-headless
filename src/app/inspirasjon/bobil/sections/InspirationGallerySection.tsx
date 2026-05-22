// Path: src/app/inspirasjon/bobil/sections/SocialProofSection.tsx

import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

const galleryImages = [
  {
    src: '/coffe_utekos.webp',
    alt: 'Person i Utekos-plagg nyter morgenkaffen utenfor bobilen med utsikt over en fjord.',
    title: 'Morgenkaffe med utsikt',
    description: 'Start dagen i ditt eget tempo, omgitt av natur og komfort.'
  },
  {
    src: '/malin_tjommi.webp',
    alt: 'Et par sitter i campingstoler utenfor bobilen en kjølig kveld, begge kledd i Utekos.',
    title: 'Friheten til å stoppe opp',
    description:
      'Et raskt stopp blir en minneverdig pause når komforten er med på turen.'
  },
  {
    src: '/mb_girl_sitting_outside_coffee.webp',
    alt: 'Person som har stoppet bobilen langs en nasjonal turistvei og nyter utsikten i et Utekos-plagg.',
    title: 'Din personlige varmesone',
    description:
      'Skap din egen sone av komfort og nyt en rolig stund, uansett hvor du befinner deg.'
  },
  {
    src: '/girl-stone-snow.webp',
    alt: 'Person som slapper av med en bok i en campingstol, godt innpakket i Utekos.',
    title: 'Din egen avslapningssone',
    description: 'Finn roen og nyt øyeblikket, uansett hvor du parkerer.'
  }
]

export function InspirationGallerySection() {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-fluid-display mb-4 inline-flex flex-wrap items-baseline justify-center gap-x-[0.18em] leading-[0.95] font-bold tracking-normal'>
            <UtekosWordmark className='h-[0.78em] w-auto translate-y-[0.06em]' />
            <span>i sitt rette element</span>
          </h2>
          <p className='mx-auto mb-12 max-w-2xl text-lg leading-[1.45] tracking-normal text-cloud-dancer'>
            Fra morgenkaffen i soloppgang til sene kvelder under stjernene. La
            deg inspirere av ekte øyeblikk fra bobillivet.
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
                <div className='group p-1'>
                  <AspectRatio
                    ratio={4 / 5}
                    className='relative overflow-hidden rounded-lg border border-cloud-dancer/12 bg-maritime-darkest'
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
                    <h4 className='leading-[1] font-semibold tracking-normal'>
                      {image.title}
                    </h4>
                    <p className='text-sm text-overcast'>{image.description}</p>
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
