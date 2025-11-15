import { CarouselItem } from '@/components/ui/carousel'
import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ProductCarouselClient } from './ProductCarouselClient'
type Product = {
  id: number
  name: string
  href: string
  price: string
  imageSrc: string
  imageAlt: string
}

async function getFarsdagProducts(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 500))

  return [
    {
      id: 1,
      name: 'Utekos Mikrofiber™',
      href: '/produkter/utekos-mikrofiber',
      price: '1590,-',
      imageSrc: '/black-1080.png',
      imageAlt: 'Klassisk Utekos-plagg i mikrofiber.'
    },
    {
      id: 2,
      name: 'Utekos Dun™',
      href: '/produkter/utekos-dun',
      price: '1990,-',
      imageSrc: '/blue-1080.png',
      imageAlt: 'Premium Utekos-plagg i ullblanding.'
    },
    {
      id: 3,
      name: 'Comfyrobe™',
      href: '/produkter/comfyrobe',
      price: '1290,-',
      imageSrc: '/comfy-1080.png',
      imageAlt: 'Comfyrobe.'
    },
    {
      id: 4,
      name: 'Utekos Tilbehør',
      href: '/produkter',
      price: 'Fra 150,-',
      imageSrc: '/bag-1080.png',
      imageAlt: 'Utekos-tilbehør i matchende farger.'
    }
  ]
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className='group relative'>
      <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-background lg:aspect-none group-hover:opacity-75 lg:h-80'>
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          width={400}
          height={500}
          className='h-full w-full object-cover object-center lg:h-full lg:w-full'
        />
      </div>
      <div className='mt-4 flex justify-between'>
        <div>
          <h3 className='text-sm text-primary-foreground'>
            <Link href={product.href as Route}>
              <span aria-hidden='true' className='absolute inset-0' />
              {product.name}
            </Link>
          </h3>
        </div>
        <p className='text-sm font-medium text-primary-foreground'>
          {product.price}
        </p>
      </div>
    </div>
  )
}

export async function FarsdagProductCarousel() {
  const products = await getFarsdagProducts()

  return (
    <section
      id='produkter'
      className='flex w-full flex-col items-center bg-background'
    >
      <div className='w-full max-w-7xl px-6 py-16 lg:px-8 sm:py-24'>
        <ProductCarouselClient>
          {products.map(product => (
            <CarouselItem
              key={product.id}
              className='md:basis-1/2 lg:basis-1/3'
            >
              <div className='p-1'>
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </ProductCarouselClient>
      </div>
    </section>
  )
}
