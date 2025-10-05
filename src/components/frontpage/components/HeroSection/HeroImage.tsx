import heroImage from '@public/frontpage-kate-linn.webp'
import Image from 'next/image'

export function HeroImage() {
  return (
    <div className='animate-fade-in-up-scale group relative mb-8 mx-auto max-w-7xl overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl'>
      <div className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent' />

      <div
        className='absolute -inset-1 opacity-30 blur-xl transition-opacity duration-500 group-hover:opacity-40'
        style={{
          background:
            'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #0891b2 100%)'
        }}
      />

      <div className='relative'>
        <Image
          src={heroImage}
          alt='To personer i Utekos-plagg sitter på en stein i skogen og deler et hyggelig øyeblikk, fullt påkledd for varme og komfort.'
          width={2048}
          height={1363}
          className='mx-auto h-[60vh] w-full rounded-xl object-cover object-bottom transition-transform duration-700 group-hover:scale-[1.02] xl:h-[80vh]'
          priority
        />
      </div>
    </div>
  )
}
