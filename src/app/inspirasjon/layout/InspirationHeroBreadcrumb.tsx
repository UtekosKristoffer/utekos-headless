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
    <div className='mb-6 flex items-center gap-3 text-sm leading-[1.45] tracking-normal text-cloud-dancer/72'>
      <Link
        href={'/inspirasjon' as Route}
        className='transition-colors hover:text-cloud-dancer'
      >
        Inspirasjon
      </Link>
      <span>/</span>
      <BrandBadge
        backgroundColor={color}
        textColor={textColor}
        className='gap-2 border border-cloud-dancer/18 px-4 py-2 text-sm leading-[1.4] font-semibold tracking-normal shadow-[0_14px_32px_-24px_rgba(14,18,35,0.6)]'
      >
        <Icon className='h-4 w-4' aria-hidden='true' />
        {label}
      </BrandBadge>
    </div>
  )
}
