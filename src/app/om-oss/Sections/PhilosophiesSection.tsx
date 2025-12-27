// Path: src/app/om-oss/Sections/PhilosophiesSection.tsx
import { corePhilosophies } from '@/constants/corePhilosophies'
import { AnimatedBlock } from '@/components/AnimatedBlock'

export function PhilosophiesSection() {
  return (
    <section className='py-24 sm:py-32 bg-[#2C2420] text-[#F4F1EA]'>
      <div className='container mx-auto max-w-7xl px-6 lg:px-8'>
        {/* HEADER */}
        <div className='mb-20 text-center max-w-3xl mx-auto'>
          <AnimatedBlock
            className='will-animate-fade-in-up'
            delay='0s'
            threshold={0.2}
          >
            <span className='text-[#E07A5F] font-bold tracking-[0.2em] uppercase text-sm block mb-4'>
              Vårt DNA
            </span>
            <h2 className='text-4xl md:text-5xl font-serif text-white mb-6'>
              Kjernen i alt vi gjør
            </h2>
            {/* Tekststørrelse økt til text-xl (20px) for intro */}
            <p className='text-xl text-[#F4F1EA] font-light leading-relaxed'>
              Fire ufravikelige prinsipper som sikrer at du alltid får den
              opplevelsen du fortjener.
            </p>
          </AnimatedBlock>
        </div>

        {/* GRID */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {corePhilosophies.map((item, i) => (
            <AnimatedBlock
              key={item.title}
              className='will-animate-fade-in-scale'
              delay={`${i * 0.1}s`}
              threshold={0.2}
            >
              <div className='relative h-full overflow-hidden rounded-sm border border-[#F4F1EA]/10 bg-[#1F2421] p-8 text-center group hover:border-[#E07A5F]/50 transition-colors duration-500 shadow-lg flex flex-col'>
                {/* Bakgrunnsglød */}
                <div
                  className='absolute -top-10 -right-10 w-32 h-32 opacity-0 group-hover:opacity-20 blur-[50px] transition-opacity duration-700 pointer-events-none'
                  style={{ background: '#E07A5F' }}
                />

                <div className='relative z-10 flex flex-col items-center h-full'>
                  <div className='flex h-16 w-16 items-center justify-center rounded-full bg-[#E07A5F]/10 text-[#E07A5F] mb-6 group-hover:scale-110 transition-transform duration-300'>
                    <item.icon className='h-7 w-7' strokeWidth={1.5} />
                  </div>

                  <h3 className='text-2xl font-serif font-medium text-white mb-4'>
                    {item.title}
                  </h3>

                  {/* Tekststørrelse økt til text-lg (18px) og full opasitet */}
                  <p className='text-lg text-[#F4F1EA] font-light leading-relaxed'>
                    {item.text}
                  </p>
                </div>
              </div>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
