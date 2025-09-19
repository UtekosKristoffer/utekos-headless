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
    href: Route // Changed from string to Route
  }
>(({ className, title, href, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href} // No need to cast anymore
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors focus:bg-accent focus:text-accent-foreground',
            'hover:bg-transparent', // <-- Legg til denne
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          {children && (
            <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
