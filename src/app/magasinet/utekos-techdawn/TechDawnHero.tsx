import Image from 'next/image'
import TechHeroImage from '@public/magasinet/helene.png'
export function TechDawnHero() {
  return (
    <section className='relative w-full h-screen bg-black'>
      {/* Background Image - Constrained Width */}
      <div className='absolute inset-0 flex justify-center'>
        <div className='relative size-full max-w-7xl'>
          <Image
            src={TechHeroImage}
            alt='Utekos TechDawn på fjelltopp'
            fill
            className='object-cover object-center'
            sizes='(max-width: 1280px) 100vw, 1280px'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60' />
        </div>
      </div>

      {/* Content */}
      <div className='relative h-full flex flex-col justify-end'>
        <div className='max-w-4xl mx-auto px-6 pb-50'>
          <div className='flex items-center gap-4 mb-6'>
            <span className='text-yellow-400 text-sm uppercase tracking-widest'>
              Nyhet
            </span>
            <span className='h-px bg-yellow-400/50 flex-1 max-w-[100px]' />
          </div>
          <h1 className='text-5xl md:text-6xl font-light mb-6 leading-tight'>
            Utekos TechDawn™
          </h1>
          <p className='text-xl text-gray-200 font-light'>
            Når komfort møter bekymringsfrihet
          </p>
        </div>
      </div>
    </section>
  )
}
