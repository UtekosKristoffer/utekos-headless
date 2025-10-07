import { SearchIcon } from 'lucide-react'

export function HeaderSearchInputField() {
  return (
    <>
      <SearchIcon className='size-4 opacity-90' />
      <span>Søk i innhold…</span>
      <kbd
        aria-hidden
        className='pointer-events-none ml-auto inline-flex select-none items-center gap-1 rounded border border-white/10 bg-black/20 px-1.5 font-mono text-[10px] text-white/60 dark:bg-white/10'
      >
        <span className='text-xs'>⌘</span>K
      </kbd>
    </>
  )
}
