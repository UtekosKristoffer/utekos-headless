import Image from 'next/image'
import Balpanne from '@public/empathy-bonfire.png'
import { ScrollToTextLink } from './ScrollToTextLink'

export function EmpathySection() {
  return (
    <section className='relative w-full bg-[#F4F1EA] text-[#2C2420] py-24 md:py-40 overflow-hidden'>
      <div className='max-w-7xl mx-auto px-6 md:px-12'>
        <div className='flex flex-col lg:flex-row items-center gap-16 lg:gap-32'>
          <div className='lg:w-1/2 relative'>
            <span className='inline-block text-[#E07A5F] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-6 border-b border-[#E07A5F]/30 pb-2'>
              Ditt sosiale rom
            </span>
            <h2 className='font-serif text-4xl md:text-6xl lg:text-7xl text-[#2C2420] mb-8 leading-[1.05] tracking-tight'>
              Når øyeblikket er for godt til å avsluttes.
            </h2>

            <div className='prose prose-lg md:prose-xl text-[#2C2420]/75 font-serif leading-relaxed space-y-8'>
              <p>
                <span className='float-left text-6xl md:text-7xl text-[#E07A5F] font-serif pr-4 pt-2 leading-[0.8]'>
                  D
                </span>
                u kjenner følelsen. Praten går lett rundt bålpannen, flammene
                danser, og roen har endelig senket seg over hyttetunet. Men så
                kommer den – den snikende trekken som truer med å bryte magien.
              </p>
              <div className='relative py-4'>
                <p className='font-serif text-3xl md:text-4xl text-[#2C2420] italic font-medium leading-tight ml-8 md:ml-12'>
                  &ldquo;Det begynner å bli kaldt. <br />
                  Skal vi trekke inn?&rdquo;
                </p>
                <div className='absolute left-0 top-6 bottom-6 w-1 bg-[#E07A5F]' />
              </div>

              <p className='font-sans text-base md:text-lg tracking-wide text-[#2C2420]/90'>
                Med Utekos® er svaret nei. Vi har skapt en kolleksjon designet
                for å ta kvelden tilbake. Fra lett mikrofiber til eksklusiv dun
                – våre løsninger pakker deg inn i en beskyttende kokong av
                varme, slik at du kan bli sittende.
                <br />
                <br />
                <span className='italic'>Glem kulden. Forleng kvelden.</span>
              </p>
            </div>
            <div className='mt-12'>
              <ScrollToTextLink />
            </div>
          </div>

          <div className='lg:w-1/2 w-full'>
            <div className='relative w-full aspect-[4/5] md:aspect-square'>
              <div className='relative h-full w-full rounded-sm overflow-hidden shadow-2xl shadow-[#2C2420]/20'>
                <Image
                  src={Balpanne}
                  alt='Stemningsbilde av bålpanne og varme føtter - Utekos forlenger kvelden'
                  fill
                  placeholder='blur'
                  className='object-cover transform hover:scale-105 transition-transform duration-[3s] ease-in-out'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />

                <div className='absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent' />

                <div className='absolute bottom-8 left-8 right-8 text-[#F4F1EA]'>
                  <div className='flex items-center gap-3 mb-2 opacity-80'>
                    <div className='w-2 h-2 rounded-full bg-[#E07A5F] animate-pulse' />
                    <span className='text-xs font-mono uppercase tracking-widest'>
                      Stemning
                    </span>
                  </div>
                  <p className='font-serif text-2xl italic leading-none'>
                    &ldquo;Klokken er 23:15.
                    <br />
                    Ingen vil gå inn.&rdquo;
                  </p>
                </div>
              </div>
              <div className='absolute -z-10 -bottom-6 -right-6 w-full h-full border-2 border-[#2C2420]/5 rounded-sm hidden md:block' />
            </div>
          </div>
        </div>
      </div>
      <div id='section-solution' className='absolute bottom-0' />
    </section>
  )
}
