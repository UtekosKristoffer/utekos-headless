import { Star, MapPin, BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/utils/className'
import type { Review } from '../data/reviews'
import { initialsFrom } from '@/app/skreddersy-varmen/utils/initialsFrom'

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col justify-between rounded-lg border border-white/10 bg-chocolate-plum p-6 backdrop-blur-sm transition-all duration-300 md:p-7',
        'hover:-translate-y-0.5 hover:border-almost-mauve hover:bg-antier hover:shadow-2xl hover:shadow-black/40'
      )}
    >
      <header className='mb-5 flex items-center justify-between gap-3'>
        <div
          aria-hidden
          className='flex gap-0.5 text-primary [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.4))]'
        >
          {Array.from({ length: Math.round(review.rating) }).map((_, i) => (
            <Star key={i} fill='currentColor' size={14} strokeWidth={0} />
          ))}
        </div>
        <span className='inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold leading-text-paragraph tracking-[-0.01em] text-mineral-green'>
          <BadgeCheck size={12} aria-hidden />
          Verifisert
        </span>
      </header>

      {review.title && (
        <h3 className='mb-3 font-google-sans text-xl leading-[0.95] tracking-[-0.01em] text-almost-mauve md:text-2xl'>
          &ldquo;{review.title}&rdquo;
        </h3>
      )}

      <p className='mb-6 text-sm leading-text-paragraph tracking-[-0.01em] text-foreground md:text-base'>
        {review.quote}
      </p>

      <footer className='flex items-center gap-3 border-t border-white/10 pt-4'>
        <div
          aria-hidden
          className='flex size-10 shrink-0 items-center justify-center rounded-full border border-almost-mauve bg-antier text-sm font-semibold text-almost-mauve'
        >
          {initialsFrom(review.name)}
        </div>
        <div className='min-w-0'>
          <p className='truncate text-sm font-semibold leading-text-paragraph tracking-[-0.01em] text-foreground'>
            {review.name}
          </p>
          {(review.role || review.location) && (
            <p className='flex items-center gap-1.5 text-xs leading-text-paragraph tracking-[-0.01em] text-foreground/55'>
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
