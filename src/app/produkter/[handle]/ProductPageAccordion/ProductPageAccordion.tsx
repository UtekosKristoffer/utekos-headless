'use client'

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
  Info
} from 'lucide-react'
import { renderMetafield } from './helpers/renderMetafield'
import { motion } from 'framer-motion'
import { useState } from 'react'

const colorMap: Record<string, string> = {
  'text-rose-500': '#F43F5E',
  'text-cyan-400': '#22d3ee',
  'text-amber-400': '#fbbf24',
  'text-sky-400': '#38bdf8',
  'text-violet-400': '#a78bfa',
  'text-blue-400': '#60a5fa'
}

function AccordionSection({ section, index }: { section: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const { id, title, content, Icon, color } = section
  const glowColor = colorMap[color] || '#60a5fa'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <AccordionItem
        key={id}
        value={id}
        className='relative overflow-hidden rounded-lg border border-neutral-800 mb-3 transition-all duration-300 hover:border-neutral-700'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Aurora effect */}
        <div
          className='absolute -inset-x-2 -inset-y-8 opacity-0 blur-2xl transition-opacity duration-300 data-[state=open]:opacity-20 pointer-events-none'
          style={{
            opacity: isHovered ? 0.15 : 0,
            background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${glowColor} 100%)`
          }}
        />

        <AccordionTrigger className='relative px-6 py-4 text-foreground/70 transition-colors hover:text-foreground data-[state=open]:text-foreground hover:no-underline'>
          <div className='flex items-center gap-4'>
            <div
              className='flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700 bg-background transition-all duration-300 group-hover:scale-110'
              style={{
                borderColor: isHovered ? glowColor + '40' : undefined
              }}
            >
              <Icon
                className={`h-5 w-5 shrink-0 transition-colors ${color}`}
                aria-hidden='true'
              />
            </div>
            <span className='text-lg font-semibold'>{title}</span>
          </div>
        </AccordionTrigger>

        <AccordionContent className='relative px-6 pb-6 prose prose-invert max-w-none text-base leading-relaxed text-foreground/80'>
          {renderMetafield(content)}
        </AccordionContent>

        {/* Subtle border glow on hover */}
        <div
          className='absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 pointer-events-none'
          style={{
            opacity: isHovered ? 1 : 0
          }}
        >
          <div
            className='absolute inset-0 rounded-lg blur-sm opacity-20'
            style={{ background: glowColor }}
          />
        </div>
      </AccordionItem>
    </motion.div>
  )
}

export function ProductPageAccordion({
  variantProfile
}: ProductPageAccordionProps) {
  if (!variantProfile) {
    return null
  }

  const sections = [
    {
      id: 'materialer',
      title: 'Materialer',
      content: variantProfile.materials?.value,
      Icon: Layers3,
      color: 'text-rose-500'
    },
    {
      id: 'funksjoner',
      title: 'Funksjoner',
      content: variantProfile.functions?.value,
      Icon: SlidersHorizontal,
      color: 'text-cyan-400'
    },
    {
      id: 'egenskaper',
      title: 'Egenskaper',
      content: variantProfile.properties?.value,
      Icon: Sparkles,
      color: 'text-amber-400'
    },
    {
      id: 'bruksomrader',
      title: 'Bruksområder',
      content: variantProfile.usage?.value,
      Icon: Mountain,
      color: 'text-sky-400'
    },
    {
      id: 'passform',
      title: 'Passform',
      content: variantProfile.sizeFit?.value,
      Icon: Ruler,
      color: 'text-violet-400'
    },
    {
      id: 'vaskeanvisning',
      title: 'Vaskeanvisning',
      content: variantProfile.storageAndMaintenance?.value,
      Icon: WashingMachine,
      color: 'text-blue-400'
    }
  ]

  const sectionsWithContent = sections.filter(section => section.content)

  if (sectionsWithContent.length === 0) {
    return null
  }

  return (
    <section
      className='relative mt-24 overflow-hidden'
      aria-labelledby='product-details-heading'
    >
      {/* Subtle ambient background */}
      <div className='absolute inset-0 -z-10 opacity-20'>
        <div
          className='absolute left-1/3 top-0 h-[400px] w-[400px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='mb-6 inline-flex items-center gap-2 rounded-full border border-button bg-button/10 px-4 py-2'
        >
          <Info className='h-4 w-4 text-button' />
          <span className='text-sm font-medium text-button'>
            Produktdetaljer
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          id='product-details-heading'
          className='mb-8 text-2xl font-bold tracking-tight text-foreground sm:text-3xl'
        ></motion.h2>

        <Accordion type='single' collapsible className='w-full'>
          {sectionsWithContent.map((section, index) => (
            <AccordionSection
              key={section.id}
              section={section}
              index={index}
            />
          ))}
        </Accordion>
      </div>
    </section>
  )
}
