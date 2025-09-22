'use client'

import Image from 'next/image'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const aboutImages = [
  {
    src: '/girl-stone-snow.webp', // Sti til bildet i /public-mappen
    alt: 'To personer i Utekos-plagg nyter utsikten fra en fjelltopp.'
  },
  {
    src: '/ykk.webp',
    alt: 'Nærbilde av materialet og sømmene på et Utekos-produkt.'
  },
  {
    src: '/automn_walking_2048.webp',
    alt: 'En familie samlet rundt en bålpanne, alle kledd i Utekos.'
  },
  {
    src: '/coffe_utekos.webp',
    alt: 'En person med en kaffekopp utenfor en bobil en kjølig høstmorgen.'
  },
  {
    src: '/kate-erling-gress-vann.webp',
    alt: 'Utekos-plagg henger klare til bruk på en hyttevegg.'
  }
]

export function AboutSwiper() {
  return (
    <div className='rounded-lg max-w-6xl mx-auto border border-neutral-800 bg-[hsl(0,0%,4%,1)] p-4'>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false
        }}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 }
        }}
        className='h-[300px]'
      >
        {aboutImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className='relative h-full w-full rounded-md overflow-hidden'>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
