// Path: src/app/magasinet/(articles)/utekos-techdown-lansering.tsx
import Image from 'next/image'
import { TechDownHero } from '@/app/magasinet/utekos-techdown/TechDownHero'
import { TechDownFeatures } from '@/app/magasinet/utekos-techdown/TechDownFeatures'
import { TechDownComparison } from '@/app/magasinet/utekos-techdown/TechDownComparison'
import { TechDownInfographic } from '@/app/magasinet/utekos-techdown/TechDownInfoGraphic'
import { TechDownUseCases } from '@/app/magasinet/utekos-techdown/TechDownUseCases'
import { TechDownCTA } from '@/app/magasinet/utekos-techdown/TechDownCTA'
import { TechDownPerfectFor } from '@/app/magasinet/utekos-techdown/TechDownPerfectFor'
import { Activity } from 'react'

export function TechDownArticle() {
  return (
    <article className='min-h-screen bg-black text-white'>
      {/* Hero Section */}
      <Activity>
        <TechDownHero />
      </Activity>

      {/* Intro */}
      <Activity>
        <section className='max-w-4xl mx-auto px-6 pt-12'>
          <p className='text-lg text-gray-300 leading-relaxed'>
            I Utekos har vi ett mål: å forlenge de gode stundene ute. Med
            TechDown™ introduserer vi en ny dimensjon av komfort – for deg som
            vil nyte terrassen, båtturen eller kvelden ved bålet, uansett vær.
          </p>
        </section>
      </Activity>

      {/* Why Section */}
      <Activity>
        <section className='max-w-4xl mx-auto px-6 py-8'>
          <h2 className='text-3xl font-light mb-8'>
            Hvorfor vi skapte TechDown™
          </h2>
          <p className='text-gray-300 leading-relaxed mb-6'>
            Utekos-plaggene våre har gitt tusenvis av nordmenn uforglemmelige
            stunder ute. Den varme, lette og luftige komforten er uvurderlig når
            været byr på motstand. Etter år med tilbakemeldinger og egne
            erfaringer har vi finjustert hver detalj.
          </p>
          <p className='text-gray-300 leading-relaxed'>
            TechDown™ er resultatet: samme herlige komfort, med ekstra trygghet
            når været skifter. Vi har forbedret passformen, tatt i bruk nye
            materialer og teknologier, og økt allsidigheten. Dette er plagget du
            alltid kan stole på.
          </p>
        </section>
      </Activity>
      <Activity>
        <TechDownFeatures />
      </Activity>
      <Activity>
        <TechDownInfographic />
      </Activity>

      <Activity>
        <TechDownUseCases />
      </Activity>
      <Activity>
        <TechDownComparison />
      </Activity>

      <Activity>
        <section className='relative w-max-7xl size-full mx-auto mb-0 mt-16'>
          <Image
            src='/magasinet/helene-2.png'
            alt='TechDown i bruk på terrassen'
            fill
            className='object-cover'
            sizes='100vw'
            priority={false}
          />
        </section>
      </Activity>

      <Activity>
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
      </Activity>
      <Activity>
        <TechDownPerfectFor />
      </Activity>

      <Activity>
        <TechDownCTA />
      </Activity>
    </article>
  )
}
