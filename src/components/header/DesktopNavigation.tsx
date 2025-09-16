// Path: src/components/header/DesktopNavigation.tsx

import {
  InteractiveNavContent,
  InteractiveNavItem,
  InteractiveNavList,
  InteractiveNavMenu,
  InteractiveNavTrigger
} from '@/components/header/InteractiveNavigation'
import { normalizeShopifyUrl } from '@/lib/helpers/normalizers/normalizeShopifyUrl'
import { ActiveLink } from './ActiveLink'
import { ListItem } from './ListItem'

import type { MenuItem } from '@types'
export const DesktopNavigation = ({ menu = [] }: { menu?: MenuItem[] }) => {
  return (
    <nav aria-label='Hovednavigasjon' className='hidden lg:block'>
      <InteractiveNavMenu>
        <InteractiveNavList>
          {menu.map(item => {
            const href = normalizeShopifyUrl(item.url)
            const hasSubMenu = item.items && item.items.length > 0

            return (
              <InteractiveNavItem key={item.title}>
                {hasSubMenu ?
                  <>
                    <InteractiveNavTrigger>{item.title}</InteractiveNavTrigger>
                    <InteractiveNavContent>
                      <ul className='bg-background text-accent-foreground grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                        {item.items?.map(subItem => (
                          <ListItem
                            key={subItem.url}
                            href={normalizeShopifyUrl(subItem.url)}
                            title={subItem.title}
                          />
                        ))}
                      </ul>
                    </InteractiveNavContent>
                  </>
                : <ActiveLink href={href}>{item.title}</ActiveLink>}
              </InteractiveNavItem>
            )
          })}
        </InteractiveNavList>
      </InteractiveNavMenu>
    </nav>
  )
}
