// Path: src/components/sections/FindInStoreSection.tsx
import { Button } from '@/components/ui/button'
import { MapPin, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import IntersportLogo from '@public/logo/Intersport_logo.svg'
import { INTERSPORT_LAKSEVAG_MAPS_URL } from '@/constants/maps'
import { AnimatedBlock } from '@/components/AnimatedBlock'

export function IntersportSection() {
  return (
    <section className='w-full bg-[#2C2420] py-24 px-4 sm:py-32'>
      <div className='container mx-auto max-w-7xl'>
        {/* Kortet */}
        <AnimatedBlock
          className='relative overflow-hidden rounded-sm border border-[#F4F1EA]/10 bg-[#1F2421] px-8 py-12 md:px-12 shadow-2xl'
          delay='0s'
          threshold={0.2}
        >
          {/* Varm bakgrunnsglød */}
          <div
            className='pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[100px]'
            style={{
              background: 'radial-gradient(circle, #E07A5F 0%, transparent 60%)'
            }}
          />

          <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
            {/* Logo-boks: Hvit bakgrunn for maks kontrast mot logoen */}
            <div className='flex h-64 w-full items-center justify-center rounded-sm bg-white p-8 lg:p-12 shadow-inner'>
              <Image
                src={IntersportLogo}
                alt='Intersport logo'
                width={250}
                height={70}
                className='h-auto w-full max-w-[250px]'
              />
            </div>

            {/* Tekst-innhold - Optimalisert for lesbarhet */}
            <div className='flex flex-col items-start text-left'>
              <div className='mb-6 flex items-center gap-3 rounded-full border border-[#E07A5F] bg-[#E07A5F]/10 px-4 py-2'>
                <MapPin className='h-5 w-5 text-[#E07A5F]' />
                {/* Økt fontstørrelse og kontrast på badge */}
                <span className='text-sm font-bold tracking-widest uppercase text-[#E07A5F]'>
                  Fysisk butikk i Bergen
                </span>
              </div>

              <h2 className='text-balance text-3xl md:text-4xl font-serif text-white mb-6'>
                Opplev Utekos hos Intersport
              </h2>

              {/* Økt til text-lg (18px) og fjernet opacity for AAA kontrast */}
              <p className='max-w-lg text-lg leading-relaxed text-[#F4F1EA] mb-10'>
                Lyst til å kjenne på kvaliteten og finne den perfekte
                passformen? Som eneste fysiske forhandler i Bergen finner du et
                utvalg av våre produkter hos Intersport på Laksevåg Senter.
              </p>

              <Button
                asChild
                size='lg'
                className='group bg-[#E07A5F] hover:bg-[#d0694e] text-white border-none rounded-sm px-8 py-6 text-lg font-medium shadow-lg shadow-[#E07A5F]/20'
              >
                <Link
                  href={INTERSPORT_LAKSEVAG_MAPS_URL}
                  target='_blank'
                  className='flex items-center gap-2'
                >
                  Få veibeskrivelse
                  <ArrowRight className='h-5 w-5 transition-transform group-hover:translate-x-1' />
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedBlock>
      </div>
    </section>
  )
}
