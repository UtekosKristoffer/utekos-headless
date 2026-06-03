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
      className='group relative flex w-full items-center justify-between rounded-xl border border-transparent bg-cloud-dancer/[0.035] px-3.5 py-3 text-foreground/88 transition-[background,border-color] hover:border-cloud-dancer/10 hover:bg-cloud-dancer/[0.06] focus-visible:ring-2 focus-visible:ring-cloud-dancer/35 active:scale-[0.99]'
    >
      <div className='absolute left-2 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-linear-to-b from-dusted-peri/74 via-ancient-water/50 to-transparent opacity-70' />

      <div className='flex min-w-0 items-center gap-3 pl-2'>
        <span className='truncate text-[14px] leading-[1.25] font-medium tracking-[-0.01em]'>
          {item.title}
        </span>
      </div>

      <ChevronRight className='size-4 text-foreground/58 transition-transform duration-200 group-active:translate-x-0.5' />
    </Link>
  )
}
