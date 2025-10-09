'use client'
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

export function ProductCarouselClient({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true
      }}
      className='w-full'
    >
      <CarouselContent>{children}</CarouselContent>
      <CarouselPrevious className='flex' />
      <CarouselNext className='flex' />
    </Carousel>
  )
}
