// Path: src/components/header/ActiveLink.tsx
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils/className'

import type { Route } from 'next'
import type { ComponentProps } from 'react'

type ActiveLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  children: React.ReactNode
  href: Route
}

export function ActiveLink({
  href,
  className,
  children,
  ...props
}: ActiveLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        navigationMenuTriggerStyle(),
        isActive && 'bg-accent text-accent-foreground',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
