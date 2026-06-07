// Path: src/app/skreddersy-varmen/components/EmpathySection.tsx
'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useEmpathySectionAnimations } from '@/hooks/useEmpathySectionAnimations'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { scrollToElement } from '@/lib/gsap/scrollToElement'

const HEADLINE = 'Når øyeblikket er for godt til å avsluttes.'

function scrollToModel() {
  void scrollToElement('section-solution', { offsetY: 80 })
}

export function EmpathySection() {
  const sectionRef = useEmpathySectionAnimations()

  return (
    <section
      ref={sectionRef}
      aria-labelledby='empathy-heading'
      className='relative w-full overflow-hidden bg-cloud-dancer py-16 text-background md:py-24 lg:py-28'
    >
      <div className='mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-12 lg:grid-cols-2 lg:gap-16'>
        <div className='relative'>
          {/* 1. Eyebrow — slide from LEFT + underline grow */}
          <div className='gsap-empathy-anim relative mb-4 inline-flex items-end overflow-hidden pb-1.5'>
            <span className='gsap-empathy-eyebrow   text-sm font-medium leading-4   text-demitasse'>
              Det du kjenner igjen
            </span>
            <span
              aria-hidden
              className='gsap-empathy-eyebrow-bar absolute left-0 bottom-0 h-px w-full origin-left scale-x-0 bg-demitasse transition-transform duration-500'
            />
          </div>
          <h2
            id='empathy-heading'
            className='mb-5 max-w-[11ch] font-google-sans text-4xl font-bold leading-[0.92] tracking-[-0.01em] text-background sm:text-4xl md:text-5xl'
          >
            <span className='block overflow-hidden pb-[0.08em]'>
              <span className='gsap-empathy-word inline-block will-change-transform'>{HEADLINE}</span>
            </span>
          </h2>

          <div className='max-w-none   text-base leading-text-paragraph   text-background'>
            <p className='gsap-empathy-para1 relative max-w-136'>
              Du kjenner følelsen. Praten går lett rundt bålpannen, flammene danser, og roen har senket seg.
              Så kommer den snikende trekken som truer med å bryte magien.
            </p>
            <div className='relative my-7 py-1.5'>
              <span
                aria-hidden
                className='gsap-empathy-quote-bar absolute left-0 top-4 bottom-4 w-[3px] origin-top scale-y-0 bg-background transition-transform duration-500'
              />
              <p className='gsap-empathy-quote ml-5 font-google-sans text-xl font-bold italic leading-[0.95] tracking-normal text-background md:ml-7 md:text-3xl'>
                &ldquo;Det begynner å bli kaldt. <br />
                Skal vi trekke inn?&rdquo;
              </p>
            </div>
            <p className='gsap-empathy-para2 mt-6 max-w-136 text-background'>
              Med Utekos® blir svaret enkelt. Fra lett mikrofiber til TechDown™ pakker plagget deg inn i varme
              slik at du kan bli sittende.
              <br />
              <br />
              <span className='font-medium italic text-background'>Kjenn varmen. Forleng kvelden.</span>
            </p>
          </div>
          <div className='mt-8 md:mt-9'>
            <BrandBadge
              asChild
              backgroundColor='var(--color-background)'
              textColor='var(--color-cloud-dancer)'
              className='h-12 px-5 py-0 text-sm font-semibold leading-none tracking-normal shadow-sm transition-[filter,transform] hover:brightness-110 active:scale-[0.98] md:h-14 md:px-6 md:text-base'
            >
              <button
                type='button'
                onClick={scrollToModel}
                data-track='EmpathyCtaSkreddersyVarmen'
                className='group inline-flex items-center gap-2 leading-none'
              >
                <span className='gsap-empathy-cta-text block leading-none'>Utforsk kolleksjonen</span>
                <span aria-hidden className='gsap-empathy-cta-arrow inline-flex'>
                  <ArrowRight className='size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1' />
                </span>
              </button>
            </BrandBadge>
          </div>
        </div>

        <div className='gsap-empathy-image-wrap relative w-full'>
          <div className='relative aspect-4/5 w-full md:aspect-square'>
            <div className='relative h-full w-full overflow-hidden rounded-sm shadow-2xl shadow-demitasse/20'>
              <div className='gsap-empathy-image absolute -inset-y-14 inset-x-0 will-change-transform'>
                <Image
                  src='https://cdn.shopify.com/s/files/1/0634/2154/6744/files/utekos-balpanne.webp?v=1780688488'
                  alt='Bålpanne med flammer. To stk Utekos i bakgrunnen.'
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 100vw, 50vw'
                  quality={100}
                />
              </div>

              <div
                aria-hidden
                className='absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background/75 via-background/30 to-transparent'
              />

              <div className='gsap-empathy-image-overlay absolute bottom-5 left-5 right-5 text-foreground md:bottom-7 md:left-7 md:right-7'>
                <p className='mb-1.5   text-sm font-medium leading-4 tracking-normal text-foreground/85'>
                  Stemning
                </p>
                <p className='font-google-sans text-lg font-bold italic leading-[0.95] tracking-normal drop-shadow-md md:text-2xl'>
                  &ldquo;Klokken er 23:15.
                  <br />
                  Ingen vil gå inn.&rdquo;
                </p>
              </div>
            </div>

            <div
              aria-hidden
              className='absolute -bottom-6 -right-6 -z-10 hidden h-full w-full rounded-sm border-2 border-demitasse/10 md:block'
            />
          </div>
        </div>
      </div>

      <div id='section-solution' aria-hidden className='absolute bottom-0' />
    </section>
  )
}
