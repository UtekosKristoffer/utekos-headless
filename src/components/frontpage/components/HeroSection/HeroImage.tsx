import heroImage from '@public/linn-kate-kikkert.webp'
import Image from 'next/image'

export function HeroImage() {
  return (
    <div className='group relative mx-auto mb-7 max-w-6xl overflow-hidden rounded-2xl border border-cloud-dancer/12 bg-maritime-blue shadow-[0_28px_70px_-44px_color-mix(in_oklab,var(--maritime-blue)_80%,transparent)] sm:mb-10'>
      <div className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-maritime-darkest/38 via-maritime-darkest/4 to-transparent' />
      <div className='relative aspect-[4/3] transition-transform duration-300 will-change-transform motion-safe:group-hover:scale-[1.02] sm:aspect-[16/10] lg:aspect-[16/9]'>
        <Image
          src={heroImage}
          alt='To kvinner i Utekos-plagg sitter på en terassen og nyter ost og vin.'
          fill
          quality={80}
          sizes='(min-width: 768px) 1152px, 100vw'
          className='object-cover object-[50%_45%]'
          preload
          placeholder='blur'
        />
      </div>
    </div>
  )
}
