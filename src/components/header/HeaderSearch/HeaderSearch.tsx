/*eslint-disable react-hooks/exhaustive-deps*/

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
import {
  useDeferredValue,
  startTransition,
  useState,
  useEffect,
  useRef
} from 'react'
import type { Route } from 'next'

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
      <path d='M5 12l14 0' />
      <path d='M13 18l6 -6' />
      <path d='M13 6l6 6' />
    </svg>
  )
}

function useCommandK(open: boolean, setOpen: (v: boolean) => void) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      setTimeout(() => {
        startTransition(() => setOpen(!open))
      }, 0)
    }
    if (e.key === 'Escape') {
      startTransition(() => setOpen(false))
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

type SearchItem = {
  id: string
  title: string
  path: string
  parentId?: string | null
  keywords?: string[]
  children?: SearchItem[]
}

type SearchGroup = {
  key: string
  label: string
  items: SearchItem[]
}

function ItemRow({
  item,
  depth,
  onSelect
}: {
  item: SearchItem
  depth: number
  onSelect: (path: string) => void
}) {
  const paddings = ['pl-0', 'pl-6', 'pl-10', 'pl-14', 'pl-16']
  const pad = paddings[Math.min(depth, paddings.length - 1)]

  const handleSelect = () => onSelect(item.path)
  const handleChildSelect = (path: string) => onSelect(path)

  return (
    <>
      <CommandItem
        value={`${item.title} ${item.path} ${(item.keywords || []).join(' ')}`}
        onSelect={handleSelect}
        className={cn(
          'h-9 rounded-md px-3 font-medium',
          depth > 0 && 'text-neutral-200',
          depth > 0 && pad
        )}
      >
        <TablerArrowRight className='size-4' />
        <span className='truncate'>{item.title}</span>
      </CommandItem>
      {depth === 0
        && (item.children || []).map(child => (
          <CommandItem
            key={child.id}
            value={`${child.title} ${child.path} ${(child.keywords || []).join(' ')}`}
            onSelect={() => handleChildSelect(child.path)}
            className={cn(
              'h-9 rounded-md px-3',
              'pl-8 text-sm text-neutral-300'
            )}
          >
            <span aria-hidden className='mr-1'>
              ↳
            </span>
            <span className='truncate'>{child.title}</span>
          </CommandItem>
        ))}
    </>
  )
}

function useSearchIndex() {
  const [groups, setGroups] = useState<SearchGroup[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const hasFetched = useRef(false)
  const fetchPromiseRef = useRef<Promise<void> | null>(null)

  const prefetch = async () => {
    if (fetchPromiseRef.current) {
      return fetchPromiseRef.current
    }

    if (hasFetched.current) return

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    hasFetched.current = true
    setLoading(true)
    setError(null)
    abortControllerRef.current = new AbortController()

    const fetchPromise = (async () => {
      try {
        const res = await fetch('/api/search-index', {
          signal: abortControllerRef.current!.signal,
          headers: { 'Cache-Control': 'max-age=300' }
        })
        if (!res.ok) {
          throw new Error(
            `Klarte ikke hente søkeindeks (status: ${res.status})`
          )
        }
        const data = await res.json()
        startTransition(() => {
          setGroups(data.groups as SearchGroup[])
        })
      } catch (e: any) {
        if (e.name !== 'AbortError') {
          setError(e?.message ?? 'En ukjent feil oppstod')
        }
      } finally {
        setLoading(false)
        fetchPromiseRef.current = null
      }
    })()

    fetchPromiseRef.current = fetchPromise
    return fetchPromise
  }

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return { groups, loading, error, prefetch }
}

function SearchResults({
  groups,
  onSelect
}: {
  groups: SearchGroup[] | null
  onSelect: (path: string) => void
}) {
  if (!groups) return null

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
        <SearchIcon className='size-4 opacity-90' />
        <span>Søk i innhold…</span>
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
          <div className='flex items-center gap-2'>
            <span className='inline-flex items-center gap-1'>
              <svg
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-corner-down-left size-3'
              >
                <path d='M20 4v7a4 4 0 0 1-4 4H4' />
                <polyline points='9 10 4 15 9 20' />
              </svg>
              Gå til side
            </span>
          </div>
          <div className='hidden items-center gap-2 md:flex'>
            <span className='flex items-center gap-1'>
              <kbd className='rounded border border-white/10 bg-black/20 px-1.5 font-mono text-[10px] text-white/70 dark:bg-white/10'>
                ↑↓
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
