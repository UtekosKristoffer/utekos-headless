// Path: src/app/produkter/[handle]/ProductPageView/components/ProductGalleryCard.tsx

import { AnimatedBlock } from '@/components/AnimatedBlock'

export interface ProductGalleryCardProps {
  galleryContent: React.ReactNode
  enableStickyOnDesktop?: boolean
  hasIntegratedBackground?: boolean
  integratedBackgroundSize?: 'wide' | 'compact'
  flushOnMobile?: boolean
  stickyTopClassName?: string
  ariaLabel?: string
}

export default function ProductGalleryCard({
  galleryContent,
  enableStickyOnDesktop = true,
  hasIntegratedBackground = false,
  integratedBackgroundSize = 'wide',
  flushOnMobile = false,
  stickyTopClassName = 'md:top-32 lg:top-28',
  ariaLabel
}: ProductGalleryCardProps) {
  const integratedBackgroundClassName =
    integratedBackgroundSize === 'compact' ?
      'group relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-[1.5rem] bg-transparent transition-all duration-300 lg:max-w-xl xl:max-w-2xl'
    : [
        'group relative overflow-hidden bg-transparent transition-all duration-300 hover:border-cloud-dancer/42',
        flushOnMobile ?
          '-mx-4 w-[calc(100%+2rem)] rounded-none border-0 shadow-none md:-ml-8 md:mr-0 md:w-[calc(100%+2rem)] md:rounded-[1.5rem] md:border md:border-cloud-dancer/22 md:shadow-2xl md:shadow-havdyp/18'
        : '-ml-4 aspect-square w-[calc(100%+1rem)] rounded-[1.5rem] border border-cloud-dancer/22 shadow-2xl shadow-havdyp/18 md:-ml-8 md:w-[calc(100%+2rem)]'
      ].join(' ')
  const defaultBackgroundClassName =
    flushOnMobile ?
      'group relative -mx-4 w-[calc(100%+2rem)] overflow-hidden rounded-none border-0 bg-cloud-dancer/72 shadow-none transition-all duration-300 hover:border-very-peri/45 md:-ml-8 md:mr-0 md:w-[calc(100%+2rem)] md:rounded-[1.5rem] md:border md:border-cloud-dancer/70 md:shadow-2xl md:shadow-havdyp/10'
    : 'group relative w-full overflow-hidden rounded-[1.5rem] border border-cloud-dancer/70 bg-cloud-dancer/72 shadow-2xl shadow-havdyp/10 transition-all duration-300 hover:border-very-peri/45'

  return (
    <div
      className={[
        enableStickyOnDesktop ? `size-full md:sticky ${stickyTopClassName}` : 'size-full',
        'z-10'
      ].join(' ')}
    >
      <AnimatedBlock className='size-full will-animate-fade-in-scale' delay='0.12s' threshold={0.2}>
        <section aria-label={ariaLabel} className='size-full rounded-3xl'>
          {hasIntegratedBackground ?
            <div className={`${integratedBackgroundClassName} size-full`}>{galleryContent}</div>
          : <div className={defaultBackgroundClassName}>
              <div className='relative'>{galleryContent}</div>
            </div>
          }
        </section>
      </AnimatedBlock>
    </div>
  )
}
