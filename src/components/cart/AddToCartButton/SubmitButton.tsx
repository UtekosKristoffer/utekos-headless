import clsx from 'clsx'
import { PlusIcon } from 'lucide-react'
export function SubmitButton({
  availableForSale,
  selectedVariantId,
  isPending,
  isDisabled
}: {
  availableForSale: boolean
  selectedVariantId: string | undefined
  isPending: boolean
  isDisabled: boolean
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white'
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60'

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Utsolgt
      </button>
    )
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label='Vennligst velg en variant'
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className='absolute left-0 ml-4'>
          <PlusIcon className='h-5' />
        </div>
        Add To Cart
      </button>
    )
  }

  return (
    <button
      type='submit'
      disabled={isPending || isDisabled}
      aria-label='Legg i handleposen'
      className={clsx(buttonClasses, {
        'hover:opacity-90': true
      })}
    >
      <div className='absolute left-0 ml-4'>
        <PlusIcon className='h-5' />
      </div>
      {isPending ? 'Adding...' : 'Legg i handleposen'}
    </button>
  )
}
