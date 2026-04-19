// Path: src/app/skreddersy-varmen/utekos-orginal/components/SectionSocialProof.tsx
'use client'

import { useMemo } from 'react'
import { Star, Quote, MapPin, BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/utils/className'
import { reviews, type Review } from '../utils/reviews'
import { useSocialProofMarqueeAnimations } from '@/hooks/useSocialProofMarqueeAnimations'

function initialsFrom(name: string) {
  const first = name.split(',')[0]?.trim() ?? name
  return first
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('')
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col justify-between rounded-lg border border-white/10 bg-[#2C2420]/70 p-6 backdrop-blur-sm transition-all duration-300 md:p-7',
        'hover:-translate-y-0.5 hover:border-[#E07A5F]/40 hover:bg-[#2C2420] hover:shadow-2xl hover:shadow-black/40'
      )}
    >
      <header className='mb-5 flex items-center justify-between gap-3'>
        <div
          aria-hidden
          className='flex gap-0.5 text-[#FFD56B] [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.4))]'
        >
          {Array.from({ length: Math.round(review.rating) }).map((_, i) => (
            <Star key={i} fill='currentColor' size={14} strokeWidth={0} />
          ))}
        </div>
        <span className='inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300/90'>
          <BadgeCheck size={12} aria-hidden />
          Verifisert
        </span>
      </header>

      {review.title && (
        <h3 className='mb-3 font-serif text-xl leading-snug text-[#E07A5F] md:text-2xl'>
          &ldquo;{review.title}&rdquo;
        </h3>
      )}

      <p className='mb-6 text-sm leading-relaxed text-[#F4F1EA]/85 md:text-base'>
        {review.quote}
      </p>

      <footer className='flex items-center gap-3 border-t border-white/10 pt-4'>
        <div
          aria-hidden
          className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E07A5F]/30 bg-[#E07A5F]/10 text-sm font-semibold text-[#E07A5F]'
        >
          {initialsFrom(review.name)}
        </div>
        <div className='min-w-0'>
          <p className='truncate text-sm font-semibold text-[#F4F1EA]'>
            {review.name}
          </p>
          {(review.role || review.location) && (
            <p className='flex items-center gap-1.5 text-xs text-[#F4F1EA]/55'>
              {review.role && (
                <>
                  <span className='truncate'>{review.role}</span>
                  {review.location && <span aria-hidden>·</span>}
                </>
              )}
              {review.location && (
                <>
                  <MapPin size={10} aria-hidden />
                  <span className='truncate'>{review.location}</span>
                </>
              )}
            </p>
          )}
        </div>
      </footer>
    </article>
  )
}

export function SectionSocialProof() {
  const { containerRef, trackRef } = useSocialProofMarqueeAnimations()
  const averageRating = useMemo(() => {
    const avg =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    return avg.toFixed(1)
  }, [])

  return (
    <section
      ref={containerRef}
      aria-labelledby='socialproof-heading'
      className='relative border-t border-white/5 bg-[#1F2421] py-20 text-[#F4F1EA] md:py-28'
    >
      <div
        aria-hidden
        className='pointer-events-none absolute -top-16 right-4 select-none opacity-[0.04] md:right-16'
      >
        <Quote size={320} strokeWidth={1} />
      </div>

      <div className='relative z-10 mx-auto max-w-6xl px-6'>
        <header className='gsap-sp-header mb-12 text-center md:mb-16'>
          <div className='gsap-sp-rating-pill mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wider text-[#F4F1EA]/80'>
            <span aria-hidden className='flex gap-0.5 text-[#FFD56B]'>
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} fill='currentColor' size={10} strokeWidth={0} />
              ))}
            </span>
            <span className='text-[#F4F1EA]'>{averageRating}</span>
            <span aria-hidden className='text-[#F4F1EA]/30'>
              /
            </span>
            <span className='text-[#F4F1EA]/70'>5 i snitt</span>
          </div>

          <h2
            id='socialproof-heading'
            className='gsap-sp-title mx-auto max-w-[18ch] text-balance break-words font-serif text-[clamp(1.75rem,7vw,3.75rem)] leading-[1.1] tracking-tight text-[#F4F1EA] sm:max-w-[22ch] md:max-w-3xl md:leading-[1.08]'
          >
            Livsnytere som tok kvelden tilbake.
          </h2>

          <p className='gsap-sp-subtitle mx-auto mt-5 max-w-[34ch] text-balance break-words text-[clamp(0.875rem,3.4vw,1.125rem)] leading-relaxed text-[#F4F1EA]/65 md:max-w-2xl'>
            Ord fra dem som allerede har byttet den snikende trekken mot en
            lun kokong.
          </p>
        </header>
      </div>

      {/* Marquee — continuous horizontal stream, pauses on hover/touch */}
      <div
        className='gsap-sp-marquee relative overflow-hidden py-4'
        role='region'
        aria-label='Kundeanmeldelser'
      >
        {/* Edge gradient masks */}
        <div
          aria-hidden
          className='pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#1F2421] to-transparent md:w-24'
        />
        <div
          aria-hidden
          className='pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#1F2421] to-transparent md:w-24'
        />

        <div
          ref={trackRef}
          className='gsap-sp-track flex w-max will-change-transform'
        >
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
