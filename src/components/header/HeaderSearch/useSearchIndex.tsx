import { CommandGroup } from '@/components/ui/command'

import { useState, useEffect, useRef, startTransition } from 'react'
import { ItemRow } from './ItemRow'
import type { SearchGroup } from '@types'

export function useSearchIndex() {
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
