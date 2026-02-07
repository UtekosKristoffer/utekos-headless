// Path: src/components/header/MobileMenu/MobileMenuPanel.tsx

import { MobileMenuItem } from '@/components/header/MobileMenu/MobileMenuItem'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import type { MenuItem } from '@types'
import { HeaderLogo } from '../HeaderLogo'
import { Accordion } from '@/components/ui/accordion'

export function MobileMenuPanel({
  menu = [],
  isOpen,
  onOpenChange
}: {
  menu?: MenuItem[]
  isOpen: boolean
  onOpenChange: (_open: boolean) => void
}) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button className='hidden'>Åpne mobilmeny</button>
      </SheetTrigger>

      <SheetContent
        side='left'
        className='w-full max-w-sm p-0 md:hidden border-slate-800/70 bg-slate-950/95 backdrop-blur-xl'
      >
        <div className='pointer-events-none absolute inset-0 -z-10'>
          <div className='absolute inset-0 bg-gradient-to-b from-slate-800/35 via-slate-900/75 to-slate-950' />
          <div className='absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_10%,rgba(148,163,184,0.18),transparent_60%),radial-gradient(90%_70%_at_90%_30%,rgba(71,85,105,0.22),transparent_62%),radial-gradient(100%_80%_at_50%_110%,rgba(30,41,59,0.55),transparent_60%)]' />
          <div className='absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:22px_22px]' />
          <div className='absolute inset-0 bg-gradient-to-b from-black/0 via-black/15 to-black/55' />
        </div>

        <SheetHeader className='relative border-b border-slate-800/70 p-6'>
          <div className='absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/20 to-transparent' />

          <div className='mb-2 flex items-center gap-2'>
            <HeaderLogo />
            <SheetTitle className='ml-2 text-xl font-bold text-foreground'>
              Meny
            </SheetTitle>
          </div>

          <p className='text-sm text-muted-foreground'>
            Utforsk vår kolleksjon
          </p>
        </SheetHeader>

        <nav className='relative flex-grow overflow-y-auto px-4 pb-6 pt-4'>
          {isOpen && (
            <Accordion
              type='single'
              collapsible
              className='flex flex-col gap-2'
            >
              {menu.map((item, index) => (
                <div
                  key={item.title}
                  className='animate-fade-in-left'
                  style={
                    {
                      animationDelay: `${index * 0.04}s`,
                      animationDuration: '0.28s'
                    } as React.CSSProperties
                  }
                >
                  <MobileMenuItem item={item} />
                </div>
              ))}
            </Accordion>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
