import heroImage from '@public/frontpage-kate-linn.webp'
import Image from 'next/image'
export function HeroSection() {
  return (
    <section className='container mx-auto px-4 pt-12 pb-2'>
      <div className='mb-4 text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mt-6'>
          Utekos™ - Forleng de gode stundene ute.
        </h1>
        <p className='mx-auto mt-4 mb-12 max-w-2xl md:max-w-4xl text-lg lg:text-2xl text-foreground/90'>
          Kompromissløs komfort, designet for å holde på varmen når øyeblikkene
          teller.
        </p>
      </div>

      <div className='mb-8 rounded-xl md:max-w-7xl border mx-auto border-neutral-800 shadow-lg'>
        <Image
          src={heroImage}
          alt='To personer i Utekos-plagg sitter på en stein i skogen og deler et hyggelig øyeblikk, fullt påkledd for varme og komfort.'
          width={2048}
          height={1363}
          className=' rounded-lg mx-auto w-full h-[60vh] xl:h-[80vh] object-cover object-bottom'
          priority
        />
      </div>
    </section>
  )
}
