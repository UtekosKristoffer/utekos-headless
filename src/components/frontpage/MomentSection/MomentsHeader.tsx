import {
  CinematicWord,
  LuxuryShimmerText,
  OrganicCircleWord,
  GlowWord
} from '@/components/frontpage/TextReveal'
import { MomentsHeaderMotion } from '@/components/frontpage/MomentSection/MomentsHeaderMotion'

export function MomentsHeader() {
  return (
    <div id='moments-header' className='mb-24 text-center mx-auto max-w-5xl px-4'>
      {/* Overskrift: Strengt bundet til Utekos Title (Sentence case, leading 90%, tracking -1%, primærfarge) */}
      <h2 className='text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-10 leading-heading-level-two tracking-[-0.01em]'>
        <div className='flex flex-wrap justify-center gap-x-3 md:gap-x-5 items-baseline'>
          <CinematicWord delay={0.1}>Skapt</CinematicWord>
          <CinematicWord delay={0.15}>for</CinematicWord>
          <CinematicWord delay={0.2}>dine</CinematicWord>

          {/* THE HERO WORD: Holdes i primærfargen cloud-dancer med subtilt luksus-shimmer i hvit/lys oklch spekter */}
          <span className='inline-block'>
            <LuxuryShimmerText
              text='øyeblikk'
              className='font-bold tracking-[-0.01em] text-foreground [--shimmer-color:rgba(255,255,255,0.4)]'
            />
          </span>
        </div>
      </h2>

      <div className='max-w-3xl mx-auto'>
        <p className='text-lg md:text-2xl text-foreground/90 leading-text-paragraph tracking-[-0.02em] flex flex-wrap justify-center gap-x-2 items-center'>
          <CinematicWord className='font-normal' delay={0.4}>
            Uansett
          </CinematicWord>
          <CinematicWord className='font-normal' delay={0.45}>
            hvor
          </CinematicWord>
          <CinematicWord className='font-normal' delay={0.5}>
            du
          </CinematicWord>
          <CinematicWord className='font-normal' delay={0.55}>
            finner
          </CinematicWord>
          <span className='text-foreground font-medium [--circle-stroke:var(--ancient-water)]'>
            <OrganicCircleWord delay={0.6}>roen,</OrganicCircleWord>
          </span>

          <CinematicWord className='font-normal' delay={0.7}>
            er
          </CinematicWord>
          <CinematicWord className='font-normal' delay={0.75}>
            Utekos
          </CinematicWord>
          <CinematicWord className='font-normal' delay={0.8}>
            designet
          </CinematicWord>
          <CinematicWord className='font-normal' delay={0.85}>
            for
          </CinematicWord>
          <CinematicWord className='font-normal' delay={0.9}>
            å
          </CinematicWord>
          <CinematicWord className='font-normal' delay={0.95}>
            gjøre
          </CinematicWord>

          {/* "Opplevelsen" - Gløden er kalibrert til en dempet hvit skyggeeffekt i stedet for mettede farger */}
          <span className='text-foreground font-medium [--glow-color:rgba(244,244,247,0.25)]'>
            <GlowWord delay={1.0}>opplevelsen</GlowWord>
          </span>

          <CinematicWord className='font-normal' delay={1.1}>
            bedre.
          </CinematicWord>
        </p>
      </div>
      <MomentsHeaderMotion />
    </div>
  )
}
