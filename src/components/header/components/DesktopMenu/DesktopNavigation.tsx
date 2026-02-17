// Path: src/components/header/DesktopNavigation.tsx
import { ActiveLink } from '@/components/header/components/DesktopMenu/ActiveLink'
import { ListItem } from '@/components/header/components/DesktopMenu/ListItem'
import {
  InteractiveNavContent,
  InteractiveNavItem,
  InteractiveNavList,
  InteractiveNavMenu,
  InteractiveNavTrigger
} from '@/components/header/components/DesktopMenu/InteractiveNavigation'
import { normalizeShopifyUrl } from '@/lib/helpers/normalizers/normalizeShopifyUrl'
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
                      <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                        {item.items?.map(subItem => (
                          <ListItem
                            key={subItem.url}
                            href={normalizeShopifyUrl(subItem.url)}
                            title={subItem.title}
                            data-track={`HeaderDesktopSub_${subItem.title}`}
                          />
                        ))}
                      </ul>
                    </InteractiveNavContent>
                  </>
                : <ActiveLink
                    href={href}
                    data-track={`HeaderDesktop_${item.title}`}
                  >
                    {item.title}
                  </ActiveLink>
                }
              </InteractiveNavItem>
            )
          })}
        </InteractiveNavList>
      </InteractiveNavMenu>
    </nav>
  )
}
