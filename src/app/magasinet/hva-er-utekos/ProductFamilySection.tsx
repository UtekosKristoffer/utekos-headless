'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'
import { AnimatedBlockTwo } from './AnimatedBlockTwo'
import type { Route } from 'next'

const originalImage = '/liten/mikro-liten.png'
const techdownImage = '/liten/techdown-liten.png'
const comfyrobeImage = '/liten/comfy-liten.png'

type Product = {
  id: string
  name: string
  description: string
  image: string
  badge: { text: string; type: 'bestseller' | 'new' } | null
  features?: string[]
  href: Route
  featured: boolean
}

// 👇 Fast-lengde tuple (ikke mulig med undefined ved [0],[1],[2])
const products = [
  {
    id: 'original',
    name: 'Utekos Original',
    description:
      'For den klassiske livsnyteren som verdsetter maksimal allsidighet og varme.',
    image: originalImage,
    badge: { text: 'Bestselger', type: 'bestseller' },
    features: [
      'Det geniale 3-i-1 designet',
      'Velg mellom Dun™ eller Mikrofiber™'
    ],
    href: '/products/utekos-original' as Route,
    featured: true
  },
  {
    id: 'techdown',
    name: 'Utekos TechDown™',
    description:
      'Teknisk ytelse møter moderne design. CloudWeave™ isolasjon varmer selv når den er fuktig.',
    image: techdownImage,
    badge: { text: 'Nyhet', type: 'new' },
    href: '/products/utekos-techdown' as Route,
    featured: false
  },
  {
    id: 'comfyrobe',
    name: 'Comfyrobe™',
    description:
      'Allværskåpe for helårsbruk. Vind- og vanntett med tykt Sherpa Fleece innerfôr.',
    image: comfyrobeImage,
    badge: null,
    href: '/products/comfyrobe' as Route,
    featured: false
  }
] satisfies readonly [Product, Product, Product]

