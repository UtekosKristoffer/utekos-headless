import { KlarnaLogo } from '@/components/logo/payments/KlarnaLogo'
import { MastercardLogo } from '@/components/logo/payments/MastercardLogo'
import { VippsLogo } from '@/components/logo/payments/VippsLogo'
import { VisaLogo } from '@/components/logo/payments/VisaLogo'

export const paymentLogos = [
  { name: 'Klarna', Component: KlarnaLogo },
  { name: 'Vipps', Component: VippsLogo },
  { name: 'Visa', Component: VisaLogo },
  { name: 'Mastercard', Component: MastercardLogo }
]
