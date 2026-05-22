import heroImage from '@public/linn-kate-kikkert.webp'
import Image from 'next/image'

export function HeroImage() {
  return (
    <div className='group relative mx-auto mb-8 max-w-7xl md:max-w-6xl overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl'>
      <div className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent' />
      <div className='relative aspect-[3/2] transition-transform duration-300 will-change-transform motion-safe:group-hover:scale-[1.02]'>
        <Image
          src={heroImage}
          alt='To kvinner i Utekos-plagg sitter på en terassen og nyter ost og vin.'
          fill
          quality={80}
          sizes='(min-width: 768px) 1152px, 100vw'
          className='object-cover'
          preload
          placeholder='blur'
        />
      </div>
    </div>
  )
}
