// Path: src/components/cart/AddToCartButton/SubmitButton.tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
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
    'relative flex w-full items-center justify-center rounded-full bg-button p-4 tracking-wide text-white'
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60'

  if (!availableForSale) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button disabled className={clsx(buttonClasses, disabledClasses)}>
              Utsolgt
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Denne kombinasjonen er utsolgt. Velg en annen variant.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
        Legg i handlekurv
      </button>
    )
  }

  return (
    <button
      type='submit'
      disabled={isPending || isDisabled}
      aria-label='Legg i kurv'
      className={clsx(buttonClasses, {
        'hover:opacity-90': true,
        [disabledClasses]: isDisabled
      })}
    >
      <div className='absolute left-0 ml-4'>
        <PlusIcon className='h-5' />
      </div>
      {isPending ? 'Legger til...' : 'Legg i kurv'}
    </button>
  )
}
