// Path: src/components/header/HeaderSearch/SearchResults.tsx
'use client'

import { CommandGroup } from '@/components/ui/command'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ItemRow } from '@/components/header/components/HeaderSearch/components/ItemRow'
import { searchIndexQueryOptions } from './utils/searchIndexQueryOption'

export function SearchResults({
  onSelect
}: {
  onSelect: (path: string) => void
}) {
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
