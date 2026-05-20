// Path: src/app/produkter/[handle]/ProductPageView/components/ProductGalleryCard.tsx

import { AnimatedBlock } from '@/components/AnimatedBlock'

export interface ProductGalleryCardProps {
  galleryContent: React.ReactNode
  enableStickyOnDesktop?: boolean
  stickyTopClassName?: string
  ariaLabel?: string
}

export default function ProductGalleryCard({
  galleryContent,
  enableStickyOnDesktop = true,
  stickyTopClassName = 'md:top-32 lg:top-28',
  ariaLabel
}: ProductGalleryCardProps) {
  return (
    <div
      className={[
        enableStickyOnDesktop ? `h-fit md:sticky ${stickyTopClassName}` : '',
        'z-10'
      ].join(' ')}
    >
      <AnimatedBlock
        className='will-animate-fade-in-scale'
        delay='0.12s'
        threshold={0.2}
      >
        <section
          aria-label={ariaLabel}
          className='mx-auto w-full max-w-lg rounded-[1.5rem] lg:max-w-xl xl:max-w-2xl'
        >
          <div className='group relative w-full overflow-hidden rounded-[1.5rem] border border-cloud-dancer/70 bg-cloud-dancer/72 shadow-2xl shadow-maritime-blue/10 transition-all duration-300 hover:border-dusted-peri/45'>
            <div className='relative'>{galleryContent}</div>
          </div>
        </section>
      </AnimatedBlock>
    </div>
  )
}
