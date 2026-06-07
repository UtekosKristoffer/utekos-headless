// Path: src/app/skreddersy-varmen/utekos-orginal/components/SectionSocialProof.tsx
'use client'

import { Star, StarHalf, Quote } from 'lucide-react'
import { reviews } from '../data/reviews'
import { useSocialProofMarqueeAnimations } from '@/hooks/useSocialProofMarqueeAnimations'
import { ReviewCard } from '@/app/skreddersy-varmen/components/ReviewCard'

export function SectionSocialProof() {
  const { containerRef, trackRef } = useSocialProofMarqueeAnimations()
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <section
      ref={containerRef}
      aria-labelledby='socialproof-heading'
      className='relative border-t border-maritime-darkest/20 bg-havdyp py-20 text-cloud-dancer md:py-28'
    >
      {/* Det store sitat-tegnet i bakgrunnen - holdes subtilt i Cloud Dancer for å ikke ta overhånd */}
      <div
        aria-hidden
        className='pointer-events-none absolute -top-16 right-4 select-none opacity-[0.03] text-cloud-dancer md:right-16'
      >
        <Quote size={320} strokeWidth={1} />
      </div>

      <div className='relative z-10 mx-auto max-w-6xl px-6'>
        <header className='gsap-sp-header mb-12 text-center md:mb-16'>
          {/* Rating-pill: Fått en eksklusiv frostet glass-effekt (glassmorphism) over havdyp-bakgrunnen */}
          <div className='gsap-sp-rating-pill mb-5 inline-flex items-center gap-2 rounded-full border border-cloud-dancer/15 bg-cloud-dancer/5 px-3.5 py-1.5 text-xs font-medium leading-text-paragraph tracking-[-0.01em] text-cloud-dancer/90 backdrop-blur-sm'>
            {/* Stjerner i chai-tea: Gir en utrolig varm, gyllen og tillitsvekkende kontrast */}
            <span aria-hidden className='flex gap-0.5 text-chai-tea drop-shadow-sm'>
              {[1, 2, 3, 4].map(i => (
                <Star key={i} fill='currentColor' size={10} strokeWidth={0} />
              ))}
              <StarHalf key='half' fill='currentColor' size={10} strokeWidth={0} />
            </span>
            <span className='text-cloud-dancer font-semibold'>{averageRating}</span>
          </div>

          <h2
            id='socialproof-heading'
            className='gsap-sp-title mx-auto max-w-[18ch] text-balance wrap-break-word font-google-sans text-[clamp(1.75rem,7vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.01em] text-cloud-dancer sm:max-w-[22ch] md:max-w-5xl'
          >
            Livsnytere som tok kvelden tilbake
          </h2>

          <p className='gsap-sp-subtitle mx-auto mt-5 max-w-[34ch] text-balance wrap-break-word text-[clamp(0.875rem,3.4vw,1.125rem)] leading-text-paragraph tracking-[-0.01em] text-cloud-dancer/80 md:max-w-2xl'>
            Ord fra dem som allerede har byttet den snikende trekken mot en lun kokong.
          </p>
        </header>
      </div>

      <div
        className='gsap-sp-marquee relative overflow-hidden py-4'
        role='region'
        aria-label='Kundeanmeldelser'
      >
        {/* Edge gradient masks - Byttet fra mountain-view til havdyp så kortene fader sømløst inn i natten */}
        <div
          aria-hidden
          className='pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-havdyp to-transparent md:w-24'
        />
        <div
          aria-hidden
          className='pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-havdyp to-transparent md:w-24'
        />

        <div ref={trackRef} className='gsap-sp-track flex w-max will-change-transform'>
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={`${review.id}-${i}`}
              aria-hidden={i >= reviews.length}
              className='mr-4 w-[min(85vw,22rem)] shrink-0 md:mr-6 md:w-88 lg:w-[24rem]'
            >
              {/* Merk: Hvis ReviewCard selv har en bakgrunnsfarge, fungerer det nydelig med maritim-darkest eller en mørk transparens over havdyp. */}
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
