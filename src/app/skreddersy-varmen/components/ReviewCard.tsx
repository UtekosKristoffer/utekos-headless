// Path: src/app/skreddersy-varmen/components/ReviewCard.tsx

import { Star, MapPin, BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/utils/className'
import type { Review } from '../data/reviews'
import { initialsFrom } from '@/app/skreddersy-varmen/utils/initialsFrom'

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article
      className={cn(
        // Grunnstil: Mørk maritim bakgrunn som skaper kontrast til "havdyp" bakgrunnen.
        'group relative flex h-full flex-col justify-between rounded-lg border border-cloud-dancer/10 bg-maritime-darkest p-6 shadow-lg transition-all duration-400 md:p-7',
        // Hover-effekt: Løftes opp, får en subtil Very Peri-kant og en myk skygge.
        'hover:-translate-y-1 hover:border-very-peri/50 hover:bg-maritime-darkest/95 hover:shadow-2xl hover:shadow-very-peri/10'
      )}
    >
      <header className='mb-5 flex items-center justify-between gap-3'>
        <div
          aria-hidden
          // Stjerner satt i Chai Tea for den varme, gylne gull-effekten.
          className='flex gap-0.5 text-chai-tea drop-shadow-sm'
        >
          {Array.from({ length: Math.round(review.rating) }).map((_, i) => (
            <Star key={i} fill='currentColor' size={14} strokeWidth={0} />
          ))}
        </div>
        {/* Verifisert-badge: Bruker fairest-jade for en beroligende, organisk og troverdig grønnfarge */}
        <span className='inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold leading-text-paragraph tracking-[-0.01em] text-fairest-jade'>
          <BadgeCheck size={12} aria-hidden />
          Verifisert
        </span>
      </header>

      {review.title && (
        <h3 className='mb-3 font-google-sans text-xl leading-[0.95] tracking-[-0.01em] text-cloud-dancer md:text-2xl'>
          &ldquo;{review.title}&rdquo;
        </h3>
      )}

      {/* Cloud-dancer med litt transparens for behagelig lese-kontrast i brødteksten */}
      <p className='mb-6 text-sm leading-text-paragraph tracking-[-0.01em] text-cloud-dancer/85 md:text-base'>
        {review.quote}
      </p>

      <footer className='flex items-center gap-3 border-t border-cloud-dancer/10 pt-4'>
        <div
          aria-hidden
          // Avataren får dynamisk farge: Nøytral i ro, men lyser opp subtilt i Very Peri når man hovrer kortet!
          className='flex size-10 shrink-0 items-center justify-center rounded-full border border-cloud-dancer/15 bg-cloud-dancer/5 text-sm font-semibold text-cloud-dancer transition-colors duration-400 group-hover:border-very-peri/40 group-hover:bg-very-peri/10 group-hover:text-cloud-dancer'
        >
          {initialsFrom(review.name)}
        </div>
        <div className='min-w-0'>
          <p className='truncate text-sm font-semibold leading-text-paragraph tracking-[-0.01em] text-cloud-dancer'>
            {review.name}
          </p>
          {(review.role || review.location) && (
            <p className='flex items-center gap-1.5 text-xs leading-text-paragraph tracking-[-0.01em] text-cloud-dancer/50'>
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
