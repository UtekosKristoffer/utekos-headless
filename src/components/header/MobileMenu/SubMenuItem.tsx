// Path: src/components/header/MobileMenu/SubMenuItem.tsx

import Link from 'next/link'
import { normalizeShopifyUrl } from '@/lib/helpers/normalizers/normalizeShopifyUrl'
import type { MenuItem } from '@types'
import type { Route } from 'next'
import { ChevronRight } from 'lucide-react'

export function SubMenuItem({ item }: { item: MenuItem }) {
  return (
    <Link
      href={normalizeShopifyUrl(item.url) as Route}
      className='group relative flex w-full items-center justify-between rounded-xl border border-transparent bg-white/[0.04] px-3.5 py-3 text-foreground/90 transition-[background,border-color] active:scale-[0.99] hover:bg-white/[0.06] hover:border-white/10'
    >
      <div className='absolute left-2 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-gradient-to-b from-sky-300/70 via-cyan-300/50 to-transparent opacity-60' />

      <div className='flex min-w-0 items-center gap-3 pl-2'>
        <span className='truncate text-[14px] font-medium tracking-tight'>
          {item.title}
        </span>
      </div>

      <ChevronRight className='h-4.5 w-4.5 text-white/60 transition-transform duration-200 group-active:translate-x-0.5' />
    </Link>
  )
}
