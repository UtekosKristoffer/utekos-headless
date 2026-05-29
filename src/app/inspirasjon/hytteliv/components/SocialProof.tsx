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
    src: '/kate-erling-gress-vann.webp',
    alt: 'Person i Utekos-plagg nyter morgenkaffen utenfor hytten med utsikt over en fjord.',
    title: 'Første rad til stillheten',
    description:
      'Den beste plassen er ikke alltid på en benk. Finn deres eget sted ved vannkanten og nyt utsikten sammen.'
  },
  {
    src: '/linn_bonfire.webp',
    alt: 'Et par sitter ute ved bålpannen en kjølig hyttekveld, begge kledd i Utekos.',
    title: 'Selve definisjonen på utekos',
    description:
      'Noen ganger er de enkleste aktivitetene de beste. Nyt forberedelsene og den knitrende lyden i full komfort.'
  },
  {
    src: '/caitlinn_smooth16-19.webp',
    alt: 'Person som nyter utsikten fra et hytteområde i et Utekos-plagg.',
    title: 'Gjør naturen til din sitteplass',
    description:
      'Med Utekos kan den beste hvileplassen være den du finner selv. Varm og komfortabel, uansett underlag.'
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
    <section className='bg-overcast py-24 text-maritime-darkest'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center md:max-w-4xl'>
          <h2 className='mb-4 inline-flex flex-nowrap items-baseline justify-center gap-x-[0.18em] whitespace-nowrap text-maritime-darkest'>
            <UtekosWordmark className='h-[0.82em] w-auto shrink-0 translate-y-[0.06em]' />
            <span>i sitt rette element</span>
          </h2>

          <p className='mx-auto mb-12 utekos-section-lead max-w-2xl text-maritime-darkest'>
            Fra morgenkaffen på en duggfrisk trapp til sene kvelder rundt bålpannen. Se ekte øyeblikk fra
            hyttelivet.
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
              <CarouselItem key={index} className='pl-4 md:basis-1/2 lg:basis-1/3'>
                <div className='group p-1'>
                  <AspectRatio
                    ratio={1 / 1}
                    className='relative overflow-hidden rounded-lg border border-maritime-darkest/18 bg-havdyp shadow-[0_24px_56px_-42px_rgba(14,18,35,0.62)]'
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
                    <h3 className='font-semibold font-google-sans leading-[1.45] tracking-tight'>
                      {image.title}
                    </h3>
                    <p className='text-sm leading-[1.15] font-utekos-text tracking-tight text-maritime-darkest'>
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
