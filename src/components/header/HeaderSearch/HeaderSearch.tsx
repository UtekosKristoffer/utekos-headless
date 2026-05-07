// Path: src/components/header/HeaderSearch/HeaderSearch.tsx
'use client'

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList
} from '@/components/ui/command'
import { cn } from '@/lib/utils/className'
import { useQueryClient } from '@tanstack/react-query'
import type { Route } from 'next'
import { useRouter } from 'next/navigation'
import { startTransition, useState, Suspense, useEffect } from 'react' // 1. Importer useEffect
import { HeaderSearchFooter } from './HeaderSearchFooter'
import { HeaderSearchInputField } from './HeaderSearchInputField'
import { useCommandK } from './useCommandK'
import { searchIndexQueryOptions } from './searchIndexQueryOption'
import { SearchResults } from './SearchResults'

export function HeaderSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false) // 2. Legg til isMounted state
  const router = useRouter()
  const queryClient = useQueryClient()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useCommandK(open, setOpen)

  const handlePrefetch = () => {
    queryClient.prefetchQuery(searchIndexQueryOptions)
  }

  const handleNavigate = (path: string) => {
    setOpen(false)
    startTransition(() => {
      router.push(path as Route)
    })
  }

  const buttonProps = {
    'type': 'button' as const,
    'onClick': () => setOpen(true),
    'onMouseEnter': handlePrefetch,
    'onFocus': handlePrefetch,
    'onTouchStart': handlePrefetch,
    'aria-label': 'Åpne søk (⌘/Ctrl + K)',
    'className': cn(
      'group relative hidden h-12 w-[24rem] items-center gap-3 rounded-md border border-foreground px-3 text-left text-sm text-muted-foreground outline-none transition md:flex xl:mr-4 xl:w-[18rem]',
      'hover:border-white/20 focus-visible:border-white/30',
      className
    )
  }

  return (
    <>
      <button {...buttonProps}>
        <HeaderSearchInputField />
      </button>

      {isMounted && (
        <CommandDialog
          open={open}
          onOpenChange={setOpen}
          showCloseButton={false}
          className={cn(
            'mx-auto! max-w-3xl md:max-w-4xl lg:max-w-5xl rounded-xl p-2 pb-11 h-[50vh] shadow-2xl',
            'bg-sidebar-foreground text-foreground',
            'border border-foreground ring-2 ring-foreground',
            'backdrop-blur-md',
            className
          )}
          title='Søk på nettsiden...'
          description='Søk etter produkter eller sider..'
        >
          <CommandInput placeholder='Søk på nettsiden..' autoFocus />
          <CommandList className='no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5'>
            <Suspense
              fallback={
                <div className='p-2'>
                  <div className='mb-4 h-5 w-1/4 animate-pulse rounded-md bg-muted' />
                  <div className='space-y-2'>
                    <div className='h-8 w-full animate-pulse rounded-md bg-muted' />
                    <div className='h-8 w-full animate-pulse rounded-md bg-muted' />
                    <div className='h-8 w-full animate-pulse rounded-md bg-muted' />
                  </div>
                </div>
              }
            >
              <SearchResults onSelect={handleNavigate} />
            </Suspense>
            <CommandEmpty>Ingen treff.</CommandEmpty>
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
      )}
    </>
  )
}
