// Path: src/components/jsx/OptionButton.tsx

import type { OptionButtonProps } from '@types'

export function OptionButton({
  isSelected,
  onClick,
  children
}: OptionButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      role='radio'
      aria-checked={isSelected}
      data-selected={isSelected}
      className='
        flex w-full items-center justify-between rounded-[1rem] border bg-cloud-dancer/72 p-4 text-left text-maritime-blue
        transition-all duration-200 ease-in-out
        data-[selected=true]:border-maritime-blue data-[selected=true]:ring-1 data-[selected=true]:ring-maritime-blue
        data-[selected=false]:border-maritime-blue/14 data-[selected=false]:hover:border-dusted-peri/50
      '
    >
      {children}
    </button>
  )
}
