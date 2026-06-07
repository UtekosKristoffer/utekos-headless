// Path: src/app/skreddersy-varmen/components/TechDownSlider.tsx

'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { ChevronsLeftRight, ShieldCheck, Waves } from 'lucide-react'
import TechDownDryFiber from '@public/techdown-dry-macro.webp'
import TechDownWetFiber from '@public/techdown-wet-macro.webp'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { useTechDownContentSwap, useTechDownSliderAnimations } from '@/hooks/useTechDownSliderAnimations'

const content = {
  dry: {
    label: 'Tørt klima',
    title: 'Maksimal isolasjon',
    desc: 'Slik ser Utekos TechDown™ ut under ideelle forhold. Tusenvis av mikroskopiske luftlommer fanger kroppsvarmen din og skaper en lun, beskyttende barriere mot omgivelsene.',
    icon: <ShieldCheck className='size-6 text-chai-tea' aria-hidden /> // Varm farge for tørt klima
  },
  wet: {
    label: 'Fuktig klima',
    title: 'Uendret beskyttelse',
    desc: 'Her skiller teknologien seg fra tradisjonell dun. Under fuktige forhold og når regnet treffer, kollapser ikke fibrene. De er hydrofobe (vannavstøtende) og fortsetter å isolere deg.',
    icon: <Waves className='size-6 text-very-peri' aria-hidden /> // Kald/fuktig farge for vått klima
  }
} as const

function clampPercentage(value: number) {
  return Math.min(Math.max(value, 0), 100)
}

