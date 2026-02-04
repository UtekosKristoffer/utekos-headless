'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatedBlockTwo } from './AnimatedBlockTwo'
import { Shield, Zap, Sliders } from 'lucide-react'

const productImage = '/black-1080.png'

const features = [
  {
    id: 1,
    icon: Shield,
    title: 'Beskyttende ytterstoff',
    description:
      'DWR-behandlet 20D Nylon som tåler røff bruk og holder deg tørr.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    icon: Zap,
    title: 'Toveis YKK®-glidelås',
    description:
      'Bransjens beste for enkel tilgang og presis temperaturregulering.',
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 3,
    icon: Sliders,
    title: 'Justerbar passform',
    description:
      'Snorstramming lar deg forme plagget akkurat som du vil ha det.',
    color: 'from-purple-500 to-pink-500'
  }
]

export const CoreConceptSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

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

      <section className='relative bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 border border-zinc-700/50 rounded-3xl my-24 overflow-hidden'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent' />
        <div className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 to-transparent blur-3xl rounded-full' />

        <div className='relative container mx-auto max-w-4xl px-6 py-20 sm:py-28'>
          <AnimatedBlockTwo className='fade-in-up mb-16 sm:mb-20' delay='0ms'>
            <div className='text-center space-y-4'>
              <div className='inline-flex items-center gap-3'>
                <span className='h-px w-8 bg-gradient-to-r from-transparent to-amber-500/50' />
                <span className='text-xs font-medium uppercase tracking-[0.2em] text-amber-400/80'>
                  Det geniale konseptet
                </span>
                <span className='h-px w-8 bg-gradient-to-l from-transparent to-amber-500/50' />
              </div>
              <h2 className='text-3xl font-bold text-zinc-100 sm:text-4xl lg:text-5xl tracking-tight'>
                Fra parkas til varm kokong
                <br />
                <span className='bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent'>
                  på sekunder
                </span>
              </h2>
            </div>
          </AnimatedBlockTwo>

          <div className='grid gap-12 lg:grid-cols-2 lg:gap-16 items-center'>
            <AnimatedBlockTwo className='fade-in-up' delay='150ms'>
              <div className='relative group'>
                <div className='absolute -inset-4 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700' />

                <div className='relative'>
                  <div className='aspect-[4/5] border border-zinc-700/60 overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-2xl'>
                    <Image
                      src={productImage}
                      alt='Utekos Original i svart'
                      className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                      width={500}
                      height={625}
                      placeholder='blur'
                      blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
                    />
                  </div>

                  <div className='absolute right-4 top-4 backdrop-blur-xl bg-zinc-900/90 border border-amber-500/20 rounded-full px-4 py-2 shadow-xl'>
                    <span className='text-sm font-semibold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent'>
                      3-i-1 design
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedBlockTwo>
            <div className='flex flex-col justify-center space-y-8'>
              <AnimatedBlockTwo className='fade-in-up' delay='300ms'>
                <p className='text-xl sm:text-2xl leading-relaxed text-zinc-300 font-light'>
                  Selve hjertet i Utekos er et design skapt for total
                  fleksibilitet. Med enkle justeringer forvandler du den fra en
                  romslig parkas til en{' '}
                  <span className='text-amber-400 font-medium'>
                    tett og varmende kokong
                  </span>
                  .
                </p>
              </AnimatedBlockTwo>

              <AnimatedBlockTwo className='fade-in-up' delay='450ms'>
                <div className='space-y-4'>
                  {features.map(feature => {
                    const Icon = feature.icon
                    const isHovered = hoveredFeature === feature.id

                    return (
                      <div
                        key={feature.id}
                        className='relative group/feature cursor-pointer'
                        onMouseEnter={() => setHoveredFeature(feature.id)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        <div
                          className={`absolute -inset-2 bg-gradient-to-r ${feature.color} opacity-0 group-hover/feature:opacity-10 blur-xl transition-opacity duration-500 rounded-xl`}
                        />

                        <div
                          className={`relative flex gap-4 p-4 rounded-xl border transition-all duration-300 ${
                            isHovered ?
                              'bg-zinc-800/90 border-amber-500/30 shadow-lg'
                            : 'bg-zinc-900/30 border-zinc-700/30 hover:border-zinc-600/50'
                          }`}
                        >
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                              isHovered ?
                                `bg-gradient-to-br ${feature.color} shadow-lg`
                              : 'bg-zinc-800 border border-zinc-700/50'
                            }`}
                          >
                            <Icon
                              className={`h-5 w-5 transition-colors duration-300 ${
                                isHovered ? 'text-white' : 'text-amber-400'
                              }`}
                            />
                          </div>

                          <div className='flex-1 min-w-0'>
                            <p
                              className={`font-semibold mb-1 transition-colors duration-300 ${
                                isHovered ? 'text-amber-400' : 'text-zinc-200'
                              }`}
                            >
                              {feature.title}
                            </p>
                            <p className='text-sm text-zinc-400 leading-relaxed'>
                              {feature.description}
                            </p>
                          </div>

                          <div
                            className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                              isHovered ?
                                'bg-amber-500 text-white'
                              : 'bg-zinc-800 text-zinc-500'
                            }`}
                          >
                            {feature.id}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </AnimatedBlockTwo>

              <AnimatedBlockTwo className='fade-in-up' delay='600ms'>
                <div className='relative group/quote'>
                  <div className='absolute -inset-1 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-xl opacity-0 group-hover/quote:opacity-100 blur-xl transition-opacity duration-500' />

                  <div className='relative rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-amber-500/10 p-6 backdrop-blur-sm'>
                    <div className='flex gap-3 items-start'>
                      <div className='text-4xl text-amber-500/30 leading-none font-serif'></div>
                      <p className='text-lg italic text-zinc-300 leading-relaxed flex-1'>
                        Den ultimate følgesvenn – fra hytteterrassen til kalde
                        tribuner
                      </p>
                      <div className='text-4xl text-amber-500/30 leading-none font-serif self-end'></div>
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
