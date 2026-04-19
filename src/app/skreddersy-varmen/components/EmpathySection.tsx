// Path: src/app/skreddersy-varmen/components/EmpathySection.tsx
'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Balpanne from '@public/empathy-bonfire.png'
import { useEmpathySectionAnimations } from '@/hooks/useEmpathySectionAnimations'

const HEADLINE = 'Når øyeblikket er for godt til å avsluttes.'

function scrollToModel() {
  const element = document.getElementById('section-solution')
  if (element) element.scrollIntoView({ behavior: 'smooth' })
}

export function EmpathySection() {
  const sectionRef = useEmpathySectionAnimations()
  const words = HEADLINE.split(' ')

  return (
    <section
      ref={sectionRef}
      aria-labelledby='empathy-heading'
      className='relative w-full overflow-hidden bg-[#F4F1EA] py-24 text-[#2C2420] md:py-36 lg:py-40'
    >
      <div className='mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 md:px-12 lg:grid-cols-2 lg:gap-24'>
        <div className='relative'>
          {/* 1. Eyebrow — slide from LEFT + underline grow */}
          <div className='gsap-empathy-anim relative mb-6 inline-flex items-end overflow-hidden pb-2'>
            <span className='gsap-empathy-eyebrow text-[11px] font-bold uppercase tracking-[0.22em] text-[#E07A5F] md:text-xs'>
              Det du kjenner igjen
            </span>
            <span
              aria-hidden
              className='gsap-empathy-eyebrow-bar absolute left-0 bottom-0 h-px w-full bg-[#E07A5F]/40'
            />
          </div>

          {/* 2. H2 — word-by-word curtain reveal */}
          <h2
            id='empathy-heading'
            className='mb-8 font-serif text-3xl leading-[1.08] tracking-tight text-[#2C2420] sm:text-4xl md:text-5xl lg:text-6xl'
            aria-label={HEADLINE}
          >
            {words.map((word, i) => (
              <span
                key={i}
                aria-hidden
                className='relative mr-[0.22em] inline-block overflow-hidden align-bottom pb-[0.08em]'
              >
                <span className='gsap-empathy-word inline-block will-change-transform'>
                  {word}
                </span>
              </span>
            ))}
          </h2>

          <div className='prose prose-lg md:prose-xl max-w-none font-serif leading-relaxed text-[#2C2420]/80'>
            <p className='relative'>
              {/* 3. Drop-cap D — scale + rotate */}
              <span
                aria-hidden
                className='gsap-empathy-dropcap float-left pr-3 pt-2 font-serif text-6xl leading-[0.8] text-[#E07A5F] md:text-7xl'
              >
                D
              </span>
              {/* 4. First paragraph body — letter-spacing release */}
              <span className='gsap-empathy-para1 inline-block'>
                u kjenner følelsen. Praten går lett rundt bålpannen, flammene
                danser, og roen har senket seg. Men så kommer den — den snikende
                trekken som truer med å bryte magien.
              </span>
            </p>

            {/* 5. Quote — slide from RIGHT + accent bar grow from TOP */}
            <div className='relative my-10 py-2'>
              <span
                aria-hidden
                className='gsap-empathy-quote-bar absolute left-0 top-4 bottom-4 w-[3px] bg-[#E07A5F]'
              />
              <p className='gsap-empathy-quote ml-6 font-serif text-2xl italic font-medium leading-tight text-[#2C2420] md:ml-10 md:text-4xl'>
                &ldquo;Det begynner å bli kaldt. <br />
                Skal vi trekke inn?&rdquo;
              </p>
            </div>

            {/* 6. Second paragraph — blur to focus */}
            <p className='gsap-empathy-para2 font-sans text-base leading-relaxed tracking-wide text-[#2C2420]/85 md:text-lg'>
              Med Utekos<span className='text-[#E07A5F]'>®</span> er svaret nei.
              Fra lett mikrofiber til TechDown™ — plagget pakker deg inn i en
              beskyttende kokong av varme slik at du kan bli sittende.
              <br />
              <br />
              <span className='italic text-[#2C2420]'>
                Glem kulden. Forleng kvelden.
              </span>
            </p>
          </div>

          {/* 7. CTA — underline grow + arrow slide-in */}
          <div className='mt-10 md:mt-12'>
            <button
              type='button'
              onClick={scrollToModel}
              data-track='EmpathyCtaSkreddersyVarmen'
              className='group relative inline-flex items-center gap-4 pb-2 text-sm font-bold uppercase tracking-widest text-[#2C2420] transition-colors duration-300 hover:text-[#E07A5F]'
            >
              <span className='gsap-empathy-cta-text'>Utforsk kolleksjonen</span>
              <span aria-hidden className='gsap-empathy-cta-arrow inline-flex'>
                <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-2' />
              </span>
              <span
                aria-hidden
                className='gsap-empathy-cta-underline absolute inset-x-0 bottom-0 h-px bg-[#2C2420] transition-colors duration-300 group-hover:bg-[#E07A5F]'
              />
            </button>
          </div>
        </div>

        {/* 8. Image column — fade + scale + scroll parallax */}
        <div className='gsap-empathy-image-wrap relative w-full'>
          <div className='relative aspect-[4/5] w-full md:aspect-square'>
            <div className='relative h-full w-full overflow-hidden rounded-sm shadow-2xl shadow-[#2C2420]/20'>
              <div className='gsap-empathy-image absolute -inset-y-14 inset-x-0 will-change-transform'>
                <Image
                  src={Balpanne}
                  alt='Stemningsbilde av bålpanne og varme føtter'
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 100vw, 50vw'
                  quality={88}
                />
              </div>

              <div
                aria-hidden
                className='absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 via-black/25 to-transparent'
              />

              <div className='gsap-empathy-image-overlay absolute bottom-6 left-6 right-6 text-[#F4F1EA] md:bottom-8 md:left-8 md:right-8'>
                <div className='mb-2 flex items-center gap-2.5 opacity-90'>
                  <span className='relative flex h-2 w-2' aria-hidden>
                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E07A5F] opacity-60' />
                    <span className='relative inline-flex h-2 w-2 rounded-full bg-[#E07A5F]' />
                  </span>
                  <span className='text-[10px] font-mono uppercase tracking-widest md:text-xs'>
                    Stemning
                  </span>
                </div>
                <p className='font-serif text-xl italic leading-tight md:text-2xl [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]'>
                  &ldquo;Klokken er 23:15.
                  <br />
                  Ingen vil gå inn.&rdquo;
                </p>
              </div>
            </div>

            <div
              aria-hidden
              className='absolute -bottom-6 -right-6 -z-10 hidden h-full w-full rounded-sm border-2 border-[#2C2420]/10 md:block'
            />
          </div>
        </div>
      </div>

      <div id='section-solution' aria-hidden className='absolute bottom-0' />
    </section>
  )
}
