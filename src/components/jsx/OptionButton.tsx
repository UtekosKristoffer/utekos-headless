// Path: src/components/jsx/OptionButton.tsx

import type { OptionButtonProps } from '@types'

export function OptionButton({ isSelected, onClick, children }: OptionButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      role='radio'
      aria-checked={isSelected}
      data-selected={isSelected}
      className='flex w-full items-center justify-between rounded-2xl border bg-foreground p-4 text-left text-foreground transition-all duration-200 ease-in-out data-[selected=true]:border-havdyp data-[selected=true]:ring-1 data-[selected=true]:ring-havdyp data-[selected=false]:border-havdyp/14 data-[selected=false]:hover:border-very-peri/50'
    >
      {children}
    </button>
  )
}
