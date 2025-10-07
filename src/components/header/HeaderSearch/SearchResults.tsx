import type { SearchGroup, SearchItem } from '@types'
import { CommandGroup } from '@/components/ui/command'
import { ItemRow } from './ItemRow'

export function SearchResults({
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