export function TechDownSlider() {
  const containerRef = useTechDownSliderAnimations()
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const sliderImageRef = useRef<HTMLDivElement>(null)
  const dragRectRef = useRef<DOMRect | null>(null)
  const isDraggingRef = useRef(false)
  const pendingClientXRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  const isDryView = position > 50
  const currentContent = isDryView ? content.dry : content.wet

  useTechDownContentSwap(isDryView, {
    badge: '.gsap-tech-status-badge',
    title: '.gsap-tech-card-title',
    desc: '.gsap-tech-card-desc',
    stat: '.gsap-tech-stat'
  })

  const updatePositionFromClientX = (clientX: number) => {
    const rect = dragRectRef.current
    if (!rect || rect.width <= 0) return

    const x = clientX - rect.left
    const nextPosition = clampPercentage((x / rect.width) * 100)
    setPosition(nextPosition)
  }

  const schedulePositionUpdate = (clientX: number) => {
    pendingClientXRef.current = clientX

    if (animationFrameRef.current !== null) {
      return
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null

      const pendingClientX = pendingClientXRef.current
      pendingClientXRef.current = null

      if (pendingClientX === null) {
        return
      }

      updatePositionFromClientX(pendingClientX)
    })
  }

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    dragRectRef.current = event.currentTarget.getBoundingClientRect()
    isDraggingRef.current = true
    setIsDragging(true)

    event.currentTarget.setPointerCapture(event.pointerId)
    schedulePositionUpdate(event.clientX)
  }

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return
    schedulePositionUpdate(event.clientX)
  }

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false
    dragRectRef.current = null
    pendingClientXRef.current = null
    setIsDragging(false)

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const sliderStyle = {
    '--techdown-position': `${position}%`,
    '--techdown-clip-right': `${100 - position}%`
  } as CSSProperties

  return (
    // Lys bakgrunn (white-sand) for å kontrastere den mørke forrige seksjonen
    <section
      ref={containerRef}
      aria-labelledby='techdown-heading'
      className='w-full border-t border-maritime-darkest/10 bg-white-sand py-24 text-maritime-darkest'
    >
      <div className='mx-auto max-w-5xl px-6'>
        <div className='gsap-tech-intro mb-16 text-center'>
          <span className='gsap-tech-eyebrow mb-3 inline-block font-utekos-text-medium leading-4 text-chai-tea'>
            Teknologi
          </span>
          <h2
            id='techdown-heading'
            className='gsap-tech-title mb-6 text-balance font-google-sans text-4xl font-bold leading-heading-level-two tracking-[-0.01em] text-maritime-darkest md:text-5xl lg:text-6xl'
          >
            Når været snur, består varmen
          </h2>
          <p className='gsap-tech-subtitle mx-auto max-w-2xl font-utekos-text-medium leading-text-paragraph text-base md:text-lg text-maritime-darkest/85'>
            Dra linjen for å se forskjellen på hvordan vanlig dun og Utekos TechDown™ håndterer fuktighet.
          </p>
        </div>

        {/* Instruksjonsboks justert til Cloud Dancer for en ren, premium følelse mot White Sand */}
        <div className='mb-5 flex flex-col gap-3 tracking-normal! font-utekos-text rounded-sm border border-maritime-darkest/10 bg-cloud-dancer p-4 text-maritime-darkest md:flex-row md:items-center md:justify-between'>
          <label
            htmlFor='techdown-moisture-slider'
            className='text-base md:text-lg font-utekos-text leading-4'
          >
            Sammenlign tørr og fuktig isolasjon
          </label>
          <input
            id='techdown-moisture-slider'
            type='range'
            min={0}
            max={100}
            value={position}
            aria-valuetext={`${Math.round(position)} prosent tørr visning`}
            onChange={event => setPosition(clampPercentage(Number(event.currentTarget.value)))}
            className='h-2 w-full accent-very-peri focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-very-peri md:max-w-sm'
          />
        </div>

        <div className='gsap-tech-slider relative rounded-sm border border-maritime-darkest/5 bg-cloud-dancer p-2 shadow-2xl md:p-4'>
          <div
            ref={sliderImageRef}
            className='relative aspect-4/3 w-full cursor-ew-resize select-none overflow-hidden rounded-sm bg-maritime-darkest touch-none md:aspect-21/9'
            style={sliderStyle}
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={event => {
              if (isDraggingRef.current) {
                endDrag(event)
              }
            }}
          >
            <div className='absolute inset-0 size-full'>
              <Image
                src={TechDownWetFiber}
                alt='TechDown fiber i fuktig vær'
                fill
                sizes='(max-width: 1024px) 100vw, 80vw'
                className='object-cover'
                draggable={false}
              />
            </div>

            <div
              className='absolute inset-0 z-20 overflow-hidden border-r-2 border-cloud-dancer/50'
              style={{
                clipPath: 'inset(0 var(--techdown-clip-right) 0 0)'
              }}
            >
              <Image
                src={TechDownDryFiber}
                alt='TechDown fiber i tørt vær'
                fill
                sizes='(max-width: 1024px) 100vw, 80vw'
                className='object-cover opacity-90'
                draggable={false}
              />
            </div>

            {/* Vått vær-badge: Kald havdyp med hvit tekst */}
            <div className='pointer-events-none absolute right-6 top-6 z-10'>
              <BrandBadge
                backgroundColor='var(--color-havdyp)'
                textColor='var(--color-cloud-dancer)'
                className='h-8 px-4 py-0 text-xs font-medium leading-none shadow-sm backdrop-blur-md'
              >
                Fuktig vær
              </BrandBadge>
            </div>

            {/* Tørt vær-badge: Varm iced-apricot med mørk tekst */}
            <div className='pointer-events-none absolute left-6 top-6 z-30'>
              <BrandBadge
                backgroundColor='var(--color-iced-apricot)'
                textColor='var(--color-maritime-darkest)'
                className='h-8 px-4 py-0 text-xs font-medium leading-none shadow-lg backdrop-blur-md'
              >
                Tørt vær
              </BrandBadge>
            </div>

            <div
              className='absolute bottom-0 top-0 z-40 flex w-1 cursor-ew-resize items-center justify-center bg-cloud-dancer shadow-[0_0_30px_rgba(0,0,0,0.5)]'
              style={{ left: 'var(--techdown-position)' }}
            >
              <div
                className={[
                  'gsap-tech-handle flex size-16 -translate-x-1/2 transform items-center justify-center rounded-full border border-maritime-darkest/10 bg-cloud-dancer text-very-peri shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-transform duration-200 hover:scale-110 active:scale-95',
                  isDragging ? 'scale-105' : ''
                ].join(' ')}
              >
                <ChevronsLeftRight size={28} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Informasjonskort holdes rent i Cloud Dancer for optimal lesbarhet */}
        <div className='gsap-tech-card mt-12 rounded-sm border border-maritime-darkest/5 bg-cloud-dancer p-8 shadow-xl md:p-12'>
          <div className='flex flex-col items-start gap-8 md:flex-row md:gap-16'>
            <div className='flex flex-col items-start md:w-1/3'>
              <BrandBadge
                backgroundColor='var(--color-white-sand)'
                textColor='var(--color-maritime-darkest)'
                className='gsap-tech-status-badge mb-4 gap-3 text-xs font-medium leading-none shadow-sm flex items-center'
              >
                <span className='text-base w-full text-left text-balance font-utekos-text-medium leading-4 text-maritime-darkest flex items-center gap-2'>
                  {currentContent.icon} {currentContent.label}
                </span>
              </BrandBadge>

              <h3 className='gsap-tech-card-title font-google-sans text-3xl font-bold leading-[0.95] tracking-[-0.01em] text-maritime-darkest'>
                {currentContent.title}
              </h3>
            </div>

            <div className='md:w-2/3'>
              <p className='gsap-tech-card-desc mb-8 text-lg font-utekos-text! pb-2 text-maritime-darkest/90'>
                {currentContent.desc}
              </p>

              <div className='border-t border-maritime-darkest/10 pt-6'>
                <div className='mb-2 flex items-end justify-between'>
                  <span className='text-sm font-utekos-text-medium leading-4 text-maritime-darkest'>
                    Isolasjonsevne
                  </span>
                  <span className='gsap-tech-stat font-google-sans text-xl font-bold leading-[0.95] tracking-[-0.01em] text-maritime-darkest'>
                    {isDryView ? '100%' : '98%'}
                  </span>
                </div>
                {/* Her skjer magien med fremdriftslinjen! Den skifter farge basert på state */}
                <div className='h-1.5 w-full overflow-hidden rounded-full bg-white-sand'>
                  <div
                    className='gsap-tech-progress h-full transition-all duration-1000 ease-out'
                    style={{
                      width: isDryView ? '100%' : '98%',
                      backgroundColor: isDryView ? 'var(--color-iced-apricot)' : 'var(--color-very-peri)'
                    }}
                  />
                </div>
                <p className='mt-3 text-xs italic font-utekos-text leading-text-paragraph text-maritime-darkest/75'>
                  *Beholder nær full effekt selv i ekstrem fuktighet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
