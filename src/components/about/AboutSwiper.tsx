'use client'

import Image from 'next/image'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'

const aboutImages = [
  {
    src: '/girl-stone-snow.webp',
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
    <section className='relative sm:py-32 mx-auto px-4 py-16 overflow-hidden'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 opacity-25'>
        <div
          className='absolute left-1/4 top-1/4 h-[500px] w-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute right-1/4 bottom-1/4 h-[500px] w-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='container mx-auto max-w-7xl'>
        <div className='text-center mb-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='mb-4 inline-flex items-center gap-2 rounded-full border border-sky-800/30 bg-sky-900/10 px-4 py-2'
          >
            <Camera className='h-4 w-4 text-sky-800' />
            <span className='text-sm font-medium text-sky-800'>
              Livet med Utekos
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'
          >
            Et glimt av Utekos
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground'
          >
            Se hvordan kompromissløs komfort gir liv til dine favorittøyeblikk
            utendørs.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className='relative'
        >
          <div className='relative rounded-2xl max-w-6xl mx-auto border border-neutral-800 bg-neutral-900/50 p-4 shadow-2xl overflow-hidden'>
            {/* Subtle gradient accent */}
            <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent' />

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false
              }}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 40 }
              }}
              className='h-[350px]'
            >
              {aboutImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className='group relative h-full w-full rounded-xl overflow-hidden border border-neutral-800 transition-all duration-300 hover:border-neutral-700'>
                    {/* Subtle glow on hover */}
                    <div
                      className='absolute -inset-1 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-30'
                      style={{
                        background:
                          'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)'
                      }}
                    />

                    <div className='relative h-full w-full'>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className='object-cover transition-transform duration-700 group-hover:scale-110'
                        sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                      />

                      {/* Gradient overlay on hover */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
