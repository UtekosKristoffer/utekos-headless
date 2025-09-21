import { getProducts } from '@/api/lib/products/getProducts'
import { AnimatedChat } from '@/components/frontpage/AnimatedChat'
import { CustomerNetwork } from '@/components/frontpage/CustomerNetwork'
import { CustomerStory } from '@/components/frontpage/CustomerStory'
import { InfoCardStack } from '@/components/frontpage/InfoCardStack'
import { MomentsSection } from '@/components/frontpage/MomentsSection'
import { QualitySection } from '@/components/frontpage/QualitySection'
import { TestimonialConstellation } from '@/components/frontpage/TestimonialConstellation'
import { ProductGrid } from '@/components/jsx/ProductGrid'
import { GridCross } from '@/components/legal/GridCross'
import { ProductCard } from '@/components/ProductCard'
import { handles } from '@/db/data/products/product-info'
import { ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { ThermometerIcon } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import heroImage from '../../public/frontpage-kate-linn.webp'
import KvamskogenPic from '../../public/kvamskogen_1.webp'
const HomePage = async () => {
  const response = await getProducts()

  if (!response.success) {
    return notFound()
  }

  const products = response.body
  if (products.length === 0) {
    return notFound()
  }

  const featuredProducts = products.filter(product =>
    handles.includes(product.handle)
  )

  if (featuredProducts.length === 0) {
    return notFound()
  }

  return (
    <main>
      <section className='container mx-auto px-4 py-12 lg:py-16 sm:py-16'>
        {/* Målgrupperettet tittel-seksjon */}
        <div className='mb-4 text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mt-6'>
            Utekos™ - Banebrytende utendørsbekledning
          </h1>
          <p className='mx-auto mt-4 mb-8 max-w-2xl md:max-w-4xl text-lg lg:text-2xl text-muted-foreground'>
            Kompromissløs komfort, designet for å holde på varmen når
            øyeblikkene teller.
          </p>
        </div>

        <div className='mb-8 rounded-xl border border-neutral-800 shadow-lg'>
          <Image
            src={heroImage}
            alt='To personer i Utekos-plagg sitter på en stein i skogen og deler et hyggelig øyeblikk, fullt påkledd for varme og komfort.'
            width={2048}
            height={1363}
            className=' rounded-lg w-full h-[60vh] xl:h-[80vh] object-cover object-bottom'
            priority
          />
        </div>

        <ProductGrid>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </section>
      {/* ===== SEKSJON 2: SOSIALT BEVIS (NY VERSJON) STARTER HER ===== */}
      <section className='py-16 sm:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-16 text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
              Drevet av ekte opplevelser
            </h2>
            <p className='mx-auto mt-4 max-w-3xl text-lg text-muted-foreground'>
              Våre beste produktutviklere er kundene våre. Vi lytter, lærer og
              designer for å løse reelle behov – slik at du kan skape flere og
              bedre minner utendørs.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
            {/* Venstre kolonne */}
            <div className='rounded-xl border border-neutral-800 bg-sidebar-foreground p-8'>
              <CustomerNetwork />
            </div>

            {/* Høyre kolonne */}
            <div className='rounded-xl border border-neutral-800 bg-sidebar-foreground p-8'>
              <CustomerStory />
            </div>
          </div>
        </div>
      </section>
      {/* ===== SEKSJON 2: SOSIALT BEVIS SLUTTER HER ===== */}
      <TestimonialConstellation />
      {/* ===== SEKSJON 4: DEN NYE STANDARDEN (VERCEL-STIL) STARTER HER ===== */}
      <section className='py-16 sm:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='overflow-hidden rounded-xl border border-neutral-800'>
            <div className='grid lg:grid-cols-2'>
              {/* Venstre kolonne med salgstekst OG de nye kortene */}
              <div className='flex flex-col justify-between bg-sidebar-foreground p-8 lg:p-12'>
                <div>
                  <h2 className='text-3xl font-bold tracking-tight text-foreground'>
                    En opplevelse bygget på tillit
                  </h2>
                  <p className='mt-4 text-lg text-muted-foreground mb-2'>
                    Fra du besøker siden vår til du nyter kveldssolen i ditt
                    Utekos-plagg – vi er dedikerte til å levere en trygg og
                    førsteklasses opplevelse i alle ledd.
                  </p>
                </div>
                <div className='mt-12 lg:mt-0'>
                  <InfoCardStack />
                </div>
              </div>

              {/* Høyre kolonne med den animerte chatten */}
              <div className='relative min-h-[400px]'>
                <AnimatedChat />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== SEKSJON 4: DEN NYE STANDARDEN SLUTTER HER ===== */}
      {/* ===== SEKSJON 5: VÅRT LØFTE ===== */}
      <section className='py-16 sm:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* ENDRING 1: Fjernet "items-center" for å la kolonnene få lik høyde (stretch) */}
          <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16'>
            {/* Venstre kolonne: Bilde */}
            <div className='flex items-center justify-center rounded-xl border border-neutral-800 p-2'>
              <div className='overflow-hidden rounded-lg'>
                <Image
                  src={KvamskogenPic}
                  alt='Bilde av en gjeng som bruker Utekos-plagg i snørike omgivelser.'
                  width={1024}
                  height={623}
                  className='size-full object-cover'
                />
              </div>
            </div>

            {/* Høyre kolonne: Tekst */}
            <div className='relative overflow-hidden rounded-xl border border-neutral-800 bg-sidebar-foreground p-8 lg:p-12'>
              <div
                className='absolute inset-0 z-0 opacity-20'
                style={{
                  backgroundImage: `
              repeating-linear-gradient(to right, var(--color-border), var(--color-border) 1px, transparent 1px, transparent 40px),
              repeating-linear-gradient(to bottom, var(--color-border), var(--color-border) 1px, transparent 1px, transparent 40px)
            `,
                  maskImage:
                    'linear-gradient(to bottom, white 50%, transparent 100%)'
                }}
              />

              <div className='relative z-10 flex h-full flex-col justify-center'>
                {/* ENDRING 2: Korrigert plassering av GridCross */}
                <GridCross className='absolute top-0 right-0 h-8 w-8 -translate-y-1/2 translate-x-1/2' />

                <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
                  Vårt løfte
                </h2>

                {/* ENDRING 3: Mer dynamisk og fargerik inndeling av teksten */}
                <div className='mt-6 space-y-6'>
                  <div className='flex items-start gap-4'>
                    <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400'>
                      <ThermometerIcon className='h-5 w-5' />
                    </div>
                    <div>
                      <h3 className='font-semibold'>Umiddelbar varme</h3>
                      <p className='mt-1 text-muted-foreground'>
                        Nøye utvalgte materialer gir en umiddelbar følelse av
                        varme og velvære.
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pink-500/10 text-pink-400'>
                      <ClockIcon className='h-5 w-5' />
                    </div>
                    <div>
                      <h3 className='font-semibold'>Forlengede øyeblikk</h3>
                      <p className='mt-1 text-muted-foreground'>
                        Designet slik at du kan nyte de gode stundene lenger,
                        uten å tenke på kulden.
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-400'>
                      <ShieldCheckIcon className='h-5 w-5' />
                    </div>
                    <div>
                      <h3 className='font-semibold'>En varig investering</h3>
                      <p className='mt-1 text-muted-foreground'>
                        Se på det som en slitesterk og varig investering i din
                        egen hygge.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== SEKSJON 5: VÅRT LØFTE SLUTTER HER ===== */}

      {/* ===== SEKSJON 6: MomentsSection ===== */}
      <MomentsSection />
      {/* ===== SEKSJON 6: MomentsSection SLUTTER HER ===== */}

      <QualitySection />
    </main>
  )
}

export default HomePage