export const ProductFamilySection = () => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  return (
    <>
      <style>
        {`
          .fade-in-up {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            transition-delay: var(--transition-delay, 0s);
          }
          .fade-in-up.is-in-view {
            opacity: 1;
            transform: translateY(0);
          }
        `}
      </style>

      <section className='relative bg-gradient-to-br from-zinc-900/60 to-zinc-800/40 mb-12 rounded-3xl backdrop-blur-sm border border-zinc-700/50 py-20 sm:py-28 overflow-hidden'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/5 to-transparent blur-3xl rounded-full' />
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-transparent blur-3xl rounded-full' />

        <div className='relative container mx-auto max-w-4xl px-6'>
          <AnimatedBlockTwo
            className='fade-in-up text-center mb-16 sm:mb-20'
            delay='0ms'
          >
            <div className='inline-flex items-center gap-3 mb-4'>
              <span className='h-px w-8 bg-gradient-to-r from-transparent to-zinc-500' />
              <span className='text-xs font-medium uppercase tracking-[0.2em] text-zinc-400'>
                Utekos-familien
              </span>
              <span className='h-px w-8 bg-gradient-to-l from-transparent to-zinc-500' />
            </div>

            <h2 className='text-3xl font-bold text-zinc-100 sm:text-4xl lg:text-5xl mb-6 tracking-tight'>
              Finn din perfekte match
            </h2>

            <p className='mx-auto max-w-2xl text-lg text-zinc-400 leading-relaxed'>
              Alle produktene i Utekos-familien er bygget på den samme ideen:
              kompromissløs komfort som lar deg eie øyeblikket. Forskjellene
              ligger ikke i <em className='text-zinc-300'>hva</em> du kan gjøre,
              men i de tekniske detaljene og materialvalgene. Finn modellen som
              er finjustert for dine preferanser.
            </p>
          </AnimatedBlockTwo>

          <div className='space-y-6'>
            <AnimatedBlockTwo className='fade-in-up' delay='150ms'>
              <div
                className='group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-500'
                onMouseEnter={() => setHoveredProduct('original')}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className='absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500' />

                <div className='relative grid md:grid-cols-2'>
                  <Link
                    href={products[0].href as Route}
                    className='relative block aspect-[4/3] md:aspect-auto overflow-hidden'
                  >
                    <Image
                      src={products[0].image}
                      alt={products[0].name}
                      className='size-full object-cover transition-transform duration-700 group-hover:scale-105'
                      fill
                      sizes='(max-width: 768px) 100vw, 50vw'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                  </Link>

                  <div className='absolute left-4 top-4 z-10'>
                    <div className='backdrop-blur-xl bg-gradient-to-br from-emerald-500 to-teal-600 px-4 py-1.5 rounded-full border border-white/10 shadow-xl'>
                      <div className='flex items-center gap-2'>
                        <Sparkles className='h-3.5 w-3.5 text-white' />
                        <span className='text-xs font-semibold text-white'>
                          Bestselger
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='p-8 md:p-10 flex flex-col justify-center'>
                    <h3 className='text-2xl lg:text-3xl font-bold text-zinc-100 mb-3'>
                      {products[0].name}
                    </h3>
                    <p className='text-lg text-zinc-400 leading-relaxed mb-6'>
                      {products[0].description}
                    </p>

                    <ul className='space-y-3 mb-8'>
                      {products[0].features?.map((feature, i) => (
                        <li key={i} className='flex items-start gap-3'>
                          <div className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500' />
                          <span className='text-zinc-300'>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={products[0].href as Route}
                      className='inline-flex items-center gap-2 text-base font-medium text-zinc-100 group/link transition-all hover:gap-3'
                    >
                      Utforsk Original
                      <ArrowRight className='h-4 w-4 transition-transform group-hover/link:translate-x-1' />
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedBlockTwo>
            <div className='grid gap-6 md:grid-cols-2'>
              <AnimatedBlockTwo className='fade-in-up' delay='300ms'>
                <div
                  className='group relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-500'
                  onMouseEnter={() => setHoveredProduct('techdown')}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className='absolute -inset-1 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500' />

                  <div className='relative'>
                    <Link
                      href={products[1].href as Route}
                      className='relative block aspect-[4/3] overflow-hidden'
                    >
                      <Image
                        src={products[1].image}
                        alt={products[1].name}
                        className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                        fill
                        sizes='(max-width: 768px) 100vw, 50vw'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                    </Link>

                    <div className='absolute left-4 top-4 z-10'>
                      <div className='backdrop-blur-xl bg-gradient-to-br from-blue-500 to-indigo-600 px-4 py-1.5 rounded-full border border-white/10 shadow-xl'>
                        <div className='flex items-center gap-2'>
                          <Zap className='h-3.5 w-3.5 text-white' />
                          <span className='text-xs font-semibold text-white'>
                            Nyhet
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='p-6 lg:p-8'>
                      <h3 className='text-xl lg:text-2xl font-bold text-zinc-100 mb-3'>
                        {products[1].name}
                      </h3>
                      <p className='text-zinc-400 leading-relaxed mb-6'>
                        {products[1].description}
                      </p>

                      <Link
                        href={products[1].href as Route}
                        className='inline-flex items-center gap-2 text-sm font-medium text-zinc-100 group/link transition-all hover:gap-3'
                      >
                        Les mer
                        <ArrowRight className='h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1' />
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedBlockTwo>
              <AnimatedBlockTwo className='fade-in-up' delay='450ms'>
                <div
                  className='group relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-500'
                  onMouseEnter={() => setHoveredProduct('comfyrobe')}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className='absolute -inset-1 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500' />

                  <div className='relative'>
                    <Link
                      href={products[2].href as Route}
                      className='relative block aspect-[4/3] overflow-hidden'
                    >
                      <Image
                        src={products[2].image}
                        alt={products[2].name}
                        className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                        fill
                        sizes='(max-width: 768px) 100vw, 50vw'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                    </Link>
                    <div className='p-6 lg:p-8'>
                      <h3 className='text-xl lg:text-2xl font-bold text-zinc-100 mb-3'>
                        {products[2].name}
                      </h3>
                      <p className='text-zinc-400 leading-relaxed mb-6'>
                        {products[2].description}
                      </p>

                      <Link
                        href={products[2].href as Route}
                        className='inline-flex items-center gap-2 text-sm font-medium text-zinc-100 group/link transition-all hover:gap-3'
                      >
                        Les mer
                        <ArrowRight className='h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1' />
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedBlockTwo>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductFamilySection
