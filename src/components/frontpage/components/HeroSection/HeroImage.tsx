// Path: src/components/frontpage/components/HeroSection/HeroImage.tsx
'use cache'
import heroImage from '@public/linn-kate-kikkert.png'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export async function HeroImage() {
  return (
    <div
      className='relative mx-auto mb-12 max-w-6xl animate-fade-in-up'
      style={{ animationDelay: '0.4s' }}
    >
      <div className='absolute -inset-4 bg-[#E07A5F]/20 blur-2xl rounded-[2rem] -z-10 opacity-50' />

      <div className='relative overflow-hidden rounded-xl border border-[#F4F1EA]/10 shadow-2xl shadow-black/50 bg-[#2C2420]'>
        <AspectRatio ratio={3 / 2}>
          <Image
            src={heroImage}
            alt='To kvinner i Utekos-plagg sitter på en terassen og nyter ost og vin.'
            fill
            quality={95}
            sizes='(min-width: 1280px) 1280px, 100vw'
            className='object-cover transition-transform duration-700 hover:scale-105'
            priority
          />
          {/* Gradient overlay i bunn for å blende med SocialProof */}
          <div className='absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1F2421]/80 to-transparent' />
        </AspectRatio>
      </div>
    </div>
  )
}
