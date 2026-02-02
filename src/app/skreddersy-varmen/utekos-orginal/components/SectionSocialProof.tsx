// Path: src/components/frontpage/SectionSocialProof.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils/className'

const reviews = [
  {
    id: 1,
    name: 'Marit, 62',
    location: 'Hemsedal',
    role: 'Hytteeier',
    title: 'Nå er det jeg som sitter lengst',
    quote:
      'Takk til dere. Nå er det jeg som vil sitte lengst ute om kveldene, og terrassen blir brukt mye mer enn før. Umulig å ikke elske dette produktet.',
    rating: 5
  },
  {
    id: 2,
    name: 'Elisabeth, 47',
    location: 'Tjøme',
    role: 'Livsnyter',
    title: 'Nytt yndlingsplagg',
    quote:
      'Genialt! Når man lærer seg å utnytte det eksisterende potensialet, så oppleves mulighetene nesten endeløse. Dette er mitt nye yndlingsplagg.',
    rating: 5
  },
  {
    id: 3,
    name: 'Knut-Egil, 58',
    location: 'Viken',
    role: '',
    title: 'Bobileier',
    quote:
      'Det beste kjøpet jeg gjorde i fjor. Å ha dette alternativet på bobilferie er faktisk uvurderlig. Anbefales på det varmeste!',
    rating: 5
  },
  {
    id: 4,
    name: 'Berit, 64',
    location: 'Narvik',
    role: '',
    title: 'Varm og fornøyd',
    quote: 'Veldig bra',
    rating: 5
  },
  {
    id: 5,
    name: 'Therese, 49',
    location: 'Narvik',
    role: '',
    title: 'Veldig komfortabel',
    quote:
      'Jeg har ikke prøvd den utendørs enda, men jeg kan nesten ikke vente! Veldig komfortabel å ha på og god passform.',
    rating: 5
  },
  {
    id: 6,
    name: 'Richard, 61',
    location: 'Narvik',
    role: '',
    title: 'Glad kone',
    quote: 'Kona ble kjempefornøyd',
    rating: 5
  },
  {
    id: 7,
    name: 'Bente, 68',
    location: 'Lillehammer',
    role: '',
    title: 'Kjempegod service',
    quote:
      'Tusen takk for hurtig svar og kjempegod service. Veldig fornøyd med både produktet og opplevelsen :).',
    rating: 5
  }
]

export function SectionSocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextReview = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % reviews.length)
      setIsAnimating(false)
    }, 300) // Matcher transition tid
  }, [isAnimating])

  const prevReview = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + reviews.length) % reviews.length)
      setIsAnimating(false)
    }, 300)
  }

  // Auto-rotate (valgfritt, men fint for atmosfære)
  useEffect(() => {
    const timer = setInterval(nextReview, 8000)
    return () => clearInterval(timer)
  }, [nextReview])

  const currentReview = reviews[currentIndex]

  if (!currentReview) {
    return null
  }

  return (
    <section className='bg-[#1F2421] text-[#F4F1EA] py-24 md:py-32 overflow-hidden border-t border-white/5 relative'>
      {/* Dekorativt bakgrunnselement (Stor Sitat-tegn) */}
      <div className='absolute top-10 left-10 md:left-1/4 opacity-[0.03] pointer-events-none select-none'>
        <Quote size={400} />
      </div>

      <div className='max-w-4xl mx-auto px-6 relative z-10'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          <div className='flex justify-center gap-2 mb-4 text-[#E07A5F]'>
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} fill='currentColor' size={18} />
            ))}
          </div>
          <h2 className='text-3xl md:text-5xl font-serif mb-4'>
            De som har opplevd Utekos
          </h2>
          <p className='text-[#F4F1EA]/60 text-lg font-light'>
            4.8 av 5 i snitt på tvers av kolleksjonen.
          </p>
        </div>

        {/* REVIEW CARD CONTAINER */}
        <div className='relative min-h-[400px] flex items-center justify-center'>
          {/* Navigation Buttons (Desktop: Side, Mobil: Bottom) */}
          <button
            onClick={prevReview}
            className='hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 p-4 text-white/30 hover:text-[#E07A5F] transition-colors z-20 hover:scale-110'
            aria-label='Forrige omtale'
          >
            <ChevronLeft size={40} strokeWidth={1} />
          </button>

          <button
            onClick={nextReview}
            className='hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 p-4 text-white/30 hover:text-[#E07A5F] transition-colors z-20 hover:scale-110'
            aria-label='Neste omtale'
          >
            <ChevronRight size={40} strokeWidth={1} />
          </button>

          {/* THE REVIEW CONTENT */}
          <div
            className={cn(
              'flex flex-col items-center text-center transition-all duration-300 ease-in-out px-4 md:px-20',
              isAnimating ?
                'opacity-0 scale-95 blur-sm'
              : 'opacity-100 scale-100 blur-0'
            )}
          >
            {/* The "Title" of the review */}
            <h3 className='font-serif text-2xl md:text-3xl text-[#E07A5F] mb-6 italic'>
              &ldquo;{currentReview.title}&rdquo;
            </h3>

            {/* The Main Quote */}
            <p className='text-xl md:text-3xl font-serif leading-relaxed text-[#F4F1EA] mb-10 max-w-3xl'>
              {currentReview.quote}
            </p>

            {/* The Author Info (Styled as a signature block) */}
            <div className='flex flex-col items-center gap-1 border-t border-white/10 pt-6 px-10'>
              <span className='font-bold text-lg tracking-wide uppercase'>
                {currentReview.name}
              </span>
              <div className='flex items-center gap-2 text-[#F4F1EA]/50 text-sm'>
                <span>{currentReview.role}</span>
                <span>•</span>
                <span className='flex items-center gap-1'>
                  <MapPin size={12} /> {currentReview.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className='flex justify-center gap-3 mt-8 md:hidden'>
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                i === currentIndex ? 'bg-[#E07A5F] w-6' : 'bg-white/20'
              )}
              aria-label={`Gå til omtale ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
