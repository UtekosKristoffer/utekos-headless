// Path: src/app/skreddersy-varmen/utekos-orginal/components/SectionSocialProof.tsx
'use client'

import { Star, Quote } from 'lucide-react'
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
      className='relative border-t border-white/5 bg-mountain-view py-20 text-cloud-dancer md:py-28'
    >
      <div
        aria-hidden
        className='pointer-events-none absolute -top-16 right-4 select-none opacity-[0.04] md:right-16'
      >
        <Quote size={320} strokeWidth={1} />
      </div>

      <div className='relative z-10 mx-auto max-w-6xl px-6'>
        <header className='gsap-sp-header mb-12 text-center md:mb-16'>
          <div className='gsap-sp-rating-pill mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium leading-[1.45] tracking-[-0.01em] text-cloud-dancer/80'>
            <span aria-hidden className='flex gap-0.5 text-cloud-dancer'>
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} fill='currentColor' size={10} strokeWidth={0} />
              ))}
            </span>
            <span className='text-cloud-dancer'>{averageRating}</span>
            <span aria-hidden className='text-cloud-dancer/30'>
              /
            </span>
            <span className='text-cloud-dancer/90'>5 i snitt</span>
          </div>

          <h2
            id='socialproof-heading'
            className='gsap-sp-title mx-auto max-w-[18ch] text-balance break-words font-google-sans text-[clamp(1.75rem,7vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.01em] text-cloud-dancer sm:max-w-[22ch] md:max-w-5xl'
          >
            Livsnytere som tok kvelden tilbake
          </h2>

          <p className='gsap-sp-subtitle mx-auto mt-5 max-w-[34ch] text-balance break-words text-[clamp(0.875rem,3.4vw,1.125rem)] leading-[1.45] tracking-[-0.01em] text-cloud-dancer md:max-w-2xl'>
            Ord fra dem som allerede har byttet den snikende trekken mot en lun kokong.
          </p>
        </header>
      </div>

      <div
        className='gsap-sp-marquee relative overflow-hidden py-4'
        role='region'
        aria-label='Kundeanmeldelser'
      >
        {/* Edge gradient masks */}
        <div
          aria-hidden
          className='pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-mountain-view to-transparent md:w-24'
        />
        <div
          aria-hidden
          className='pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-mountain-view to-transparent md:w-24'
        />

        <div ref={trackRef} className='gsap-sp-track flex w-max will-change-transform'>
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={`${review.id}-${i}`}
              aria-hidden={i >= reviews.length}
              className='mr-4 w-[min(85vw,22rem)] shrink-0 md:mr-6 md:w-[22rem] lg:w-[24rem]'
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
