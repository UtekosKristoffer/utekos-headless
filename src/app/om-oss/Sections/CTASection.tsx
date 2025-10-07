// Path: src/app/(sections)/CTASection.tsx

import Link from 'next/link'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { ArrowRight, Sparkles } from 'lucide-react'

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-sidebar-foreground py-24 sm:py-32">
      {/* Ambient background glow */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
          }}
        />
      </div>

      <div className="container mx-auto max-w-4xl px-4">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-12 text-center shadow-2xl md:p-16">
          {/* Subtle gradient accents */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          {/* Aurora effect */}
          <div
            className="absolute -inset-x-2 -inset-y-20 opacity-20 blur-3xl"
            style={{
              background:
                'radial-gradient(120% 120% at 50% 0%, transparent 30%, #0ea5e9 100%)'
            }}
          />

          <div className="relative z-10">
            <AnimatedBlock
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-800/30 bg-sky-900/20 px-4 py-2 will-animate-fade-in-scale"
              delay="0s"
              threshold={0.2}
            >
              <Sparkles className="h-4 w-4 text-sky-800" />
              <span className="text-sm font-medium text-sky-800">
                Oppdag kolleksjonen
              </span>
            </AnimatedBlock>

            <AnimatedBlock
              className="will-animate-fade-in-up"
              delay="0.08s"
              threshold={0.2}
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Klar til å oppleve komforten?
              </h2>
            </AnimatedBlock>

            <AnimatedBlock
              className="will-animate-fade-in-up"
              delay="0.16s"
              threshold={0.2}
            >
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Se hvordan vår filosofi og våre materialvalg kommer til live i
                produktene som er designet for å forlenge dine beste øyeblikk.
              </p>
            </AnimatedBlock>

            <AnimatedBlock
              className="mt-10 will-animate-fade-in-up"
              delay="0.24s"
              threshold={0.2}
            >
              <Link
                href="/produkter"
                className="group inline-flex items-center justify-center rounded-xl bg-sky-800 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:scale-105 hover:bg-sky-600 hover:shadow-sky-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
              >
                Se alle produkter
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </AnimatedBlock>

            {/* Trust indicators */}
            <AnimatedBlock
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground will-animate-fade-in-up"
              delay="0.32s"
              threshold={0.2}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-sky-800"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Skapt for norske forhold</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-sky-800"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Fri frakt over 999,-</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-sky-800"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span> Trygg handel med Klarna og Vipps</span>
              </div>
            </AnimatedBlock>
          </div>
        </div>
      </div>
    </section>
  )
}
