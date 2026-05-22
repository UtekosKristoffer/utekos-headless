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
        'text-cloud-dancer/84 hover:bg-cloud-dancer/7 hover:text-cloud-dancer focus-visible:ring-cloud-dancer/45 data-[state=open]:bg-cloud-dancer/8',
        isActive && 'bg-cloud-dancer/10 text-cloud-dancer',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
