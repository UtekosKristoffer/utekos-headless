// Path: src/app/produkter/[handle]/ProductPageView/components/ProductGalleryCard.tsx
// Server Component: wrapper rundt bildegalleriet (ren presentasjon + glow/ramme/container)

import { AnimatedBlock } from '@/components/AnimatedBlock'

export interface ProductGalleryCardProps {
  galleryContent: React.ReactNode
  enableStickyOnDesktop?: boolean
  /** CSS-klasse for top-offset når sticky er aktiv. Default: md:top-24 */
  stickyTopClassName?: string
  /** Valgfri ARIA label for innpakningen; gi meningsfull tekst ved behov. */
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
      <section aria-label={ariaLabel} className='mx-auto max-w-xl rounded-lg'>
        <div className='group relative w-full overflow-hidden rounded-2xl p-4 border border-neutral-800 bg-sidebar-foreground shadow-xl transition-all duration-300 hover:border-neutral-700'>
          <div
            className='absolute -inset-2 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20'
            style={{
              background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)'
            }}
            aria-hidden='true'
          />
          <div className='relative'>{galleryContent}</div>
        </div>
      </section>
    </AnimatedBlock>
  )
}
