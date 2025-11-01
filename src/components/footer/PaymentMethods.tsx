// Path: src/components/footer/PaymentMethods.tsx
import { paymentLogos } from '@/components/footer/paymentsLogos'
export function PaymentMethods() {
  return (
    <div className='mt-12 border-t border-white/10 pt-8'>
      <div className='flex flex-wrap items-center justify-center gap-x-6 gap-y-4'>
        {paymentLogos.map(({ name, Component }) => (
          <Component
            key={name}
            className='h-6 w-auto text-foreground/70'
            aria-label={`${name} betalingsmetode`}
          />
        ))}
      </div>
    </div>
  )
}
