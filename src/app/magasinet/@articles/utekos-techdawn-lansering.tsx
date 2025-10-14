import Image from 'next/image'
import { TechDawnHero } from '@/app/magasinet/utekos-techdawn/TechDawnHero'
import { TechDawnFeatures } from '@/app/magasinet/utekos-techdawn/TechDawnFeatures'
import { TechDawnComparison } from '@/app/magasinet/utekos-techdawn/TechDawnComparison'
import { TechDawnInfographic } from '@/app/magasinet/utekos-techdawn/TechDawnInfoGraphic'
import { TechDawnUseCases } from '@/app/magasinet/utekos-techdawn/TechDawnUseCases'
import { TechDawnCTA } from '@/app/magasinet/utekos-techdawn/TechDawnCTA'

export function TechDawnArticle() {
  return (
    <article className='min-h-screen bg-black text-white'>
      {/* Hero Section */}
      <TechDawnHero />

      {/* Intro */}
      <section className='max-w-4xl mx-auto px-6 pt-12'>
        <p className='text-lg text-gray-300 leading-relaxed'>
          I Utekos har vi ett mål: å forlenge de gode stundene ute. Med
          TechDawn™ introduserer vi en ny dimensjon av komfort – for deg som
          vil nyte terrassen, båtturen eller kvelden ved bålet, uansett vær.
        </p>
      </section>

      {/* Why Section */}
      <section className='max-w-4xl mx-auto px-6 py-8'>
        <h2 className='text-3xl font-light mb-8'>
          Hvorfor vi skapte TechDawn™
        </h2>
        <p className='text-gray-300 leading-relaxed mb-6'>
          Utekos-plaggene våre har gitt tusenvis av nordmenn uforglemmelige
          stunder ute. Den varme, lette og luftige komforten er uvurderlig når
          været byr på motstand. Etter år med tilbakemeldinger og egne
          erfaringer har vi finjustert hver detalj.
        </p>
        <p className='text-gray-300 leading-relaxed'>
          TechDawn™ er resultatet: samme herlige komfort, med ekstra trygghet
          når været skifter. Vi har forbedret passformen, tatt i bruk nye
          materialer og teknologier, og økt allsidigheten. Dette er plagget du
          alltid kan stole på.
        </p>
      </section>
      {/* Features Grid */}
      <TechDawnFeatures />

      {/* Technology Infographic */}
      <TechDawnInfographic />

      {/* Use Cases Section */}
      <TechDawnUseCases />

      {/* Comparison Section */}
      <TechDawnComparison />

      {/* Image Section */}
      <section className='relative w-max-7xl size-full mx-auto mb-0 mt-16'>
        <Image
          src='/magasinet/helene-2.png'
          alt='TechDawn i bruk på terrassen'
          fill
          className='object-cover'
          sizes='100vw'
          priority={false}
        />
      </section>

      <div className='container mx-auto px-4'>
        <div className='relative pb-10 sm:pb-24'>
          <div
            className='absolute inset-0 flex items-center'
            aria-hidden='true'
          >
            <div className='w-[85%] mx-auto border-t border-neutral-800' />
          </div>
        </div>
      </div>
      {/* Perfect For Section */}
      <section className='max-w-4xl mx-auto px-6 pt-4 pb-16'>
        <h2 className='text-3xl font-light mb-8'>Perfekt for hyttekosen</h2>
        <p className='text-gray-300 leading-relaxed mb-8'>
          TechDawn™ har selvfølgelig vår anerkjente 3-i-1-funksjon. Fra
          morgenkaffen på terrassen til kveldskosen rundt bålet – ett plagg,
          uendelige muligheter for komfort.
        </p>

        {/* Livsnyter Tips */}
        <div className='border-l-4 border-yellow-500 bg-yellow-500/10 p-6 rounded-r-lg'>
          <div className='flex items-center gap-3 mb-3'>
            <span className='text-2xl'>✨</span>
            <h3 className='text-lg font-semibold text-yellow-400'>
              Livsnyter-tips:
            </h3>
          </div>
          <p className='text-gray-300'>
            Hold alltid en TechDawn™ hengende i båten eller bobilen. Den tåler
            fuktighet bedre og er perfekt når kveldene blir kjølige til sjøs!
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <TechDawnCTA />
    </article>
  )
}
