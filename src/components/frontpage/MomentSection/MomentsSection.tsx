import { MomentsHeader } from './MomentsHeader'
import { MomentCardsGrid } from '@/components/frontpage/MomentSection/MomentCardsGrid'

export function MomentsSection() {
  return (
    <section className='relative w-full py-24 md:py-32 overflow-hidden'>
      {/* Immersiv, dyp bunnfarge forankret i merkevarens primærpalett */}
      <div className='absolute inset-0 bg-[color-mix(in_oklab,var(--havdyp)_85%,#050508)] pointer-events-none -z-10' />

      {/* Sofistikert, dempet skillelinje tilpasset luksusprofilen */}
      <div className='absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent opacity-60' />

      <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
        <MomentsHeader />

        <MomentCardsGrid />
      </div>
    </section>
  )
}
