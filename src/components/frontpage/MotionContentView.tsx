// Path: src/components/frontpage/MotionContentView.tsx
import { forwardRef } from 'react'
import { Award } from 'lucide-react'
import { ChevronDownSection } from '@/components/frontpage/components/HeroSection/ChevronDown'

interface MotionContentViewProps {
  titleLetters: string[]
}

export const MotionContentView = forwardRef<
  HTMLDivElement,
  MotionContentViewProps
>(({ titleLetters }, ref) => {
  return (
    <div ref={ref} className='mb-8 text-center'>
      <div className='gsap-badge-container invisible relative mx-auto mb-6 inline-flex h-10 items-center justify-center'>
        <div className='gsap-badge-bg absolute inset-0 rounded-full border border-sky-800/30 bg-sky-900/10' />
        <div className='gsap-badge-content relative flex items-center gap-2 px-4'>
          <Award className='h-4 w-4 text-sky-400' />
          <span className='bg-gradient-to-r from-sky-200 via-white to-sky-200 bg-clip-text text-sm font-medium text-transparent'>
            Funksjonell varme - siden 2020
          </span>
        </div>
      </div>

      <h1 className='mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl'>
        <span
          className='relative -mx-2 inline-block overflow-hidden px-2 pb-4'
          aria-label='Utekos'
        >
          {titleLetters.map((char, index) => (
            <span
              key={index}
              className='gsap-char inline-block origin-bottom will-change-transform'
            >
              {char}
            </span>
          ))}
        </span>

        <div className='overflow-hidden'>
          <span className='gsap-subtitle mt-2 block bg-gradient-to-r from-slate-900 via-slate-500 to-slate-900 bg-clip-text text-transparent outline-hidden'>
            Skreddersy varmen
          </span>
        </div>
      </h1>

      <div className='mx-auto mb-12 mt-6 max-w-2xl md:max-w-4xl'>
        <p
          data-nosnippet='false'
          className='gsap-desc invisible text-lg leading-relaxed text-foreground/80 lg:text-2xl'
        >
          Kompromissløs komfort. Overlegen allsidighet.{' '}
          <span className='relative inline-flex items-center justify-center px-1'>
            <span className='gsap-highlight absolute inset-0 -z-10 -skew-x-12 scale-x-0 rounded-md bg-gradient-to-r from-sky-500/10 via-sky-400/20 to-sky-500/10 blur-[1px] will-change-transform' />

            <span className='gsap-highlight absolute inset-0 -z-10 -rotate-1 scale-x-0 rounded-lg border border-sky-500/20 bg-sky-500/5 will-change-transform' />

            <span className='relative z-10 inline-block font-semibold text-sky-100/90'>
              Juster, form og nyt.
            </span>
          </span>
        </p>
      </div>

      <div
        data-nosnippet
        className='gsap-chevron invisible justify-center md:flex'
      >
        <ChevronDownSection />
      </div>
    </div>
  )
})

MotionContentView.displayName = 'MotionContentView'
