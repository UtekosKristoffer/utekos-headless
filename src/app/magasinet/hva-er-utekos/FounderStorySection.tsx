'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Quote } from 'lucide-react'

const founderImage = '/erling-messe.JPEG'

export const FounderStorySection = () => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <section
      id='erling'
      className='relative py-24 sm:py-32 lg:py-40 overflow-hidden'
    >
      {/* Subtle background gradient */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none' />

      <div className='relative mx-auto max-w-7xl px-6 lg:px-8'>
        {/* Overline */}
        <div className='mb-12 lg:mb-16'>
          <span className='inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-accent/70'>
            <span className='h-px w-12 bg-gradient-to-r from-transparent to-white/70' />
            Historien bak Utekos
          </span>
        </div>

        {/* Main grid */}
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-start'>
          {/* Left: Image Column */}
          <div className='relative lg:sticky lg:top-24'>
            <div className='relative group'>
              {/* Decorative elements */}
              <div className='absolute -inset-4 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700' />
              <div className='absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

              {/* Image container */}
              <div className='relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl'>
                <Image
                  src={founderImage}
                  alt='Erling Holthe, Grunnlegger av Utekos'
                  fill
                  className={`object-cover transition-all duration-700 ${
                    imageLoaded ? 'scale-100 blur-0' : 'scale-105 blur-sm'
                  } group-hover:scale-105`}
                  sizes='(max-width: 1024px) 100vw, 45vw'
                  priority
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Gradient overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0' />
              </div>

              {/* Founder name overlay */}
              <div className='absolute bottom-0 left-0 right-0 p-6 lg:p-8'>
                <div className='backdrop-blur-xl bg-white/5 rounded-xl px-5 py-4 border border-white/10 shadow-2xl'>
                  <h3 className='text-xl lg:text-2xl font-semibold text-white mb-1'>
                    Erling Holthe
                  </h3>
                  <p className='text-sm text-white/70 font-light tracking-wide'>
                    Grunnlegger, Utekos
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content Column */}
          <div className='flex flex-col justify-center space-y-10'>
            {/* Quote Block */}
            <div className='relative'>
              {/* Large decorative quote mark */}
              <Quote
                className='absolute -left-2 -top-6 lg:-left-4 lg:-top-8 h-16 w-16 lg:h-20 lg:w-20 text-primary/[0.08] -rotate-6'
                strokeWidth={1.5}
              />

              <div className='relative'>
                <blockquote className='text-2xl sm:text-3xl lg:text-4xl font-light leading-[1.4] text-foreground/95 tracking-tight'>
                  Jeg var lei av stive pledd og gode øyeblikk som ble kuttet
                  kort av kulden. Det måtte finnes en bedre måte å holde varmen
                  på.
                </blockquote>
              </div>
            </div>

            {/* Body Text */}
            <div className='space-y-6 text-base lg:text-lg leading-relaxed text-muted-foreground/90'>
              <p className='first-letter:text-5xl first-letter:font-light first-letter:text-primary/80 first-letter:mr-1 first-letter:float-left first-letter:leading-[0.8]'>
                Jeg har alltid elsket de små, verdifulle øyeblikkene – den
                stille kaffekoppen på en kjølig morgen, den gode samtalen rundt
                bålpannen, eller roen i båten rett etter at solen har gått ned.
              </p>
              <p>
                Men frustrasjonen var alltid den samme: lag på lag med klær som
                gjorde meg mer til en Michelin-mann enn en avslappet livsnyter.
              </p>
            </div>

            {/* Statement Card */}
            <div className='relative group/card'>
              {/* Glow effect on hover */}
              <div className='absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl opacity-0 group-hover/card:opacity-100 blur-xl transition-all duration-500' />

              <div className='relative bg-gradient-to-br from-primary/[0.08] to-primary/[0.03] backdrop-blur-sm rounded-xl px-7 py-7 lg:px-8 lg:py-8 border border-primary/10 shadow-xl'>
                {/* Decorative corner accent */}
                <div className='absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full' />

                <p className='relative text-lg lg:text-xl font-medium leading-relaxed text-foreground/95 tracking-tight'>
                  Svaret fantes ikke. Så jeg bestemte meg for å lage det selv.
                  Resultatet ble ikke bare et produkt, men en hyllest til de
                  små, verdifulle øyeblikkene i en travel hverdag.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FounderStorySection
