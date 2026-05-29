import heroFourThreeImage from '@public/kate-linn-2048-1536-85.webp'
import heroSixteenNineImage from '@public/kate-linn-2560-1440-85.webp'
import heroSixteenTenImage from '@public/kate-linn-2560-1600-85.webp'
import { getImageProps } from 'next/image'

const heroImageProps = {
  alt: 'To kvinner i Utekos TechDown sitter på en terassen og nyter ost og vin.',
  decoding: 'async',
  fetchPriority: 'high',
  loading: 'eager',
  quality: 80,
  sizes: '(min-width: 1152px) 1152px, calc(100vw - 2rem)'
} as const

const {
  props: { srcSet: heroFourThreeSrcSet, ...heroFallbackImageProps }
} = getImageProps({
  ...heroImageProps,
  src: heroFourThreeImage
})

const {
  props: { srcSet: heroSixteenNineSrcSet }
} = getImageProps({
  ...heroImageProps,
  src: heroSixteenNineImage
})

const {
  props: { srcSet: heroSixteenTenSrcSet }
} = getImageProps({
  ...heroImageProps,
  src: heroSixteenTenImage
})

export function HeroImage() {
  return (
    <div className='group relative mx-auto mb-7 max-w-6xl overflow-hidden rounded-2xl border border-cloud-dancer/12 bg-havdyp shadow-[0_28px_70px_-44px_color-mix(in_oklab,var(--havdyp)_80%,transparent)] sm:mb-10'>
      <div className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-maritime-darkest/38 via-maritime-darkest/4 to-transparent' />
      <div className='relative aspect-[4/3] transition-transform duration-300 motion-safe:group-hover:scale-[1.01] sm:aspect-[16/10] lg:aspect-[16/9]'>
        <picture className='block size-full'>
          <source media='(min-width: 1024px)' srcSet={heroSixteenNineSrcSet} />
          <source media='(min-width: 640px)' srcSet={heroSixteenTenSrcSet} />
          <source srcSet={heroFourThreeSrcSet} />
          <img
            {...heroFallbackImageProps}
            alt={heroImageProps.alt}
            className='block size-full object-cover object-[50%_45%]'
          />
        </picture>
      </div>
    </div>
  )
}
