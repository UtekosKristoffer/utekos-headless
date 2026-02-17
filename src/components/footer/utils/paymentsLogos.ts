import { KlarnaLogo } from '@/components/footer/components/payments/KlarnaLogo'
import { MastercardLogo } from '@/components/footer/components/payments/MastercardLogo'
import { VippsLogo } from '@/components/footer/components/payments/VippsLogo'
import { VisaLogo } from '@/components/footer/components/payments/VisaLogo'
export const paymentLogos = [
  { name: 'Klarna', Component: KlarnaLogo },
  { name: 'Vipps', Component: VippsLogo },
  { name: 'Visa', Component: VisaLogo },
  { name: 'Mastercard', Component: MastercardLogo }
]
