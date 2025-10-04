// Path: src/components/header/HeaderSearch/HeaderSearch.tsx
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
import type { Route } from 'next'

// --- Hjelpe-komponenter og hooks (uendret) ---
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

const navigateToPath = (router: ReturnType<typeof useRouter>, href: string) => {
  router.push(href as Route)
}

// --- Typer (uendret) ---
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

// --- ItemRow (uendret) ---
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

  return (
    <>
      <CommandItem
        value={`${item.title} ${item.path} ${(item.keywords || []).join(' ')}`}
        onSelect={() => onSelect(item.path)}
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
            value={`${child.title} ${child.path} ${(child.keywords || []).join(
              ' '
            )}`}
            onSelect={() => onSelect(child.path)}
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

// --- Ny, gjenbrukbar hook for å hente søkeindeks ---
const useSearchIndex = () => {
  const [groups, setGroups] = React.useState<SearchGroup[] | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const hasFetched = React.useRef(false)

  const prefetch = React.useCallback(async () => {
    if (hasFetched.current || loading) {
      return
    }
    hasFetched.current = true
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/search-index')
      if (!res.ok) {
        throw new Error(`Klarte ikke hente søkeindeks (status: ${res.status})`)
      }
      const data = await res.json()
      setGroups(data.groups as SearchGroup[])
    } catch (e: any) {
      setError(e?.message ?? 'En ukjent feil oppstod')
    } finally {
      setLoading(false)
    }
  }, [loading])

  return { groups, loading, error, prefetch }
}

export function HeaderSearch({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { groups, loading, error, prefetch } = useSearchIndex()

  useCommandK(open, setOpen)

  // Trigger prefetch når dialogen faktisk skal åpnes, hvis det ikke allerede er gjort
  React.useEffect(() => {
    if (open) {
      prefetch()
    }
  }, [open, prefetch])

  const go = (path: string) => {
    setOpen(false)
    navigateToPath(router, path)
  }

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(true)}
        onMouseEnter={() => prefetch()} // Prefetch på hover!
        onFocus={() => prefetch()} // Prefetch på focus!
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
          'mx-auto max-w-2xl rounded-xl p-2 pb-11 shadow-2xl',
          'bg-neutral-900/95 text-neutral-100',
          'border border-neutral-700 ring-3 ring-neutral-700',
          'backdrop-blur-sm',
          className
        )}
        title='Søk på nettsiden...'
        description='Søk etter produkter eller sider..'
      >
        <CommandInput placeholder='Søk på nettsiden..' />
        <CommandList className='no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5'>
          <CommandEmpty>
            {loading ?
              'Laster sider...'
            : error ?
              'Feil ved henting av søkeindeks.'
            : 'Ingen treff.'}
          </CommandEmpty>

          {!loading
            && !error
            && groups?.map(group => (
              <CommandGroup key={group.key} heading={group.label}>
                {group.items.map(item => (
                  <ItemRow key={item.id} item={item} depth={0} onSelect={go} />
                ))}
              </CommandGroup>
            ))}
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
