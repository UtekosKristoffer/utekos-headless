// Path: src/components/header/MobileMenu/MobileMenuItem.tsx

import Link from 'next/link'
import { normalizeShopifyUrl } from '@/lib/helpers/normalizers/normalizeShopifyUrl'
import type { MenuItem } from '@types'
import type { Route } from 'next'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { ChevronRight } from 'lucide-react'
import { SubMenuItem } from '@/components/header/components/MobileMenu/SubMenuItem'

export function MobileMenuItem({ item }: { item: MenuItem }) {
  const hasSubMenu = item.items && item.items.length > 0

  if (!hasSubMenu) {
    return (
      <Link
        href={normalizeShopifyUrl(item.url) as Route}
        className='group relative flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-foreground transition-[background,border-color,transform] active:scale-[0.99]'
      >
        <div className='absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-active:opacity-100 [background:radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.12),transparent_65%)]' />
        <div className='relative flex min-w-0 items-center gap-3'>
          <span className='truncate text-[15px] font-semibold tracking-tight'>
            {item.title}
          </span>
        </div>

        <ChevronRight className='relative h-5 w-5 text-white/60 transition-transform duration-200 group-active:translate-x-0.5' />
      </Link>
    )
  }

  return (
    <AccordionItem value={item.title} className='border-none'>
      <AccordionTrigger className='group relative flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-foreground transition-[background,border-color] hover:no-underline data-[state=open]:border-white/20 data-[state=open]:bg-white/[0.08]'>
        <div className='absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-data-[state=open]:opacity-100 [background:radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.14),transparent_70%)]' />
        <div className='relative flex min-w-0 items-center gap-3'>
          <span className='truncate text-[15px] font-semibold tracking-tight'>
            {item.title}
          </span>
        </div>
      </AccordionTrigger>

      <AccordionContent className='pb-0 pt-2'>
        <div className='rounded-2xl border border-white/10 bg-black/25 p-2 backdrop-blur'>
          <div className='space-y-1.5'>
            {item.items!.map(subItem => (
              <SubMenuItem key={subItem.title} item={subItem} />
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
