// Path: src/components/footer/FooterMenu.tsx
'use client'

import type { ShopifyFooterMenu } from '@types'
import clsx from 'clsx'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * Extracts path from URL
 * @why Converts Shopify URLs to Next.js paths for routing
 */
const getPathFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return urlObj.pathname
  } catch {
    return url
  }
}

export function FooterMenuItem({ item }: { item: ShopifyFooterMenu }) {
  const pathname = usePathname()
  const path = getPathFromUrl(item.url)
  const [active, setActive] = useState(pathname === path)

  useEffect(() => {
    setActive(pathname === path)
  }, [pathname, path])

  return (
    <li>
      <Link
        href={path as Route}
        className={clsx(
          'block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300',
          {
            'text-black dark:text-neutral-300': active
          }
        )}
      >
        {item.title}
      </Link>
    </li>
  )
}

export default function FooterMenu({ menu }: { menu: ShopifyFooterMenu[] }) {
  if (!menu.length) return null

  return (
    <nav>
      <ul>
        {menu.map((item: ShopifyFooterMenu) => {
          return <FooterMenuItem key={item.title} item={item} />
        })}
      </ul>
    </nav>
  )
}
