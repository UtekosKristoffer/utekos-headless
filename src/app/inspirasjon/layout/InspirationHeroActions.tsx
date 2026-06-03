import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Route } from 'next'

interface InspirationHeroActionsProps {
  primaryLabel: string
  secondaryLabel: string
  secondaryHref?: Route | string
}

export function InspirationHeroActions({
  primaryLabel,
  secondaryLabel,
  secondaryHref = '#bruksomrader'
}: InspirationHeroActionsProps) {
  return (
    <>
      <BrandBadge
        asChild
        backgroundColor='var(--primary)'
        textColor='var(--background)'
        className='group border border-primary/35 px-7 py-3 text-base leading-4 font-semibold tracking-[-0.01em] shadow-[0_18px_38px_-28px_color-mix(in_oklch,var(--demitasse)_72%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
      >
        <Link href={'/produkter' as Route}>
          {primaryLabel}
          <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
        </Link>
      </BrandBadge>
      <BrandBadge
        asChild
        backgroundColor='var(--cloud-dancer)'
        textColor='var(--background)'
        className='border border-cloud-dancer/35 px-7 py-3 text-base leading-4 font-semibold tracking-[-0.01em] shadow-[0_18px_38px_-30px_color-mix(in_oklch,var(--background)_48%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cloud-dancer/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cloud-dancer/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
      >
        <Link href={secondaryHref as Route}>{secondaryLabel}</Link>
      </BrandBadge>
    </>
  )
}
