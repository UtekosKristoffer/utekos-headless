'use client'

import { CommandGroup } from '@/components/ui/command'
import type { SearchGroup } from '@types'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
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

export function useSearchIndex() {
  return useSuspenseQuery(searchIndexQueryOptions)
}

function SearchResults({ onSelect }: { onSelect: (path: string) => void }) {
  const { data: groups } = useSearchIndex()

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

export function SearchIndex({
  onSelect
}: {
  onSelect: (path: string) => void
}) {
  return (
    <Suspense
      fallback={
        <div className='p-2'>
          <div className='mb-4 h-5 w-1/4 animate-pulse rounded-md bg-muted' />
          <div className='space-y-2'>
            <div className='h-6 w-full animate-pulse rounded-md bg-muted' />
            <div className='h-6 w-full animate-pulse rounded-md bg-muted' />
            <div className='h-6 w-full animate-pulse rounded-md bg-muted' />
            <div className='h-6 w-full animate-pulse rounded-md bg-muted' />
            <div className='h-6 w-full animate-pulse rounded-md bg-muted' />
          </div>
        </div>
      }
    >
      <SearchResults onSelect={onSelect} />
    </Suspense>
  )
}
