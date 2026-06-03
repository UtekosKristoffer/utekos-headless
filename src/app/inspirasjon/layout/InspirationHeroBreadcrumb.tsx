import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import type { Route } from 'next'

interface InspirationHeroBreadcrumbProps {
  label: string
  color: string
  textColor: string
  icon: LucideIcon
}

export function InspirationHeroBreadcrumb({
  label,
  color,
  textColor,
  icon: Icon
}: InspirationHeroBreadcrumbProps) {
  return (
    <nav
      aria-label='Brødsmulesti'
      className='flex items-center gap-3 text-[0.95rem] leading-text-paragraph tracking-wide text-foreground'
    >
      <Link href={'/' as Route} className='transition-colors hover:text-foreground/80 text-foreground'>
        Forsiden
      </Link>
      <span aria-hidden='true'>/</span>
      <Link
        href={'/inspirasjon' as Route}
        className='transition-colors hover:text-foreground/80 text-foreground'
      >
        Inspirasjon
      </Link>
      <span aria-hidden='true'>/</span>
      <BrandBadge
        aria-current='page'
        backgroundColor={color}
        textColor={textColor}
        className='gap-2 border border-cloud-dancer/18 px-4 py-2 text-sm leading-4 font-semibold tracking-[-0.01em] shadow-[0_14px_32px_-24px_color-mix(in_oklch,var(--background)_60%,transparent)]'
      >
        <Icon className='size-4' aria-hidden='true' />
        {label}
      </BrandBadge>
    </nav>
  )
}
