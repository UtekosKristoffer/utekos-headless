// Path: src/components/header/DesktopNavigation.tsx
import { ActiveLink } from './ActiveLink'
import { ListItem } from './ListItem'
import {
  InteractiveNavContent,
  InteractiveNavItem,
  InteractiveNavList,
  InteractiveNavMenu,
  InteractiveNavTrigger
} from '@/components/header/InteractiveNavigation'
import { normalizeShopifyUrl } from '@/lib/helpers/normalizers/normalizeShopifyUrl'
import type { MenuItem } from '@types'

export const DesktopNavigation = ({ menu = [] }: { menu?: MenuItem[] }) => {
  return (
    <nav aria-label='Hovednavigasjon' className='pointer-events-auto hidden lg:block'>
      <InteractiveNavMenu>
        <InteractiveNavList>
          {menu.map(item => {
            const href = normalizeShopifyUrl(item.url)
            const hasSubMenu = item.items && item.items.length > 0

            return (
              <InteractiveNavItem key={item.title}>
                {hasSubMenu ?
                  <>
                    <InteractiveNavTrigger className='text-cloud-dancer/84 hover:bg-cloud-dancer/7 hover:text-cloud-dancer focus-visible:ring-cloud-dancer/45 data-[state=open]:bg-cloud-dancer/8 data-[state=open]:text-cloud-dancer'>
                      {item.title}
                    </InteractiveNavTrigger>
                    <InteractiveNavContent className='text-cloud-dancer bg-havdyp'>
                      <ul className='mx-auto grid w-[420px] items-center justify-center bg-havdyp gap-2 p-2 md:w-[520px] md:grid-cols-2 lg:w-[640px]'>
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
                : <ActiveLink href={href} data-track={`HeaderDesktop_${item.title}`}>
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
