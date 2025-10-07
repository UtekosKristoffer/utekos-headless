'use client'
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList
} from '@/components/ui/command'
import { cn } from '@/lib/utils/className'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import {
  useDeferredValue,
  startTransition,
  useState,
  useEffect,
  useRef
} from 'react'
import type { Route } from 'next'
import { useCommandK } from './useCommandK'
import { useSearchIndex } from './useSearchIndex'
import { SearchResults } from './SearchResults'
import { HeaderSearchFooter } from './HeaderSearchFooter'
import { HeaderSearchInputField } from './HeaderSearchInputField'
export function HeaderSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { groups, loading, error, prefetch } = useSearchIndex()
  const deferredGroups = useDeferredValue(groups)
  const prefetchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useCommandK(open, setOpen)

  const handlePrefetch = () => {
    if (prefetchTimeoutRef.current) {
      clearTimeout(prefetchTimeoutRef.current)
    }
    prefetchTimeoutRef.current = setTimeout(() => {
      startTransition(() => {
        prefetch()
      })
    }, 100)
  }

  useEffect(() => {
    return () => {
      if (prefetchTimeoutRef.current) {
        clearTimeout(prefetchTimeoutRef.current)
      }
    }
  }, [])

  const handleOpenDialog = () => {
    setOpen(true)
    if (!groups && !loading) {
      prefetch()
    }
  }

  const handleNavigate = (path: string) => {
    setOpen(false)
    startTransition(() => {
      router.push(path as Route)
    })
  }

  const buttonProps = {
    'type': 'button' as const,
    'onClick': handleOpenDialog,
    'onMouseEnter': handlePrefetch,
    'onFocus': handlePrefetch,
    'onTouchStart': handlePrefetch,
    'aria-label': 'Åpne søk (⌘/Ctrl + K)',
    'className': cn(
      'group relative hidden h-9 w-[14rem] items-center gap-2 rounded-md border border-neutral-800 px-3 text-left text-sm text-muted-foreground outline-none transition md:flex',
      'hover:border-white/20 focus-visible:border-white/30',
      className
    )
  }

  return (
    <>
      <button {...buttonProps}>
        <HeaderSearchInputField />
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        showCloseButton={false}
        className={cn(
          'mx-auto max-w-2xl rounded-xl p-2 pb-11 shadow-2xl',
          'bg-neutral-900/95 text-neutral-100',
          'border border-neutral-700 ring-3 ring-neutral-700',
          'backdrop-blur-sm',
          className
        )}
        title='Søk på nettsiden...'
        description='Søk etter produkter eller sider..'
      >
        <CommandInput placeholder='Søk på nettsiden..' autoFocus />
        <CommandList className='no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5'>
          <CommandEmpty>
            {loading ?
              'Laster sider...'
            : error ?
              'Feil ved henting av søkeindeks.'
            : 'Ingen treff.'}
          </CommandEmpty>
          <SearchResults groups={deferredGroups} onSelect={handleNavigate} />
        </CommandList>
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 flex h-10 items-center justify-between border-t border-neutral-700 px-3 text-xs',
            'bg-neutral-800 text-muted-foreground'
          )}
        >
          <HeaderSearchFooter />
        </div>
      </CommandDialog>
    </>
  )
}
