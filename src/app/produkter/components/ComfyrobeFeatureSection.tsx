// Path: src/components/features/ComfyrobeFeatureSection.tsx
'use client'
import ComfyRainy from '@public/comfy_rainy.webp'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'

import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ShieldCheck, Wind, ThermometerSnowflake, Move3d } from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: 'Total værbeskyttelse',
    description:
      'Med 8000 mm vannsøyle og tapede sømmer holder du deg garantert tørr, mens det vindtette materialet stenger kulden ute.',
    colorClasses: 'text-sky-400 border-sky-400/20 bg-sky-900/20'
  },
  {
    icon: ThermometerSnowflake,
    title: 'Kompromissløs komfort',
    description:
      'Et tykt fôr av syntetisk lammeull (Sherpa Fleece) gir umiddelbar varme og en luksuriøs følelse, perfekt etter et bad eller på en kjølig kveld.',
    colorClasses: 'text-amber-400 border-amber-400/20 bg-amber-900/20'
  },
  {
    icon: Move3d,
    title: 'Gjennomtenkt frihet',
    description:
      'En romslig, unisex passform med splitter i sidene og en smart toveis YKK-glidelås gir deg full bevegelsesfrihet til å nyte øyeblikket.',
    colorClasses: 'text-teal-400 border-teal-400/20 bg-teal-900/20'
  }
]

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 }
}

export function ComfyrobeFeatureSection() {
  return (
    <section className='rounded-lg md:mb-24 py-16 sm:py-24'>
      <motion.div
        initial='initial'
        whileInView='whileInView'
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.2 }}
        className='container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16'
      >
        {/* Bildekarusell */}
        <motion.div
          variants={{
            initial: { opacity: 0, x: -50 },
            whileInView: { opacity: 1, x: 0 }
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect='fade'
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className='w-full rounded-2xl shadow-2xl'
          >
            <SwiperSlide>
              <AspectRatio ratio={3 / 4}>
                <Image
                  src='/comfyrobe.jpg' // Bildesti for livsstil
                  alt='Person som nyter en kaffekopp på hytta iført en Comfyrobe.'
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 100vw, 50vw'
                  priority
                />
              </AspectRatio>
            </SwiperSlide>
            <SwiperSlide>
              <AspectRatio ratio={3 / 4}>
                <Image
                  src={ComfyRainy}
                  alt='Comfyrobe som tåler regnvær, vist i et norsk kystlandskap.'
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 100vw, 50vw'
                />
              </AspectRatio>
            </SwiperSlide>
          </Swiper>
        </motion.div>

        {/* Tekstinnhold */}
        <motion.div
          variants={{
            initial: { opacity: 0, x: 50 },
            whileInView: { opacity: 1, x: 0 }
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='flex flex-col items-start'
        >
          <motion.h2
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl'
          >
            Forleng Utekosen.
            <br />
            <span className='text-sky-800'>Uansett Vær.</span>
          </motion.h2>

          <motion.p
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground'
          >
            Comfyrobe™ er den ultimate allværskåpen for livsnyteren. Den
            kombinerer den urokkelige beskyttelsen til en teknisk skalljakke med
            den komfortable omfavnelsen av din mykeste badekåpe.
          </motion.p>

          <div className='mt-10 w-full space-y-6'>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className='flex items-start gap-4'
              >
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border ${feature.colorClasses}`}
                >
                  <feature.icon className='h-6 w-6' />
                </div>
                <div>
                  <h3 className='font-semibold text-foreground'>
                    {feature.title}
                  </h3>
                  <p className='mt-1 text-sm text-muted-foreground'>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='mt-12 flex w-full flex-col items-center gap-4 sm:flex-row'
          >
            <p className='text-4xl font-bold text-foreground'>NOK 990,-</p>
            <Button asChild size='lg' className='group w-full sm:w-auto'>
              <Link href='/produkter/comfyrobe'>
                Utforsk Comfyrobe
                <Wind className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
