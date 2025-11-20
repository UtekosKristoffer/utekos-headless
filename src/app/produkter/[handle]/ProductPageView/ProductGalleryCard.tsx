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
  stickyTopClassName = 'md:top-24',
  ariaLabel
}: ProductGalleryCardProps) {
  return (
    <AnimatedBlock
      className={[
        enableStickyOnDesktop ? `h-fit md:sticky ${stickyTopClassName}` : '',
        'will-animate-fade-in-scale'
      ].join(' ')}
      delay='0.12s'
      threshold={0.2}
    >
      <section aria-label={ariaLabel} className='mx-auto rounded-lg'>
        <div className='group relative w-full overflow-hidden rounded-2xl border border-neutral-800 bg-sidebar-foreground shadow-xl transition-all duration-300 hover:border-neutral-700'>
          <div className='relative'>{galleryContent}</div>
        </div>
      </section>
    </AnimatedBlock>
  )
}
