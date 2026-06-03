// Path: src/app/produkter/(oversikt)/components/ComfyrobeFeatureSection.tsx

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ComfyrobeImageCarousel } from '@/app/produkter/(oversikt)/components/ComfyrobeImageCarousel'
import { Wind } from 'lucide-react'
import { comfyrobeFeatures } from '@/app/produkter/(oversikt)/utils/comfyrobeFeatures'

const featureSurfaceStyles = {
  weather: {
    background: 'var(--fjellnatt)',
    border: 'var(--fjellnatt)',
    iconBackground: 'var(--cloud-dancer)',
    iconBorder: 'var(--background)',
    iconColor: 'var(--fjellnatt)'
  },
  warmth: {
    background: 'var(--fjellnatt)',
    border: 'var(--fjellnatt)',
    iconBackground: 'var(--cloud-dancer)',
    iconBorder: 'var(--background)',
    iconColor: 'var(--fjellnatt)'
  },
  freedom: {
    background: 'var(--fjellnatt)',
    border: 'var(--fjellnatt)',
    iconBackground: 'var(--cloud-dancer)',
    iconBorder: 'var(--background)',
    iconColor: 'var(--fjellnatt)'
  }
} as const

export function ComfyrobeFeatureSection() {
  return (
    <section aria-labelledby='comfyrobe-feature-heading' className='w-full py-16 sm:py-24 md:mb-24'>
      <div className='container mx-auto px-4'>
        <div className='relative overflow-hidden rounded-[1.75rem] border border-cloud-dancer/12 bg-background p-5 shadow-[0_28px_90px_-62px_color-mix(in_oklch,var(--background)_90%,transparent)] sm:p-8 lg:p-12'>
          <div className='pointer-events-none absolute inset-0 opacity-70'>
            <div
              className='absolute -left-24 top-0 size-[34rem] rounded-full blur-3xl'
              style={{
                background:
                  'radial-gradient(circle, color-mix(in oklch, var(--fjellnatt) 42%, transparent) 0%, transparent 70%)'
              }}
            />
            <div
              className='absolute -right-24 bottom-0 size-[34rem] rounded-full blur-3xl'
              style={{
                background:
                  'radial-gradient(circle, color-mix(in oklch, var(--ancient-water) 38%, transparent) 0%, transparent 72%)'
              }}
            />
            <div
              className='absolute left-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl'
              style={{
                background:
                  'radial-gradient(circle, color-mix(in oklch, var(--background) 28%, transparent) 0%, transparent 74%)'
              }}
            />
          </div>

          <div className='relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-12'>
            <ComfyrobeImageCarousel />

            <AnimatedBlock className='will-animate-fade-in-right h-full min-h-full'>
              <div className='flex h-full min-h-full flex-col justify-center lg:min-h-[38rem]'>
                <div>
                  <AnimatedBlock className='will-animate-fade-in-up'>
                    <BrandBadge
                      backgroundColor='var(--fjellnatt)'
                      textColor='var(--cloud-dancer)'
                      className='mb-5 gap-2 border border-cloud-dancer/18 px-4 py-2   text-sm font-medium   shadow-[0_16px_34px_-28px_color-mix(in_oklch,var(--bleached-mauve)_68%,transparent)]'
                    >
                      <Wind className='size-4 text-foreground' aria-hidden='true' />
                      <span>Comfyrobe™</span>
                    </BrandBadge>
                  </AnimatedBlock>

                  <AnimatedBlock className='will-animate-fade-in-up' delay='0.05s'>
                    <h2
                      id='comfyrobe-feature-heading'
                      className='max-w-2xl text-balance font-google-sans text-3xl font-bold leading-[0.95]   text-foreground sm:text-4xl lg:text-5xl'
                    >
                      Forleng utekosen.
                      <br />
                      <span className='text-ancient-water'>Uansett vær.</span>
                    </h2>
                  </AnimatedBlock>

                  <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
                    <p className='mt-6 max-w-2xl   text-lg leading-text-paragraph   text-foreground/88'>
                      Comfyrobe™ er den ultimate allværskåpen for livsnyteren. Den kombinerer den urokkelige
                      beskyttelsen til en teknisk skalljakke med den komfortable omfavnelsen av din mykeste
                      badekåpe.
                    </p>
                  </AnimatedBlock>

                  <div className='mt-8 w-full space-y-3'>
                    {comfyrobeFeatures.map((feature, index) => {
                      const surface = featureSurfaceStyles[feature.surface]
                      const Icon = feature.icon

                      return (
                        <AnimatedBlock
                          key={feature.title}
                          className='will-animate-fade-in-up'
                          delay={`${0.2 + index * 0.1}s`}
                        >
                          <article
                            className='group relative overflow-hidden rounded-[1.05rem] border p-4     shadow-[0_18px_44px_-36px_color-mix(in_oklch,var(--background)_86%,transparent)] transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
                            style={
                              {
                                '--feature-accent': surface.iconColor,
                                'borderColor': surface.border,
                                'background': surface.background
                              } as CSSProperties
                            }
                          >
                            <div
                              className='pointer-events-none absolute -inset-x-8 -top-20 h-44 opacity-[0.14] blur-3xl transition-opacity duration-300 group-hover:opacity-[0.22]'
                              style={{
                                background:
                                  'radial-gradient(120% 120% at 50% 0%, transparent 38%, var(--feature-accent) 100%)'
                              }}
                            />

                            <div className='relative z-10 min-h-[4.25rem]'>
                              <div className='flex items-center gap-3'>
                                <div
                                  className='flex size-9 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none sm:size-10 lg:size-11 lg:rounded-xl'
                                  style={{
                                    borderColor: surface.iconBorder,
                                    background: surface.iconBackground
                                  }}
                                >
                                  <Icon
                                    className='size-4 lg:size-5'
                                    style={{ color: surface.iconColor }}
                                    aria-hidden='true'
                                  />
                                </div>

                                <h3 className='text-base font-semibold leading-[1.2]   text-foreground'>
                                  {feature.title}
                                </h3>
                              </div>

                              <p className='mt-3 text-sm leading-text-paragraph   text-foreground/78 sm:mt-2'>
                                {feature.description}
                              </p>
                            </div>
                          </article>
                        </AnimatedBlock>
                      )
                    })}
                  </div>

                  <AnimatedBlock className='will-animate-fade-in-up' delay='0.5s'>
                    <div className='mt-8 flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center'>
                      <p className='font-google-sans text-4xl font-bold leading-none   text-foreground'>
                        NOK 990,-
                      </p>

                      <BrandBadge
                        asChild
                        backgroundColor='var(--primary)'
                        textColor='var(--background)'
                        className='group min-h-12 w-full gap-2 whitespace-normal border border-primary/35 px-6 py-3   text-base font-semibold leading-[1.35]   shadow-[0_18px_40px_-28px_color-mix(in_oklch,var(--primary)_70%,transparent)] transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto sm:whitespace-nowrap'
                      >
                        <Link href='/produkter/comfyrobe' data-track='ComfyrobeExploreProductPageClick'>
                          Utforsk Comfyrobe™
                          <Wind className='size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none' />
                        </Link>
                      </BrandBadge>
                    </div>
                  </AnimatedBlock>
                </div>
              </div>
            </AnimatedBlock>
          </div>
        </div>
      </div>
    </section>
  )
}
