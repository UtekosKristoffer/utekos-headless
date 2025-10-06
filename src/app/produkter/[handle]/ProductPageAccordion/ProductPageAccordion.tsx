// Path: src/app/produkter/[handle]/ProductPageView/components/ProductPageAccordion.tsx
'use client'

import { memo, useMemo } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import type { ProductPageAccordionProps } from '@types'
import {
  Layers3,
  Mountain,
  Ruler,
  SlidersHorizontal,
  Sparkles,
  WashingMachine,
  Info,
  type LucideIcon
} from 'lucide-react'
import { renderMetafield } from './helpers/renderMetafield'
import { AnimatedBlock } from '@/components/AnimatedBlock'

/** Map fra tekst-utility → hex-farge for subtile glødeffekter */
const colorHexByTextClass: Record<string, string> = {
  'text-rose-500': '#F43F5E',
  'text-cyan-400': '#22d3ee',
  'text-amber-400': '#fbbf24',
  'text-sky-400': '#38bdf8',
  'text-violet-400': '#a78bfa',
  'text-blue-400': '#60a5fa'
}

interface AccordionSectionData {
  id: string
  title: string
  content?: string
  Icon: LucideIcon
  color: string
}

/** Hjelper som *utelater* `content` når verdi er null/undefined */
function mapOptionalContent(
  value: string | null | undefined
): Partial<Pick<AccordionSectionData, 'content'>> {
  return value != null ? { content: value } : {}
}

// Memoize innholdet som rendres for å unngå re-renders
const AccordionContentRenderer = memo(({ content }: { content: string }) => {
  return (
    <AccordionContent className='prose prose-invert relative z-10 max-w-none px-6 pb-6 text-base leading-relaxed text-foreground/80'>
      {renderMetafield(content)}
    </AccordionContent>
  )
})
AccordionContentRenderer.displayName = 'AccordionContentRenderer'

// Optimaliser selve accordion item med memo
const ProductDetailsAccordionSection = memo(
  ({
    sectionData,
    sectionIndex
  }: {
    sectionData: AccordionSectionData
    sectionIndex: number
  }) => {
    const { id, title, content, Icon, color } = sectionData
    const glowHexColor = useMemo(
      () => colorHexByTextClass[color] ?? '#60a5fa',
      [color]
    )

    // Pre-beregn styles for å unngå inline beregninger
    const overlayStyle = useMemo(
      () => ({
        background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${glowHexColor} 100%)`
      }),
      [glowHexColor]
    )

    const borderGlowStyle = useMemo(
      () => ({
        background: glowHexColor
      }),
      [glowHexColor]
    )

    return (
      <AnimatedBlock
        key={id}
        className='will-animate-fade-in-up'
        delay={`${sectionIndex * 0.1}s`}
        threshold={0.5}
      >
        <AccordionItem
          value={id}
          className='group relative mb-3 overflow-hidden rounded-lg border border-neutral-800 transition-all duration-300 hover:border-neutral-700'
        >
          {/* Bakgrunnsoverlay - use will-change for bedre performance */}
          <div
            className='pointer-events-none absolute inset-0 z-0 opacity-0 blur-2xl transition-opacity duration-300 will-change-opacity group-hover:opacity-20 group-data-[state=open]:opacity-20'
            style={overlayStyle}
          />

          <AccordionTrigger className='relative z-10 px-6 py-4 text-foreground/70 transition-colors hover:text-foreground data-[state=open]:text-foreground hover:no-underline'>
            <div className='flex items-center gap-4'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700 bg-background transition-transform duration-300 will-change-transform group-hover:scale-[1.1]'>
                <Icon
                  className={`h-5 w-5 shrink-0 transition-colors ${color}`}
                  aria-hidden='true'
                />
              </div>
              <span className='text-lg font-semibold'>{title}</span>
            </div>
          </AccordionTrigger>

          {typeof content === 'string' && (
            <AccordionContentRenderer content={content} />
          )}

          {/* Subtil border-glow overlay */}
          <div className='pointer-events-none absolute inset-0 z-10 rounded-lg opacity-0 transition-opacity duration-300 will-change-opacity group-hover:opacity-100 group-data-[state=open]:opacity-100'>
            <div
              className='absolute inset-0 rounded-lg blur-sm opacity-20'
              style={borderGlowStyle}
            />
          </div>
        </AccordionItem>
      </AnimatedBlock>
    )
  }
)
ProductDetailsAccordionSection.displayName = 'ProductDetailsAccordionSection'

export function ProductPageAccordion({
  variantProfile
}: ProductPageAccordionProps) {
  // Memoize sections array - MÅ være før alle betingede returns!
  const sectionsWithContent = useMemo(() => {
    if (!variantProfile) {
      return []
    }

    const allSections: AccordionSectionData[] = [
      {
        id: 'materialer',
        title: 'Materialer',
        ...mapOptionalContent(variantProfile.materials?.value),
        Icon: Layers3,
        color: 'text-rose-500'
      },
      {
        id: 'funksjoner',
        title: 'Funksjoner',
        ...mapOptionalContent(variantProfile.functions?.value),
        Icon: SlidersHorizontal,
        color: 'text-cyan-400'
      },
      {
        id: 'egenskaper',
        title: 'Egenskaper',
        ...mapOptionalContent(variantProfile.properties?.value),
        Icon: Sparkles,
        color: 'text-amber-400'
      },
      {
        id: 'bruksomrader',
        title: 'Bruksområder',
        ...mapOptionalContent(variantProfile.usage?.value),
        Icon: Mountain,
        color: 'text-sky-400'
      },
      {
        id: 'passform',
        title: 'Passform',
        ...mapOptionalContent(variantProfile.sizeFit?.value),
        Icon: Ruler,
        color: 'text-violet-400'
      },
      {
        id: 'vaskeanvisning',
        title: 'Vaskeanvisning',
        ...mapOptionalContent(variantProfile.storageAndMaintenance?.value),
        Icon: WashingMachine,
        color: 'text-blue-400'
      }
    ]

    return allSections.filter(
      (s): s is AccordionSectionData =>
        typeof s.content === 'string' && s.content.trim() !== ''
    )
  }, [variantProfile])

  // Betingede returns ETTER alle hooks
  if (!variantProfile || sectionsWithContent.length === 0) {
    return null
  }

  return (
    <section
      className='relative mt-24 overflow-hidden'
      aria-labelledby='product-details-heading'
    >
      {/* Subtil ambient bakgrunn */}
      <div className='absolute inset-0 -z-10 opacity-20'>
        <div
          className='absolute left-1/3 top-0 h-[400px] w-[400px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='mx-auto'>
        <AnimatedBlock
          className='mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-button bg-button/10 px-4 py-2 will-animate-fade-in-scale'
          delay='0s'
          threshold={0.3}
        >
          <Info className='h-4 w-4 text-button' />
          <span className='text-sm font-medium text-button'>
            Produktdetaljer
          </span>
        </AnimatedBlock>

        <AnimatedBlock
          className='will-animate-fade-in-up'
          delay='0.08s'
          threshold={0.3}
        >
          <h2
            id='product-details-heading'
            className='mb-8 text-2xl font-bold tracking-tight text-foreground sm:text-3xl'
          >
            Alt du trenger å vite
          </h2>
        </AnimatedBlock>

        <Accordion type='single' collapsible className='w-full'>
          {sectionsWithContent.map((section, index) => (
            <ProductDetailsAccordionSection
              key={section.id}
              sectionData={section}
              sectionIndex={index}
            />
          ))}
        </Accordion>
      </div>
    </section>
  )
}
