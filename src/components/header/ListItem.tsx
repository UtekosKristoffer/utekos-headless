// Path: src/components/header/ListItem.tsx
import Link from 'next/link'
import * as React from 'react'

import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils/className'

import type { Route } from 'next'
import type { ComponentRef } from 'react'

export const ListItem = React.forwardRef<
  ComponentRef<typeof Link>,
  Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> & {
    title: string
    href: Route
  }
>(({ className, title, href, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href}
          className={cn(
            'block select-none space-y-1 rounded-xl border border-transparent p-3 leading-none no-underline outline-none transition-colors hover:border-cloud-dancer/10 hover:bg-cloud-dancer/7 focus-visible:border-cloud-dancer/18 focus-visible:bg-cloud-dancer/8 focus-visible:ring-2 focus-visible:ring-cloud-dancer/35',
            className
          )}
          {...props}
        >
          <div className='text-[0.9375rem] leading-[1.4] font-semibold tracking-[0.01em] text-cloud-dancer'>
            {title}
          </div>
          {children && (
            <p className='line-clamp-2 text-sm leading-[1.45] tracking-[0.01em] text-cloud-dancer/80'>
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
