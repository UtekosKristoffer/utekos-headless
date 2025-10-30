// Path: src/app/magasinet/(articles)/beredskap-egenomsorg.tsx
import { HeroBeredskap } from '../beredskap-egenomsorg/HeroBeredskap'
import { HvorforUtekosSection } from '../beredskap-egenomsorg/HvorforUtekosSection'
import { ProduktguideBeredskap } from '../beredskap-egenomsorg/ProduktguideBeredskap'
import { BeredskapspakkenSection } from '../beredskap-egenomsorg/BeredskapspakkenSection'
import { ProfesjonellBrukSection } from '../beredskap-egenomsorg/ProfesjonellBrukSection'
import Image from 'next/image'
import Kaffe from '@public/coffe_utekos.webp'
import Stapper from '@public/kompresjonsbag.webp'
import Lykt from '@public/magasinet/den-ultimate-hyggen.png'
import { BeredskapOppsummeringSection } from '../beredskap-egenomsorg/BeredskapsOppsummeringSection'
import { BeredskapsProductCarousel } from '../beredskap-egenomsorg/BeredskapsProductCarousel'
import Link from 'next/link'
export function BeredskapEgenomsorgArticle() {
  return (
    <main className='md:max-w-4xl mx-auto'>
      <HeroBeredskap />
      <HvorforUtekosSection />
      <div className='relative mt-12'>
        <Image
          src={Lykt}
          alt='Utekos i en beredskapssituasjon, illustrerer varme og komfort'
          width={1536}
          height={1024}
          layout='responsive'
          objectFit='cover'
          className='rounded-xl shadow-2xl'
        />
      </div>
      <ProduktguideBeredskap />
      <div className='relative'>
        <Link href='/produkter'>
          <Image
            src={Kaffe}
            alt='Utekos i en beredskapssituasjon, illustrerer varme og komfort'
            width={1536}
            height={1024}
            layout='responsive'
            objectFit='cover'
            className='rounded-xl shadow-2xl'
          />
        </Link>
      </div>
      <BeredskapspakkenSection />

      <div className='relative'>
        <Link href='/produkter/utekos-stapper '>
          <Image
            src={Stapper}
            alt='Utekos i en beredskapssituasjon, illustrerer varme og komfort'
            width={1536}
            height={1024}
            layout='responsive'
            objectFit='cover'
            className='rounded-xl shadow-2xl'
          />
        </Link>
      </div>

      <ProfesjonellBrukSection />
      <BeredskapOppsummeringSection />
      <BeredskapsProductCarousel />
    </main>
  )
}
