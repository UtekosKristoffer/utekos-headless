import Image from 'next/image'
import { Check, ShieldCheck, Feather, CloudRain } from 'lucide-react'
import ProductMain from '@public/kokong-edited-4-5.png'

export function ProductShowcase() {
  return (
    <section
      id='section-solution'
      className='w-full bg-[#1F2421] text-[#F4F1EA] py-24'
    >
      <div className='max-w-7xl mx-auto px-6 md:px-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          <div className='space-y-8'>
            <div className='space-y-4'>
              <h2 className='font-serif text-4xl md:text-5xl text-[#E07A5F] leading-tight'>
                Utekos®
                <span className='block text-[#F4F1EA] text-2xl md:text-3xl mt-2'>
                  Lettvekt møter kompromissløs varme.
                </span>
              </h2>
              <p className='text-lg text-[#F4F1EA]/80 font-light leading-relaxed max-w-xl'>
                Designet for nordiske forhold. Med smart hulfiber får du
                følelsen av dun, men med egenskapene som kreves når været
                skifter. Robust nok for leirplassen, myk nok for hytteveggen.
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-4'>
              <FeatureItem
                icon={Feather}
                title='Lettvekt (ca. 800g)'
                desc='Overraskende lett, enkel å pakke med seg.'
              />
              <FeatureItem
                icon={CloudRain}
                title='Håndterer fukt'
                desc='Varmer selv om den blir våt. Tørker raskt.'
              />
              <FeatureItem
                icon={ShieldCheck}
                title='Allergivennlig'
                desc='Syntetisk hulfiber. Ingen animalske produkter.'
              />
              <FeatureItem
                icon={Check}
                title='DuraLite™ Nylon'
                desc='Vindtett og slitesterkt 20D/380T materiale.'
              />
            </div>
          </div>
          <div className='relative aspect-[4/5] bg-[#2C2420]/30 rounded-2xl overflow-hidden shadow-2xl border border-[#F4F1EA]/5'>
            <Image
              src={ProductMain}
              alt='Utekos Mikrofiber i bruk'
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 50vw'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureItem({
  icon: Icon,
  title,
  desc
}: {
  icon: any
  title: string
  desc: string
}) {
  return (
    <div className='flex gap-4 items-start'>
      <div className='p-2 rounded-full bg-[#E07A5F]/10 text-[#E07A5F] mt-1'>
        <Icon size={20} />
      </div>
      <div>
        <h3 className='font-medium text-[#F4F1EA] text-lg'>{title}</h3>
        <p className='text-sm text-[#F4F1EA]/60 leading-snug'>{desc}</p>
      </div>
    </div>
  )
}
