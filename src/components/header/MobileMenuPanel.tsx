import { MobileMenuItem } from '@/components/header/MobileMenuItem'
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import type { MenuItem } from '@types'
import { HeaderLogo } from './HeaderLogo'

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
        className='w-full max-w-sm p-0 md:hidden bg-neutral-950 border-neutral-800'
      >
        {/* Ambient background glow */}
        <div className='pointer-events-none absolute inset-0 -z-10 opacity-20'>
          <div
            className='absolute left-0 top-1/4 h-[300px] w-[300px] blur-3xl'
            style={{
              background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
            }}
          />
          <div
            className='absolute right-0 bottom-1/4 h-[300px] w-[300px] blur-3xl'
            style={{
              background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
            }}
          />
        </div>

        <SheetHeader className='relative border-b border-neutral-800 p-6'>
          {/* Gradient accent line */}
          <div className='absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent' />

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

        <nav className='relative flex-grow overflow-y-auto p-4'>
          {isOpen && (
            <ul className='flex flex-col gap-2'>
              {menu.map((item, index) => (
                <div
                  key={item.title}
                  className='animate-fade-in-left'
                  style={
                    {
                      animationDelay: `${index * 0.05}s`,
                      animationDuration: '0.3s'
                    } as React.CSSProperties
                  }
                >
                  <MobileMenuItem item={item} />
                </div>
              ))}
            </ul>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenuPanel
