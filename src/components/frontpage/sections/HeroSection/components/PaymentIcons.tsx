import { VippsLogo } from '@/components/footer/components/payments/VippsLogo'
import { KlarnaLogo } from '@/components/footer/components/payments/KlarnaLogo'

export function PaymentIcons() {
  return (
    <div className='mt-2 flex items-center justify-center gap-3 opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0'>
      <VippsLogo className='h-5 w-auto' />
      <KlarnaLogo className='h-5 w-auto' />
    </div>
  )
}
