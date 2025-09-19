'use client'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { cn } from '@/lib/utils/className'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'
function TablerArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden
      {...props}
    >
      <path d='M5 12l14 0'></path>
      <path d='M13 18l6 -6'></path>
      <path d='M13 6l6 6'></path>
    </svg>
  )
}

function useCommandK(open: boolean, setOpen: (v: boolean) => void) {
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(!open)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, setOpen])
}

export function HeaderSearch({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  useCommandK(open, setOpen)
  const router = useRouter()

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(true)}
        aria-label='Åpne søk (⌘/Ctrl + K)'
        className={cn(
          'group relative hidden h-9 w-[14rem] items-center gap-2 rounded-md border border-white/10 bg-transparent px-3 text-left text-sm text-muted-foreground outline-none transition md:flex',
          'hover:border-white/20 focus-visible:border-white/30',
          className
        )}
      >
        <SearchIcon className='size-4 opacity-60' />
        <span className='truncate'>Søk i innhold…</span>
        <kbd
          aria-hidden
          className='pointer-events-none ml-auto inline-flex select-none items-center gap-1 rounded border border-white/10 bg-black/20 px-1.5 font-mono text-[10px] text-white/60 dark:bg-white/10'
        >
          <span className='text-xs'>⌘</span>K
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        showCloseButton={false}
        className={cn(
          'rounded-xl p-2 pb-11 shadow-2xl max-w-2xl mx-auto',
          'bg-neutral-900/95 text-neutral-100',
          'border border-neutral-700 ring-neutral-700 ring-3',
          'backdrop-blur-sm',
          className
        )}
        title='Søk på nettsiden...'
        description='Søk etter produkter eller sider..'
      >
        <CommandInput placeholder='Søk på nettsiden..' />

        <CommandList className='no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5'>
          <CommandEmpty>Ingen treff.</CommandEmpty>

          <CommandGroup heading='Sider'>
            <CommandItem
              onSelect={() => {
                setOpen(false)
                router.push('/kontaktskjema')
              }}
              className='h-9 rounded-md px-3 font-medium'
            >
              <TablerArrowRight className='size-4' />
              Kontakt Oss
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpen(false)
                router.push('/produkter')
              }}
              className='h-9 rounded-md px-3 font-medium'
            >
              <TablerArrowRight className='size-4' />
              Produkter
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpen(false)
                router.push('/om-oss')
              }}
              // <-- FJERN DE OVERFLØDIGE KLASSENE HER
              className='h-9 rounded-md px-3 font-medium'
            >
              <TablerArrowRight className='size-4' />
              Om Utekos
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading='Handlehjelp'>
            <CommandItem
              onSelect={() => {
                setOpen(false)
                router.push('/handlehjelp/vask-og-vedlikehold')
              }}
              className='h-9 rounded-md px-3 font-medium'
            >
              <TablerArrowRight className='size-4' />
              Vask og vedlikehold
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpen(false)
                router.push('/handlehjelp/storrelsesguide')
              }}
              className='h-9 rounded-md px-3 font-medium'
            >
              <TablerArrowRight className='size-4' />
              Størrelsesguide
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 flex h-10 items-center justify-between px-3 text-xs',
            'bg-neutral-800 border-t border-neutral-700 text-muted-foreground'
          )}
        >
          <div className='flex items-center gap-2'>
            <span className='inline-flex items-center gap-1'>
              {/* Slik ser Lucide-ikonet ut */}
              <svg
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-corner-down-left size-3'
              >
                <path d='M20 4v7a4 4 0 0 1-4 4H4'></path>
                <polyline points='9 10 4 15 9 20'></polyline>
              </svg>
              Gå til side
            </span>
          </div>
          <div className='hidden items-center gap-2 md:flex'>
            <span className='flex items-center gap-1'>
              <kbd className='rounded border border-white/10 bg-black/20 px-1.5 font-mono text-[10px] text-white/70 dark:bg-white/10'>
                ↩
              </kbd>
              for å velge
            </span>
            <span className='flex items-center gap-1'>
              <kbd className='rounded border border-white/10 bg-black/20 px-1.5 font-mono text-[10px] text-white/70 dark:bg-white/10'>
                esc
              </kbd>
              for å lukke
            </span>
          </div>
        </div>
      </CommandDialog>
    </>
  )
}
