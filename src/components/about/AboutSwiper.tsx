// Path: src/components/about/AboutSwiper.tsx
'use client'

// Importerer Swiper-komponenter og moduler
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export function AboutSwiper() {
  return (
    <div className='rounded-lg max-w-6xl mx-auto border border-neutral-800 bg-[hsl(0,0%,4%,1)] p-4'>
      <Swiper
        // Installerer nødvendige moduler
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
          // For større skjermer, vis flere bilder
          768: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40
          }
        }}
        className='h-[300px]' // Gi karusellen en fast høyde
      >
        {/* Oppretter 5 placeholder-slides */}
        {Array.from({ length: 5 }).map((_, index) => (
          <SwiperSlide key={index}>
            <div className='flex h-full w-full items-center justify-center rounded-md bg-neutral-900'>
              <span className='text-neutral-500'>Bilde {index + 1}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
