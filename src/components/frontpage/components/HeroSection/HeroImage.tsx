import heroImage from '@public/monica-arne-balpanne-1.png'
import Image from 'next/image'

export function HeroImage() {
  return (
    <div className='group relative mx-auto mb-8 max-w-7xl overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl'>
      <div className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent' />

      <div className='relative transition-transform duration-300 will-change-transform motion-safe:group-hover:scale-[1.02]'>
        <Image
          src={heroImage}
          alt='To personer i Utekos-plagg sitter på en stein i skogen og deler et hyggelig øyeblikk, fullt påkledd for varme og komfort.'
          width={1080}
          height={1080}
          quality={100}
          sizes='(min-width: 1280px) 1280px, 100vw'
          className='mx-auto w-full rounded-xl object-cover object-bottom'
          priority
        />
      </div>
    </div>
  )
}
