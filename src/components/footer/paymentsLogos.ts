import { KlarnaLogo } from '@/components/payments/KlarnaLogo'
import { MastercardLogo } from '@/components/payments/MastercardLogo'
import { VippsLogo } from '@/components/payments/VippsLogo'
import { VisaLogo } from '@/components/payments/VisaLogo'
export const paymentLogos = [
  { name: 'Klarna', Component: KlarnaLogo },
  { name: 'Vipps', Component: VippsLogo },
  { name: 'Visa', Component: VisaLogo },
  { name: 'Mastercard', Component: MastercardLogo }
]
