// Path: src/components/header/HeaderSearch/HeaderSearch.tsx
'use client'

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandGroup
} from '@/components/ui/command'
import { cn } from '@/lib/utils/className'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import type { SearchGroup } from '@types'
import type { Route } from 'next'
import { useRouter } from 'next/navigation'
import { startTransition, useState, Suspense, useEffect } from 'react' // 1. Importer useEffect
import { HeaderSearchFooter } from './HeaderSearchFooter'
import { HeaderSearchInputField } from './HeaderSearchInputField'
import { useCommandK } from './useCommandK'
import { ItemRow } from './ItemRow'

const searchIndexQueryOptions = {
  queryKey: ['search-index'],
  queryFn: async (): Promise<SearchGroup[]> => {
    const response = await fetch('/api/search-index')
    if (!response.ok) {
      throw new Error(`Nettverksrespons var ikke ok: ${response.status}`)
    }
    const data = await response.json()
    return data.groups as SearchGroup[]
  },
  staleTime: 1000 * 60 * 5 // 5 minutter
}

function SearchResults({ onSelect }: { onSelect: (path: string) => void }) {
  const { data: groups } = useSuspenseQuery(searchIndexQueryOptions)

  return (
    <>
      {groups.map(group => (
        <CommandGroup key={group.key} heading={group.label}>
          {group.items.map(item => (
            <ItemRow key={item.id} item={item} depth={0} onSelect={onSelect} />
          ))}
        </CommandGroup>
      ))}
    </>
  )
}

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

      {/* 4. Gjengi kun CommandDialog på klienten etter at den er "mounted" */}
      {isMounted && (
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
