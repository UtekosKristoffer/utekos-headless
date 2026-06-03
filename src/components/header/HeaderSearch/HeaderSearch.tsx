'use client'

import { CommandDialog, CommandEmpty, CommandInput, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils/className'
import { useQueryClient } from '@tanstack/react-query'
import type { Route } from 'next'
import { useRouter } from 'next/navigation'
import { Suspense, startTransition, useState, useSyncExternalStore } from 'react'
import { HeaderSearchFooter } from './HeaderSearchFooter'
import { HeaderSearchInputField } from './HeaderSearchInputField'
import { useCommandK } from './useCommandK'
import { searchIndexQueryOptions } from './searchIndexQueryOption'
import { SearchResults } from './SearchResults'

const subscribeToClientSnapshot = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export function HeaderSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const isMounted = useSyncExternalStore(subscribeToClientSnapshot, getClientSnapshot, getServerSnapshot)
  const router = useRouter()
  const queryClient = useQueryClient()

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
      'group relative hidden h-11 w-64 items-center gap-3 rounded-md border border-cloud-dancer/15 bg-cloud-dancer/6 px-3 text-left text-sm text-foreground/70 outline-none transition md:flex lg:w-52 xl:mr-3 xl:w-56 2xl:w-60',
      'hover:border-cloud-dancer/30 hover:text-foreground focus-visible:border-cloud-dancer/35',
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
          data-nosnippet
          open={open}
          onOpenChange={setOpen}
          showCloseButton={false}
          className={cn(
            'mx-auto! max-w-3xl md:max-w-4xl lg:max-w-5xl rounded-xl p-2 pb-11 h-[50vh] shadow-2xl',
            'bg-sidebar-foreground text-foreground',
            'border border-cloud-dancer/12 ring-2 ring-cloud-dancer/8',
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
              'pointer-events-none absolute inset-x-0 bottom-0 flex h-10 items-center justify-between border-t border-cloud-dancer/10 px-3 text-xs',
              'bg-sidebar-foreground text-foreground/70'
            )}
          >
            <HeaderSearchFooter />
          </div>
        </CommandDialog>
      )}
    </>
  )
}
