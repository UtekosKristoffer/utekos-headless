// Path: src/components/frontpage/components/HeroSection/MotionContent.tsx
import { Award } from 'lucide-react'
import { ChevronDownSection } from './ChevronDown'
export function MotionContent() {
  return (
    <div className='mb-8 text-center'>
      <div
        className='animate-fade-in-down mb-6 inline-flex items-center gap-2 rounded-full border border-sky-800/30 bg-sky-900/10 px-4 py-2'
        style={{ animationDelay: '0.2s' }}
      >
        <Award className='h-4 w-4 text-slate-600' />
        <span className='bg-gradient-to-r from-slate-900 via-slate-500 to-slate-900 bg-clip-text text-sm font-medium text-transparent'>
          Funksjonell varme - siden 2020
        </span>
      </div>

      <h1
        className='animate-fade-in-up mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl'
        style={{ animationDelay: '0.3s' }}
      >
        <span className='relative inline-block'>Utekos®</span>
        <span className='bg-gradient-to-r from-slate-900 via-slate-500 to-slate-900 bg-clip-text text-transparent'>
          Skreddersy varmen.
        </span>{' '}
      </h1>

      <p
        data-nosnippet='false'
        className='animate-fade-in-up mx-auto mt-6 mb-12 max-w-2xl text-lg leading-relaxed text-foreground/80 md:max-w-4xl lg:text-2xl'
        style={{ animationDelay: '0.5s' }}
      >
        Kompromissløs komfort. Overlegen allsidighet. Juster, form og nyt.
      </p>
      <div
        data-nosnippet
        className='animate-fade-in hidden justify-center md:flex'
        style={{ animationDelay: '0.7s' }}
      >
        <ChevronDownSection />
      </div>
    </div>
  )
}
