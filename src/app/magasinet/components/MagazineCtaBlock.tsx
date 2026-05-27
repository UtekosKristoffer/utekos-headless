import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Route } from 'next'
import type { MagazineBlock } from '../types'
import { MagazineInlineTitle } from './MagazineInlineTitle'

type MagazineCtaBlockProps = {
  block: Extract<MagazineBlock, { type: 'cta' }>
}

export function MagazineCtaBlock({ block }: MagazineCtaBlockProps) {
  return (
    <section className='my-16 rounded-lg border border-cloud-dancer/12 bg-maritime-darkest p-6 text-cloud-dancer shadow-[0_28px_90px_-62px_color-mix(in_oklch,var(--maritime-darkest)_90%,transparent)] sm:p-8'>
      <h2 className='max-w-2xl text-balance font-google-sans text-3xl font-bold leading-[0.95] tracking-tight sm:text-4xl'>
        <MagazineInlineTitle text={block.title} />
      </h2>
      <p className='mt-4 max-w-2xl font-utekos-text text-lg leading-[1.55] tracking-tight text-cloud-dancer/82'>
        {block.text}
      </p>
      <div className='mt-7 flex flex-wrap gap-3'>
        <BrandBadge
          asChild
          backgroundColor='var(--primary-button)'
          textColor='var(--maritime-darkest)'
          className='group min-h-12 gap-2 border border-primary-button/24 px-6 py-3 text-base font-semibold leading-[1.35] tracking-tight transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
        >
          <Link href={block.primary.href as Route} data-track={block.primary.trackingId}>
            {block.primary.label}
            <ArrowRight className='size-4 transition-transform group-hover:translate-x-1' aria-hidden />
          </Link>
        </BrandBadge>
        {block.secondary && (
          <BrandBadge
            asChild
            backgroundColor='var(--cloud-dancer)'
            textColor='var(--maritime-darkest)'
            className='min-h-12 border border-cloud-dancer/24 px-6 py-3 text-base font-semibold leading-[1.35] tracking-tight transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
          >
            <Link href={block.secondary.href as Route} data-track={block.secondary.trackingId}>
              {block.secondary.label}
            </Link>
          </BrandBadge>
        )}
      </div>
    </section>
  )
}
