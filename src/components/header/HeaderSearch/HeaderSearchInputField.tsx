import { SearchIcon } from 'lucide-react'

export function HeaderSearchInputField() {
  return (
    <>
      <SearchIcon className='size-4 text-foreground opacity-80' />
      <span>Søk…</span>
      <kbd
        aria-hidden
        className='pointer-events-none ml-auto inline-flex select-none items-center gap-1 rounded border border-cloud-dancer/10 bg-cloud-dancer/6 px-1.5 font-mono text-[10px] text-foreground/70'
      >
        <span className='text-xs'>⌘</span>K
      </kbd>
    </>
  )
}
